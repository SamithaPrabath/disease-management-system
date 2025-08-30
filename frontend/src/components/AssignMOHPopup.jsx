import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { getMohListByLocation, mohAssignToCase } from "../api/mohApi";
import { closeAssignMOHPopUp, viewAssignMOHPopUp } from "../redux/actions/assignMOHPopupAction";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getSingleCaseData } from "../api/allCasesApi";
import { getGoogleMapsConfig } from "../utils/googleMapsConfig";

// Validation schema
const assignMOHSchema = Yup.object().shape({
  assignedMoh: Yup.string().required("Please select a MOH"),
});

// Map container style
const containerStyle = {
  width: "100%",
  height: "200px", // Adjust height as needed
};

const AssignPopup = ({
  Assignmohpopup,
  ViewsSingleCase,
  closeAssignMOHPopUp,
  ViewAssignMOHPopUp,
  AllLogins,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [mohList, setMohList] = useState([]);
  const [location, setLocation] = useState({
    address: "Colombo, Sri Lanka",
    coordinates: {
      lat: 6.9271, // Latitude of Colombo
      lng: 79.8612, // Longitude of Colombo
    },
  });

  // Load the Google Maps API
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader(getGoogleMapsConfig(GOOGLE_MAPS_API_KEY));

  useEffect(() => {
    setIsOpen(Assignmohpopup || false); // Ensure boolean fallback
  }, [Assignmohpopup]);

  useEffect(() => {
    const get_location = async () => {
      const response = await getSingleCaseData(ViewsSingleCase?.[1]);
      setLocation({
        address: response?.data?.location_address,
        coordinates: {
          lat: response?.data?.location_details?.latitude,
          lng: response?.data?.location_details?.longitude,
        },
      });
    };
    get_location();
  }, [ViewsSingleCase, Assignmohpopup, isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMohListByLocation();
        setMohList(response.data || []);

        const response2 = await getSingleCaseData(Assignmohpopup?.[1]);
        setLocation({
          address: response2?.data?.location_address,
          coordinates: {
            lat: response2?.data?.location_details?.latitude,
            lng: response2?.data?.location_details?.longitude,
          },
      });
      } catch (error) {
        console.error("Error fetching MOH list:", error);
        messageApi.error("Failed to fetch MOH list");
      }
    };
    if (isOpen) fetchData();
  }, [isOpen, Assignmohpopup?.[0]]);

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik({
    initialValues: {
      caseId: ViewsSingleCase?.[1] || Assignmohpopup?.[1] || "", // Ensure fallback if undefined
      assignedMoh: "",
      mohAssignedDate: formatDateForInput(new Date()), // Today's date
    },
    enableReinitialize: true, // Updates initialValues if ViewsSingleCase changes
    validationSchema: assignMOHSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await mohAssignToCase(values);
        if (response.status === 200 && response.message) {
          messageApi.success(response.message);
          resetForm();
          setTimeout(() => closeAssignMOHPopUp(), 1000);
        } else {
          messageApi.error(response.message || "Failed to assign MOH");
        }
      } catch (error) {
        console.error("Error during MOH assignment:", error);
        messageApi.error(
          error.message || "An error occurred during MOH assignment"
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
                Assign MOH
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeAssignMOHPopUp()}
                aria-label="Close"
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            <div className="p-[16px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3">
                  <label className="text-[16px] text-gray-700">
                    Select a MOH According to Location
                  </label>
                  <select
                    name="assignedMoh"
                    className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
                    value={formik.values.assignedMoh}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                  >
                    <option value="">Select MOH</option>
                    {mohList.map((moh) => (
                      <option key={moh.id} value={moh.id}>
                        Name: {moh.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.assignedMoh && formik.errors.assignedMoh && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.assignedMoh}
                    </p>
                  )}
                </div>

                {/* Location Section with Map */}
                <div className="mt-4 text-gray-700">
                  <p className="mb-2">Location: {location.address}</p>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={location.coordinates}
                      zoom={13} // Adjust zoom level as needed
                    >
                      {/* Add a marker for Colombo */}
                      <Marker position={location.coordinates} />
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
  Assignmohpopup: state.assignmohpopup,
  ViewAssignMOHPopUp: state.viewAssignMOHPopUp,
  ViewsSingleCase: state.viewsSingleCase,
  AllLogins: state.allLogins,
});

const mapDispatchToProps = (dispatch) => ({
  closeAssignMOHPopUp: () => dispatch(closeAssignMOHPopUp()),
  viewAssignMOHPopUp: (value) => dispatch(viewAssignMOHPopUp(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignPopup);
