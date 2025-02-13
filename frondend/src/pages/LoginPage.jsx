import React from 'react';
import Logo from "../assets/logo.png"

const LoginPage = () => {
  return (
    <div className='w-full min-h-[100vh] bg-[#E2E5E9] flex flex-wrap flex-col md:flex-row items-center justify-center p-[32px]'>

      <div className='w-[510px] h-[444px] bg-[#0866FF] rounded-tl-[25px] rounded-bl-[25px]
        flex flex-col items-center justify-center gap-[16px]
      '>
        <img src={Logo} alt="Logo" className='w-[150px] h-[150px] rounded-[50%]'/>
        <h1 className='text-[32px] text-white font-bold text-center'>Health Sentinel</h1>
      </div>

      <div className='w-[510px] h-[444px] bg-white rounded-tr-[25px] rounded-br-[25px] flex flex-col 
      items-center justify-center gap-[24px]'>
        <h1 className='h-[48px] text-[32px] text-black font-medium text-center'>Login</h1>
        <form className='flex flex-col gap-[8px]'>
          <label htmlFor="username" className='text-[16px] text-[#7C838A]'>Username</label>
          <input 
          className='w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]'
          type="text" placeholder='username'/>

          <label htmlFor="username" className='text-[16px] text-[#7C838A]'>Password</label>
          <input 
          className='w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]'
          type="password" placeholder='password'/>

          <input
          className='w-[414px] h-[60px] bg-[#0866FF] rounded-[6px] text-[20px] text-white font-medium px-[32px] py-[16px] mt-[24px] cursor-pointer' 
          type="submit" value="Login"/>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
