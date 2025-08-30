import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

// Mock data for demonstration
// In a real implementation, this would come from your backend
export const passwordResetRequestsResponse = [
  { 
    id: 1, 
    userId: "USR001", 
    username: "john.doe", 
    requestDate: "2023-05-15T08:30:00", 
    status: "Pending", 
    userType: "Doctor"
  },
  { 
    id: 2, 
    userId: "USR015", 
    username: "sarah.smith", 
    requestDate: "2023-05-14T14:45:00", 
    status: "Approved", 
    userType: "PHI"
  },
  { 
    id: 3, 
    userId: "USR022", 
    username: "robert.johnson", 
    requestDate: "2023-05-14T09:15:00", 
    status: "Rejected", 
    userType: "MOH"
  },
  { 
    id: 4, 
    userId: "USR045", 
    username: "emily.brown", 
    requestDate: "2023-05-13T16:20:00", 
    status: "Pending", 
    userType: "Epidemiologist"
  },
];

/**
 * Fetch all password reset requests
 * @returns {Promise<Object>} Response with status, message, and data
 */
export const getAllPasswordResetRequests = async () => {
  try {
    if (IS_BACKEND == "false") {
      return { 
        status: 200, 
        message: "Password reset requests fetched successfully", 
        data: passwordResetRequestsResponse 
      };
    } else {
      const response = await axios.get(`${BASE_URL}/api/reset-password/all`);
      if (response.status === 200) {
        return { 
          status: 200, 
          message: "Password reset requests fetched successfully", 
          data: response.data.data
        };
      } else {
        return { 
          status: response.status, 
          message: response.data.message || "Failed to fetch password reset requests",
          data: []
        };
      }
    }
  } catch (error) {
    console.error("Error fetching password reset requests:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to fetch password reset requests",
      data: []
    };
  }
};

/**
 * Approve a password reset request
 * @param {string} requestId - The ID of the request to approve
 * @returns {Promise<Object>} Response with status and message
 */
export const approvePasswordResetRequest = async (requestId) => {
  try {
    if (IS_BACKEND == "false") {
      // Simulate successful approval
      return { 
        status: 200, 
        message: "Password reset request approved successfully"
      };
    } else {
      const response = await axios.put(`${BASE_URL}/api/reset-password/approve/${requestId}`);
      if (response.status === 200) {
        return { 
          status: 200, 
          message: "Password reset request approved successfully"
        };
      } else {
        return { 
          status: response.status, 
          message: "Failed to approve password reset request"
        };
      }
    }
  } catch (error) {
    console.error("Error approving password reset request:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to approve password reset request"
    };
  }
};

/**
 * Reject a password reset request
 * @param {string} requestId - The ID of the request to reject
 * @returns {Promise<Object>} Response with status and message
 */
export const rejectPasswordResetRequest = async (requestId) => {
  try {
    if (IS_BACKEND == "false") {
      // Simulate successful rejection
      return { 
        status: 200, 
        message: "Password reset request rejected successfully"
      };
    } else {
      const response = await axios.put(`${BASE_URL}/api/reset-password/reject/${requestId}`);
      if (response.status === 200) {
        return { 
          status: 200, 
          message: response.data.message || "Password reset request rejected successfully"
        };
      } else {
        return { 
          status: response.status, 
          message: response.data.message || "Failed to reject password reset request"
        };
      }
    }
  } catch (error) {
    console.error("Error rejecting password reset request:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to reject password reset request"
    };
  }
}; 