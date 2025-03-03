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
  const [isEnableEdit, setIsEnableEdit] = useState(true); // View mode by default
  const [userData, setUserData] = useState(null); // Start as null for loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMohData();
        const filteredData = response.data.find(
          (item) => item.id === AllViewEditReducer?.[1]
        );
        setUserData(filteredData || {});
      } catch (error) {
        console.error("Failed to fetch data:", error);
        messageApi.error("Failed to load MOH data");
      }
    };

    if (AllViewEditReducer?.[1]) fetchData();
  }, [AllViewEditReducer, messageApi]);

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      registrationNumber: userData?.registrationNumber || "",
      area: userData?.area || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber || "",
      username: userData?.userName || "",
      password: userData?.password || "",
    },
    enableReinitialize: true, // Reinitialize when userData changes
    validationSchema: mohSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const id = userData?.id;
        if (!id) {
          throw new Error("MOH ID not found");
        }

        const response = await updateMoh(id, values);
        if (response?.status === 200 && response.message) {
          messageApi.success(response.message);
          setIsEnableEdit(true);
          setTimeout(() => viewEdit(), 1000);
        } else {
          messageApi.error(response?.message || "Update failed");
        }
      } catch (error) {
        console.error("Error updating record:", error);
        messageApi.error(error.message || "An error occurred during update");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Edit MOH
          </h2>
          {isEnableEdit ? (
            <button
              className="w-[100px] text-white text-[16px] font-medium rounded-[8px] bg-[#0866FF] p-[8px] cursor-pointer hover:bg-blue-700 transition"
              onClick={() => setIsEnableEdit(false)}
            >
              Edit
            </button>
          ) : (
            <button
              className="w-[100px] text-white text-[16px] font-medium rounded-[8px] bg-red-500 p-[8px] cursor-pointer hover:bg-red-600 transition"
              onClick={() => {
                formik.resetForm();
                setIsEnableEdit(true);
              }}
            >
              Cancel
            </button>
          )}
        </div>

        {userData ? (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isEnableEdit}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                value={formik.values.registrationNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isEnableEdit}
              />
              {formik.touched.registrationNumber && formik.errors.registrationNumber && (
                <p className="text-red-500 text-sm">{formik.errors.registrationNumber}</p>
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
                    : "bg-gray-200 text-black"
                }`}
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isEnableEdit}
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
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit}
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
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
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
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit}
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
                  className={`w-full px-4 py-2 rounded-md focus:outline-none pr-10 ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit}
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
                  !isEnableEdit
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={isEnableEdit}
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
                onClick={() => viewEdit()}
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-700">Loading MOH data...</p>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  AllViewEditReducer: state.allViewEditReducer,
});

const mapDispatchToProps = (dispatch) => ({
  viewEdit: () => dispatch(viewEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMOH);