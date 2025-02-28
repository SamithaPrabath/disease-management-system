import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const institutesResponse = [
  {
    istituteId: "I001",
    instituteName: "ABC Institute of Technology",
    registrationNumber: "001",
    email: "contact@abc-tech.com",
    phoneNumber: "0761234567",
    address: "123 Main Street, Colombo",
    province: "Western",
    city: "Colombo",
  },
  {
    istituteId: "I002",
    instituteName: "XYZ Medical College",
    registrationNumber: "002",
    email: "info@xyzmed.com",
    phoneNumber: "0719876543",
    address: "456 Health Road, Kandy",
    province: "Central",
    city: "Kandy",
  },
  {
    istituteId: "I003",
    instituteName: "Global Business Academy",
    registrationNumber: "003",
    email: "admin@gba.edu",
    phoneNumber: "0776543210",
    address: "789 Finance Avenue, Galle",
    province: "Southern",
    city: "Galle",
  },
  {
    istituteId: "I004",
    instituteName: "Sunrise International School",
    registrationNumber: "004",
    email: "support@sunrise.edu",
    phoneNumber: "0781122334",
    address: "25 Sunrise Street, Jaffna",
    province: "Northern",
    city: "Jaffna",
  },
];

export const registerInstitutes = async (user) => {
  try {
    if (IS_BACKEND) {
      
      const existingUser = institutesResponse.find((institutes) => institutes.name === user.name || institutes.registrationNumber === user.registrationNumber);
      
      if (existingUser) {
       
        console.log("Already exists:", existingUser);
        return existingUser;
      } else {
        
        const newUser = {
          ...user,
          id: (institutesResponse.length + 1).toString().padStart(3, "0"), 
          message: "Institute registered successfully",
        };
        institutesResponse.push(newUser);
        console.log("New institute registered:", newUser);
        return newUser;
      }
    } else {
      
      const response = await axios.post(`${BASE_URL}/registerInstitute`, user);
      return response.data;
    }
  } catch (error) {
    console.error("Error registering institute:", error);
    return error;
  }
};

export const getAllInstitutesData = async () => {
  try {
    if(IS_BACKEND){
      return institutesResponse;
    }else{
      const response = await axios.get(`${BASE_URL}/getAllInstitutesData`); // Replace with your API endpoint
      return response.data; // Return the data received from the API
    }
  } catch (error) {
    console.error("Error fetching Institutes data:", error);
    throw error; // Throw the error if the request fails
  }
};

export const deleteInstitutes = async (id) => {
  try {
    if (IS_BACKEND) {
      // Simulating deletion from mock data
      const index = institutesResponse.findIndex((institutes) => institutes.id === id);
      if (index !== -1) {
        institutesResponse.splice(index, 1); // Remove the item from the array
        return { status: 200, message: "Record deleted successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      // API call to delete Institute record
      const response = await axios.delete(`${BASE_URL}/deleteInstitute/${id}`);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error deleting Institute record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const updateInstitutes = async (id, updatedData) => {
  try {
    if (IS_BACKEND) {
      // Simulating update in mock data
      const index = institutesResponse.findIndex((institutes) => institutes.id === id);
      if (index !== -1) {
        institutesResponse[index] = { ...institutesResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      // API call to update Institute record
      const response = await axios.put(`${BASE_URL}/updateInstitutes/${id}`, updatedData);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error updating Institute record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const getInstitutesList = async () => {
  try {
    if(IS_BACKEND){
      const filteredInstitutes = institutesResponse.map(({ instituteId, instituteName }) => ({
        instituteId,
        instituteName,
      }));
      return filteredInstitutes;
    }else{
      const response = await axios.get(`${BASE_URL}/getInstitutesList`); // Replace with your API endpoint
      return response.data; // Return the data received from the API
    }
  } catch (error) {
    console.error("Error fetching Diseases data:", error);
    throw error; // Throw the error if the request fails
  }
};