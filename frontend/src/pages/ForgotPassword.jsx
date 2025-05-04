import React, { useState } from "react";
import Logo from "../assets/logo.png";
import forgotPasswordSchema from "../yupSchema/forgotPasswordSchema";
import { useFormik } from "formik";
import { RiErrorWarningLine } from "react-icons/ri";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { handleForgotPassword } from "../api/passwordResetApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      consentAgreed: false,
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        const response = await handleForgotPassword(
          values.name,
          values.username,
          values.email
        );
        
        if (response.status === 200) {
          messageApi.success(response.message);
          // Give user time to read the success message before redirecting
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          messageApi.error(response.message || "Password recovery failed");
        }
      } catch (error) {
        messageApi.error("An error occurred while processing your request");
        console.error(error);
      }
    },
  });

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[100vh] bg-[#E2E5E9] flex flex-wrap flex-col md:flex-row items-center justify-center p-[32px]">
        <div
          className="w-[510px] h-[444px] bg-[#0866FF] rounded-tl-[25px] rounded-tr-[25px] lg:rounded-bl-[25px]
          lg:rounded-tr-[0]
          flex flex-col items-center justify-center gap-[16px]
        "
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-[150px] h-[150px] rounded-[50%]"
          />
          <h1 className="text-[32px] text-white font-bold text-center" onClick={() => navigate("/home")}>
            Health Sentinel
          </h1>
        </div>

        <div
          className="w-[510px] min-h-[444px] bg-white rounded-br-[25px] rounded-bl-[25px] lg:rounded-tr-[25px] lg:rounded-bl-[0] flex flex-col 
          items-center justify-center gap-[16px] p-[20px]"
        >
          <h1 className="h-[48px] text-[32px] text-black font-medium text-center">
            Forgot Password
          </h1>
          <p className="text-[14px] text-gray-600 text-center mb-2">
            Please provide your account details to reset your password
          </p>
          <form
            className="flex flex-col gap-[8px]"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="name" className="text-[16px] text-[#7C838A]">
              Full Name
            </label>
            <input
              className={`w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]
              ${
                formik.errors.name && formik.touched.name
                  ? "border border-[2px] border-red-500 outline-none"
                  : ""
              }
              `}
              type="text"
              placeholder="Enter your full name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-[14px] flex flex-row gap-[2px] items-center">
                <RiErrorWarningLine />
                {formik.errors.name}
              </p>
            )}

            <label htmlFor="username" className="text-[16px] text-[#7C838A] mt-2">
              Username
            </label>
            <input
              className={`w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]
              ${
                formik.errors.username && formik.touched.username
                  ? "border border-[2px] border-red-500 outline-none"
                  : ""
              }
              `}
              type="text"
              placeholder="Enter your username"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username && (
              <p className="text-red-500 text-[14px] flex flex-row gap-[2px] items-center">
                <RiErrorWarningLine />
                {formik.errors.username}
              </p>
            )}

            <label htmlFor="email" className="text-[16px] text-[#7C838A] mt-2">
              Email Address
            </label>
            <input
              className={`w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]
              ${
                formik.errors.email && formik.touched.email
                  ? "border border-[2px] border-red-500 outline-none"
                  : ""
              }
              `}
              type="email"
              placeholder="Enter your email address"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-[14px] flex flex-row gap-[2px] items-center">
                <RiErrorWarningLine />
                {formik.errors.email}
              </p>
            )}
            
            {/* Privacy Policy Section */}
            <div className="w-[414px] mt-4">
              <div className="p-4 bg-gray-100 rounded-md text-[14px] text-gray-700 leading-relaxed h-[150px] overflow-y-auto">
                <p className="font-semibold mb-2">Privacy Policy</p>
                <p className="mb-2">By proceeding with this password recovery request, you acknowledge and agree to the following:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The information you provide will be used solely for the purpose of verifying your identity and resetting your password.</li>
                  <li>A password reset link will be sent to the email address you provide.</li>
                  <li>Health Sentinel will handle your personal information in accordance with our privacy policy and applicable data protection laws.</li>
                </ul>
              </div>
              
              <div className="mt-3 flex items-start">
                <input
                  type="checkbox"
                  id="consentAgreed"
                  name="consentAgreed"
                  checked={formik.values.consentAgreed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 mr-2"
                />
                <label htmlFor="consentAgreed" className="text-[14px] text-gray-700">
                  I have read and agree to the privacy policy
                </label>
              </div>
              {formik.errors.consentAgreed && formik.touched.consentAgreed && (
                <p className="text-red-500 text-[14px] flex flex-row gap-[2px] items-center">
                  <RiErrorWarningLine />
                  {formik.errors.consentAgreed}
                </p>
              )}
            </div>
            
            <input
              className={`w-[414px] h-[60px] ${
                formik.isValid && formik.dirty && formik.values.consentAgreed
                  ? "bg-[#0866FF] cursor-pointer"
                  : "bg-[#0866FF] opacity-70 cursor-not-allowed"
              } rounded-[6px] text-[20px] text-white font-medium px-[32px] py-[16px] mt-[16px]`}
              type="submit"
              value="Reset Password"
              disabled={!(formik.isValid && formik.dirty && formik.values.consentAgreed)}
            />
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                className="text-[#0866FF] hover:underline"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword; 