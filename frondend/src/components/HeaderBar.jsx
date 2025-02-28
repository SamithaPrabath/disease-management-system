import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { viewConfirmPopUp } from "../redux/actions/confirmCasePopUpAction";
import { viewReport } from "../redux/actions/viewReportAction";
import { getAllCases } from "../api/allCasesApi";
import { viewAssignPHIPopUp } from "../redux/actions/assginPHIPopupAction";
import { viewUnAssignCasePopUp } from "../redux/actions/unAssignCasePopupAction";

const HeaderBar = ({
  AllLogins,
  viewConfirmPopUp,
  handleBack,
  viewReport,
  patientId,
  viewAssignPHIPopUp,
  viewUnAssignCasePopUp,
}) => {
  const [singleCase, setSingleCase] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (AllLogins?.data?.role) {
        setRole(AllLogins.data.role);
      }

      try {
        const data = await getAllCases();
        const foundCase = data.find((item) => item.id === patientId);
        setSingleCase(foundCase || null);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchData();
  }, [AllLogins, patientId]);

  return (
    <div className="HeaderBar w-full min-w-[870px] h-[264px] bg-white px-[40px] py-[32px] flex flex-col gap-[10px]">
      <div className="w-full h-[160px] flex flex-row items-center justify-between border-solid border-b-[1px] border-[#E2E5E9]">
        <div className="flex items-center justify-center gap-[32px] pb-[32px]">
          <div
            className={`w-[144px] h-[144px] rounded-[50%] 
          ${
            singleCase?.status == "Suspected" ? "bg-[#FFAB00]" : "bg-[#36B37E]"
          } flex items-center justify-center`}
          >
            <div className="w-[120px] h-[120px] rounded-[50%] bg-white flex items-center justify-center">
              <h3 className="text-[24px] text-[#171717] font-medium text-center">
                Dengue
              </h3>
            </div>
          </div>
          <div>
            <h2 className="text-[32px] text-[#171717] font-medium">
              {singleCase?.name}
            </h2>
            <h5 className="text-[16px] text-[#171717] font-medium">
              {singleCase?.status}{" "}
              {singleCase?.natureOfConfamation !== "" &&
                `(${singleCase?.natureOfConfamation})`}
            </h5>
            <p className="text-[16px] text-[#65686C] font-normal">
              {singleCase?.caseId} | {singleCase?.sex} | {singleCase?.age} Years
            </p>
            <p className="text-[16px] text-[#65686C] font-normal">
              {singleCase?.hospital}
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
              singleCase?.status == "Suspected"
                ? "text-white bg-blue-600 cursor-pointer"
                : "text-gray-400 bg-gray-300 cursor-not-allowed"
            }
          `}
              onClick={() => viewConfirmPopUp()}
              disabled={singleCase?.status == "Suspected" ? false : true}
            >
              Confirm Case
            </button>
          ) : role === "idu" ? (
            <div className="flex gap-3">
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-400 cursor-pointer"
              >
                Assign MOH
              </button>
            </div>
          ) : role === "phi" ? (
            <div className="flex gap-3">
              <button
                className={`px-[16px] py-[8px] rounded-[6px]
                ${
                  Object.keys(singleCase?.report ?? {}).length > 0
                    ? "text-gray-400 bg-gray-300 cursor-not-allowed"
                    : "text-white bg-blue-600 cursor-pointer"
                }
              `}
                onClick={() => viewReport(singleCase?.id)}
                disabled={Object.keys(singleCase?.report ?? {}).length > 0}
              >
                Add Report
              </button>

              <button
                className="px-[16px] py-[8px] rounded-[6px] text-white bg-blue-600 cursor-pointer"
                onClick={() => viewUnAssignCasePopUp()}
              >
                Un-assign Case
              </button>

              <button
                className={`px-[16px] py-[8px] rounded-[6px]
                ${
                  singleCase?.status == "Suspected"
                    ? "text-white bg-blue-600 cursor-pointer"
                    : "text-gray-400 bg-gray-300 cursor-not-allowed"
                }
              `}
                onClick={() => viewConfirmPopUp()}
                disabled={singleCase?.status == "Suspected" ? false : true}
              >
                Confirm Case
              </button>
            </div>
          ) : role === "moh" ? (
            <div className="flex gap-3">
              <button className="px-[16px] py-[8px] rounded-[6px] text-white bg-blue-600 cursor-pointer"
              onClick={() => viewAssignPHIPopUp()}
              >
                Assign PHI
              </button>

              <button
                className={`px-[16px] py-[8px] rounded-[6px]
            ${
              singleCase?.status == "Suspected"
                ? "text-white bg-blue-600 cursor-pointer"
                : "text-gray-400 bg-gray-300 cursor-not-allowed"
            }
          `}
                onClick={() => viewConfirmPopUp()}
                disabled={singleCase?.status == "Suspected" ? false : true}
              >
                Confirm Case
              </button>
            </div>
          ) : (
            <button className="text-[16px] text-white font-medium bg-[#0866FF] px-[16px] py-[8px] rounded-[6px]">
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
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

const mapDispatchToProps = (dispatch) => ({
  viewConfirmPopUp: () => dispatch(viewConfirmPopUp()),
  viewReport: (value) => dispatch(viewReport(value)),
  viewAssignPHIPopUp: () => dispatch(viewAssignPHIPopUp()),
  viewUnAssignCasePopUp: () => dispatch(viewUnAssignCasePopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
