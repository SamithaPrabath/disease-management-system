import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import { sriLankaProvinces } from "../../assets/citysAndProvinces";
import { instituteSchema } from "../../yupSchema/epidemiologySchema";
import { message } from "antd";
import { registerInstitutes } from "../../api/institutesApi";

const AddInstitutes = ({ handleBack }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      registrationNumber: "",
      email: "",
      phoneNumber: "",
      address: "",
      province: "",
      city: "",
      username: "",
      password: "",
    },
    validationSchema: instituteSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await registerInstitutes(values);

        if (response?.status === 200 && response.message) {
          messageApi.success(response.message);
          resetForm(); // Clear form on success
          setTimeout(() => handleBack(), 1000); // Navigate back after success
        } else {
          messageApi.error(response?.message || "Registration failed");
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

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    formik.setFieldValue("province", province);

    const selected = sriLankaProvinces.find((p) => p.province === province);
    setCities(selected ? selected.cities : []);
    formik.setFieldValue("city", ""); // Reset city selection
  };

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Add Institute
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Institute Name */}
          <div>
            <label className="block text-gray-700">Institute Name</label>
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
                <p className="text-red-500 text-sm">
                  {formik.errors.registrationNumber}
                </p>
              )}
          </div>

          {/* Email & Phone Number - Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email" // Corrected from 'text' to 'email'
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

          {/* Address */}
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          {/* Province & City - Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Province</label>
              <select
                name="province"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.province}
                onChange={handleProvinceChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Province</option>
                {sriLankaProvinces.map((province) => (
                  <option key={province.province} value={province.province}>
                    {province.province}
                  </option>
                ))}
              </select>
              {formik.touched.province && formik.errors.province && (
                <p className="text-red-500 text-sm">{formik.errors.province}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">City</label>
              <select
                name="city"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  !formik.values.province
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!formik.values.province}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {formik.touched.city && formik.errors.city && (
                <p className="text-red-500 text-sm">{formik.errors.city}</p>
              )}
            </div>
          </div>

          {/* Username & Password - Two-column layout */}
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
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
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

export default AddInstitutes;
