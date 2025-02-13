import { React, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../assets/hero.png";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="Home w-full bg-[#F2F4F7] pt-[112px] pb-[32px] px-[32px] flex flex-col gap-[72px]">
      <Navbar />
      <div
        id="home"
        className="w-full h-[552px] bg-linear-to-r from-white to-[#007AFF]
        flex flex-row items-center justify-between px-[72px] py-[48px]
      "
      >
        <div className="w-[550px] flex flex-col gap-[10px]">
          <h1 className="text-[48px] text-[#4D4D4D] font-bold">
            Stay <span className="text-[#0866FF]">Informed.</span> Stay{" "}
            <span className="text-[#0866FF]">Safe</span>
          </h1>
          <p className="text-[16px] text-[#717171]">
            Track infectious disease cases in your area and stay updated with
            the latest public health events.
          </p>
          <div className="w-[445px] flex flex-row gap-[10px]">
            <button className="text-[16px] text-center font-medium text-[#fff] px-[16px] py-[8px] rounded-[6px] bg-[#0866FF] cursor-pointer"
            onClick={() => handleClickScroll('map')}
            >
              Explore the Map
            </button>
            <button className="text-[16px] text-center font-medium text-[#080809] px-[16px] py-[8px] rounded-[6px] border-[1px] border-[#65686C] bg-[#fff] cursor-pointer"
            onClick={() => handleClickScroll('events')}
            >
              Upcoming Events
            </button>
          </div>
        </div>
        <img src={Hero} alt="hero" className="w-[456px] h-[456px]" />
      </div>
      <div id="map" className="w-full h-[500px] bg-white"></div>
      <div id="events" className="w-full h-[500px] bg-[red]"></div>
    </div>
  );
};

export default Home;
