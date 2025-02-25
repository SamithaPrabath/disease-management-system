import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const phiResponse = [
  {
    id: "001",
    name: "John Doe",
    registrationNumber: "0001",
    moh: "sample",
    area: "sample",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
    userName: "testphi1",
    password: "123",
    role: "phi",
  },
  {
    id: "002",
    name: "John Doe",
    registrationNumber: "0002",
    moh: "sample",
    area: "sample",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
    userName: "testphi1",
    password: "123",
    role: "phi",
  },
];

export const registerPhi = async (user) => {
  try {
    if (IS_BACKEND) {
      
      const existingUser = phiResponse.find((phi) => phi.userName === user.userName || phi.registrationNumber === user.registrationNumber);
      
      if (existingUser) {
       
        console.log("User already exists:", existingUser);
        return existingUser;
      } else {
        
        const newUser = {
          ...user,
          id: (phiResponse.length + 1).toString().padStart(3, "0"), 
          message: "User registered successfully",
        };
        phiResponse.push(newUser);
        console.log("New user registered:", newUser);
        return newUser;
      }
    } else {
      
      const response = await axios.post(`${BASE_URL}/register`, user);
      return response.data;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return error;
  }
};

export const getAllPhiData = async () => {
  try {
    if(IS_BACKEND){
      return phiResponse;
    }else{
      const response = await axios.get(`${BASE_URL}/getAllPhiData`); // Replace with your API endpoint
      return response.data; // Return the data received from the API
    }
  } catch (error) {
    console.error("Error fetching PHI data:", error);
    throw error; // Throw the error if the request fails
  }
};

export const deletePhi = async (id) => {
  try {
    if (IS_BACKEND) {
      // Simulating deletion from mock data
      const index = phiResponse.findIndex((phi) => phi.id === id);
      if (index !== -1) {
        phiResponse.splice(index, 1); // Remove the item from the array
        return { status: 200, message: "PHI record deleted successfully" };
      } else {
        return { status: 404, message: "PHI record not found" };
      }
    } else {
      // API call to delete PHI record
      const response = await axios.delete(`${BASE_URL}/deletePhi/${id}`);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error deleting PHI record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const updatePHI = async (id, updatedData) => {
  try {
    if (IS_BACKEND) {
      // Simulating update in mock data
      const index = phiResponse.findIndex((phi) => phi.id === id);
      if (index !== -1) {
        phiResponse[index] = { ...phiResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      // API call to update PHI record
      const response = await axios.put(`${BASE_URL}/updatePhi/${id}`, updatedData);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error updating PHI record:", error);
    throw error; // Throw error for handling in UI
  }
};
