import React, { useState } from "react";
import { useFormik } from "formik";
import {sriLankaProvinces} from "../../assets/citysAndProvinces";
import { instituteSchema } from "../../yupSchema/epidemiologySchema";
import { message } from "antd";
import { registerInstitutes } from "../../api/institutesApi";

const AddInstitutes = ({ handleBack }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [cities, setCities] = useState([]);

  const formik = useFormik({
    initialValues: {
      instituteName: "",
      registrationNumber: "",
      email: "",
      phoneNumber: "",
      address: "",
      province: "",
      city: "",
      role: "institute",
    },
    validationSchema: instituteSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerInstitutes(values);
  
        if (response && response.message) {
          messageApi.success(response.message);
        } else {
          messageApi.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration.");
      }
    },
  });

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    formik.setFieldValue("province", province);
    
    // Find selected province's cities
    const selected = sriLankaProvinces.find((p) => p.province === province);
    setCities(selected ? selected.cities : []);
    
    formik.setFieldValue("city", ""); // Reset city selection
  };

  return (
    <>
    {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Add Institutes
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Institute Name */}
          <div>
            <label className="block text-gray-700">Institute Name</label>
            <input
              type="text"
              name="instituteName"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              {...formik.getFieldProps("instituteName")}
            />
            {formik.touched.instituteName && formik.errors.instituteName && (
              <p className="text-red-500">{formik.errors.instituteName}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-gray-700">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              {...formik.getFieldProps("registrationNumber")}
            />
            {formik.touched.registrationNumber && formik.errors.registrationNumber && (
              <p className="text-red-500">{formik.errors.registrationNumber}</p>
            )}
          </div>

          {/* Two-column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Email Address */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500">{formik.errors.phone}</p>
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
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500">{formik.errors.address}</p>
            )}
          </div>

          {/* Two-column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Province */}
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
                {sriLankaProvinces.map((province, index) => (
                  <option key={index} value={province.province}>
                    {province.province}
                  </option>
                ))}
              </select>
              {formik.touched.province && formik.errors.province && (
                <p className="text-red-500">{formik.errors.province}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700">City</label>
              <select
                name="city"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!formik.values.province}
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {formik.touched.city && formik.errors.city && (
                <p className="text-red-500">{formik.errors.city}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
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

export default AddInstitutes;