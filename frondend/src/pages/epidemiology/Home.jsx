import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import TableCard from "../../components/phi/TableCard";
import SingleCaseView from "../../components/SingleCaseView";
import { connect } from "react-redux";
import { getAllCases } from "../../api/allCasesApi";
import CasesCard from "../../components/CasesCard"

const cardData = [
  {
    header: "Total Active Cases",
    chartData: [
      { name: "dengue", value: 400, active: true },
      { name: "covid", value: 300, active: true },
      { name: "other", value: 300, active: true },
    ],
    chartColors: ["#FF5630", "#36B37E", "#FFAB00"],
  },
  {
    header: "Dengue Cases",
    chartData: [
      { name: "dengue", value: 400, active: true },
      { name: "covid", value: 300, active: false },
      { name: "other", value: 300, active: false },
    ],
    chartColors: ["#FF5630", "#36B37E", "#FFAB00"],
  },
  {
    header: "Covid Cases",
    chartData: [
      { name: "dengue", value: 400, active: false },
      { name: "covid", value: 300, active: true },
      { name: "other", value: 300, active: false },
    ],
    chartColors: ["#FF5630", "#36B37E", "#FFAB00"],
  },
  {
    header: "Other Cases",
    chartData: [
      { name: "dengue", value: 400, active: false },
      { name: "covid", value: 300, active: false },
      { name: "other", value: 300, active: true },
    ],
    chartColors: ["#FF5630", "#36B37E", "#FFAB00"],
  },
];

const Home = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCasesData, setAllCasesData] = useState([]);
  const [patientId, setPatientId] = useState("");

  const [isViewSingleCase, setIsViewSingleCase] = useState(false);

  useEffect(() => {
    // Fetch all cases data
    const fetchData = async () => {
      try {
        const response = await getAllCases();
        setAllCasesData(response.data);
      } catch (error) {
        console.error("Failed to fetch cases data:", error);
      }
    };

    fetchData();
  }, [props.ViewReport]);

  useEffect(() => {
    setIsViewSingleCase(props.ViewsSingleCase?.[0]);
    setPatientId(props.ViewsSingleCase?.[1]);
  }, [props.ViewsSingleCase]);

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
    },
  ];

  return (
    <>
      {isViewSingleCase ? (
        <SingleCaseView patientId={patientId} />
      ) : (
        <>
          <div className="Home w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]">
            <div className="w-full flex flex-row items-center justify-between">
              {/* Heading */}
              <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
                Notifications of a communicable disease
              </h2>

              {/* Search Input with Icon */}
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

            <div className="w-full flex flex-wrap flex-row items-center justify-left gap-[32px]">
              {cardData.map((card, index) => (
                <CasesCard
                  key={index}
                  header={card.header}
                  data={card.chartData}
                  colors={card.chartColors}
                />
              ))}
            </div>

            <TableCard tableData={tableData} />
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ViewReport: state.viewReportReducer,
    ViewsSingleCase: state.viewsSingleCase,
  };
};

export default connect(mapStateToProps, null)(Home);
