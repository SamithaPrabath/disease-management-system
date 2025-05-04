import axios from "axios";
import { allCasesResponse } from "./allCasesApi";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export const phiResponse = [
  {
    id: "P001",
    name: "John Doe",
    registrationNumber: "PH0001",
    moh: "MOH Kandy",
    area: "Kandy",
    email: "john.doe@email.com",
    phoneNumber: "0764524589",
    userName: "testphi1",
    password: "123",
    role: "phi",
  },
  {
    id: "P002",
    name: "Jane Doe", // Corrected duplicate name for clarity
    registrationNumber: "PH0002",
    moh: "MOH Colombo",
    area: "Colombo",
    email: "jane.doe@email.com", // Corrected duplicate email
    phoneNumber: "0764524590", // Corrected duplicate phone number
    userName: "testphi2", // Corrected duplicate username
    password: "123",
    role: "phi",
  },
];

export const registerPhi = async (user) => {
  try {

    if (IS_BACKEND == "false") {
      const existingUser = phiResponse.find(
        (phi) => phi.name === user.name || phi.registrationNumber === user.registrationNumber
      );

      if (existingUser) {
        console.log("User already exists:", existingUser);
        return { status: 409, message: "User already exists" };
      } else {
        const newUser = {
          ...user,
          id: (phiResponse.length + 1).toString().padStart(3, "0"),
        };
        phiResponse.push(newUser);
        console.log("New user registered:", newUser);
        return { status: 200, message: "User registered successfully", data: newUser };
      }
    } else {
      const response = await axios.post(`${BASE_URL}/api/phis/add`, user);
      console.log(response.data);
      if (response.status == 200) {
        return { status: 200, message: "User registered successfully", data: response.data };
      } else {
        return { status: 400, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to register PHI",
    };
  }
};

export const getAllPhiData = async () => {
  try {
    if (IS_BACKEND == "false") {
      return { status: 200, message: "Fetch data successfully", data: phiResponse };
    } else {
      const response = await axios.get(`${BASE_URL}/api/phis/getAll`);
      if (response.status == 200) {
        return { status: 200, message: "Fetch data successfully", data: response.data.data };
      } else {
        return { status: 400, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Error fetching PHI data:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch PHI data",
    };
  }
};

export const deletePhi = async (id) => {
  try {
    if (IS_BACKEND == "false") {
      const index = phiResponse.findIndex((phi) => phi.id === id);
      if (index !== -1) {
        phiResponse.splice(index, 1);
        return { status: 200, message: "PHI record deleted successfully" };
      } else {
        return { status: 404, message: "PHI record not found" };
      }
    } else {
      const response = await axios.delete(`${BASE_URL}/api/phis/delete/${id}`);
      if (response.status == 200) {
        return { status: 200, message: "PHI record deleted successfully", data: response.data };
      } else {
        return { status: 400, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Error deleting PHI record:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to delete PHI record",
    };
  }
};

export const updatePhi = async (id, updatedData) => {
  try {
    if (IS_BACKEND == "false") {
      const index = phiResponse.findIndex((phi) => phi.id === id);
      if (index !== -1) {
        phiResponse[index] = { ...phiResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      const response = await axios.put(`${BASE_URL}/api/phis/update/${id}`, updatedData);
      if (response.status == 200) {
        return { status: 200, message: "Record updated successfully", data: response.data };
      } else {
        return { status: 400, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Error updating PHI record:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to update PHI record",
    };
  }
};

export const getPhiListByLocation = async (location) => {
  try {
    if (IS_BACKEND == "false") {
      const response = phiResponse.filter((phi) => phi.area === location);
      return { status: 200, message: "Fetch data successfully", data: response };
    } else {
      const response = await axios.get(`${BASE_URL}/api/phis/getUser/${location}`);
      if (response.status == 200) {
        return { status: 200, message: "Fetch data successfully", data: response.data.data };
      } else {
        return { status: 400, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Error fetching PHI list by location:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch PHI list by location",
    };
  }
};

export const phiAssignToCase = async (value) => {
  try {

    if (IS_BACKEND == "false") {
      const caseIndex = allCasesResponse.findIndex(
        (caseItem) => caseItem.caseId === value.caseId
      );

      if (caseIndex === -1) {
        return { status: 404, message: `Case with ID ${value.caseId} not found` };
      }

      allCasesResponse[caseIndex] = {
        ...allCasesResponse[caseIndex],
        assignedPhi: value.assignedPhi,
        phiAssignedDate: value.phiAssignedDate || new Date().toISOString(), // Default to current date if not provided
      };

      return { status: 200, message: "PHI assigned successfully" };
    } else {
      const response = await axios.put(
        `${BASE_URL}/api/cases/${value.caseId}/assign-phi`,
        { assignedPhi: value.assignedPhi, phiAssignedDate: value.phiAssignedDate }
      );
      if (response.status == 200) {
        return { status: 200, message: "PHI assigned successfully", data: response.data.data };
      } else {
        return { status: 400, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Error assigning PHI to case:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to assign PHI",
    };
  }
};