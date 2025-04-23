import React, { useState, useEffect } from "react";
import { closeViewEdit } from "../redux/actions/viewEditAction";
import { connect } from "react-redux";
import { deletePhi } from "../api/phiApi";
import { deleteMoh } from "../api/mohApi";
import { deleteInstitutes } from "../api/institutesApi";
import { deleteDiseases } from "../api/diseasesApi";
import { deleteDoctor } from "../api/doctorApi";
import { message } from "antd";

const UserTableCard = ({ tableData, closeViewEdit }) => {
  const [messageApi, contextHolder] = message.useMessage();

  if (!tableData || tableData.length === 0) {
    return <p>No data available.</p>;
  }

  const {
    tableHeaders,
    tableData: rows,
    searchQuery = "",
    mode,
  } = tableData[0];

  const filteredUsers = rows?.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      query === "" ||
      user.name?.toLowerCase().includes(query)
    );
  });

  const [data, setData] = useState(filteredUsers);

  useEffect(() => {
    setData(filteredUsers);
  }, [rows, searchQuery, tableHeaders, tableData]);

  const handleDelete = async (id) => {
    console.log(id)
    try {
      let response;
      if (mode === "phi") response = await deletePhi(id);
      else if (mode === "moh") response = await deleteMoh(id);
      else if (mode === "institutes") response = await deleteInstitutes(id);
      else if (mode === "diseases") response = await deleteDiseases(id);
      else if (mode === "doctor") response = await deleteDoctor(id);

      if (response.status === 200) {
        messageApi.success(response.message);
        setData((prevData) => prevData.filter((user) => user.id !== id));
      } else {
        if (mode === "moh") {
          messageApi.error("Can't delete MOH because it is assigned to a case and PHIs");
        } else if (mode === "phi") {
          messageApi.error("Can't delete PHI because it is assigned to a case");
        } else if (mode === "institutes") {
          messageApi.error("Can't delete Institute because it is assigned to a case");
        } else if (mode === "diseases") {
          messageApi.error("Can't delete Disease because it is assigned to a case");
        } else if (mode === "doctor") {
          messageApi.error("Can't delete Doctor because it is assigned to a case");
        } else {
          messageApi.error(response.message);
        }
      }
    } catch (error) {
      messageApi.error("Error deleting record. Please try again.");
      console.error("Delete Error:", error);
    }
  };

  return (
    <>
      {contextHolder}
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
                  {data?.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      {user ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#080809] sm:pl-6">
                          {user.id}
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

                      {user.phone ? (
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#080809]">
                          {user.phone}
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeViewEdit: (values) => dispatch(closeViewEdit(values)),
});

export default connect(null, mapDispatchToProps)(UserTableCard);
