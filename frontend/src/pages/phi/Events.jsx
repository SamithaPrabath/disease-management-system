import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { getAllEvents, deleteEvent } from "../../api/eventsApi";
import AddEvent from "../../components/moh/AddEvent";
import { message } from "antd";
import { connect } from "react-redux";
import { viewEditEvent } from "../../redux/actions/viewEditEventAction";
import EditEvent from "../../components/moh/EditEvent";

const Events = ({AllLogins, viewEditEvent}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [allEvents, setAllEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAllEvents(AllLogins.data.userId);
      setAllEvents(response.data);
    };
    fetchEvents();
  }, [isAddEventOpen, messageApi, AllLogins]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter events based on search query
  const filteredEvents = allEvents.filter(
    (event) =>
      event.eventName.toLowerCase().includes(searchQuery) ||
      event.location.toLowerCase().includes(searchQuery) ||
      event.description.toLowerCase().includes(searchQuery)
  );

  const handleDeleteEvent = async (id) => {
    const result = await deleteEvent(id);
    if (result.message) {
      const updatedEvents = allEvents.filter((event) => event.id !== id);
      setAllEvents(updatedEvents);
      messageApi.success(result.message)
    }
  };

  const handleAddEvent = () => {
    setIsAddEventOpen(!isAddEventOpen);
  };

  return (
    <>
      {contextHolder}
      <EditEvent/>
      <div className="Events w-full min-w-[870px] min-h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]">
        {isAddEventOpen ? (
          <AddEvent handleAddEvent={handleAddEvent} />
        ) : (
          <>
            <div className="w-full flex flex-row items-center justify-between">
              <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
                Events
              </h2>

              <div className="flex flex-row gap-3">
                <button
                  className="w-[100px] text-white text-[16px] font-medium rounded-[8px] bg-[#0866FF] p-[8px] cursor-pointer"
                  onClick={handleAddEvent}
                >
                  Add Event
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

            <div className="w-full flex flex-wrap gap-[16px] items-center justify-center">
              {filteredEvents.map((event) => (
                <div
                  className="Event-Card w-[316px] bg-white rounded-[8px] drop-shadow-md shadow-[#E2E5E9] mb-[32px]"
                  key={event.id}
                >
                  <img
                    src={event.image}
                    alt="eventImage"
                    className="w-full h-[188px] object-contain"
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

                    <div className="flex gap-3">
                      <button
                        className="px-[16px] py-[8px] rounded-[6px] bg-[#E2E5E9] cursor-pointer"
                        onClick={() => viewEditEvent(event.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-[16px] py-[8px] rounded-[6px] bg-[#d11a2a] text-white cursor-pointer"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  viewEditEvent: (value) => dispatch(viewEditEvent(value)),
});

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);