import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export const doctorResponse = [
  {
    id: "D001",
    name: "John Doe",
    registrationNumber: "DC0001",
    moh: "Colombo",
    area: "sample",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
    userName: "testDoc1",
    password: "123",
    role: "doctor",
  },
  {
    id: "D002",
    name: "Tim Kim",
    registrationNumber: "DC002",
    moh: "Kandy",
    area: "sample",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
    userName: "testDoc1",
    password: "123",
    role: "doctor",
  },
];

export const registerDoctor = async (user) => {
  try {
    if (IS_BACKEND) {
      // Check if the user already exists
      const existingUser = doctorResponse.find(
        (doctor) =>
          doctor.userName === user.userName ||
          doctor.registrationNumber === user.registrationNumber
      );

      if (existingUser) {
        console.log("User already exists:", existingUser);
        return existingUser;
      } else {
        // Add new user to the mock data
        const newUser = {
          ...user,
          id: "D" + (doctorResponse.length + 1).toString().padStart(3, "0"), // Generate a new doctorId
          message: "Doctor registered successfully",
        };
        doctorResponse.push(newUser);

        console.log(newUser)
        
        return newUser;
      }
    } else {
      // API call to register a new doctor
      const response = await axios.post(`${BASE_URL}/register`, user);
      return response.data;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return error;
  }
};

export const getAllDoctorData = async () => {
  try {
    if (IS_BACKEND == "false") {
      return { status: 200, message: "data fetch successfully", data: doctorResponse };
    } else {
      const response = await axios.get(`${BASE_URL}/getAllDoctorData`); // Replace with your API endpoint
      return response.data; // Return the data received from the API
    }
  } catch (error) {
    console.error("Error fetching Doctor data:", error);
    throw error; // Throw the error if the request fails
  }
};

export const deleteDoctor = async (doctorId) => {
  try {
    if (IS_BACKEND) {
      // Simulating deletion from mock data
      const index = doctorResponse.findIndex((doctor) => doctor.id === doctorId);
      if (index !== -1) {
        doctorResponse.splice(index, 1); // Remove the item from the array
        return { status: 200, message: "Doctor record deleted successfully" };
      } else {
        return { status: 404, message: "Doctor record not found" };
      }
    } else {
      // API call to delete Doctor record
      const response = await axios.delete(`${BASE_URL}/deleteDoctor/${doctorId}`);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error deleting Doctor record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const updateDoctor = async (doctorId, updatedData) => {
  try {
    if (IS_BACKEND) {
      // Simulating update in mock data
      const index = doctorResponse.findIndex((doctor) => doctor.id === doctorId);
      if (index !== -1) {
        doctorResponse[index] = { ...doctorResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      // API call to update Doctor record
      const response = await axios.put(`${BASE_URL}/updateDoctor/${doctorId}`, updatedData);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error updating Doctor record:", error);
    throw error; // Throw error for handling in UI
  }
};