import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closeAssignPHIPopUp } from "../redux/actions/assginPHIPopupAction";

const AssignPopup = ({ Assignphipopup, closeAssignPHIPopUp }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(Assignphipopup);
  }, [Assignphipopup]);

  return (
    <>
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
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Assignphipopup: state.assignphipopupReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeAssignPHIPopUp: () => dispatch(closeAssignPHIPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignPopup);
