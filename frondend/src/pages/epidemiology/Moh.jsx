import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import AddMOH from "../../components/epidemiology/AddMOH";
import RegisterTableCard from "../../components/RegisterTableCard";

const initialData = [
  {
    registationNumber: "0001",
    name: "John Doe",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
  },
  {
    registationNumber: "0002",
    name: "John Doe",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
  },
]

const Moh = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

    const tableData = [
      {tableHeaders: ["Registation Number",
      "Name",
      "Email",
      "Phone Number",
      "Actions",],
      tableData: initialData,
      searchQuery: searchQuery,
    }
    ]

    const handlePopUpOpen = () => {
      setIsOpen(false);
    };
  
    const handleBack = () => { 
      setIsOpen(true);
    };

  return (
    <>
      <div className="Phi w-full min-w-[870px] min-h-[500px] flex flex-col items-center justify-start gap-[32px]">
      
      {
        isOpen ? (
          <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">

        <div className="w-full flex flex-row items-center justify-between">
          {/* Heading */}
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Registered MOH
          </h2>

          <div className="flex flex-row gap-3">
          <button className="w-[100px] text-white text-[16px] font-medium rounded-[8px] bg-[#0866FF] p-[8px] cursor-pointer"
          onClick={handlePopUpOpen}
          >
            Add MOH
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

        <RegisterTableCard tableData={tableData}/>
      </div>

        ) : (<AddMOH handleBack={handleBack}/>)
      }

    </div>
    </>
  );
};

export default Moh;
