import React from "react";
import HeaderBar from "../components/HeaderBar";
import Navbar from "../components/Navbar";
import { openPopUp } from '../redux/actions/popUpAction';
import { connect } from 'react-redux';
import ViewLocationPopup from "../components/ViewLocationPopup";

const SingleCaseView = (props) => {

  const handlePopUpOpen = () => {
    props.openPopUp();
  }

  return (
    <>
      <Navbar Sections={[]} setActiveSection={null} activeId={null} />
      <HeaderBar />
      <div className="Home w-full bg-[#F2F4F7] py-[32px] px-[32px]">
        <div className="flex flex-col gap-[32px]">
          {/* Header Information */}
          <div className="flex flex-wrap items-center justify-evenly gap-4">
            <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
              <div className="w-full flex flex-row items-center justify-between">
                <h1 className="text-base text-[#080809]">Location</h1>
                <button className="text-base text-[#080809] py-[8px] px-[16px] rounded-[6px] bg-[#E2E5E9] cursor-pointer hover:bg-gray-300 transition"
                onClick={handlePopUpOpen}
                >
                  View Location
                </button>
              </div>
              <div>
                <p className="text-xl font-medium">
                  39, Temple Road, Mburagaina
                </p>
                <p className="text-base text-[#65686C]">Colombo</p>
              </div>
            </div>

            {/* Notifier Card */}
            <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white drop-shadow-md shadow-[#E2E5E9] flex flex-col items-start justify-between">
              <div className="w-full flex flex-row items-center justify-between">
                <h1 className="text-base font-medium text-[#080809]">
                  Notifier
                </h1>
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

          {/* Report Details */}
          <div className="bg-white p-[32px] flex flex-col rounded-[8px] drop-shadow shadow-[#E2E5E9] gap-[32px]">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-2xl font-medium">
                Communicable Disease report
              </h1>
              <p className="text-base font-medium">14/02/2024</p>
            </div>

              <div className="flex flex-col gap-2 text-[16px] text-[#080809]">
                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Ethnic Group of the patient</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">Sinhala</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Date of discharge</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">1/18/2025</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Where Isolated</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">None</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Isolation Date</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">1/1/2025 to 1/14/2025</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Outcome</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">Recovered</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Patient’s movement during three weeks prior to onset</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">
                    Traveled to the family for 2 days
                  </p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Laboratory Findings</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">
                    Traveled to the family for 2 days
                  </p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>PHI Remarks</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">Sent to the isolation</p>
                </div>
            </div>

            {/* Contacts Section */}
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-xl font-medium">
                Contacts Investigated
              </h2>

              <h3 className="text-base text-[#080809] font-medium">
                  Patient's Household
              </h3>

              <div className="">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-[#65686C]">
                      <th className="text-left py-2 px-4">Name</th>
                      <th className="text-left py-2 px-4">Age</th>
                      <th className="text-left py-2 px-4">
                        Date of observation
                      </th>
                      <th className="text-left py-2 px-4">Disposition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((_, index) => (
                      <tr key={index} className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white">
                        <td className="py-2 px-4">Test Input</td>
                        <td className="py-2 px-4">Test Input</td>
                        <td className="py-2 px-4">Date Picker</td>
                        <td className="py-2 px-4">Test Input</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
              <h3 className="text-base text-[#080809] font-medium">
              Other Contacts
              </h3>
                <table className="w-full">
                <thead>
                    <tr className="text-sm text-[#65686C]">
                      <th className="text-left py-2 px-4">Name</th>
                      <th className="text-left py-2 px-4">Age</th>
                      <th className="text-left py-2 px-4">
                        Date of observation
                      </th>
                      <th className="text-left py-2 px-4">Disposition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((_, index) => (
                      <tr key={index} className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white">
                        <td className="py-2 px-4">Test Input</td>
                        <td className="py-2 px-4">Test Input</td>
                        <td className="py-2 px-4">Date Picker</td>
                        <td className="py-2 px-4">Test Input</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewLocationPopup/>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openPopUp: () => dispatch(openPopUp()),
});

export default connect(null, mapDispatchToProps)(SingleCaseView);
