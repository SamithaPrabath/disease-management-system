import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closeVIewConfirmPopUp } from "../../redux/actions/confirmCasePopUpAction";

const ConfirmCasePopup = ({ ConfirmPopUp, closeVIewConfirmPopUp }) => {
  //Doctor Form
  const [selectedOption, setSelectedOption] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Option:", selectedOption);
    console.log("Remarks:", remarks);
    // Add your form submission logic here
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(ConfirmPopUp);
  }, [ConfirmPopUp]);

  return (
    <>
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
    ConfirmPopUp: state.confirmPopUp,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeVIewConfirmPopUp: () => dispatch(closeVIewConfirmPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCasePopup);
