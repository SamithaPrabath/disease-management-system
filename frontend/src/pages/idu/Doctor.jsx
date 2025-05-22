import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import UserTableCard from "../../components/UserTableCard";
import { getAllDoctorData } from "../../api/doctorApi";
import AddDoctor from "../../components/idu/AddDoctor";
import { connect } from "react-redux";
import EditDoctor from "../../components/idu/EditDoctor";

const Doctor = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [viewEdit, setViewEdit] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [doctorData, setDoctorData] = useState([]);

  // Fetch data when the component mounts or when viewEdit changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDoctorData();
        setDoctorData(response.data);
      } catch (error) {
        console.error("Failed to fetch Doctor data:", error);
      }
    };

    fetchData();
  }, [refreshTrigger, viewEdit]);

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  const tableData = [
    {
      tableHeaders: [
        "ID",
        "Name",
        "Email",
        "Phone Number",
        "Actions",
      ],
      tableData: doctorData,
      searchQuery: searchQuery,
      mode: "doctor",
    },
  ];

  const handlePopUpOpen = () => {
    setIsOpen(false);
  };

  const handleBack = (shouldRefresh = false) => {
    setIsOpen(true);
    if (shouldRefresh) {
      // Trigger a refresh when a new doctor is added
      setRefreshTrigger(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (
      props.AllViewEditReducer != null &&
      props.AllViewEditReducer.length > 0
    ) {
      setViewEdit(props.AllViewEditReducer[0]);
      // Trigger a refresh when returning from edit view
      if (props.AllViewEditReducer[0] === true) {
        setRefreshTrigger(prev => prev + 1);
      }
    }
  }, [props.AllViewEditReducer]);

  return (
    <>
      {viewEdit ? (
        <>
          {isOpen ? (
            <div className="Doctor w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center px-[32px] py-[48px] gap-[32px]">
              <div className="w-full flex flex-row items-center justify-between">
                {/* Heading */}
                <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
                  Registered Doctors
                </h2>

                <div className="flex flex-row gap-3">
                  <button
                    className="w-[100px] text-white text-[16px] font-medium rounded-[8px] bg-[#0866FF] p-[8px] cursor-pointer"
                    onClick={() => handlePopUpOpen()}
                  >
                    Add Doctor
                  </button>
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
              </div>

              <UserTableCard tableData={tableData} />
            </div>
          ) : (
            <AddDoctor handleBack={handleBack} />
          )}
        </>
      ) : (
        <EditDoctor />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllViewEditReducer: state.allViewEditReducer,
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps, null)(Doctor);
