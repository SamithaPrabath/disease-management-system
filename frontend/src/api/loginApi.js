import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const testUser = { username: "test", password: "123" };
export const testResponse = [
  {
    userId: "001",
    username: "test user",
    token: "abc1234",
    role: "idu",
    userTypeId: "I001",
    isInitial: 0,
  },
];

const errorResponse = {
  status: 401,
  error: "Unauthorized Access",
  message: "Invalid Username or Password",
};

export const handleLogin = async (user) => {
  try {
    if (IS_BACKEND === "false") {
      if (
        user.username === testUser.username &&
        user.password === testUser.password
      ) {
        return { status: 200, data: testResponse?.[0], message: "Ok" };
      } else {
        return errorResponse;
      }
    } else {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username: user.username,
        password: user.password,
      });
      if (response.status === 200) {
        console.log(response.data);
        console.log(response.data.data);
        let user_data = {
          userId: response.data.data.user.id,
          username: response.data.data.user.name,
          email: response.data.data.user.username,
          token: response.data.data.access_token,
          role: response.data.data.user.role,
          userTypeId: response.data.data.user.role,
        };
        // Login successful
        return {
          status: 200,
          data: user_data,
          message: "Ok",
        };
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return error;
  }
};