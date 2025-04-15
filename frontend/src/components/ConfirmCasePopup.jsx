import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closeVIewConfirmPopUp } from "../redux/actions/confirmCasePopUpAction";
import { message } from "antd";
import { confirmCase } from "../api/allCasesApi";
import { useNavigate } from "react-router-dom";
const ConfirmCasePopup = ({
  AllLogins,
  ConfirmPopUp,
  closeVIewConfirmPopUp,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedOption, setSelectedOption] = useState("");
  const [remarks, setRemarks] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(ConfirmPopUp?.[0]);
  }, [ConfirmPopUp]);

  useEffect(() => {
    setUserTypeId(AllLogins.data.userId);
  }, [AllLogins]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      natureOfConfirmation: selectedOption,
      remarks: remarks,
      confirmedBy: userTypeId,
      id: ConfirmPopUp?.[1],
      confirmedDate: new Date().toISOString().split("T")[0],
    };
    
    try {
      const response = await confirmCase(values);

      if (response && response.message) {
        messageApi.success(response.message);
        setTimeout(() => {
          closeVIewConfirmPopUp();
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        messageApi.error("Confirmation failed");
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
      messageApi.error("An error occurred during confirmation.");
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
                Confirm Case
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeVIewConfirmPopUp()}
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            <div className="p-[16px]">
              <h2 className="w-full text-left text-[20px] font-medium">
                Nature of Confirmation
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Radio Options */}
                <div className="space-y-2">
                  {[
                    "Clinical only",
                    "Clinical and epidemiological",
                    "Clinical and bacteriological",
                    "Clinical and serological",
                    "Clinical, bacteriological and serological",
                    "Clinical and direct microscopy",
                  ].map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="diagnosis"
                        value={option}
                        checked={selectedOption === option}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className="ml-2 text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Remarks Section */}
                <div className="mt-6">
                  <h2 className="text-[20px] font-medium text-gray-800 mb-2">
                    Remarks
                  </h2>
                  <textarea
                    name="phiRemarks"
                    className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-3"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
    ConfirmPopUp: state.confirmPopUp,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeVIewConfirmPopUp: () => dispatch(closeVIewConfirmPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCasePopup);
