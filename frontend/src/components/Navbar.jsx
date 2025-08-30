import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoNotifications } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";
import { connect, useDispatch } from "react-redux";
import { resetStore } from "../redux/actions/log_out_actions";
import { getNotifications, markNotificationAsRead } from "../api/notificationsApi";

// Navbar component that uses Redux for user data and the notification API
const Navbar = ({ AllLogins, Sections, onNavClick, activeId }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for user dropdown visibility
  const [isNotificationDropdownVisible, setIsNotificationDropdownVisible] =
    useState(false); // State for notification dropdown visibility
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("Null");
  const [userRole, setUserRole] = useState("Null");
  
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (AllLogins?.data) {
        setUserName(AllLogins.data.username);
        setUserRole(AllLogins.data.role);
      }
    };

    fetchData();
  }, [AllLogins]);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      // Only fetch if user is logged in and we have user data
      if (!sessionStorage.getItem("token") || !AllLogins?.data) return;
      
      setLoading(true);
      try {
        // Pass the user ID explicitly to getNotifications
        const response = await getNotifications(AllLogins.data.userId);
        
        if (response.status === 200) {
          setNotifications(response.data);
          setError(null);
        } else {
          setError(response.message || "Failed to load notifications");
          setNotifications([]);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    
    // Set up polling to fetch notifications every 2 minutes
    const intervalId = setInterval(fetchNotifications, 2 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [AllLogins]); // Add AllLogins as dependency so notifications are refreshed when user changes

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      if (!AllLogins?.data?.userId) {
        console.error("User ID not available");
        return;
      }
      
      const response = await markNotificationAsRead(notificationId, AllLogins.data.userId);
      
      if (response.status === 200) {
        // Update local state to reflect the change
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => 
            notification.id === notificationId 
              ? { ...notification, read: true } 
              : notification
          )
        );
      } else {
        console.error("Failed to mark notification as read:", response.message);
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Handle smooth scrolling
  const handleClickScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Detect the active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport
      rootMargin: "0px",
      threshold: 0.6, // 60% visible triggers
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  // Toggle user dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Toggle notification dropdown visibility
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownVisible(!isNotificationDropdownVisible);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenExpiry");

    // Clear persisted Redux state
    dispatch(resetStore());

    // Force a hard reload to clear all state
    window.location.href = "/home";
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark notification as read
    markAsRead(notification.id);
    
    // Navigate to relevant page if needed
    if (notification.link) {
      navigate(notification.link);
    }
    
    // Close the dropdown
    setIsNotificationDropdownVisible(false);
  };

  // Get unread notification count
  const unreadCount = notifications.filter(notification => !notification.is_read).length;

  return (
    <div className="Navbar w-full min-w-[870px] h-[80px] px-[40px] py-[16px] flex flex-row items-center justify-between bg-white fixed top-0 left-0 z-50">
      <Link
        to="/"
        className="Logo w-[201px] h-[48px] flex flex-row items-center justify-between"
      >
        <img src={Logo} alt="logo" className="w-[48px] h-[48px]" />
        <h1 className="w-[137px] h-[30px] text-[20px] text-center font-medium text-[#65686C]">
          Health Sentinel
        </h1>
      </Link>
      {location.pathname === "/home" ? (
        <>
          {/* Navbar Links */}
          <ul className="Links w-[281px] h-[32px] flex flex-row items-center justify-between text-[#65686C]">
            {Sections.map(({ id }) => (
              <button
                key={id}
                className={`text-[24px] font-medium cursor-pointer transition-all duration-300 
            ${activeSection === id ? "text-[#0866FF]" : "text-[#65686C]"}`}
                onClick={() => handleClickScroll(id)}
              >
                {id}
              </button>
            ))}
          </ul>

          {/* Login Button */}
          <div className="LoginBtns w-[236px] h-[40px] flex flex-row items-center gap-[10px]">
            <h1 className="text-[16px] text-center font-normal text-[#65686C]">
              Are you an Officer?
            </h1>
            <Link to="/login">
              <button className="text-[16px] text-center font-medium text-[#fff] px-[16px] py-[8px] rounded-[6px] bg-[#0866FF] cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Navbar Links */}
          <ul className="Links w-[500px] h-[32px] flex flex-row items-center justify-evenly text-[#65686C]">
            {Sections.map(({ id }) => (
              <button
                key={id}
                className={`text-[24px] font-medium cursor-pointer transition-all duration-300 
            ${activeId === id ? "text-[#0866FF]" : "text-[#65686C]"}`}
                onClick={() => onNavClick(id)}
              >
                {id}
              </button>
            ))}
          </ul>
          <div className="min-w-[100px] h-[40px] flex flex-row items-center gap-[16px] relative">
            {/* Notification Button */}
            <div className="relative">
              <div className="relative">
                <button
                  className="w-[40px] h-[40px] text-[18px] bg-[#E2E5E9] rounded-[50%] cursor-pointer
        flex items-center justify-center
        "
                  onClick={toggleNotificationDropdown}
                >
                  <IoNotifications />
                </button>
                {/* Notification Count - Only show if there are unread notifications */}
                {unreadCount > 0 && (
                  <div
                    className="absolute -top-1 -right-1 w-[20px] h-[20px] bg-[#0866FF] text-[#fff] text-[12px] rounded-[50%]
                  flex items-center justify-center
                  "
                  >
                    {unreadCount}
                  </div>
                )}
              </div>

              {/* Notification Dropdown Menu */}
              {isNotificationDropdownVisible && (
                <div className="absolute right-0 mt-2 w-[300px] bg-white border border-[#E2E5E9] rounded-[6px] shadow-lg max-h-[400px] overflow-y-auto">
                  <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                    <h3 className="font-medium text-[16px]">Notifications</h3>
                  </div>
                  
                  {loading && (
                    <div className="p-4 text-center text-gray-500">Loading notifications...</div>
                  )}
                  
                  {error && (
                    <div className="p-4 text-center text-red-500">{error}</div>
                  )}
                  
                  {!loading && !error && notifications.length === 0 && (
                    <div className="p-4 text-center text-gray-500">No notifications</div>
                  )}
                  
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 text-[14px] border-b border-gray-100 hover:bg-[#F5F5F5] cursor-pointer ${
                        notification.read ? "bg-white" : "bg-blue-50"
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-gray-600">{notification.message}</div>
                      <div className="text-[12px] text-gray-400 mt-1">
                        {new Date(notification.update_time).toLocaleString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {notifications.length > 0 && (
                    <div className="p-2 text-center">
                      <button 
                        className="text-blue-500 text-[14px] hover:underline"
                      >
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Button with Dropdown */}
            <div className="relative">
              <button
                className="w-[40px] h-[40px] text-[18px] bg-[#E2E5E9] rounded-[50%] cursor-pointer
        flex items-center justify-center
        "
                onClick={toggleDropdown}
              >
                <HiUser />
              </button>

              {/* User Dropdown Menu */}
              {isDropdownVisible && (
                <div className="absolute right-0 mt-2 w-[120px] bg-white border border-[#E2E5E9] rounded-[6px] shadow-lg">
                  <button
                    className="w-full px-4 py-2 text-[14px] text-[#65686C] hover:bg-[#F5F5F5]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col items-start justify-center">
              <div>
                <p className="text-[14px] text-gray-500 font-bold">
                  Hi<span className="text-[#0866FF]">, </span>
                  {userName}
                </p>
              </div>
              <div className="text-gray-400 flex flex-row items-center justify-between text-[10px] uppercase gap-1">
                <div className="active w-[10px] h-[10px] bg-green-500 rounded-[50%]" />
                {userRole === "epi" ? (
                  <p className="text-[14px] text-gray-500 font-bold">
                    Epidemiologist
                  </p>
                ) : (
                  <p className="text-[14px] text-gray-500 font-bold">
                    {userRole}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps, null)(Navbar);
