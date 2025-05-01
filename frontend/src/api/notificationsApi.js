import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

// Mock notifications data for testing/development
const mockNotifications = [
  {
    id: "1",
    title: "New Case Reported",
    message: "A new dengue case has been reported in your area.",
    read: false,
    createdAt: "2023-07-15T10:30:00Z",
    link: "/dashboard/cases"
  },
  {
    id: "2",
    title: "Report Due",
    message: "Monthly surveillance report is due in 3 days.",
    read: true,
    createdAt: "2023-07-14T08:45:00Z",
    link: "/dashboard/reports"
  },
  {
    id: "3",
    title: "Alert: Disease Outbreak",
    message: "Potential outbreak detected in Western Province.",
    read: false,
    createdAt: "2023-07-13T16:20:00Z",
    link: "/dashboard/outbreaks"
  }
];

/**
 * Get the user ID from the token or session storage
 * @returns {string|null} The user ID or null if not available
 */
const getUserId = () => {
  try {
    // Attempt to get user data from session storage first (direct approach)
    const token = sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    
    // Most direct approach - check if there's a redux store with user data in localStorage
    const persistRoot = localStorage.getItem("persist:root");
    if (persistRoot) {
      const parsedRoot = JSON.parse(persistRoot);
      if (parsedRoot.allLogins) {
        const allLogins = JSON.parse(parsedRoot.allLogins);
        if (allLogins && allLogins.data && allLogins.data.userId) {
          return allLogins.data.userId;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return null;
  }
};

/**
 * Get all notifications for the currently logged in user
 * @param {string} [userId] - Optional user ID, will be retrieved automatically if not provided
 * @returns {Promise} Promise object that resolves to notifications data
 */
export const getNotifications = async (userId) => {
  try {
    // Use provided userId or get from storage if not provided
    const userIdentifier = userId || getUserId();
    
    if (IS_BACKEND === "false") {
      // For development/testing without backend
      return { 
        status: 200, 
        message: "Notifications retrieved successfully", 
        data: mockNotifications 
      };
    } else {
      // Check if userId is available
      if (!userIdentifier) {
        console.warn("User ID not found. Cannot fetch user-specific notifications.");
        return { 
          status: 400, 
          message: "User ID not available", 
          data: [] 
        };
      }
      
      const response = await axios.get(`${BASE_URL}/api/notifications/user/${userId}`);
      
      if (response.status === 200) {
        return { 
          status: 200, 
          message: "Notifications retrieved successfully", 
          data: response.data.data 
        };
      } else {
        return { 
          status: response.status, 
          message: "Failed to retrieve notifications", 
          data: [] 
        };
      }
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { 
      status: error.response?.status || 500, 
      message: "Error fetching notifications", 
      error: error.message,
      data: [] 
    };
  }
};

/**
 * Mark a notification as read
 * @param {string} notificationId - ID of the notification to mark as read
 * @param {string} [userId] - Optional user ID, will be retrieved automatically if not provided
 * @returns {Promise} Promise object that resolves to operation status
 */
export const markNotificationAsRead = async (notificationId, userId) => {
  try {
    // Use provided userId or get from storage if not provided
    const userIdentifier = userId || getUserId();
    
    if (IS_BACKEND === "false") {
      // For development/testing without backend
      const notification = mockNotifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        return { 
          status: 200, 
          message: "Notification marked as read successfully" 
        };
      } else {
        return { 
          status: 404, 
          message: "Notification not found" 
        };
      }
    } else {
      // Check if userId is available
      if (!userIdentifier) {
        console.warn("User ID not found. Cannot mark notification as read.");
        return { 
          status: 400, 
          message: "User ID not available"
        };
      }
      
      // Real API call
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/notifications/mark-read/${notificationId}`);
      
      if (response.status === 200) {
        return { 
          status: 200, 
          message: "Notification marked as read successfully" 
        };
      } else {
        return { 
          status: response.status, 
          message: "Failed to mark notification as read" 
        };
      }
    }
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { 
      status: error.response?.status || 500, 
      message: "Error marking notification as read", 
      error: error.message 
    };
  }
};

/**
 * Mark all notifications as read
 * @param {string} [userId] - Optional user ID, will be retrieved automatically if not provided
 * @returns {Promise} Promise object that resolves to operation status
 */
export const markAllNotificationsAsRead = async (userId) => {
  try {
    // Use provided userId or get from storage if not provided
    const userIdentifier = userId || getUserId();
    
    if (IS_BACKEND === "false") {
      // For development/testing without backend
      mockNotifications.forEach(notification => {
        notification.read = true;
      });
      return { 
        status: 200, 
        message: "All notifications marked as read successfully" 
      };
    } else {
      // Check if userId is available
      if (!userIdentifier) {
        console.warn("User ID not found. Cannot mark all notifications as read.");
        return { 
          status: 400, 
          message: "User ID not available"
        };
      }
      
      // Real API call
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/notifications/mark-all-read`,
        { userId: userIdentifier },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 200) {
        return { 
          status: 200, 
          message: "All notifications marked as read successfully" 
        };
      } else {
        return { 
          status: response.status, 
          message: "Failed to mark all notifications as read" 
        };
      }
    }
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return { 
      status: error.response?.status || 500, 
      message: "Error marking all notifications as read", 
      error: error.message 
    };
  }
};

/**
 * Delete a notification
 * @param {string} notificationId - ID of the notification to delete
 * @param {string} [userId] - Optional user ID, will be retrieved automatically if not provided
 * @returns {Promise} Promise object that resolves to operation status
 */
export const deleteNotification = async (notificationId, userId) => {
  try {
    // Use provided userId or get from storage if not provided
    const userIdentifier = userId || getUserId();
    
    if (IS_BACKEND === "false") {
      // For development/testing without backend
      const index = mockNotifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        mockNotifications.splice(index, 1);
        return { 
          status: 200, 
          message: "Notification deleted successfully" 
        };
      } else {
        return { 
          status: 404, 
          message: "Notification not found" 
        };
      }
    } else {
      // Check if userId is available
      if (!userIdentifier) {
        console.warn("User ID not found. Cannot delete notification.");
        return { 
          status: 400, 
          message: "User ID not available"
        };
      }
      
      // Real API call
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/notifications/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { userId: userIdentifier } // Send userId in request body for DELETE request
        }
      );
      
      if (response.status === 200) {
        return { 
          status: 200, 
          message: "Notification deleted successfully" 
        };
      } else {
        return { 
          status: response.status, 
          message: "Failed to delete notification" 
        };
      }
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    return { 
      status: error.response?.status || 500, 
      message: "Error deleting notification", 
      error: error.message 
    };
  }
}; 