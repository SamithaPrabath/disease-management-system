import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../api/eventsApi";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAllEvents();
      setAllEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <div
      id="Events"
      className="w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]"
    >
      <div className="Header">
        <h2 className="text-[32px] font-medium text-[#080809] text-center">
          Public Health Events & Announcements
        </h2>
        <p>
          Stay engaged with community health initiatives and educational
          programs.
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-[16px] items-center justify-center">
        {allEvents.map((event) => (
          <div
          className="Event-Card w-[316px] bg-white rounded-[8px] drop-shadow-md shadow-[#E2E5E9] mb-[32px]"
          key={event.id}
        >
          <img
            src={event.image}
            alt="eventImage"
            className="w-full h-[188px] object-cover"
          />
          <div className="p-[16px]">
            <p className="Date text-[16px] text-[#65686C] font-normal flex gap-2">
            <span>{event.startDate}</span>
  <span>{event.startTime}</span>
            </p>
            <h1 className="text-[20px] text-[#080809] font-medium">
              {event.eventName}
            </h1>
            <h2 className="text-[14px] text-[#080809] font-normal">
              {event.location}
            </h2>
            <p className="text-[14px] text-[#65686C] font-normal">
              {event.description}
            </p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
