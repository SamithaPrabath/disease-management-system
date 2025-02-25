import React, { useState } from "react";
import { useFormik } from "formik";
import { phiSchema } from "../../yupSchema/epidemiologySchema";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {registerPhi} from '../../api/phiApi';

const AddPHI = ({ handleBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      registrationNumber: "",
      moh: "",
      area: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
    },
    validationSchema: phiSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerPhi(values);
  
        if (response && response.message) {
          alert(response.message);
        } else {
          alert("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration.");
      }
    },
  });

  return (
    <>
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Add PHI
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500">{formik.errors.fullName}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-gray-700">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.registrationNumber &&
              formik.errors.registrationNumber && (
                <p className="text-red-500">
                  {formik.errors.registrationNumber}
                </p>
              )}
          </div>

          {/* MOH */}
          <div>
            <label className="block text-gray-700">MOH</label>
            <input
              type="text"
              name="moh"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.moh}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.moh && formik.errors.moh && (
              <p className="text-red-500">{formik.errors.moh}</p>
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
              <p className="text-red-500">{formik.errors.area}</p>
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
                <p className="text-red-500">{formik.errors.email}</p>
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
                <p className="text-red-500">{formik.errors.phoneNumber}</p>
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
                <p className="text-red-500">{formik.errors.username}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-700">Password</label>
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
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!formik.isValid}
            >
              Submit
            </button>

            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
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

export default AddPHI;
