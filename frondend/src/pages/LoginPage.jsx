import React from "react";
import Logo from "../assets/logo.png";
import loginSchema from "../yupSchema/loginSchema";
import { useFormik } from "formik";
import { RiErrorWarningLine } from "react-icons/ri";
import { fetchLogin } from "../redux/actions/loginAction";
import { connect } from "react-redux";
import { message } from "antd";

const LoginPage = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      props.fetchLogin(values);
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    if (props?.AllLogins.status == "200") {
      messageApi.success(props?.AllLogins?.message);
    } else {
      messageApi.error(props?.AllLogins?.message);
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
            Login
          </h1>
          <form
            className="flex flex-col gap-[8px]"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="username" className="text-[16px] text-[#7C838A]">
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
              placeholder="Enter username"
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

            <label htmlFor="username" className="text-[16px] text-[#7C838A]">
              Password
            </label>
            <input
              className={`w-[414px] h-[50px] bg-[#E2E5E9] rounded-[8px] px-[16px] py-[14px]
            ${
              formik.errors.password && formik.touched.password
                ? "border border-[2px] border-red-500 outline-none"
                : ""
            }
            `}
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-[14px] flex flex-row gap-[2px] items-center">
                <RiErrorWarningLine />
                {formik.errors.password}
              </p>
            )}

            <input
              className="w-[414px] h-[60px] bg-[#0866FF] rounded-[6px] text-[20px] text-white font-medium px-[32px] py-[16px] mt-[24px] cursor-pointer"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchLogin: (values) => dispatch(fetchLogin(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
