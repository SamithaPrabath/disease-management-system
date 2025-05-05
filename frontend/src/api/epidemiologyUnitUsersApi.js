import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

// Mock data for use when backend is not available
export const epidemiologyUnitUsersResponse = [
  { id: 1, name: 'John Doe', email: 'john.doe@epi.gov', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@epi.gov', role: 'Analyst', status: 'Active' },
  { id: 3, name: 'Robert Johnson', email: 'robert.j@epi.gov', role: 'Epidemiologist', status: 'Inactive' },
];

export const getAllEpidemiologyUnitUsers = async () => {
  try {
    if (IS_BACKEND == "true") {
      return { status: 200, message: "Fetch data successfully", data: epidemiologyUnitUsersResponse };
    } else {
      const response = await axios.get(`${BASE_URL}/api/epidemology/getAll`);
      if (response.status === 200) {
        return { status: 200, message: "Fetch data successfully", data: response.data.data };
      } else {
        return { status: 400, message: "Failed to fetch epidemiology unit users", data: [] };
      }
    }
  } catch (error) {
    console.error("Error fetching epidemiology unit users:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch epidemiology unit users",
    };
  }
};

export const addEpidemiologyUnitUser = async (user) => {
  try {
    if (IS_BACKEND == "false") {
      const existingUser = epidemiologyUnitUsersResponse.find(
        (existingUser) => existingUser.email === user.email
      );

      if (existingUser) {
        return { status: 409, message: "User with this email already exists" };
      } else {
        const newUser = {
          ...user,
          id: Math.max(...epidemiologyUnitUsersResponse.map(user => user.id)) + 1
        };
        epidemiologyUnitUsersResponse.push(newUser);
        return { status: 200, message: "User added successfully", data: newUser };
      }
    } else {
      const response = await axios.post(`${BASE_URL}/api/epidemology/add`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return { status: 200, message: "User added successfully", data: response.data };
      } else {
        return { status: 400, message: "Failed to add user", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error adding epidemiology unit user:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to add epidemiology unit user",
    };
  }
};

export const updateEpidemiologyUnitUser = async (id, updatedData) => {
  try {
    if (IS_BACKEND == "false") {
      const index = epidemiologyUnitUsersResponse.findIndex((user) => user.id === id);
      if (index !== -1) {
        epidemiologyUnitUsersResponse[index] = { ...epidemiologyUnitUsersResponse[index], ...updatedData };
        return { status: 200, message: "User updated successfully" };
      } else {
        return { status: 404, message: "User not found" };
      }
    } else {
      const response = await axios.put(`${BASE_URL}/api/epi-unit-users/update/${id}`, updatedData);
      if (response.status === 200) {
        return { status: 200, message: "User updated successfully" };
      } else {
        return { status: 400, message: "Failed to update user", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error updating epidemiology unit user:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to update epidemiology unit user",
    };
  }
};

export const deleteEpidemiologyUnitUser = async (id) => {
  try {
    if (IS_BACKEND == "false") {
      const index = epidemiologyUnitUsersResponse.findIndex((user) => user.id === id);
      if (index !== -1) {
        epidemiologyUnitUsersResponse.splice(index, 1);
        return { status: 200, message: "User deleted successfully" };
      } else {
        return { status: 404, message: "User not found" };
      }
    } else {
      const response = await axios.delete(`${BASE_URL}/api/epi-unit-users/delete/${id}`);
      if (response.status === 200) {
        return { status: 200, message: "User deleted successfully" };
      } else {
        return { status: 400, message: "Failed to delete user", data: response.data };
      }
    }
  } catch (error) {
    console.error("Error deleting epidemiology unit user:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to delete epidemiology unit user",
    };
  }
}; 