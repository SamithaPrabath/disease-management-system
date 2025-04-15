import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const AllCasesTable = ({ AllLogins, tableData }) => {
  const navigate = useNavigate();

  if (!tableData || tableData.length === 0) {
    return <p>No data available.</p>;
  }

  const { tableHeaders, tableData: rows, searchQuery } = tableData[0];

  const [patients, setPatients] = useState(rows);
  const [filters, setFilters] = useState({
    disease: "",
    date: "",
    sex: "",
    status: "",
  });
  const [role, setRole] = useState("")

  useEffect(() => {
    setPatients(rows); // Ensure state updates when rows change
    setRole(AllLogins.data.role)
  }, [rows]);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredPatients = patients.filter((patient) => {
    return (
      (!searchQuery ||
        patient.name?.toLowerCase().includes(searchQuery) ||
        patient.hospital?.toLowerCase().includes(searchQuery) ||
        patient.disease?.toLowerCase().includes(searchQuery)) &&
      (!filters.disease || patient.disease === filters.disease) &&
      (!filters.date || patient.dateOfOnset === filters.date) &&
      (!filters.sex || patient.sex === filters.sex) &&
      (!filters.status || patient.status === filters.status)
    );
  });

  return (
    <>
      <form className="w-full flex flex-row items-center gap-6">
        <h5 className="text-[16px] font-medium">Filter by:</h5>

        {/* Disease Filter */}
        <select
          name="disease"
          className="custom-select w-[186px] h-[40px] px-4 py-2 bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Disease</option>
          <option value="Dengue">Dengue</option>
        </select>

        {/* Date Filter */}
        <select
          name="date"
          className="custom-select w-[186px] h-[40px] px-4 py-2 bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Date</option>
          {Array.from(new Set(patients.map((p) => p.dateOfOnset))).map(
            (date) => (
              <option key={date} value={date}>
                {date}
              </option>
            )
          )}
        </select>

        {/* Sex Filter */}
        <select
          name="sex"
          className="custom-select w-[186px] h-[40px] px-4 py-2 bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Sex</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        {/* Status Filter */}
        <select
          name="status"
          className="custom-select w-[186px] h-[40px] px-4 py-2 bg-[#E2E5E9] rounded-[8px]"
          onChange={handleFilterChange}
        >
          <option value="">Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Suspected">Suspected</option>
        </select>
      </form>

      <div className="w-full mx-auto mt-4">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-[#E2E5E9]">
                {/* Table Headers */}
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

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr
                        key={patient.caseId}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/single-case-view/${patient.caseId}`)}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                          {patient.caseId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="font-medium text-[#080809]">
                            {patient.patientName}
                          </div>
                          <div className="text-[#65686C]">{patient.hospital}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                          {patient.age}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                          {patient.sex}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                          {patient.disease}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                          {patient.dateOfOnset}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              patient.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {patient.caseStatus}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {
                            role == "doctor" ? <button
                            type="button"
                            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
                          >
                            Confirm Case
                          </button> : role == "idu" ? <button
                            type="button"
                            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
                          >
                            Assign MOH
                          </button> : <p>Mark as Received</p>
                          }
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={tableHeaders.length} className="text-center py-4 text-gray-500">
                        No matching records found.
                      </td>
                    </tr>
                  )}
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

export default connect(mapStateToProps, null)(AllCasesTable);