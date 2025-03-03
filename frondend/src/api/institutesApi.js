import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const institutesResponse = [
  {
    id: "I001",
    name: "ABC Institute of Technology",
    registrationNumber: "001",
    email: "contact@abc-tech.com",
    phoneNumber: "0761234567",
    address: "123 Main Street, Colombo",
    province: "Western",
    city: "Colombo",
  },
  {
    id: "I002",
    name: "XYZ Medical College",
    registrationNumber: "002",
    email: "info@xyzmed.com",
    phoneNumber: "0719876543",
    address: "456 Health Road, Kandy",
    province: "Central",
    city: "Kandy",
  },
  {
    id: "I003",
    name: "Global Business Academy",
    registrationNumber: "003",
    email: "admin@gba.edu",
    phoneNumber: "0776543210",
    address: "789 Finance Avenue, Galle",
    province: "Southern",
    city: "Galle",
  },
  {
    id: "I004",
    name: "Sunrise International School",
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
    if (!user || !user.name || !user.registrationNumber) {
      throw new Error("Invalid input: name and registrationNumber are required");
    }

    if (IS_BACKEND) {
      const existingUser = institutesResponse.find(
        (institute) =>
          institute.name.toLowerCase() === user.name.toLowerCase() ||
          institute.registrationNumber === user.registrationNumber
      );

      if (existingUser) {
        console.log("Already exists:", existingUser);
        return { status: 409, message: "Institute already exists" };
      } else {
        const newUser = {
          ...user,
          id: (institutesResponse.length + 1).toString().padStart(3, "0"),
        };
        institutesResponse.push(newUser);
        return { status: 201, message: "Institute registered successfully" };
      }
    } else {
      const response = await axios.post(`${BASE_URL}/registerInstitute`, user);
      return response.data;
    }
  } catch (error) {
    console.error("Error registering institute:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to register institute",
    };
  }
};

export const getAllInstitutesData = async () => {
  try {
    if (IS_BACKEND) {
      return { status: 200, message: "Institutes retrieved successfully", data: institutesResponse };
    } else {
      const response = await axios.get(`${BASE_URL}/getAllInstitutesData`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching Institutes data:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch institutes data",
    };
  }
};

export const deleteInstitutes = async (id) => {
  try {
    if (IS_BACKEND) {
      const index = institutesResponse.findIndex((institute) => institute.id === id);
      if (index !== -1) {
        institutesResponse.splice(index, 1);
        return { status: 200, message: "Record deleted successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      const response = await axios.delete(`${BASE_URL}/deleteInstitute/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting Institute record:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to delete institute record",
    };
  }
};

export const updateInstitutes = async (id, updatedData) => {
  try {
    if (IS_BACKEND) {
      const index = institutesResponse.findIndex((institute) => institute.id === id);
      if (index !== -1) {
        institutesResponse[index] = { ...institutesResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      const response = await axios.put(`${BASE_URL}/updateInstitutes/${id}`, updatedData);
      return response.data;
    }
  } catch (error) {
    console.error("Error updating Institute record:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to update institute record",
    };
  }
};

export const getInstitutesList = async () => {
  try {
    if (IS_BACKEND) {
      const filteredInstitutes = institutesResponse.map(({ id, name }) => ({
        id,
        name,
      }));
      return { status: 200, message: "Institutes list retrieved successfully", data: filteredInstitutes };
    } else {
      const response = await axios.get(`${BASE_URL}/getInstitutesList`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching Institutes data:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch institutes list",
    };
  }
};