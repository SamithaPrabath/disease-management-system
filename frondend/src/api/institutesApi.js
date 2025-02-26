import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const institutesResponse = [
  {
    id: "001",
    name: "ABC Institute of Technology",
    registrationNumber: "001",
    email: "contact@abc-tech.com",
    phoneNumber: "0761234567",
    address: "123 Main Street, Colombo",
    province: "Western",
    city: "Colombo",
    role: "institute",
  },
  {
    id: "002",
    name: "XYZ Medical College",
    registrationNumber: "002",
    email: "info@xyzmed.com",
    phoneNumber: "0719876543",
    address: "456 Health Road, Kandy",
    province: "Central",
    city: "Kandy",
    role: "institute",
  },
  {
    id: "003",
    name: "Global Business Academy",
    registrationNumber: "003",
    email: "admin@gba.edu",
    phoneNumber: "0776543210",
    address: "789 Finance Avenue, Galle",
    province: "Southern",
    city: "Galle",
    role: "institute",
  },
  {
    id: "004",
    name: "Sunrise International School",
    registrationNumber: "004",
    email: "support@sunrise.edu",
    phoneNumber: "0781122334",
    address: "25 Sunrise Street, Jaffna",
    province: "Northern",
    city: "Jaffna",
    role: "institute",
  },
  {
    id: "005",
    name: "Bright Future Institute",
    registrationNumber: "005",
    email: "hello@brightfuture.com",
    phoneNumber: "0709988776",
    address: "10 Knowledge Lane, Kurunegala",
    province: "North Western",
    city: "Kurunegala",
    role: "institute",
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
      // API call to delete PHI record
      const response = await axios.delete(`${BASE_URL}/deletePhi/${id}`);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error deleting PHI record:", error);
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
      // API call to update PHI record
      const response = await axios.put(`${BASE_URL}/updateInstitutes/${id}`, updatedData);
      return response.data; // Return response from backend
    }
  } catch (error) {
    console.error("Error updating PHI record:", error);
    throw error; // Throw error for handling in UI
  }
};