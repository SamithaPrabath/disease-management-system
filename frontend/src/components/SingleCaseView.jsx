import React, { useState, useEffect } from "react";
import HeaderBar from "./HeaderBar";
import { openPopUp } from "../redux/actions/popUpAction";
import { closeSingleCase } from "../redux/actions/viewSingleCaseAction";
import { connect } from "react-redux";
import ViewLocationPopup from "./ViewLocationPopup";
import ConfirmCasePopup from "./ConfirmCasePopup";
import { getSingleCaseData } from "../api/allCasesApi";
import { viewConfirmPopUp } from "../redux/actions/confirmCasePopUpAction";
import { viewAssignPHIPopUp } from "../redux/actions/assginPHIPopupAction";
import { viewAssignMOHPopUp } from "../redux/actions/assignMOHPopupAction";
import { closeAssignMOHPopUp } from "../redux/actions/assignMOHPopupAction";

const SingleCaseView = ({
  AllLogins,
  viewConfirmPopUp,
  openPopUp,
  closeSingleCase,
  patientId,
  viewAssignPHIPopUp,
  viewAssignMOHPopUp,
  closeAssignMOHPopUp,
}) => {
  const [singleCase, setSingleCase] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleCaseData(patientId);
        setSingleCase(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchData();
  }, [AllLogins, closeAssignMOHPopUp, viewAssignMOHPopUp, viewAssignPHIPopUp, viewConfirmPopUp]);

  useEffect(() => {
    setRole(AllLogins.data.role);
    console.log(role === "idu");
  }, [singleCase]);

  const handlePopUpOpen = () => {
    openPopUp();
  };

  return (
    <>
      <HeaderBar handleBack={closeSingleCase} patientId={patientId} />
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
              <p className="text-xl font-medium">{singleCase?.address}</p>
            </div>
          </div>

          {/* Notifier Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white drop-shadow-md shadow-[#E2E5E9] flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base font-medium text-[#080809]">Notifier</h1>
              <h2 className="text-base font-medium text-[#080809]">
                {singleCase?.notifiedDate}
              </h2>
            </div>
            <div>
              <p className="text-xl font-medium">
                {singleCase?.notifierDetails?.name}
              </p>
              <p className="text-base text-[#65686C]">
                {singleCase?.notifierDetails?.role
                  ? singleCase.notifierDetails.role.charAt(0).toUpperCase() +
                    singleCase.notifierDetails.role.slice(1)
                  : ""}
              </p>
            </div>
          </div>

          {/* Ward Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base text-[#080809]">Ward</h1>
              <h2 className="text-base font-medium text-[#080809]">
                {singleCase?.dateOfAdmission}
              </h2>
            </div>
            <div>
              <p className="text-xl font-medium">{singleCase?.ward}</p>
              <p className="text-base text-[#65686C]">
                {singleCase?.institute}
              </p>
            </div>
          </div>

          {/* MOH Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base font-medium text-[#080809]">MOH</h1>
              <h2 className="text-base font-medium text-[#080809]">
                {singleCase?.mohAssignedDate}
              </h2>
            </div>
            {singleCase?.assignedMoh == "" ? (
              <button
                className={` text-white px-4 py-2 rounded text-base
              ${
                role === "idu"
                  ? "bg-blue-600 cursor-pointer hover:bg-blue-700 transition"
                  : "text-gray-400 cursor-not-allowed bg-[#E2E5E9]"
              }
              `}
                onClick={() => viewAssignMOHPopUp()}
              >
                Assign MOH
              </button>
            ) : (
              <>
                <div className="w-full flex flex-row items-center justify-between">
                  <div>
                    <p className="text-xl font-medium">
                      {singleCase?.assignedMohDetails?.name}
                    </p>
                    <p className="text-base text-[#65686C]">
                      {singleCase?.assignedMohDetails?.area
                        ? singleCase.assignedMohDetails.area
                            .charAt(0)
                            .toUpperCase() +
                          singleCase.assignedMohDetails.area.slice(1)
                        : ""}
                    </p>
                  </div>
                  <p className="text-base text-[#65686C]">
                    {singleCase?.assignedMohDetails?.registrationNumber}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* PHI Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base font-medium text-[#080809]">PHI</h1>
              <h2 className="text-base font-medium text-[#080809]">
                {singleCase?.phiAssignedDate}
              </h2>
            </div>
            {singleCase?.assignedPhi == "" ? (
              <button
                className={` text-white px-4 py-2 rounded text-base
              ${
                (role === "idu" || role === "moh")
                  ? "bg-blue-600 cursor-pointer hover:bg-blue-700 transition"
                  : "text-gray-400 cursor-not-allowed bg-[#E2E5E9]"
              }
              `}
                onClick={() => viewAssignPHIPopUp()}
              >
                Assign PHI
              </button>
            ) : (
              <>
                <p className="text-xl font-medium">
                  {singleCase?.assignedPhiDetails?.name}
                </p>
                <p className="text-base text-[#65686C]">
                  {singleCase?.assignedPhiDetails?.area
                    ? singleCase.assignedPhiDetails.area
                        .charAt(0)
                        .toUpperCase() +
                      singleCase.assignedPhiDetails.area.slice(1)
                    : ""}
                </p>
              </>
            )}
          </div>

          {/* Confirmed By Card */}
          <div className="w-[400px] h-[154px] rounded-[8px] p-[16px] bg-white shadow-lg flex flex-col items-start justify-between">
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-base text-[#080809]">Confirmed by</h1>
              <h2 className="text-base font-medium text-[#080809]">
                {singleCase?.confirmedDate}
              </h2>
            </div>
            <div>
              {singleCase?.caseStatus == "Suspected" ? (<div></div>) : (
                <>
                  <p className="text-xl font-medium">
                    {singleCase?.confirmedByDetails?.name}
                  </p>
                  <p className="text-base text-[#65686C]">
                    {singleCase?.confirmedByDetails?.role
                      ? singleCase.confirmedByDetails.role
                          .charAt(0)
                          .toUpperCase() +
                        singleCase.confirmedByDetails.role.slice(1)
                      : ""}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {(singleCase?.markAsReceived == "true" || role == "admin" || role == "moh" || role == "phi" || role == "doctor" || role == "epidemiologist") && Object.keys(singleCase?.report || {}).length > 0 ? (
          <div className="bg-white p-[32px] flex flex-col rounded-[8px] drop-shadow shadow-[#E2E5E9] gap-[32px]">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-2xl font-medium">
                Communicable Disease report
              </h1>
              <p className="text-base font-medium">
                {singleCase?.report?.reportCreatedDate}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-[16px] text-[#080809]">
              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>Ethnic Group of the patient</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">{singleCase?.report.ethnicGroup}</p>
              </div>

              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>Date of discharge</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">{singleCase?.report.dischargeDate}</p>
              </div>

              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>Where Isolated</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">
                  {singleCase?.report.isolationStatus}
                </p>
              </div>

              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>Isolation Date</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">
                  {singleCase?.report.isolationDateFrom}
                  <span className="text-[#000000] font-bold"> to </span>
                  {singleCase?.report.isolationDateTo}
                </p>
              </div>

              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>Outcome</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">{singleCase?.report.outcome}</p>
              </div>

              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>Patient’s movement during three weeks prior to onset</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">
                  {singleCase?.report.movementHistory}
                </p>
              </div>

              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>Laboratory Findings</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">{singleCase?.report.labResults}</p>
              </div>

              <div className="flex flex-row">
                <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                  <p>PHI Remarks</p>
                  <p>:</p>
                </div>
                <p className="pl-2 w-1/2">{singleCase?.report.phiRemarks}</p>
              </div>
            </div>

            {/* Contacts Section */}
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-xl font-medium">Contacts Investigated</h2>

              <h3 className="text-base text-[#080809] font-medium">
                Patient's Household
              </h3>

              <div className="">
                {/* Household Contacts Table */}
                <div className="">
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-[#65686C]">
                        <th className="text-left py-2 px-4">Name</th>
                        <th className="text-left py-2 px-4">Age</th>
                        <th className="text-left py-2 px-4">
                          Date of observation
                        </th>
                        <th className="text-left py-2 px-4">Observation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleCase?.report?.householdContacts?.map(
                        (contact, index) => (
                          <tr
                            key={index}
                            className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                          >
                            <td className="py-2 px-4">{contact.name || "-"}</td>
                            <td className="py-2 px-4">{contact.age || "-"}</td>
                            <td className="py-2 px-4">
                              {contact.date || "N/A"}
                            </td>
                            <td className="py-2 px-4">
                              {contact.disposition || "-"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Other Contacts Table */}
                <div>
                  <h3 className="text-base text-[#080809] font-medium mt-4">
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
                        <th className="text-left py-2 px-4">Observation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleCase?.report?.otherContacts?.map(
                        (contact, index) => (
                          <tr
                            key={index}
                            className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                          >
                            <td className="py-2 px-4">{contact.name || "-"}</td>
                            <td className="py-2 px-4">{contact.age || "-"}</td>
                            <td className="py-2 px-4">
                              {contact.date || "N/A"}
                            </td>
                            <td className="py-2 px-4">
                              {contact.disposition || "-"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          singleCase.markAsReceived == "false" &&
          ((Object.keys(singleCase?.report || {}).length > 0 &&
            role == "moh") ||
            (role == "admin" && singleCase.sendReport == "true")) && (
            <div className="bg-white p-[32px] flex flex-col rounded-[8px] drop-shadow shadow-[#E2E5E9] gap-[32px]">
              <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl font-medium">
                  Communicable Disease report
                </h1>
                <p className="text-base font-medium">
                  {singleCase?.report.reportCreatedDate}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-[16px] text-[#080809]">
                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Ethnic Group of the patient</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">{singleCase?.report?.ethnicGroup}</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Date of discharge</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">
                    {singleCase?.report?.dischargeDate}
                  </p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Where Isolated</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">
                    {singleCase?.report?.isolationStatus}
                  </p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Isolation Date</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">
                    {singleCase?.report?.isolationDateFrom} to{" "}
                    {singleCase?.report?.isolationDateTo}
                  </p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Outcome</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">{singleCase?.report?.outcome}</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Patient’s movement during three weeks prior to onset</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">
                    {singleCase?.report?.movementHistory}
                  </p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>Laboratory Findings</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">{singleCase?.report?.labResults}</p>
                </div>

                <div className="flex flex-row">
                  <div className="text-[#65686C] w-1/2 flex items-center justify-between">
                    <p>PHI Remarks</p>
                    <p>:</p>
                  </div>
                  <p className="pl-2 w-1/2">{singleCase?.report?.phiRemarks}</p>
                </div>
              </div>

              {/* Contacts Section */}
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-xl font-medium">Contacts Investigated</h2>

                <h3 className="text-base text-[#080809] font-medium">
                  Patient's Household
                </h3>

                <div className="">
                  {/* Household Contacts Table */}
                  <div className="">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-[#65686C]">
                          <th className="text-left py-2 px-4">Name</th>
                          <th className="text-left py-2 px-4">Age</th>
                          <th className="text-left py-2 px-4">
                            Date of observation
                          </th>
                          <th className="text-left py-2 px-4">Observation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleCase?.report?.householdContacts?.map(
                          (contact, index) => (
                            <tr
                              key={index}
                              className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                            >
                              <td className="py-2 px-4">
                                {contact.name || "-"}
                              </td>
                              <td className="py-2 px-4">
                                {contact.age || "-"}
                              </td>
                              <td className="py-2 px-4">
                                {contact.date || "N/A"}
                              </td>
                              <td className="py-2 px-4">
                                {contact.disposition || "-"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Other Contacts Table */}
                  <div>
                    <h3 className="text-base text-[#080809] font-medium mt-4">
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
                          <th className="text-left py-2 px-4">Observation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleCase?.report?.otherContacts?.map(
                          (contact, index) => (
                            <tr
                              key={index}
                              className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                            >
                              <td className="py-2 px-4">
                                {contact.name || "-"}
                              </td>
                              <td className="py-2 px-4">
                                {contact.age || "-"}
                              </td>
                              <td className="py-2 px-4">
                                {contact.date || "N/A"}
                              </td>
                              <td className="py-2 px-4">
                                {contact.disposition || "-"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <ViewLocationPopup />
      <ConfirmCasePopup />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openPopUp: () => dispatch(openPopUp()),
  closeSingleCase: () => dispatch(closeSingleCase()),
  viewConfirmPopUp: (value) => dispatch(viewConfirmPopUp(value)),
  viewAssignPHIPopUp: () => dispatch(viewAssignPHIPopUp()),
  viewAssignMOHPopUp: () => dispatch(viewAssignMOHPopUp()),
  closeAssignMOHPopUp: () => dispatch(closeAssignMOHPopUp()),

});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCaseView);
