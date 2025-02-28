import { viewEdit } from "../../redux/actions/viewEditAction";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { mohSchema } from "../../yupSchema/epidemiologySchema";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getAllMohData, updateMoh } from "../../api/mohApi";
import { message } from "antd";

const EditMOH = ({ AllViewEditReducer, viewEdit }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [showPassword, setShowPassword] = useState(false);
  const [isEnableEdit, setIsEnableEdit] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMohData();

        const filteredData = data.filter(
          (item) => item.id == AllViewEditReducer?.[1]
        );

        setUserData(filteredData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [AllViewEditReducer]);

  const formik = useFormik({
    initialValues: {
      fullName: userData[0]?.name || "",
      registrationNumber: userData[0]?.registrationNumber || "",
      area: userData[0]?.area || "",
      email: userData[0]?.email || "",
      phoneNumber: userData[0]?.phoneNumber || "",
      username: userData[0]?.userName || "",
      password: userData[0]?.password || "",
    },
    enableReinitialize: true,
    validationSchema: mohSchema,
    onSubmit: async (values) => {
      try {
        const id = userData[0]?.id;
    
        if (!id) {
          console.error("ID not found!");
          return;
        }

        const response = await updateMoh(id, values);
    
        if (response && response.message) {
          messageApi.success(response.message);
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
    <div>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <div className="w-full flex flex-row items-center justify-between">
          {/* Heading */}
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Edit MOH
          </h2>

          {isEnableEdit ? (
            <button
              className="w-[100px] text-white text-[16px] font-medium rounded-[8px] bg-[#0866FF] p-[8px] cursor-pointer"
              onClick={() => setIsEnableEdit(false)}
            >
              Edit
            </button>
          ) : (
            <button
              className="w-[100px] text-white text-[16px] font-medium rounded-[8px] bg-red-500 p-[8px] cursor-pointer"
              onClick={() => setIsEnableEdit(true)}
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-black"
              }`}
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
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-black"
              }`}
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

          {/* Area */}
          <div>
            <label className="block text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-black"
              }`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-300 text-black"
                }`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-300 text-black"
                }`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-300 text-black"
                }`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-300 text-black"
                }`}
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
                !isEnableEdit && formik.isValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={isEnableEdit || !formik.isValid}
            >
              Submit
            </button>

            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
              onClick={() => viewEdit()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllViewEditReducer: state.allViewEditReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  viewEdit: () => dispatch(viewEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMOH);
