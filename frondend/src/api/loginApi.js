import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const testUser = { username: "test", password: "123" };
const testResponse = {
    token: "abc1234",
    name: "John Doe",
    role: "admin", 
    regNo: "001",
    gender: "Male",
    age: "35",
    hospital: "Sri Jayawardenepura General Hospital, Sri Jayawardenepura",
  };

export const handleLogin = async (user) => {
  try {
    if (!IS_BACKEND) {
      if (user.username === testUser.username && user.password === testUser.password) {
        return testResponse;
      } else {
        return {error:"Invalid Username or Password"};
      }
    } else {

      const response = await axios.post(`${BASE_URL}/login`, {
        username: user.username,
        password: user.password,
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return {error:"Invalid Username or Password"};
  }
};
