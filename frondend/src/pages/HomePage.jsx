import { React, useEffect } from "react";
import Navbar from "../components/Navbar";
import Home from "../components/home/Home"
import Map from "../components/home/Map"
import Events from "../components/home/Events"

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Home w-full bg-[#F2F4F7] pt-[112px] pb-[32px] px-[32px] flex flex-col gap-[72px]">
      <Navbar />
      <Home/>
      <Map/>
      <Events/>
    </div>
  );
};

export default HomePage;
