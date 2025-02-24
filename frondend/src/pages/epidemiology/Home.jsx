import React, { useState } from "react";
import CasesCard from "../../components/CasesCard";
import { CiSearch } from "react-icons/ci";
import TableCard from "../../components/TableCard";

const initialData = [
  {
    caseId: "0001",
    name: "John Doe",
    hospital: "General Hospital, Maharashtra",
    age: 35,
    sex: "M",
    disease: "Dengue",
    dateOfOnset: "01/14/2025",
    status: "Suspected",
  },
  {
    caseId: "0002",
    name: "Jane Smith",
    hospital: "City Hospital, Maharashtra",
    age: 28,
    sex: "F",
    disease: "Dengue",
    dateOfOnset: "01/15/2025",
    status: "Confirmed",
  },
  {
    caseId: "0003",
    name: "Robert Johnson",
    hospital: "District Hospital, Maharashtra",
    age: 45,
    sex: "M",
    disease: "Dengue",
    dateOfOnset: "01/13/2025",
    status: "Suspected",
  },
];

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

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  const tableData = [
    {tableHeaders: ["Case ID",
    "Name of the Patient /Institute",
    "Age",
    "Sex",
    "Disease",
    "Date of Onset",
    "Case Status",
    "Actions",],
    tableData: initialData,
    searchQuery: searchQuery,
  }
  ]

  return (
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

      <TableCard tableData={tableData}/>
    </div>
  );
};

export default Home;
