import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import { mohSchema } from "../../yupSchema/epidemiologySchema";
import { registerMoh } from "../../api/mohApi";
import { message } from "antd";

const AddMOH = ({ handleBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      name: "",
      area: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      role: "moh", // Fixed role for MOH
    },
    validationSchema: mohSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await registerMoh(values);

        if (response.status === 200 && response.message) {
          messageApi.success(response.message);
          setTimeout(() => handleBack(), 1000);
        } else {
          messageApi.error(response.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        messageApi.error(
          error.message || "An error occurred during registration"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Add MOH
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* Area */}
          <div>
            <label className="block text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.area && formik.errors.area && (
              <p className="text-red-500 text-sm">{formik.errors.area}</p>
            )}
          </div>

          {/* Email & Phone Number - Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          {/* Username & Password - Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none pr-10"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white transition ${
                formik.isValid && !formik.isSubmitting
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
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

export default AddMOH;
