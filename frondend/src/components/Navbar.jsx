import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const sections = ["home", "map", "events"];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

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

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div className="Navbar w-full h-[80px] px-[40px] py-[16px] flex flex-row items-center justify-between bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="Logo w-[201px] h-[48px] flex flex-row items-center justify-between">
        <img src={Logo} alt="logo" className="w-[48px] h-[48px]" />
        <h1 className="w-[137px] h-[30px] text-[20px] text-center font-roboto font-medium text-[#65686C]">
          Health Sentinel
        </h1>
      </div>

      {/* Navbar Links */}
      <ul className="Links w-[281px] h-[32px] flex flex-row items-center justify-between text-[#65686C]">
        {sections.map((id) => (
          <button
            key={id}
            className={`text-[24px] font-roboto font-medium px-4 py-2 transition-all duration-300 
              ${activeSection === id ? "text-[#0866FF]" : "text-[#65686C]"}`}
            onClick={() => handleClickScroll(id)}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </ul>

      {/* Login Button */}
      <div className="LoginBtns w-[236px] h-[40px] flex flex-row items-center gap-[10px]">
        <h1 className="text-[16px] text-center font-roboto font-normal text-[#65686C]">
          Are you an Officer?
        </h1>
        <button className="text-[16px] text-center font-roboto font-medium text-[#fff] px-[16px] py-[8px] rounded-[6px] bg-[#0866FF]">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
