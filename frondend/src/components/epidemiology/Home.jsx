import React from "react";

const Home = () => {
  return (
    <div className="Home w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]">
      <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
        Notifications of a communicable disease
      </h2>

      <div className="w-full flex flex-wrap flex-row items-center justify-left gap-[32px]">
        <div className="w-[300px] h-[186px] bg-white flex flex-col items-center gap-[12px] drop-shadow-md shadow-[#E2E5E9] rounded-[8px] p-[16px]">
          <h4 className="text-[20px] text-[#65686C] font-medium text-center">
            Total Active Cases
          </h4>
        </div>
        <div className="w-[300px] h-[186px] bg-white flex flex-col items-center gap-[12px] drop-shadow-md shadow-[#E2E5E9] rounded-[8px] p-[16px]">
          <h4 className="text-[20px] text-[#65686C] font-medium text-center">
            Dengue Cases
          </h4>
        </div>
        <div className="w-[300px] h-[186px] bg-white flex flex-col items-center gap-[12px] drop-shadow-md shadow-[#E2E5E9] rounded-[8px] p-[16px]">
          <h4 className="text-[20px] text-[#65686C] font-medium text-center">
            Covid Cases
          </h4>
        </div>
        <div className="w-[300px] h-[186px] bg-white flex flex-col items-center gap-[12px] drop-shadow-md shadow-[#E2E5E9] rounded-[8px] p-[16px]">
          <h4 className="text-[20px] text-[#65686C] font-medium text-center">
            Other Cases
          </h4>
        </div> 
      </div>

      <form className="w-full flex flex-row items-center gap-[26px]">
        <h5 className="text-[16px] font-medium">Filter by :</h5>
        <select name="disease" id="disease" className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]">
          <option value="disease">Disease</option>
        </select>

        <select name="disease" id="disease" className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]">
          <option value="disease">Date</option>
        </select>

        <select name="sex" id="sex" className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]">
          <option value="sex">Sex</option>
        </select>
        <select name="confirmed" id="confirmed" className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]">
          <option value="confirmed">Confirmed</option>
        </select>
      </form>
    </div>
  );
};

export default Home;
