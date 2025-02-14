import { LOGIN_BUTTON_CLICKED } from "./types";

import { handleLogin } from "../../api/loginApi";

export const fetchLogin = (values) => async (dispatch) => {
    try {
      const response = await handleLogin(values);
      dispatch({
        type: LOGIN_BUTTON_CLICKED,
        payload: response,
      });
    } catch (error) {
      console.error("Error fetching Login data:", error);
    }
  };