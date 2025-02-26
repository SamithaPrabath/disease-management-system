import Navbar from "../../components/Navbar";
import React, { useState, useEffect } from "react";
import AllCasesTable from "../../components/AllCasesTable";
import { getAllCases } from "../../api/allCasesApi";
import { CiSearch } from "react-icons/ci";

const Dashboard = () => {
    const [allCases, setAllCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCases();
        setAllCases(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const tableData = [
    {
      tableHeaders: [
        "Case ID",
        "Name of the Patient /Institute",
        "Age",
        "Sex",
        "Disease",
        "Date of Onset",
        "Case Status",
        "Actions",
      ],
      tableData: allCases,
      searchQuery: searchQuery,
    },
  ];


  return (
    <>
      <Navbar
        Sections={[]}
        onNavClick={null}
        activeId={null}
      />
      {/* Render the active component */}
      <div className="Home w-full bg-[#F2F4F7] pt-[112px] pb-[32px] px-[32px] flex flex-col gap-[72px]">
      <div className="w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]">
        {/* Render the active component */}

        <div className="w-full flex flex-row items-center justify-between">
          {/* Heading */}
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Notifications of a communicable disease
          </h2>

          <div className="flex flex-row gap-3">
            <div className="relative">
              <input
                className="bg-[#E2E5E9] w-[250px] h-[50px] rounded-[8px] px-[16px] py-[14px] text-black placeholder-gray-600 focus:outline-none"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <CiSearch className="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            </div>
          </div>
        </div>
        <AllCasesTable tableData={tableData} />
      </div>
      </div>
    </>
  );
}

export default Dashboard;