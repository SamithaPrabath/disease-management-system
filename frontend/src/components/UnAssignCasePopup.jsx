import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closeUnAssignCasePopUp } from "../redux/actions/unAssignCasePopupAction";
import { message } from "antd";
import { unAssignedPhi } from "../api/assignedPhiApi";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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

const UnAssignCasePopup = ({
  AllLogins,
  UnassigncasepopupReducer,
  closeUnAssignCasePopUp,
  ViewsSingleCase,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState({
    option: "",
    remarks: "",
  });
  const [userTypeId, setUserTypeId] = useState("");

  // Load the Google Maps API
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    setUserTypeId(AllLogins.data.userTypeId);
  }, [AllLogins]);

  useEffect(() => {
    setIsOpen(UnassigncasepopupReducer);
    // Reset form when opening
    if (UnassigncasepopupReducer) {
      setSelectedOption("");
      setRemarks("");
      setErrors({ option: "", remarks: "" });
    }
  }, [UnassigncasepopupReducer]);

  const validateForm = () => {
    const newErrors = {
      option: "",
      remarks: "",
    };

    if (!selectedOption) {
      newErrors.option = "Please select an option";
    }

    if (!remarks.trim()) {
      newErrors.remarks = "Remarks are required";
    } else if (remarks.trim().length < 20) {
      newErrors.remarks = "Remarks must be at least 20 characters";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      assignedStatus: selectedOption,
      remarks: remarks,
      assignedPhi: userTypeId,
      caseId: ViewsSingleCase?.[1],
    };

    try {
      const response = await unAssignedPhi(values);

      if (response && response.message) {
        messageApi.success(response.message);
      } else {
        messageApi.error("Unassigned failed");
      }
    } catch (error) {
      console.error("Error during unassigning:", error);
      messageApi.error("An error occurred during unassigning.");
    }
  };

  return (
    <>
      {contextHolder}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] min-h-[500px] rounded-[8px] shadow-sm flex flex-col">
            {/* Header Section */}
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
              <form onSubmit={handleSubmit}>
                {/* Radio Options */}
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="unassignedRadio"
                    name="unassignedRadio"
                    value="unassigned"
                    checked={selectedOption === "unassigned"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="unassignedRadio"
                    className="ml-2 text-gray-700"
                  >
                    Unassign from the case
                  </label>
                </div>
                {errors.option && (
                  <p className="text-red-500 text-sm mb-4">{errors.option}</p>
                )}

                {/* Remarks Section */}
                <div className="mt-4">
                  <h2 className="text-[20px] font-medium text-gray-800 mb-2">
                    Remarks
                  </h2>
                  <textarea
                    name="phiRemarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                      errors.remarks ? "bg-red-100" : "bg-gray-200"
                    }`}
                    rows="4"
                    placeholder="Enter remarks..."
                  />
                  {errors.remarks && (
                    <p className="text-red-500 text-sm mt-1">{errors.remarks}</p>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-6 cursor-pointer"
                >
                  Confirm Unassignment
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
  AllLogins: state.allLogins,
  UnassigncasepopupReducer: state.unassigncasepopupReducer,
  ViewsSingleCase: state.viewsSingleCase,
});

const mapDispatchToProps = (dispatch) => ({
  closeUnAssignCasePopUp: () => dispatch(closeUnAssignCasePopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnAssignCasePopup);