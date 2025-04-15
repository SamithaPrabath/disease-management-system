import React, {useState} from 'react';
import Navbar from "../../components/Navbar";
import { connect } from "react-redux";

import Home from './Home';
import Doctor from './Doctor';

const Dashboard = (props) => {
  const Links = [
      { id: "Home", component: <Home /> },
    { id: "Doctor", component: <Doctor /> },
  ];

  const [activeComponent, setActiveComponent] = useState(Links[0].id);

  const handleNavClick = (id) => {
    setActiveComponent(id);
  };

  const activeSection = Links.find((section) => section.id === activeComponent);

  return (
    <>
      <Navbar
        Sections={Links}
        onNavClick={handleNavClick}
        activeId={activeComponent}
      />
      {/* Render the active component */}
      <div className="Home w-full bg-[#F2F4F7] pt-[112px] pb-[32px] px-[32px] flex flex-col gap-[72px]">{activeSection?.component}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ViewsSingleCase: state.viewsSingleCase,
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps, null)(Dashboard);