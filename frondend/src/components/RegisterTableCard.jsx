import React from "react";

const RegisterTableCard = ({ tableData }) => {

  if (!tableData || tableData.length === 0) {
    return <p>No data available.</p>;
  }

  const { tableHeaders, tableData: rows, searchQuery: searchQuery } = tableData[0];


    const filteredPatients = rows.filter((patient) => {
        const query = searchQuery.toLowerCase();
        return (
          query === "" ||
          patient.name.toLowerCase().includes(query) ||
          patient.registationNumber.includes(query)
        );
      });

  return (
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
                    <tr key={patient.caseId} className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {patient.registationNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="font-medium text-[#080809]">
                          {patient.name}
                        </div>
                        <div className="text-[#65686C]">{patient.hospital}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {patient.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {patient.phoneNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium flex gap-5">
                        <buttton className="px-[16px] py-[8px] rounded-[6px] bg-[#E2E5E9]">View</buttton>
                        <buttton className="px-[16px] py-[8px] rounded-[6px] bg-[#d11a2a] text-white">Delete</buttton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default RegisterTableCard;
