import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const testUser = { username: "test", password: "123" };
export const testResponse = [
  {
    userId: "001",
    token: "abc1234",
    role: "admin",
    userTypeId: "I001",
  },
];

const errorResponse = {
  status: 401,
  error: "Unauthorized Access",
  message: "Invalid Username or Password",
};

export const handleLogin = async (user) => {
  try {
    if (IS_BACKEND) {
      if (
        user.username === testUser.username &&
        user.password === testUser.password
      ) {
        return { status: 200, data: testResponse?.[0], message: "Ok" };
      } else {
        return errorResponse;
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
    return error;
  }
};
