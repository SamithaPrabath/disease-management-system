import { RESET_PASSWORD_BUTTON_CLICKED } from "./types";
import { handlePasswordReset } from "../../api/passwordResetApi";

export const fetchResetPassword = (values) => async (dispatch) => {

  try {
    const response = await handlePasswordReset(values);
    dispatch({
      type: RESET_PASSWORD_BUTTON_CLICKED,
      payload: {
        status: response.status,
        data: response.data,
        message: response.message || "Password reset successful",
      },
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    dispatch({
      type: RESET_PASSWORD_BUTTON_CLICKED,
      payload: {
        status: error.response?.status || 500,
        error: error.response?.data?.error || "Password Reset Error",
        message: error.response?.data?.message || "Failed to reset password",
      },
    });
  }
};