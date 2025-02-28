import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TableCard from "../../components/phi/TableCard";
import { getAllCases } from "../../api/allCasesApi";
import { CiSearch } from "react-icons/ci";
import NewCase from "../../components/doctor/NewCase";
import SingleCaseView from "../../components/SingleCaseView";
import { connect } from "react-redux";
import ConfirmCasePopup from "../../components/ConfirmCasePopup";

const Dashboard = (props) => {
  const [isViewSingleCase, setIsViewSingleCase] = useState([])

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

  useEffect(() => {
    setIsViewSingleCase(props.ViewsSingleCase);
  }, [props.ViewsSingleCase])

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

  const [viewNewCase, setViewNewCase] = useState(true);

  const handleViewNewCase = () => {
    setViewNewCase(!viewNewCase);
  };

  return (
    <>
      <Navbar Sections={[]} onNavClick={null} activeId={null} />
      <div className="Home w-full bg-[#F2F4F7] pt-[112px] pb-[32px] px-[32px] flex flex-col gap-[72px]">
      {
        isViewSingleCase?.[0] ? (<SingleCaseView patientId = {isViewSingleCase?.[1]}/>) : (
          
        <div className="w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]">
          {viewNewCase ? (
            <>
              {/* Render the active component */}

              <div className="w-full flex flex-row items-center justify-between">
                {/* Heading */}
                <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
                  Notifications of a communicable disease
                </h2>

                <div className="flex flex-row gap-3">
                  <button
                    className="w-[150px] text-white text-[16px] font-medium rounded-[8px] bg-[#0866FF] p-[8px] cursor-pointer"
                    onClick={() => handleViewNewCase()}
                  >
                    New Notification
                  </button>
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
              <TableCard tableData={tableData} />
            </>
          ) : (
            <NewCase handleViewNewCase={handleViewNewCase} />
          )}
      </div>
        )
      }
      </div>
      <ConfirmCasePopup/>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ViewsSingleCase: state.viewsSingleCase,
  };
};

export default connect(mapStateToProps, null)(Dashboard);