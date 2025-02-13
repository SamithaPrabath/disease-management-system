import React from "react";

const Map = () => {
  return (
    <div
      id="map"
      className="w-full h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]"
    >
      <div className="Header">
        <h2 className="text-[32px] font-medium text-[#080809] text-center">
          Real-Time Disease Tracker
        </h2>
        <p>
          View confirmed infectious disease cases near you. Click on a location
          for more details.
        </p>
      </div>
      <form className="flex flex-row gap-[26px]">
        <select name="disease" id="disease" className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]">
          <option value="disease">Disease</option>
        </select>

        <select name="disease" id="disease" className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]">
          <option value="disease">Date</option>
        </select>

        <select name="disease" id="disease" className="w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]">
          <option value="disease">Affected area</option>
        </select>
      </form>
    </div>
  );
};

export default Map;
