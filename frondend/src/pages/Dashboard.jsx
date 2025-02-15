import React from 'react';
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const Links = ["home", "Map"];
  return (
    <>
      <Navbar Sections={Links}/>
    </>
  );
}

export default Dashboard;