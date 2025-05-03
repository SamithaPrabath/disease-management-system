import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import TableCard from "../../components/phi/TableCard";
import SingleCaseView from "../../components/SingleCaseView";
import { connect } from "react-redux";
import Report from "../../components/phi/Report";
import { getAllCases } from "../../api/allCasesApi";
import UnAssignCasePopup from "../../components/UnAssignCasePopup";

const Home = ({ ViewReport, ViewsSingleCase, AllLogins, ConfirmPopUp }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewReport, setIsViewReport] = useState(true);
  const [allCasesData, setAllCasesData] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [showNewCase, setShowNewCase] = useState(false);
  const [isViewSingleCase, setIsViewSingleCase] = useState(false);

  useEffect(() => {
    setIsViewReport(ViewReport?.[0]);

    // Fetch all cases data
    const fetchData = async () => {
      try {
        const response = await getAllCases(AllLogins.data.userId);
        setAllCasesData(response.data);
      } catch (error) {
        console.error("Failed to fetch cases data:", error);
      }
    };

    fetchData();
  }, [AllLogins, ConfirmPopUp?.[0], ViewReport?.[0], showNewCase]);

  useEffect(() => {
    setIsViewSingleCase(ViewsSingleCase);
  }, [ViewsSingleCase]);

  useEffect(() => {
    setIsViewSingleCase(ViewsSingleCase?.[0]);
    setPatientId(ViewsSingleCase?.[1]);
  }, [ViewsSingleCase]);

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

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
      tableData: allCasesData,
      searchQuery: searchQuery,
      handlePopUpOpen: null,
    },
  ];

  return (
    <>
      {isViewSingleCase && !isViewReport ? (
        <SingleCaseView patientId={patientId} />
      ) : (
        <>
          {isViewReport ? (
            <Report />
          ) : (
            <div className="Home w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]">
              <div className="w-full flex flex-row items-center justify-between">
                {/* Heading */}
                <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
                  Notifiable Disease Notifications
                </h2>

                {/* Search Input with Icon */}
                <div className="relative">
                  <input
                    className="bg-[#E2E5E9] w-[250px] h-[50px] rounded-[8px] px-[16px] py-[14px] text-black placeholder-gray-600 focus:outline-none"
                    type="text"
                    placeholder="Search By Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <CiSearch className="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                </div>
              </div>

              <TableCard tableData={tableData} />
            </div>
          )}
        </>
      )}
      <UnAssignCasePopup />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ViewReport: state.viewReportReducer,
    ViewsSingleCase: state.viewsSingleCase,
    AllLogins: state.allLogins,
    ConfirmPopUp: state.confirmPopUp,
  };
};

export default connect(mapStateToProps, null)(Home);
