import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className='Home'>
      <Navbar/>
      <div id="home" className='w-full h-[500px] bg-black'></div>
      <div id="map" className='w-full h-[500px] bg-white'></div>
      <div id="events" className='w-full h-[500px] bg-[red]'></div>
    </div>
  );
}

export default Home;
