import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export const testResponse = [
  {
    userId: "001",
    username: "test user",
    token: "abc1234",
    role: "admin",
    userTypeId: "A001",
    isInitial: 0,
  },
];

const resetErrorResponse = {
  status: 400,
  error: "Password Reset Failed",
  message: "Invalid user ID or initial status",
};

export const handlePasswordReset = async ({ userId, isInitial, newPassword }) => {
    const navigate = useNavigate();

  try {
    if (IS_BACKEND) {
      if (
        userId === testResponse[0].userId &&
        isInitial === testResponse[0].isInitial
      ) {
        // Simulate successful password reset
        return {
          status: 200,
          data: { userId, message: "Password reset successful" },
          message: "Ok",
        };
        navigate("/dashboard")
      } else {
        return resetErrorResponse;
      }
    } else {
      const response = await axios.post(`${BASE_URL}/reset-password`, {
        userId,
        isInitial,
        newPassword,
      });
      return response.data;
      navigate("/dashboard")
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    return {
      status: error.response?.status || 500,
      error: "Password Reset Error",
      message: error.message || "Failed to reset password",
    };
  }
};