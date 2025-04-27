import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

// Mock data for events
let eventsResponse = [
  {
    id: "001",
    eventName: "Health Check-Up Camp",
    startDate: "Sat, Oct 15",
    location: "Maharagama Hospital",
    description: "Join our free health check-up camp...",
    image: "./src/assets/hero.png",
    startTime: "01.00 PM",
  },
  {
    id: "002",
    eventName: "Health Camp",
    startDate: "Sat, Oct 15",
    location: "Maharagama Hospital",
    description: "Join our free health check-up camp...",
    image: "./src/assets/logo.png",
    startTime: "05.00 PM",
  },
];

// Fetch all events
export const getAllEvents = async (userId) => {
  try {
    if (IS_BACKEND == "false") {
      return {
        status: 200,
        message: "Events fetched successfully",
        data: eventsResponse,
      };
    } else {
      const response = await axios.get(`${BASE_URL}/api/events/get-events/phi/${userId}`);
      if (response.status === 200) {
        return {
          status: 200,
          message: "Events fetched successfully",
          data: response.data.data,
        };
      }
      return {
        status: response.status,
        message: response.data.message,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch events",
      data: [],
    };
  }
};

// Create a new event
export const createEvent = async (eventData, userId) => {
  try {
    // Handle FormData or plain object
    let event;
    if (eventData instanceof FormData) {
      event = {
        eventName: eventData.get("eventName"),
        startDate: eventData.get("startDate"),
        startTime: eventData.get("startTime"),
        location: eventData.get("location"),
        description: eventData.get("description"),
        image: eventData.get("image"), // File object
      };
    } else {
      event = eventData; // Plain object case
    }

    // Validation
    if (!event.eventName || !event.startDate || !event.location) {
      throw new Error("Invalid input: eventName, startDate, and location are required");
    }

    if (IS_BACKEND == "false") {
      const newEvent = {
        ...event,
        id: (eventsResponse.length + 1).toString().padStart(3, "0"), // Generate a new ID
      };
      eventsResponse.push(newEvent);
      return {
        status: 201,
        message: "Event created successfully",
        data: newEvent,
      };
    } else {
      // API call with FormData
      const response = await axios.post(`${BASE_URL}/api/events/add-event/${userId}`, eventData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      if (response.status === 200) {
        return {
          status: 200,
          message: "Event created successfully",
          data: response.data,
        };
      }
      return {
        status: response.status,
        message: response.data.message,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to create event",
    };
  }
};

// Update an event
export const updateEvent = async (id, updatedEvent) => {
  try {
    if (!id || !updatedEvent) {
      throw new Error("Invalid input: id and updatedEvent are required");
    }

    if (IS_BACKEND == "false") {
      const index = eventsResponse.findIndex((event) => event.id === id);
      if (index !== -1) {
        eventsResponse[index] = { ...eventsResponse[index], ...updatedEvent };
        return {
          status: 200,
          message: "Event updated successfully",
          data: eventsResponse[index],
        };
      }
      return {
        status: 404,
        message: "Event not found",
      };
    } else {
      const response = await axios.put(`${BASE_URL}/api/events/update-event/${id}`, updatedEvent);
      if (response.status === 200) {
        return {
          status: 200,
          message: "Event updated successfully",
          data: response.data.data,
        };
      }
      return {
        status: response.status,
        message: response.data.message,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to update event",
    };
  }
};

// Delete an event
export const deleteEvent = async (id) => {
  try {
    if (!id) {
      throw new Error("Invalid input: id is required");
    }

    if (IS_BACKEND == "false") {
      const initialLength = eventsResponse.length;
      eventsResponse = eventsResponse.filter((event) => event.id !== id);
      if (eventsResponse.length < initialLength) {
        return {
          status: 200,
          message: "Event deleted successfully",
        };
      }
      return {
        status: 404,
        message: "Event not found",
      };
    } else {
      const response = await axios.delete(`${BASE_URL}/api/events/delete-event/${id}`);
      if (response.status === 200) {
        return {
          status: 200,
          message: "Event deleted successfully",
        };
      }
      return {
        status: response.status,
        message: response.data.message,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to delete event",
    };
  }
};