import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closeUnAssignCasePopUp } from "../redux/actions/unAssignCasePopupAction";
import { message } from "antd";
import { unAssignedPhi } from "../api/assignedPhiApi";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getSingleCaseData } from "../api/allCasesApi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getGoogleMapsConfig } from "../utils/googleMapsConfig";

// Map container style
const containerStyle = {
  width: "100%",
  height: "200px",
};

// Validation Schema
const UnassignSchema = Yup.object().shape({
  assignedStatus: Yup.string().required("Please select an option"),
  remarks: Yup.string()
    .required("Remarks are required")
    .min(20, "Remarks must be at least 20 characters"),
});

const UnAssignCasePopup = ({
  AllLogins,
  UnassigncasepopupReducer,
  closeUnAssignCasePopUp,
  ViewsSingleCase,
}) => {
  const [singleCaseData, setSingleCaseData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [userTypeId, setUserTypeId] = useState("");
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
    setUserTypeId(AllLogins.data.userId);

    const fetchSingleCaseData = async () => {
      const response = await getSingleCaseData(ViewsSingleCase?.[1]);
      setSingleCaseData(response.data);
      if (response.data.location_details) {
        setLocation({
          address: response?.data?.location_address,
          coordinates: {
            lat: response?.data?.location_details?.latitude,
            lng: response?.data?.location_details?.longitude,
          },
        });
      }
    };

    fetchSingleCaseData();
  }, [AllLogins, ViewsSingleCase]);

  useEffect(() => {
    setIsOpen(UnassigncasepopupReducer);
  }, [UnassigncasepopupReducer]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const submitValues = {
      ...values,
      assignedPhi: userTypeId,
      caseId: ViewsSingleCase?.[1],
    };

    try {
      const response = await unAssignedPhi(submitValues);

      if (response && response.message) {
        messageApi.success(response.message);
        setTimeout(() => closeUnAssignCasePopUp(), 1000);
      } else {
        messageApi.error("Unassigned failed");
      }
    } catch (error) {
      console.error("Error during unassigning:", error);
      messageApi.error("An error occurred during unassigning.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] min-h-[500px] max-h-[95vh] overflow-y-auto rounded-[8px] shadow-sm flex flex-col">
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium">
                Un-assign Case
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeUnAssignCasePopUp()}
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            <div className="p-[16px]">
              <Formik
                initialValues={{
                  assignedStatus: "",
                  remarks: "",
                }}
                validationSchema={UnassignSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="flex items-center mb-2">
                      <Field
                        type="radio"
                        id="unassignedRadio"
                        name="assignedStatus"
                        value="unassigned"
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <label
                        htmlFor="unassignedRadio"
                        className="ml-2 text-gray-700"
                      >
                        Unassign from the case
                      </label>
                    </div>
                    {errors.assignedStatus && touched.assignedStatus && (
                      <p className="text-red-500 text-sm mb-4">
                        {errors.assignedStatus}
                      </p>
                    )}

                    <div className="mt-4">
                      <h2 className="text-[20px] font-medium text-gray-800 mb-2">
                        Remarks
                      </h2>
                      <Field
                        as="textarea"
                        name="remarks"
                        className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                          errors.remarks && touched.remarks
                            ? "bg-red-100"
                            : "bg-gray-200"
                        }`}
                        rows="4"
                        placeholder="Enter remarks..."
                      />
                      {errors.remarks && touched.remarks && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.remarks}
                        </p>
                      )}
                    </div>

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
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-6 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Confirm Unassignment"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  AllLogins: state.allLogins,
  UnassigncasepopupReducer: state.unassigncasepopupReducer,
  ViewsSingleCase: state.viewsSingleCase,
});

const mapDispatchToProps = (dispatch) => ({
  closeUnAssignCasePopUp: () => dispatch(closeUnAssignCasePopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnAssignCasePopup);
