import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { doctorSchema } from "../../yupSchema/doctorSchema";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerDoctor } from "../../api/doctorApi";
import { message } from "antd";
import { getAllMohData } from "../../api/mohApi";
import { connect } from "react-redux";

const AddDoctor = ({ handleBack, AllLogins }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState(false);
  const [mohList, setMohList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moh = await getAllMohData();
        setMohList(moh.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        messageApi.error("Failed to load required data");
      }
    };

    fetchData();
  }, [messageApi]);

  const formik = useFormik({
    initialValues: {
      name: "",
      moh: "",
      area: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      role: "doctor",
      instituteId: AllLogins.data.userId,
    },
    validationSchema: doctorSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerDoctor(values);

        if (response && response.message) {
          messageApi.success(response.message);
          setTimeout(() => {
            handleBack();
          }, 1000);
        } else {
          messageApi.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        messageApi.error("An error occurred during registration.");
      }
    },
  });

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Add Doctor
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>
          {/* MOH */}
          <div>
            <label className="block text-gray-700">MOH <span className="text-red-500">*</span></label>
            <select
              name="moh"
              className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.moh}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select MOH</option>
              {mohList.map((moh) => (
                <option key={moh.id} value={moh.id}>
                  {moh.name}
                </option>
              ))}
            </select>
            {formik.touched.moh && formik.errors.moh && (
              <p className="text-red-500">{formik.errors.moh}</p>
            )}
          </div>

          {/* Area */}
          <div>
            <label className="block text-gray-700">Area <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="area"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.area && formik.errors.area && (
              <p className="text-red-500">{formik.errors.area}</p>
            )}
          </div>

          {/* Email & Phone Number - Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500">{formik.errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Username & Password - Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Username <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500">{formik.errors.username}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-700">Password <span className="text-red-500">*</span></label>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text/password
                name="password"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none pr-10"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {/* Toggle Button (Eye Icon) */}
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white ${
                formik.isValid
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!formik.isValid}
            >
              Submit
            </button>

            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps, null)(AddDoctor);
