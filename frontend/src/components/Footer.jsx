import React from 'react';
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className='w-full min-w-[870px] px-[120px] py-[32px] bg-[#263238] flex flex-row items-center justify-between'>
      <div className='flex flex-col gap-[8px]'>
        <div className="Logo w-[201px] h-[48px] flex flex-row items-center justify-between">
            <img src={Logo} alt="logo" className="w-[48px] h-[48px] rounded-[50%]" />
            <h1 className="w-[137px] h-[30px] text-[20px] text-center font-medium text-white">
            Health Sentinel
            </h1>
        </div>
        <div className='text-[10px] text-white'>
            <p>
            Copyright ©2025 Health Sentinel
            </p>
            <p>
            All rights reserved
            </p>
        </div>
      </div>

      <div className='w-[266px] h-[64px] flex flex-col gap-[8px] text-white font-inter'>
        <h3 className='text-[14px] font-semibold'>Contact</h3>
        <p className='text-[10px] font-nomal'>info@healthsentinel.lk</p>
        <p className='text-[10px] font-nomal'>+94 11 123 4567</p>
      </div>
    </footer>
  );
}

export default Footer;
