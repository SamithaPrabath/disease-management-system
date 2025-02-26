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
    image: "", 
    startTime: "01.00 PM", 
  },
  {
    id: "002", 
    eventName: "Health Camp", 
    startDate: "Sat, Oct 15", 
    location: "Maharagama Hospital",
    description: "Join our free health check-up camp...", 
    image: "", 
    startTime: "01.00 PM", 
  }
];

// Fetch all events
export const getAllEvents = async () => {
  try {
    if (IS_BACKEND) {
      return eventsResponse; // Return mock data if backend is not available
    } else {
      const response = await axios.get(`${BASE_URL}/events`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// Create a new event
export const createEvent = async (event) => {
  try {
    if (IS_BACKEND) {
      const newEvent = {
        ...event,
        id: (eventsResponse.length + 1).toString().padStart(3, "0"), // Generate a new ID
      };
      eventsResponse.push(newEvent);
      return newEvent;
    } else {
      const response = await axios.post(`${BASE_URL}/events`, event);
      return response.data;
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return error;
  }
};

// Update an event
export const updateEvent = async (id, updatedEvent) => {
  try {
    if (IS_BACKEND) {
      const index = eventsResponse.findIndex((event) => event.id === id);
      if (index !== -1) {
        eventsResponse[index] = { ...eventsResponse[index], ...updatedEvent };
        return eventsResponse[index];
      }
      return null;
    } else {
      const response = await axios.put(`${BASE_URL}/events/${id}`, updatedEvent);
      return response.data;
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return error;
  }
};

// Delete an event
export const deleteEvent = async (id) => {
  try {
    if (IS_BACKEND) {
      eventsResponse = eventsResponse.filter((event) => event.id !== id);
      return { message: "Event deleted successfully" };
    } else {
      const response = await axios.delete(`${BASE_URL}/events/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return error;
  }
};