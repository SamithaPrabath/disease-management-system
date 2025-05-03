import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { getPhiListByLocation, phiAssignToCase } from "../api/phiApi";
import { closeAssignPHIPopUp } from "../redux/actions/assginPHIPopupAction";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAPS_CONFIG } from "../utils/googleMapsConfig";

// Validation schema
const assignPHISchema = Yup.object().shape({
  assignedPhi: Yup.string().required("Please select a PHI"),
});

// Map container style
const containerStyle = {
  width: "100%",
  height: "200px", // Adjust height as needed
};

// Colombo, Sri Lanka coordinates
const center = {
  lat: 6.9271, // Latitude of Colombo
  lng: 79.8612, // Longitude of Colombo
};

const AssignPopup = ({
  Assignphipopup,
  ViewsSingleCase,
  closeAssignPHIPopUp,
  AllLogins,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [phiList, setPhiList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Load the Google Maps API
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    ...GOOGLE_MAPS_CONFIG,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });

      if (response.results[0]) {
        // Find the district from address components
        const addressComponents = response.results[0].address_components;
        const district = addressComponents.find(
          (component) =>
            component.types.includes("administrative_area_level_2") ||
            component.types.includes("sublocality_level_1")
        );

        if (district) {
          setSelectedDistrict(district.short_name);
        } else {
          console.log(
            `Selected coordinates (${lat}, ${lng}) but couldn't determine district`
          );
        }
      }
    } catch (error) {
      console.error("Error getting district name:", error);
    }
  };

  useEffect(() => {
    setIsOpen(Assignphipopup || false); // Ensure boolean fallback
  }, [Assignphipopup]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPhiListByLocation(
          selectedDistrict || "Colombo"
        );
        setPhiList(response.data || []);
      } catch (error) {
        console.error("Error fetching PHI list:", error);
        messageApi.error("Failed to fetch PHI list");
      }
    };

    if (isOpen) fetchData();
  }, [isOpen, selectedDistrict, Assignphipopup?.[0]]);

  const formik = useFormik({
    initialValues: {
      caseId: ViewsSingleCase?.[1] || Assignphipopup?.[1] || "", // Ensure fallback if undefined
      assignedPhi: "",
      phiAssignedDate: new Date().toISOString().split("T")[0], // Today's date
    },
    enableReinitialize: true, // Updates initialValues if ViewsSingleCase changes
    validationSchema: assignPHISchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await phiAssignToCase(values);
        if (response.status === 200 && response.message) {
          messageApi.success(response.message);
          resetForm();
          setTimeout(() => closeAssignPHIPopUp(), 1000);
        } else {
          messageApi.error(response.message || "Failed to assign PHI");
        }
      } catch (error) {
        console.error("Error during PHI assignment:", error);
        messageApi.error(
          error.message || "An error occurred during PHI assignment"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {contextHolder}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] min-h-[500px] max-h-[95vh] overflow-y-auto rounded-[8px] shadow-sm flex flex-col">
            {/* Header Section */}
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium">
                Assign PHI
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeAssignPHIPopUp()}
                aria-label="Close"
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            <div className="p-[16px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3">
                  <label className="text-[16px] text-gray-700">
                    Select a PHI According to Location
                  </label>
                  <select
                    name="assignedPhi"
                    className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
                    value={formik.values.assignedPhi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                  >
                    <option value="">Select PHI</option>
                    {phiList.map((phi) => (
                      <option key={phi.id} value={phi.id}>
                        Name: {phi.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.assignedPhi && formik.errors.assignedPhi && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.assignedPhi}
                    </p>
                  )}
                </div>

                {/* Location Section with Map */}
                <div className="mt-4 text-gray-700">
                  <p className="mb-2">
                    Location: {selectedDistrict || "Colombo"}
                  </p>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={selectedLocation || center}
                      zoom={13}
                      onClick={handleMapClick}
                    >
                      {/* Add a marker for selected location or default Colombo */}
                      <Marker position={selectedLocation || center} />
                    </GoogleMap>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] bg-gray-100">
                      Loading Map...
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full mt-4 px-6 py-2 rounded-md text-white font-medium transition ${
                    formik.isSubmitting || !formik.isValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }`}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? "Assigning..." : "Assign"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  Assignphipopup: state.assignphipopupReducer,
  ViewsSingleCase: state.viewsSingleCase,
  AllLogins: state.allLogins,
});

const mapDispatchToProps = (dispatch) => ({
  closeAssignPHIPopUp: () => dispatch(closeAssignPHIPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignPopup);
