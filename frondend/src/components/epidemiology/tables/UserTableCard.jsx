import React, {useState, useEffect} from "react";
import { closeViewEdit } from "../../../redux/actions/viewEditAction";
import { connect } from "react-redux";
import { deletePhi } from "../../../api/phiApi";
import { deleteMoh } from "../../../api/mohApi";
import { deleteInstitutes } from "../../../api/institutesApi";
import { deleteDiseases } from "../../../api/diseasesApi";

const UserTableCard = ({ tableData, closeViewEdit }) => {
  if (!tableData || tableData.length === 0) {
    return <p>No data available.</p>;
  }

  const {
    tableHeaders,
    tableData: rows,
    searchQuery = "",
    mode,
  } = tableData[0];

  const filteredUsers = rows.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      query === "" ||
      user.name?.toLowerCase().includes(query) || 
      user.registrationNumber?.includes(query)  
    );
  });


  const [data, setData] = useState(filteredUsers);

  useEffect(() => {
    setData(filteredUsers);
  }, [filteredUsers]); 

  const handleDelete = async (id) => {
    try {
      let response;
      if (mode === "phi") response = await deletePhi(id);
      else if (mode === "moh") response = await deleteMoh(id);
      else if (mode === "institutes") response = await deleteInstitutes(id);
      else if (mode === "diseases") response = await deleteDiseases(id);

      alert(response.message); 

      
      setData((prevData) => prevData.filter((user) => user.id !== id));

    } catch (error) {
      alert("Error deleting record. Please try again.");
      console.error("Delete Error:", error);
    }
  };

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
                {data.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    {user.diseaseCode ? (
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {user.diseaseCode}
                      </td>
                    ) : null}

                    {user.diseaseName ? (
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {user.diseaseName}
                      </td>
                    ) : null}

                    {user.category ? (
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {user.category}
                      </td>
                    ) : null}

                    {user.modeOfTransmission ? (
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {user.modeOfTransmission}
                      </td>
                    ) : null}

                    {user.description ? (
                      <td className="whitespace-wrap w-[200px] py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {user.description}
                      </td>
                    ) : null}

                    {user.registrationNumber ? (
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                        {user.registrationNumber}
                      </td>
                    ) : null}

                    {user.name ? (
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="font-medium text-[#080809]">
                          {user.name}
                        </div>
                      </td>
                    ) : null}

                    {user.email ? (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {user.email}
                      </td>
                    ) : null}

                    {user.phoneNumber ? (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {user.phoneNumber}
                      </td>
                    ) : null}

                    {user.city ? (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {user.city}
                      </td>
                    ) : null}
                    {user.province ? (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                        {user.province}
                      </td>
                    ) : null}
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium flex gap-5">
                      <button
                        className="px-[16px] py-[8px] rounded-[6px] bg-[#E2E5E9] cursor-pointer"
                        onClick={() => closeViewEdit(user.id)}
                      >
                        View
                      </button>
                      <button
                        className="px-[16px] py-[8px] rounded-[6px] bg-[#d11a2a] text-white cursor-pointer"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
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
};

const mapDispatchToProps = (dispatch) => ({
  closeViewEdit: (values) => dispatch(closeViewEdit(values)),
});

export default connect(null, mapDispatchToProps)(UserTableCard);
