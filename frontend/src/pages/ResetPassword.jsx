import React, { useState } from "react";
import Logo from "../assets/logo.png";
import resetPasswordSchema from "../yupSchema/resetPasswordSchema";
import { useFormik } from "formik";
import { RiErrorWarningLine } from "react-icons/ri";
import { fetchResetPassword } from "../redux/actions/resetPasswordAction";
import { connect } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { handlePasswordReset } from "../api/passwordResetApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const ResetPassword = (props) => {
    const navigate = useNavigate(); // Add this
    const [messageApi, contextHolder] = message.useMessage();
    const [showPassword, setShowPassword] = useState(false);
  
    const formik = useFormik({
      initialValues: {
        userId: props?.allLogins?.data?.userId || "001",
        isInitial: 0,
        newPassword: "",
        confirmPassword: "",
        consentAgreed: false,
      },
      validationSchema: resetPasswordSchema,
      onSubmit: async (values) => {
        if (values.newPassword === values.confirmPassword) {
          const response = await handlePasswordReset(
            values.userId,
            values.isInitial,
            values.newPassword,
          );
          if (response.status === 200) {
            messageApi.success(response.message);
            navigate("/dashboard"); // Navigate on success
          } else {
            messageApi.error(response.message);
          }
        } else {
          messageApi.error("Passwords do not match");
        }
      },
    });

  const handleSubmit = () => {
    if (props?.resetPasswordResponse?.status === "200") {
      messageApi.success(props?.resetPasswordResponse?.message);
    } else {
      messageApi.error(props?.resetPasswordResponse?.message || "Password reset failed");
    }
  };

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
          <h1 className="text-[32px] text-white font-bold text-center">
            Health Sentinel
          </h1>
        </div>

        <div
          className="w-[510px] min-h-[444px] bg-white rounded-br-[25px] rounded-bl-[25px] lg:rounded-tr-[25px] lg:rounded-bl-[0] flex flex-col 
          items-center justify-center gap-[24px] p-[20px]"
        >
          <h1 className="h-[48px] text-[32px] text-black font-medium text-center">
            Reset Password
          </h1>
          <form
            className="flex flex-col gap-[8px]"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="newPassword" className="text-[16px] text-[#7C838A]">
              New Password
            </label>
            <div className="relative w-[414px]">
              <input
                className={`w-full h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px] pr-[45px]
                ${
                  formik.errors.newPassword && formik.touched.newPassword
                    ? "border border-[2px] border-red-500 outline-none"
                    : ""
                }
                `}
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className={`absolute right-0 flex items-center pr-3 ${formik.errors.newPassword && formik.touched.newPassword ? 'top-[13px]' : 'inset-y-0'}`}>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={24} />
                  ) : (
                    <AiOutlineEye size={24} />
                  )}
                </button>
              </div>
              {formik.errors.newPassword && formik.touched.newPassword && (
                <p className="text-red-500 text-[12px] mt-1 flex items-center gap-1">
                  <RiErrorWarningLine className="flex-shrink-0" />
                  <span>{formik.errors.newPassword}</span>
                </p>
              )}
            </div>
            <label
              htmlFor="confirmPassword"
              className="text-[16px] text-[#7C838A] mt-2"
            >
              Confirm Password
            </label>
            <div className="relative w-[414px]">
              <input
                className={`w-full h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px] pr-[45px]
                ${
                  formik.errors.confirmPassword && formik.touched.confirmPassword
                    ? "border border-[2px] border-red-500 outline-none"
                    : ""
                }
                `}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className={`absolute right-0 flex items-center pr-3 ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'top-[13px]' : 'inset-y-0'}`}>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={24} />
                  ) : (
                    <AiOutlineEye size={24} />
                  )}
                </button>
              </div>
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <p className="text-red-500 text-[12px] mt-1 flex items-center gap-1">
                  <RiErrorWarningLine className="flex-shrink-0" />
                  <span>{formik.errors.confirmPassword}</span>
                </p>
              )}
            </div>
            
            {/* Consent Section */}
            <div className="w-[414px] mt-4 mb-2">
              <div className="p-4 bg-gray-100 rounded-md text-[14px] text-gray-700 leading-relaxed">
                <p className="font-semibold mb-2">Welcome to Health Sentinel.</p>
                <p className="mb-2">By proceeding, you acknowledge and agree to the following:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You understand that all data accessed and entered within this system is to be used solely for the purposes of notifiable disease reporting and public health surveillance as authorized by the Ministry of Health, Sri Lanka.</li>
                  <li>You agree not to use, disclose, or share any patient-related data accessed through this system for any purpose other than those directly related to your official duties in notifiable disease monitoring and response.</li>
                  <li>Unauthorized use, disclosure, or manipulation of health data may result in disciplinary and/or legal action in accordance with applicable data protection and public health laws.</li>
                </ul>
                <p className="mt-2">Please confirm your understanding and agreement to these terms before proceeding.</p>
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
                  I have read and agree to the terms and conditions
                </label>
              </div>
              {formik.errors.consentAgreed && formik.touched.consentAgreed && (
                <p className="text-red-500 text-[12px] mt-1 flex items-center gap-1">
                  <RiErrorWarningLine className="flex-shrink-0" />
                  <span>{formik.errors.consentAgreed}</span>
                </p>
              )}
            </div>
            
            <input
              className={`w-[414px] h-[60px] ${
                formik.isValid && formik.dirty && formik.values.consentAgreed
                  ? "bg-[#0866FF] cursor-pointer"
                  : "bg-[#0866FF] opacity-80 cursor-not-allowed"
              } rounded-[6px] text-[20px] text-white font-medium px-[32px] py-[16px] mt-[24px]`}
              type="submit"
              value="Reset Password"
              disabled={!(formik.isValid && formik.dirty && formik.values.consentAgreed)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allLogins: state.allLogins,
    resetPasswordResponse: state.resetPassword,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResetPassword: async (values) => await dispatch(fetchResetPassword(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);