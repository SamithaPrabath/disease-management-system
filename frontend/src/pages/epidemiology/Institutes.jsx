import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import AddInstitutes from "../../components/epidemiology/AddInstitutes";
import UserTableCard from "../../components/UserTableCard";
import { connect } from "react-redux";
import { getAllInstitutesData } from "../../api/institutesApi";
import EditInstitutes from "../../components/epidemiology/EditInstitutes";

const Institutes = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [viewEdit, setViewEdit] = useState(true);

  const [institutesData, setInstitutesData] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllInstitutesData();
        setInstitutesData(response.data);
      } catch (error) {
        console.error("Failed to fetch Institutes data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

    const tableData = [
      {tableHeaders: ["Registation Number",
      "Name",
      "Email",
      "Phone Number",
      "City",
      "Province",
      "Actions",],
      tableData: institutesData,
      searchQuery: searchQuery,
      mode: "institutes",
    }
    ]

    const handlePopUpOpen = () => {
      setIsOpen(false);
    };
  
    const handleBack = () => { 
      setIsOpen(true);
    }


    useEffect(() => {
      if (
        props.AllViewEditReducer != null &&
        props.AllViewEditReducer.length > 0
      ) {
        setViewEdit(props.AllViewEditReducer[0]);
      }
    }, [props.AllViewEditReducer]);

  return (
    <>
      {
        viewEdit ? (
          <div className="Phi w-full min-w-[870px] min-h-[500px] flex flex-col items-center justify-start gap-[32px]">
      
      {
        isOpen ? (
          <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">

        <div className="w-full flex flex-row items-center justify-between">
          {/* Heading */}
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Registered Institutes
          </h2>

          <div className="flex flex-row gap-3">
          <button className="w-[150px] text-white text-[16px] font-medium rounded-[8px] bg-[#0866FF] p-[8px] cursor-pointer"
          onClick={handlePopUpOpen}
          >
            Add Institutes
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

        <UserTableCard tableData={tableData}/>
      </div>

        ) : (<AddInstitutes handleBack={handleBack}/>)
      }

    </div>
        ): (
          <EditInstitutes/>
        )
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllViewEditReducer: state.allViewEditReducer,
  };
};

export default connect(mapStateToProps, null)(Institutes);
