import React, {useState} from 'react';
import Navbar from "../../components/Navbar";

import Home from './Home';
import Phi from './Phi';
import Moh from './Moh'
import Istitutes from './Institutes'
import Diseases from './Diseases'

const Dashboard = () => {
  const Links = [
    { id: "Home", component: <Home /> },
    { id: "PHI", component: <Phi /> },
    { id: "MOH", component: <Moh/>},
    {id: "Institutes", component: <Istitutes/>},
    {id: "Diseases", component: <Diseases/>}
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

export default Dashboard;