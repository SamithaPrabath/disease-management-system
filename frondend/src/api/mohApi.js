import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export const mohResponse = [
  {
    id: "M001",
    name: "XYZ MOH",
    registrationNumber: "MH0001",
    area: "Colombo",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
    userName: "testmoh1",
    password: "123",
    role: "moh",
  },
  {
    id: "M002",
    name: "ABC MOH",
    registrationNumber: "MH0002",
    area: "Kandy",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
    userName: "testmoh2",
    password: "123",
    role: "moh",
  },
];

export const registerMoh = async (user) => {
  try {
    if (IS_BACKEND) {
      
      const existingUser = mohResponse.find((moh) => moh.userName === user.userName || moh.registrationNumber === user.registrationNumber);
      
      if (existingUser) {
       
        console.log("User already exists:", existingUser);
        return existingUser;
      } else {
        
        const newUser = {
          ...user,
          id: (mohResponse.length + 1).toString().padStart(3, "0"), 
          message: "User registered successfully",
        };
        mohResponse.push(newUser);
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

export const getAllMohData = async () => {
  try {
    if(IS_BACKEND){

        return { status: 200, message: "Fetch data successfully", data: mohResponse };
    }else{
      const response = await axios.get(`${BASE_URL}/getAllMohData`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching MOH data:", error);
    throw error;
  }
};

export const deleteMoh = async (id) => {
  try {
    if (IS_BACKEND) {
      const index = mohResponse.findIndex((moh) => moh.id === id);
      if (index !== -1) {
        mohResponse.splice(index, 1); // Remove the item from the array
        return { status: 200, message: "MOH record deleted successfully" };
      } else {
        return { status: 404, message: "MOH record not found" };
      }
    } else {
      // API call to delete MOH record
      const response = await axios.delete(`${BASE_URL}/deleteMOH/${id}`);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error deleting MOH record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const updateMoh = async (id, updatedData) => {
  try {
    if (IS_BACKEND) {
      // Simulating update in mock data
      const index = mohResponse.findIndex((moh) => moh.id === id);
      if (index !== -1) {
        mohResponse[index] = { ...mohResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      // API call to update MOH record
      const response = await axios.put(`${BASE_URL}/updateMOH/${id}`, updatedData);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error updating MOH record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const getAllMOHList = async () => {
  try {
    if(IS_BACKEND){
      const filteredMOH = mohResponse.map(({ id, name }) => ({
        id,
        name,
      }));
      return filteredMOH;
    }else{
      const response = await axios.get(`${BASE_URL}/getMohList`); // Replace with your API endpoint
      return response.data; // Return the data received from the API
    }
  } catch (error) {
    console.error("Error fetching Diseases data:", error);
    throw error; // Throw the error if the request fails
  }
};