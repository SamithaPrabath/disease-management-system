import { 
  FETCH_PASSWORD_RESET_REQUESTS, 
  APPROVE_PASSWORD_RESET_REQUEST, 
  REJECT_PASSWORD_RESET_REQUEST 
} from "./types";

import { 
  getAllPasswordResetRequests, 
  approvePasswordResetRequest, 
  rejectPasswordResetRequest 
} from "../../api/passwordResetRequestsApi";

/**
 * Action creator to fetch all password reset requests
 * @returns {Function} Thunk function
 */
export const fetchPasswordResetRequests = () => async (dispatch) => {
  try {
    // Dispatch loading state
    dispatch({
      type: FETCH_PASSWORD_RESET_REQUESTS,
      payload: {
        loading: true,
        data: [],
        status: null,
        message: null,
        error: null
      }
    });

    // Call API
    const response = await getAllPasswordResetRequests();

    // Dispatch success
    dispatch({
      type: FETCH_PASSWORD_RESET_REQUESTS,
      payload: {
        loading: false,
        data: response.data,
        status: response.status,
        message: response.message,
        error: null
      }
    });
  } catch (error) {
    console.error("Error fetching password reset requests:", error);
    
    // Dispatch error
    dispatch({
      type: FETCH_PASSWORD_RESET_REQUESTS,
      payload: {
        loading: false,
        data: [],
        status: error.response?.status || 500,
        message: error.message || "Failed to fetch password reset requests",
        error: error
      }
    });
  }
};

/**
 * Action creator to approve a password reset request
 * @param {string} requestId - ID of the request to approve
 * @returns {Function} Thunk function
 */
export const approvePasswordResetRequestAction = (requestId) => async (dispatch) => {
  try {
    // Call API
    const response = await approvePasswordResetRequest(requestId);

    // Dispatch result
    dispatch({
      type: APPROVE_PASSWORD_RESET_REQUEST,
      payload: {
        requestId,
        status: response.status,
        message: response.message
      }
    });

    // Return the response for component-level handling (e.g., showing a success message)
    return response;
  } catch (error) {
    console.error("Error approving password reset request:", error);
    
    // Dispatch error
    dispatch({
      type: APPROVE_PASSWORD_RESET_REQUEST,
      payload: {
        requestId,
        status: error.response?.status || 500,
        message: error.message || "Failed to approve password reset request"
      }
    });

    // Return error for component-level handling
    throw error;
  }
};

/**
 * Action creator to reject a password reset request
 * @param {string} requestId - ID of the request to reject
 * @returns {Function} Thunk function
 */
export const rejectPasswordResetRequestAction = (requestId) => async (dispatch) => {
  try {
    // Call API
    const response = await rejectPasswordResetRequest(requestId);

    // Dispatch result
    dispatch({
      type: REJECT_PASSWORD_RESET_REQUEST,
      payload: {
        requestId,
        status: response.status,
        message: response.message
      }
    });

    // Return the response for component-level handling
    return response;
  } catch (error) {
    console.error("Error rejecting password reset request:", error);
    
    // Dispatch error
    dispatch({
      type: REJECT_PASSWORD_RESET_REQUEST,
      payload: {
        requestId,
        status: error.response?.status || 500,
        message: error.message || "Failed to reject password reset request"
      }
    });

    // Return error for component-level handling
    throw error;
  }
}; 