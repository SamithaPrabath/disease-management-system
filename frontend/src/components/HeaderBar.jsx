import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { viewConfirmPopUp } from "../redux/actions/confirmCasePopUpAction";
import { viewReport } from "../redux/actions/viewReportAction";
import { getSingleCaseData, mark_AsReceived } from "../api/allCasesApi";
import { viewAssignPHIPopUp } from "../redux/actions/assginPHIPopupAction";
import { viewUnAssignCasePopUp } from "../redux/actions/unAssignCasePopupAction";
import { viewAssignMOHPopUp } from "../redux/actions/assignMOHPopupAction";
import { message } from "antd";

const HeaderBar = ({
  AllLogins,
  viewConfirmPopUp,
  handleBack,
  viewReport,
  patientId,
  viewAssignPHIPopUp,
  viewUnAssignCasePopUp,
  viewAssignMOHPopUp,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [singleCase, setSingleCase] = useState(null);
  const [role, setRole] = useState("");
  const [userTypeId, setUserTypeId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (AllLogins?.data) {
        setRole(AllLogins.data.role);
        setUserTypeId(AllLogins.data.userId);
      }

      try {
        const response = await getSingleCaseData(patientId);
        setSingleCase(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchData();
  }, [AllLogins, patientId]);

  const handleMarkAsReceived = async (caseId) => {
    try {
      const markAsReceived = "true";
      const value = { markAsReceived, caseId };
      const response = await mark_AsReceived(value);

      if (response.status === 200 && response.message) {
        messageApi.success(response.message);
      } else {
        throw new Error(response.message || "Failed to send final report");
      }
    } catch (error) {
      console.error("Error sending final report:", error);
      messageApi.error(
        error.message || "An error occurred while sending the final report"
      );
    }
  };

  return (
    <>
      {contextHolder}
      <div className="HeaderBar w-full min-w-[870px] h-[264px] bg-white px-[40px] py-[32px] flex flex-col gap-[10px]">
        <div className="w-full h-[160px] flex flex-row items-center justify-between border-solid border-b-[1px] border-[#E2E5E9]">
          <div className="flex items-center justify-center gap-[32px] pb-[32px]">
            <div
              className={`w-[144px] h-[144px] rounded-[50%] 
          ${
            singleCase?.caseStatus == "Suspected"
              ? "bg-[#FFAB00]"
              : "bg-[#36B37E]"
          } flex items-center justify-center`}
            >
              <div className="w-[120px] h-[120px] rounded-[50%] bg-white flex items-center justify-center">
                <h3 className="text-[18px] text-[#171717] font-medium text-center">
                  {singleCase?.diseaseName}
                </h3>
              </div>
            </div>
            <div>
              <h2 className="text-[32px] text-[#171717] font-medium">
                {singleCase?.patientName}
              </h2>
              <h5 className="text-[16px] text-[#171717] font-medium">
                {singleCase?.caseStatus}{" "}
                {singleCase?.natureOfConfirmation !== "" && singleCase?.natureOfConfirmation != null
                  ? `(${singleCase?.natureOfConfirmation})`
                  : ""}
              </h5>
              <p className="text-[16px] text-[#65686C] font-normal">
                {singleCase?.caseId} | {singleCase?.sex} | {singleCase?.age}{" "}
                Years
              </p>
              <p className="text-[16px] text-[#65686C] font-normal">
                {singleCase?.instituteName}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-end">
            {/* Back Button */}
            <button
              className="w-[100px] bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
              onClick={() => handleBack()}
            >
              Back
            </button>

            {/* Conditional Buttons */}
            {role === "doctor" ? (
              <button
                className={`px-[16px] py-[8px] rounded-[6px]
            ${
              singleCase?.caseStatus == "Suspected"
                ? "text-white bg-blue-600 cursor-pointer"
                : "text-gray-400 bg-gray-300 cursor-not-allowed"
            }
          `}
                onClick={() => viewConfirmPopUp(patientId)}
                disabled={singleCase?.caseStatus == "Suspected" ? false : true}
              >
                Confirm Case
              </button>
            ) : role === "idu" ? (
              <div className="flex gap-3">
                <button
                  className={`px-6 py-2 rounded-md
              ${
                singleCase?.assignedMoh == null
                  ? "text-white bg-blue-600 cursor-pointer hover:bg-blue-400"
                  : "text-gray-400 bg-gray-300 cursor-not-allowed"
              }
              `}
                  onClick={() => viewAssignMOHPopUp()}
                  disabled={singleCase?.assignedMoh != null}
                >
                  Assign MOH
                </button>
              </div>
            ) : role === "phi" ? (
              <div className="flex gap-3">
                {singleCase?.assignedPhi != userTypeId ? (
                  <button
                    className="px-[16px] py-[8px] rounded-[6px] bg-[#E2E5E9] text-gray-400 cursor-not-allowed"
                    disabled={true}
                  >
                    Add Report
                  </button>
                ) : (
                  <button
                    className={`px-[16px] py-[8px] rounded-[6px] 
                          ${
                            Object.keys(singleCase?.report ?? {}).length > 0
                              ? "bg-[#E2E5E9]  text-gray-400 cursor-not-allowed"
                              : "text-white bg-blue-600 cursor-pointer"
                          }
                        `}
                    onClick={() => viewReport(singleCase?.id)}
                    disabled={Object.keys(singleCase?.report ?? {}).length > 0}
                  >
                    Add Report
                  </button>
                )}

                <button
                  className={`px-6 py-2 rounded-md
              ${
                singleCase?.assignedPhi == userTypeId
                  ? "text-white bg-blue-600 cursor-pointer hover:bg-blue-400"
                  : "text-gray-400 bg-gray-300 cursor-not-allowed"
              }
              `}
                  onClick={() => viewUnAssignCasePopUp()}
                  disabled={singleCase?.assignedPhi != userTypeId}
                >
                  Un-assign Case
                </button>

                <button
                  className={`px-[16px] py-[8px] rounded-[6px]
                ${
                  singleCase?.caseStatus == "Suspected"
                    ? "text-white bg-blue-600 cursor-pointer"
                    : "text-gray-400 bg-gray-300 cursor-not-allowed"
                }
              `}
                  onClick={() => viewConfirmPopUp()}
                  disabled={
                    singleCase?.caseStatus == "Suspected" ? false : true
                  }
                >
                  Confirm Case
                </button>
              </div>
            ) : role === "moh" ? (
              <div className="flex gap-3">
                <button
                  className={`px-[16px] py-[8px] rounded-[6px] ${
                    singleCase?.assignedPhi ? "bg-[#E2E5E9] text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white cursor-pointer"
                  }`}
                  onClick={() => viewAssignPHIPopUp()}
                  disabled={singleCase?.assignedPhi ? true : false}
                >
                  Assign PHI
                </button>

                <button
                  className={`px-[16px] py-[8px] rounded-[6px]
            ${
              singleCase?.caseStatus == "Suspected"
                ? "text-white bg-blue-600 cursor-pointer"
                : "text-gray-400 bg-gray-300 cursor-not-allowed"
            }
          `}
                  onClick={() => viewConfirmPopUp(patientId)}
                  disabled={
                    singleCase?.caseStatus == "Suspected" ? false : true
                  }
                >
                  Confirm Case
                </button>

                {Object.keys(singleCase?.report || {}).length > 0 && (
                  <button
                    className={`px-[16px] py-[8px] rounded-[6px] ${
                      singleCase?.sendReport
                        ? "bg-[#E2E5E9] text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white cursor-pointer"
                    }
                                `}
                    onClick={() => handleSendFinalReport(singleCase?.caseId)}
                  >
                    Send Final Report
                  </button>
                )}
              </div>
            ) : (
              <button
                className={`text-[16px] font-medium px-[16px] py-[8px] rounded-[6px]
                ${
                  singleCase?.caseStatus == "Suspected"
                    ? "text-white bg-blue-600 cursor-pointer"
                    : "text-gray-400 bg-gray-300 cursor-not-allowed"
                }
                `}
                onClick={() => handleMarkAsReceived(singleCase?.caseId)}
                disabled={singleCase?.markAsReceived == "true" ? true : false}
              >
                Mark as Received
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-[40px] text-[14px] px-[32px] py-[16px] flex flex-row items-center justify-center gap-[20px]">
          <p>
            <span className="text-[#65686C]">Date of Onset: </span>
            {singleCase?.dateOfOnset || "null"}
          </p>
          <p>
            <span className="text-[#65686C]">Date of addmission: </span>
            {singleCase?.dateOfAdmission || "null"}
          </p>
          <p>
            <span className="text-[#65686C]">B.H.T Number: </span>
            {singleCase?.bhtNumber || "null"}
          </p>
          <p>
            <span className="text-[#65686C]">Ward: </span>
            {singleCase?.ward || "null"}
          </p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

const mapDispatchToProps = (dispatch) => ({
  viewConfirmPopUp: (value) => dispatch(viewConfirmPopUp(value)),
  viewReport: (value) => dispatch(viewReport(value)),
  viewAssignPHIPopUp: () => dispatch(viewAssignPHIPopUp()),
  viewUnAssignCasePopUp: () => dispatch(viewUnAssignCasePopUp()),
  viewAssignMOHPopUp: () => dispatch(viewAssignMOHPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
