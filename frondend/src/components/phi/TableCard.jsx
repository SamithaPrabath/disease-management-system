import React, { useState, useEffect } from "react";
import { viewReport } from "../../redux/actions/viewReportAction";
import { viewSingleCase } from "../../redux/actions/viewSingleCaseAction";
import { viewConfirmPopUp } from "../../redux/actions/confirmCasePopUpAction";
import { connect } from "react-redux";
import { geDiseasesList } from "../../api/diseasesApi";

const Table = ({
  AllLogins,
  tableData,
  viewReport,
  viewSingleCase,
  viewConfirmPopUp,
}) => {
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

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredPatients = patients.filter((patient) => {
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
  }, [rows]);

  const [diseasesList, setDiseasesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diseases = await geDiseasesList();
        setDiseasesList(diseases);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form className="w-full flex flex-row items-center gap-[26px]">
        <h5 className="text-[16px] font-medium">Filter by :</h5>
        <select
          name="diseaseName"
          id="diseaseName"
          className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Select Disease</option>
          {diseasesList.map((disease, index) => (
            <option key={index} value={disease.diseaseName}>
              {disease.diseaseName}
            </option>
          ))}
        </select>

        <select
          name="date"
          id="disease"
          className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="Date">Date</option>
          {Array.from(new Set(patients.map((p) => p.dateOfOnset))).map(
            (date) => (
              <option key={date} value={date}>
                {date}
              </option>
            )
          )}
        </select>

        <select
          name="sex"
          id="sex"
          className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="caseStatus"
          id="confirmed"
          className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
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
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-[#65686C] sm:pl-6"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm flex gap-3">
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
                              ? "cursor-pointer"
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
                            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
                            onClick={() => viewSingleCase(patient.caseId)}
                          >
                            Assign Officers
                          </button>
                        ) : role == "phi" ? (
                          <button
                            className={`px-[16px] py-[8px] rounded-[6px] bg-[#E2E5E9] 
                          ${
                            Object.keys(patient.report).length > 0
                              ? "text-gray-400 cursor-not-allowed"
                              : "cursor-pointer"
                          }
                        `}
                            onClick={() => viewReport(patient.id)}
                            disabled={Object.keys(patient.report).length > 0}
                          >
                            Add Report
                          </button>
                        ) : (
                          <p>Mark as Received</p>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
