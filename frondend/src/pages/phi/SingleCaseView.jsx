import React, { useState } from "react";
import { openPopUp } from "../../redux/actions/popUpAction";
import { connect } from "react-redux";
import ViewLocationPopup from "../../components/ViewLocationPopup";

const SingleCaseView = (props) => {
  const handlePopUpOpen = () => {
    props.openPopUp();
  };

  return (
    <>
      <div className="flex flex-col gap-[32px]">
        {/* Header Information */}
        <div className="flex flex-wrap items-center justify-evenly gap-4">
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base text-[#080809]">Location</h1>
              <button
                className="text-base text-[#080809] py-[8px] px-[16px] rounded-[6px] bg-[#E2E5E9] cursor-pointer hover:bg-gray-300 transition"
                onClick={handlePopUpOpen}
              >
                View Location
              </button>
            </div>
            <div>
              <p className="text-xl font-medium">39, Temple Road, Mburagaina</p>
              <p className="text-base text-[#65686C]">Colombo</p>
            </div>
          </div>

          {/* Notifier Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white drop-shadow-md shadow-[#E2E5E9] flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base font-medium text-[#080809]">Notifier</h1>
              <h2 className="text-base font-medium text-[#080809]">
                14/02/2025
              </h2>
            </div>
            <div>
              <p className="text-xl font-medium">Tony Kroos</p>
              <p className="text-base text-[#65686C]">Doctor</p>
            </div>
          </div>

          {/* Ward Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base text-[#080809]">Ward</h1>
              <h2 className="text-base font-medium text-[#080809]">
                14/02/2025
              </h2>
            </div>
            <div>
              <p className="text-xl font-medium">ICU</p>
              <p className="text-base text-[#65686C]">
                Immunosuppressed, General Hospital, So Jaundice/Injuries
              </p>
            </div>
          </div>

          {/* MOH Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <h1 className="text-base text-[#080809]">MOH</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-base hover:bg-blue-700 transition">
              Assign MDR
            </button>
          </div>

          {/* PHI Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <h1 className="text-base text-[#080809]">PHI</h1>
          </div>

          {/* Confirmed By Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base text-[#080809]">Confirmed by</h1>
              <h2 className="text-base font-medium text-[#080809]">
                14/02/2025
              </h2>
            </div>
            <div>
              <p className="text-xl font-medium">Tony Kroos</p>
              <p className="text-base text-[#65686C]">Doctor</p>
            </div>
          </div>
        </div>
      </div>
      <ViewLocationPopup />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openPopUp: () => dispatch(openPopUp()),
});

export default connect(null, mapDispatchToProps)(SingleCaseView);
