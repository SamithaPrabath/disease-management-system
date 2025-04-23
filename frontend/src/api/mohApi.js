import axios from "axios";
import { allCasesResponse } from "./allCasesApi";

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
    if (IS_BACKEND == "false") {
      const existingUser = mohResponse.find(
        (moh) => moh.name === user.name || moh.registrationNumber === user.registrationNumber
      );

      if (existingUser) {
        console.log("User already exists:", existingUser);
        return { status: 409, message: "User already exists" };
      } else {
        const newUser = {
          ...user,
          id: (mohResponse.length + 1).toString().padStart(3, "0"),
        };
        mohResponse.push(newUser);
        return { status: 201, message: "User registered successfully", data: newUser };
      }
    } else {
      const response = await axios.post(`${BASE_URL}/api/mohs/add`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log(response.data.data.message);
        console.log(response.data.data.status);
        if (response.data.data.message == "User already exists") {
          return { status: 400, message: "Registration failed (username already exists)", data: response.data };
        } else {
          return { status: 200, message: "User registered successfully", data: response.data };
        }
      } else {
        return { status: 400, message: "Registration failed", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to register MOH",
    };
  }
};

export const getAllMohData = async () => {
  try {
    if (IS_BACKEND == "false") {
      return { status: 200, message: "Fetch data successfully", data: mohResponse };
    } else {
      const response = await axios.get(`${BASE_URL}/api/mohs/getAll`);
      if (response.status === 200) {
        return { status: 200, message: "Fetch data successfully", data: response.data.data };
      } else {
        return { status: 400, message: "Failed to fetch MOH data", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error fetching MOH data:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch MOH data",
    };
  }
};

export const deleteMoh = async (id) => {
  try {
    if (IS_BACKEND == "false") {
      const index = mohResponse.findIndex((moh) => moh.id === id);
      if (index !== -1) {
        mohResponse.splice(index, 1);
        return { status: 200, message: "MOH record deleted successfully" };
      } else {
        return { status: 404, message: "MOH record not found" };
      }
    } else {
      const response = await axios.delete(`${BASE_URL}/api/mohs/delete/${id}`);
      if (response.status === 200) {
        return { status: 200, message: "MOH record deleted successfully" };
      } else {
        return { status: 400, message: "Failed to delete MOH record", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error deleting MOH record:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to delete MOH record",
    };
  }
};

export const updateMoh = async (id, updatedData) => {
  try {
    if (IS_BACKEND == "false") {
      const index = mohResponse.findIndex((moh) => moh.id === id);
      if (index !== -1) {
        mohResponse[index] = { ...mohResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      const response = await axios.put(`${BASE_URL}/api/mohs/update/${id}`, updatedData);
      if (response.status === 200) {
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 400, message: "Failed to update MOH record", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error updating MOH record:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to update MOH record",
    };
  }
};

export const getAllMOHList = async () => {
  try {
    if (IS_BACKEND == "false") {
      const filteredMOH = mohResponse.map(({ id, name }) => ({
        id,
        name,
      }));
      return { status: 200, message: "MOH list retrieved successfully", data: filteredMOH };
    } else {
      const response = await axios.get(`${BASE_URL}/api/mohs/getAll`);
      if (response.status === 200) {
        return { status: 200, message: "Fetch data successfully", data: response.data.data };
      } else {
        return { status: 400, message: "Failed to fetch MOH data", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error fetching MOH list:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch MOH list",
    };
  }
};

export const getMohListByLocation = async () => {
  try {
    if (IS_BACKEND == "false") {
      const response = mohResponse.filter((moh) => moh.area === location);
      return { status: 200, message: "Fetch data successfully", data: response };
    } else {
      const response = await axios.get(`${BASE_URL}/api/mohs/getAll`);
      if (response.status === 200) {
        return { status: 200, message: "Fetch data successfully", data: response.data.data };
      } else {
        return { status: 400, message: "Failed to fetch MOH data", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error fetching MOH list by location:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch MOH list by location",
    };
  }
};

export const mohAssignToCase = async (value) => {
  try {
    // Validation
    if (!value || !value.caseId || !value.assignedMoh) {
      throw new Error("Invalid input: caseId and assignMoh are required");
    }

    if (IS_BACKEND == "false") {
      const caseIndex = allCasesResponse.findIndex(
        (caseItem) => caseItem.caseId === value.caseId
      );

      if (caseIndex === -1) {
        return { status: 404, message: `Case with ID ${value.caseId} not found` };
      }

      allCasesResponse[caseIndex] = {
        ...allCasesResponse[caseIndex],
        assignedMoh: value.assignedMoh,
        mohAssignedDate: value.mohAssignedDate || new Date().toISOString(), // Default to current date
      };

      return {
        status: 200,
        message: "MOH assigned successfully",
        data: allCasesResponse[caseIndex], // Optional: return updated case
      };
    } else {
      const response = await axios.put(
        `${BASE_URL}/api/cases/${value.caseId}/assign-moh`,
        {
          assignedMoh: value.assignedMoh,
          mohAssignedDate: value.mohAssignedDate,
        },
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set for plain object
          },
        }
      );
      if (response.status === 200) {
        return { status: 200, message: "MOH assigned successfully", data: response.data };
      } else {
        return { status: 400, message: "Failed to assign MOH", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error assigning MOH to case:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to assign MOH",
    };
  }
};