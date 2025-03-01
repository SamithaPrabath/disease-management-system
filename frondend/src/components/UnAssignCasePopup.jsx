import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closeUnAssignCasePopUp } from "../redux/actions/unAssignCasePopupAction";
import { message } from "antd";
import { unAssignedPhi } from "../api/assignedPhiApi";

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
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      assignedStatus: selectedOption,
      remarks: remarks,
      assignedPhi: userTypeId,
      caseId: ViewsSingleCase?.[1],
    };
    
    const response = await unAssignedPhi(values);

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
          <div className="bg-white w-[400px] h-[500px] rounded-[8px] shadow-sm flex flex-col">
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

                Location Here

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-6 disabled:bg-gray-400 cursor-pointer"
                  disabled={!selectedOption || !remarks}
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