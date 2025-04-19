import React from "react";
import Logo from "../assets/logo.png";
import resetPasswordSchema from "../yupSchema/resetPasswordSchema";
import { useFormik } from "formik";
import { RiErrorWarningLine } from "react-icons/ri";
import { fetchResetPassword } from "../redux/actions/resetPasswordAction";
import { connect } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
    const navigate = useNavigate(); // Add this
    const [messageApi, contextHolder] = message.useMessage();
  
    const formik = useFormik({
      initialValues: {
        userId: props?.allLogins?.data?.userId || "001",
        isInitial: 0,
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: async (values) => {
        if (values.newPassword === values.confirmPassword) {
          const response = await props.fetchResetPassword({
            userId: values.userId,
            isInitial: values.isInitial,
            newPassword: values.newPassword,
          });
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
          className="w-[510px] h-[444px] bg-white rounded-br-[25px] rounded-bl-[25px] lg:rounded-tr-[25px] lg:rounded-bl-[0] flex flex-col 
          items-center justify-center gap-[24px]"
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
            <input
              className={`w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]
              ${
                formik.errors.newPassword && formik.touched.newPassword
                  ? "border border-[2px] border-red-500 outline-none"
                  : ""
              }
              `}
              type="password"
              placeholder="Enter new password"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-500 text-[14px] flex flex-row gap-[2px] items-center">
                <RiErrorWarningLine />
                {formik.errors.newPassword}
              </p>
            )}

            <label
              htmlFor="confirmPassword"
              className="text-[16px] text-[#7C838A]"
            >
              Confirm Password
            </label>
            <input
              className={`w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]
              ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border border-[2px] border-red-500 outline-none"
                  : ""
              }
              `}
              type="password"
              placeholder="Confirm new password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <p className="text-red-500 text-[14px] flex flex-row gap-[2px] items-center">
                <RiErrorWarningLine />
                {formik.errors.confirmPassword}
              </p>
            )}

            <input
              className="w-[414px] h-[60px] bg-[#0866FF] rounded-[6px] text-[20px] text-white font-medium px-[32px] py-[16px] mt-[24px] cursor-pointer"
              type="submit"
              value="Reset Password"
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
  fetchResetPassword: (values) => dispatch(fetchResetPassword(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);