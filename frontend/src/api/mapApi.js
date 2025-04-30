import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export let markers = [
  { id: 1, position: { lat: 6.9271, lng: 79.8612 }, label: "Colombo Fort" },
  { id: 2, position: { lat: 6.9106, lng: 79.8876 }, label: "Galle Face Green" },
  { id: 3, position: { lat: 6.8949, lng: 79.853 }, label: "Pettah Market" },
];

export const addMarker = async (marker) => {
  try {
    if (IS_BACKEND == "false") {
      const existingMarker = markers.find(
        (m) => m.label === marker.label || 
        (m.position.lat === marker.position.lat && 
         m.position.lng === marker.position.lng)
      );

      if (existingMarker) {
        return { status: 409, message: "Marker already exists" };
      } else {
        const newMarker = {
          ...marker,
          id: markers.length + 1,
        };
        markers.push(newMarker);
        return { 
          status: 201, 
          message: "Marker added successfully", 
          data: newMarker 
        };
      }
    } else {
      const response = await axios.post(`${BASE_URL}/api/markers/add`, marker, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200) {
        if (response.data.data.message === "Marker already exists") {
          return { 
            status: 400, 
            message: "Marker addition failed (marker already exists)", 
            data: response.data 
          };
        }
        return { 
          status: 200, 
          message: "Marker added successfully", 
          data: response.data 
        };
      } else {
        return { 
          status: 400, 
          message: "Marker addition failed", 
          data: response.data 
        };
      }
    }
  } catch (error) {
    console.error("Error adding marker:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to add marker",
    };
  }
};

export const getAllMarkers = async () => {
  try {
    if (IS_BACKEND == "false") {
      return { 
        status: 200, 
        message: "Markers fetched successfully", 
        data: markers 
      };
    } else {
      const response = await axios.get(`${BASE_URL}/api/markers/getAll`);
      if (response.status === 200) {
        return { 
          status: 200, 
          message: "Markers fetched successfully", 
          data: response.data.data 
        };
      } else {
        return { 
          status: 400, 
          message: "Failed to fetch markers", 
          data: response.data 
        };
      }
    }
  } catch (error) {
    console.error("Error fetching markers:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch markers",
    };
  }
};