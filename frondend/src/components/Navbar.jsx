import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoNotifications } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";

const Navbar = ({ Sections, onNavClick, activeId }) => {
  const [activeSection, setActiveSection] = useState("Home");

  const location = useLocation();

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

  return (
    <div className="Navbar w-full min-w-[870px] h-[80px] px-[40px] py-[16px] flex flex-row items-center justify-between bg-white fixed top-0 left-0 z-50">
      <Link to="/" className="Logo w-[201px] h-[48px] flex flex-row items-center justify-between">
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
          <div className="w-[100px] h-[40px] flex flex-row items-center gap-[16px]">
            <button
              className="w-[40px] h-[40px] text-[18px] bg-[#E2E5E9] rounded-[50%] cursor-pointer
        flex items-center justify-center
        "
            >
              <IoNotifications />
            </button>
            <button
              className="w-[40px] h-[40px] text-[18px] bg-[#E2E5E9] rounded-[50%] cursor-pointer
        flex items-center justify-center
        "
            >
              <HiUser />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
