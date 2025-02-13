import React from "react";

const Events = () => {
  return (
    <div id="events" className="w-full min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]">
      <div className="Header">
        <h2 className="text-[32px] font-medium text-[#080809] text-center">
          Public Health Events & Announcements
        </h2>
        <p>
          Stay engaged with community health initiatives and educational
          programs.
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-[16px] items-center justify-between">
        <div className="Event-Card w-[316px] bg-white rounded-[8px] drop-shadow-md shadow-[#E2E5E9] mb-[32px]">
          <img src="" alt="eventImage" className="w-full h-[188px]"/>
          <div className="p-[16px]">
            <p className="Date text-[16px] text-[#65686C] fort-nomal">Sat, Feb 15 at 1PM</p>
            <h1 className="text-[20px] text-[#080809] font-medium">Health Check-Up Camp</h1>
            <h2 className="text-[14px] text-[#080809] font-nomal">Maharagama Hospital</h2>
              <p className="text-[14px] text-[#65686C] font-nomal">Join our free health check-up camp for expert consultations, diagnostics, and wellness tips. Prioritize your health</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
