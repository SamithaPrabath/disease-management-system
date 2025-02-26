import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {viewConfirmPopUp} from "../redux/actions/confirmCasePopUpAction"

const HeaderBar = ({AllLogins, viewConfirmPopUp}) => {

  const [role, setRole] = useState("")

  useEffect(() => {
    setRole(AllLogins?.data.role)
  }, []);

  return (
    <div className='HeaderBar w-full min-w-[870px] h-[264px] bg-white px-[40px] py-[32px] mt-[80px] flex flex-col gap-[10px]'>
      <div className='w-full h-[160px] flex flex-row items-center justify-between border-solid border-b-[1px] border-[#E2E5E9]'>
        <div className='flex items-center justify-center gap-[32px] pb-[32px]'>
          <div className='w-[144px] h-[144px] rounded-[50%] bg-[#36B37E] flex items-center justify-center'>
            <div className='w-[120px] h-[120px] rounded-[50%] bg-white flex items-center justify-center'>
              <h3 className='text-[24px] text-[#171717] font-medium text-center'>Dengue</h3>
            </div>
          </div>
          <div>
            <h2 className='text-[32px] text-[#171717] font-medium'>John Doe</h2>
            <h5 className='text-[16px] text-[#171717] font-medium'>Confirmed (Clinically only)</h5>
            <p className='text-[16px] text-[#65686C] font-normal'>001 | Male | 35 Years</p>
            <p className='text-[16px] text-[#65686C] font-normal'>Sri Jayawardenepura General Hospital, Sri Jayawardenepura</p>
          </div>
        </div>
        {
          role == "doctor" ? 
          <button
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-400 cursor-pointer"
          onClick={() => viewConfirmPopUp()}
          >
          Confirm Case
        </button> : <button className='text-[16px] text-white font-medium bg-[#0866FF] px-[16px] py-[8px] rounded-[6px]'>Mark as Recived</button>
        }
      </div>
      <div className='w-full h-[40px] text-[14px] px-[32px] py-[16px] flex flex-row items-center justify-center gap-[20px]'>
      <p><span className='text-[#65686C]'>Date of Onset: </span>14/01/2025</p>
      <p><span className='text-[#65686C]'>Date of addmission: </span>14/01/2025</p>
      <p><span className='text-[#65686C]'>B.H.T Number: </span>14/01/2025</p>
      <p><span className='text-[#65686C]'>Ward: </span>14/01/2025</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

const mapDispatchToProps = (dispatch) => ({
  viewConfirmPopUp: () => dispatch(viewConfirmPopUp()),
});


export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);