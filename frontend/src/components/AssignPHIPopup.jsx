import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { getPhiListByLocation, phiAssignToCase } from "../api/phiApi";
import { closeAssignPHIPopUp } from "../redux/actions/assginPHIPopupAction";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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

const AssignPopup = ({ Assignphipopup, ViewsSingleCase, closeAssignPHIPopUp }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [phiList, setPhiList] = useState([]);
  const [caseId, setCaseId] = useState("");

  // Load the Google Maps API
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    setIsOpen(Assignphipopup);
    setCaseId(ViewsSingleCase?.[1]);
  }, [Assignphipopup]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPhiListByLocation();
        setPhiList(response.data || []);
      } catch (error) {
        console.error("Error fetching PHI list:", error);
        messageApi.error("Failed to fetch PHI list");
      }
    };

    if (isOpen) fetchData();
  }, [isOpen, messageApi]);

  const formik = useFormik({
    initialValues: {
      caseId: caseId || "",
      assignedPhi: "",
      phiAssignedDate: new Date().toISOString().split("T")[0],
    },
    validationSchema: assignPHISchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await phiAssignToCase(values);

        if (response?.message) {
          messageApi.success(response.message);
          resetForm();
          setTimeout(() => closeAssignPHIPopUp(), 1000);
        } else {
          throw new Error("No response message");
        }
      } catch (error) {
        console.error("Error during PHI assignment:", error);
        messageApi.error("An error occurred during PHI assignment");
      }
    },
  });

  return (
    <>
      {contextHolder}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] h-[500px] rounded-[8px] shadow-sm flex flex-col">
            {/* Header Section */}
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium">
                Assign PHI
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeAssignPHIPopUp()}
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
                    className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                    value={formik.values.assignedPhi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select PHI</option>
                    {phiList.map((phi) => (
                      <option key={phi.id} value={phi.id}>
                        Name: {phi.name}, MOH: {phi.moh}
                      </option>
                    ))}
                  </select>
                  {formik.touched.assignedPhi && formik.errors.assignedPhi && (
                    <p className="text-red-500 text-sm">{formik.errors.assignedPhi}</p>
                  )}
                </div>

                {/* Location Section with Map */}
                <div className="mt-4 text-gray-700">
                  <p className="mb-2">Location: Colombo</p>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={13} // Adjust zoom level as needed
                    >
                      {/* Add a marker for Colombo */}
                      <Marker position={center} />
                    </GoogleMap>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] bg-gray-100">
                      Loading Map...
                    </div>
                  )}
                </div>

                {/* Hidden Case ID */}
                <input
                  type="hidden"
                  name="caseId"
                  value={formik.values.caseId}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-3 disabled:bg-blue-400"
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
});

const mapDispatchToProps = (dispatch) => ({
  closeAssignPHIPopUp: () => dispatch(closeAssignPHIPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignPopup);