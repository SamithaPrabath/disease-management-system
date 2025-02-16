import React, {useState} from 'react';
import Navbar from "../components/Navbar";

import Home from '../components/epidemiology/Home';
import Phi from '../components/epidemiology/Phi';
import Moh from '../components/epidemiology/Moh'
import Istitutes from '../components/epidemiology/Institutes'
import Diseases from '../components/epidemiology/Didseaces'
import Institutes from '../components/epidemiology/Institutes';

const Dashboard = () => {
  const Links = [
    { id: "home", component: <Home /> },
    { id: "phi", component: <Phi /> },
    { id: "moh", component: <Moh/>},
    {id: "institutes", component: <Institutes/>},
    {id: "diseases", component: <Diseases/>}
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
      <div className="p-4">{activeSection?.component}</div>
    </>
  );
}

export default Dashboard;