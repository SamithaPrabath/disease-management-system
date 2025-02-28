import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoNotifications } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";

const Navbar = ({ Sections, onNavClick, activeId }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const location = useLocation();
  const navigate = useNavigate();

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

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenExpiry");
    navigate("/");
  };

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
          <div className="w-[100px] h-[40px] flex flex-row items-center gap-[16px] relative">
            {/* Notification Button */}
            <button
              className="w-[40px] h-[40px] text-[18px] bg-[#E2E5E9] rounded-[50%] cursor-pointer
        flex items-center justify-center
        "
            >
              <IoNotifications />
            </button>

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

              {/* Dropdown Menu */}
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
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;