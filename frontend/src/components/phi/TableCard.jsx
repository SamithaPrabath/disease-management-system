import React, { useState, useEffect } from "react";
import { viewReport } from "../../redux/actions/viewReportAction";
import { viewSingleCase } from "../../redux/actions/viewSingleCaseAction";
import { viewConfirmPopUp } from "../../redux/actions/confirmCasePopUpAction";
import { connect } from "react-redux";
import { geDiseasesList } from "../../api/diseasesApi";
import { viewAssignPHIPopUp } from "../../redux/actions/assginPHIPopupAction";
import { viewAssignMOHPopUp } from "../../redux/actions/assignMOHPopupAction";
import { mark_AsReceived, sendFinalReport } from "../../api/allCasesApi";
import { reportSend } from "../../redux/actions/reportSendAction";
import { message } from "antd";
import { markAsReceivedButtonClicked } from "../../redux/actions/markAsReceivedAction";

const Table = ({
  AllLogins,
  tableData,
  viewReport,
  viewSingleCase,
  viewConfirmPopUp,
  viewAssignPHIPopUp,
  viewAssignMOHPopUp,
  reportSend,
  markAsReceivedButtonClicked,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  if (!tableData || tableData.length === 0) {
    return <p>No data available.</p>;
  }

  const {
    tableHeaders,
    tableData: rows,
    searchQuery: searchQuery,
  } = tableData[0];

  const [patients, setPatients] = useState(rows);
  const [filters, setFilters] = useState({
    diseaseName: "",
    date: "",
    sex: "",
    caseStatus: "",
  });

  const [userTypeId, setUserTypeId] = useState("");

  const handleFilterChange = (e) => {
    if (e.target.name === "date") {
      const date = new Date(e.target.value);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();

      // Add ordinal suffix to day
      const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

      const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
      if (date == "Invalid Date") {
        setFilters({ ...filters, [e.target.name]: "" });
      } else {
        setFilters({ ...filters, [e.target.name]: formattedDate });
      }
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }
  };

  const filteredPatients = patients?.filter((patient) => {
    return (
      (searchQuery === "" ||
        patient.patientName.toLowerCase().includes(searchQuery) ||
        patient.instituteName.toLowerCase().includes(searchQuery) ||
        patient.diseaseName.toLowerCase().includes(searchQuery)) &&
      (filters.diseaseName === "" ||
        patient.diseaseName === filters.diseaseName) &&
      (filters.date === "" || patient.dateOfOnset === filters.date) &&
      (filters.sex === "" || patient.sex === filters.sex) &&
      (filters.caseStatus === "" || patient.caseStatus === filters.caseStatus)
    );
  });

  const [role, setRole] = useState("");

  useEffect(() => {
    setPatients(rows); // Ensure state updates when rows change
    setRole(AllLogins.data.role);
    setUserTypeId(AllLogins.data.userTypeId);
  }, [rows]);

  const [diseasesList, setDiseasesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diseases = await geDiseasesList();
        setDiseasesList(diseases.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [AllLogins]);

  const handleSendFinalReport = async (caseId) => {
    try {
      const sendReport = true;
      const value = { sendReport, caseId };
      const response = await sendFinalReport(value);

      if (response.status === 200 && response.message) {
        reportSend(true);
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

  const handleMarkAsReceived = async (caseId) => {
    try {
      const markAsReceived = true;
      const value = { markAsReceived, caseId };
      const response = await mark_AsReceived(value);

      if (response.status === 200 && response.message) {
        markAsReceivedButtonClicked(true);
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
      <form className="w-full flex flex-row items-center gap-[26px]">
        <h5 className="text-[16px] font-medium">Filter by :</h5>
        <select
          name="diseaseName"
          id="diseaseName"
          className="custom-select w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Select Disease</option>
          {diseasesList.map((disease, index) => (
            <option key={index} value={disease.diseaseName}>
              {disease.diseaseName}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          id="date"
          className="custom-select w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        />

        <select
          name="sex"
          id="sex"
          className="custom-select w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="caseStatus"
          id="confirmed"
          className="custom-select w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Suspected">Suspected</option>
        </select>
      </form>

      <div className="w-full mx-auto">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 ">
              <table className="min-w-full divide-y divide-[#E2E5E9]">
                <thead className="bg-[#EDF7FF]">
                  <tr>
                    {tableHeaders.map((heading) => (
                      <th
                        key={heading}
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-normal text-[#65686C] sm:pl-6"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredPatients?.map((patient) => (
                    <tr
                      key={patient.caseId}
                      className="hover:bg-gray-50 text-center"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {patient.caseId}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="font-medium text-[#080809]">
                          {patient.patientName}
                        </div>
                        <div className="text-[#65686C]">
                          {patient.instituteName}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {patient.age}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {patient.sex}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {patient.diseaseName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {patient.dateOfOnset}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            patient.caseStatus === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {patient.caseStatus}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm flex justify-center items-center gap-3">
                        <button
                          className="px-[16px] py-[8px] rounded-[6px] bg-[#E2E5E9] cursor-pointer"
                          onClick={() => viewSingleCase(patient.caseId)}
                        >
                          View
                        </button>
                        {role == "doctor" ? (
                          <button
                            type="button"
                            className={`px-[16px] py-[8px] rounded-[6px] bg-[#E2E5E9] 
                          ${
                            patient.caseStatus == "Suspected"
                              ? "cursor-pointer bg-blue-600 text-white"
                              : "text-gray-400 cursor-not-allowed"
                          }
                        `}
                            onClick={() => viewConfirmPopUp(patient?.caseId)}
                            disabled={
                              patient.caseStatus == "Suspected" ? false : true
                            }
                          >
                            Confirm Case
                          </button>
                        ) : role == "idu" ? (
                          <button
                            type="button"
                            className={`px-[16px] py-[8px] rounded-[6px] ${
                              patient.assignedMoh
                                ? "bg-[#E2E5E9] text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white cursor-pointer"
                            }`}
                            onClick={() => viewAssignMOHPopUp(patient.caseId)}
                            disabled={patient.assignedMoh ? true : false}
                          >
                            Assign MOH
                          </button>
                        ) : role == "phi" ? (
                          <>
                            {patient.assignedPhi != userTypeId ? (
                              <button
                                className="px-[16px] py-[8px] rounded-[6px] bg-blue-600 text-gray-400 cursor-not-allowed"
                                disabled={true}
                              >
                                Add Report
                              </button>
                            ) : (
                              <button
                                className={`px-[16px] py-[8px] rounded-[6px] ${
                                  Object.keys(patient.report).length > 0
                                    ? "bg-[#E2E5E9] text-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 text-white cursor-pointer"
                                }`}
                                onClick={() => viewReport(patient.caseId)}
                                disabled={
                                  Object.keys(patient.report).length > 0
                                }
                              >
                                Add Report
                              </button>
                            )}
                          </>
                        ) : role == "moh" ? (
                          <>
                            {!patient?.assignedPhi ? (
                              <button
                                className={`text-white px-[16px] py-[8px] rounded-[6px] bg-blue-600 hover:bg-blue-700 transition cursor-pointer`}
                                onClick={() =>
                                  viewAssignPHIPopUp(patient.caseId)
                                }
                              >
                                Assign PHI
                              </button>
                            ) : patient?.caseStatus === "Suspected" ? (
                              <button
                                type="button"
                                className={`px-[16px] py-[8px] rounded-[6px]
                            ${
                              patient.caseStatus == "Suspected"
                                ? "bg-blue-600 text-white cursor-pointer"
                                : "bg-[#E2E5E9] text-gray-400 cursor-not-allowed"
                            }
                          `}
                                onClick={() =>
                                  viewConfirmPopUp(patient?.caseId)
                                }
                                disabled={
                                  patient.caseStatus == "Suspected"
                                    ? false
                                    : true
                                }
                              >
                                Confirm Case
                              </button>
                            ) : (
                              Object.keys(patient?.report).length > 0 && (
                                <button
                                  className={`px-[16px] py-[8px] rounded-[6px] ${
                                    patient.sendReport
                                      ? "bg-[#E2E5E9] text-gray-400 cursor-not-allowed"
                                      : "bg-blue-600 text-white cursor-pointer"
                                  }
                                `}
                                  onClick={() =>
                                    handleSendFinalReport(patient?.caseId)
                                  }
                                >
                                  Send Final Report
                                </button>
                              )
                            )}
                          </>
                        ) : (
                          <button
                            className={`px-[16px] py-[8px] rounded-[6px] ${
                              patient.markAsReceived
                                ? "bg-[#E2E5E9] text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white cursor-pointer"
                            }
                                `}
                            onClick={() =>
                              handleMarkAsReceived(patient?.caseId)
                            }
                            disabled={patient.markAsReceived}
                          >
                            Mark as Received
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
  viewReport: (values) => dispatch(viewReport(values)),
  viewSingleCase: (values) => dispatch(viewSingleCase(values)),
  viewConfirmPopUp: (value) => dispatch(viewConfirmPopUp(value)),
  viewAssignPHIPopUp: (value) => dispatch(viewAssignPHIPopUp(value)),
  viewAssignMOHPopUp: (value) => dispatch(viewAssignMOHPopUp(value)),
  reportSend: (values) => dispatch(reportSend(values)),
  markAsReceivedButtonClicked: (value) =>
    dispatch(markAsReceivedButtonClicked(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
