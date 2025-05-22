import { viewEdit } from "../../redux/actions/viewEditAction";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { doctorEditSchema } from "../../yupSchema/doctorSchema";
import { getAllDoctorData, updateDoctor } from "../../api/doctorApi";
import { message } from "antd";
import { getAllMohData } from "../../api/mohApi";

const EditDoctor = ({ AllViewEditReducer, viewEdit }) => {
  const [messageApi, contextHolder] = message.useMessage();
  
  const [isEnableEdit, setIsEnableEdit] = useState(true);

  const [userData, setUserData] = useState([]);
  const [mohData, setMohData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDoctorData();

        const filteredData = response.data.filter(
          (item) => item.id == AllViewEditReducer?.[1]
        );

        setUserData(filteredData);

        const mohResponse = await getAllMohData();
        setMohData(mohResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [AllViewEditReducer]);

  const formik = useFormik({
    initialValues: {
          name: userData[0]?.name || "",
          reg_number: userData[0]?.reg_number || "",
          area: userData[0]?.area || "",
          email: userData[0]?.email || "",
          phoneNumber: userData[0]?.phone || "",
      },
      enableReinitialize: true,
    validationSchema: doctorEditSchema,
    onSubmit: async (values) => {
      try {
        const id = userData[0]?.id;
    
        if (!id) {
          console.error("ID not found!");
          return;
        }

        const response = await updateDoctor(id, values);
        if (response && response.message) {
          messageApi.success(response.message);
          setTimeout(() => {
            viewEdit();
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
    <div>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <div className="w-full flex flex-row items-center justify-between">
          {/* Heading */}
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Edit Doctor
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
            <label className="block text-gray-700">Full Name {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
            <input
              type="text"
              name="name"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isEnableEdit}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-gray-700">Registration Number {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
            <input
              type="text"
              name="reg_number"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
              value={formik.values.reg_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isEnableEdit}
            />
            {formik.touched.reg_number && formik.errors.reg_number && (
              <p className="text-red-500">{formik.errors.reg_number}</p>
            )}
          </div>

          {/* Area */}
          <div>
            <label className="block text-gray-700">Area {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
            <input
              type="text"
              name="area"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
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
              <label className="block text-gray-700">Email Address {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
              <input
                type="email"
                name="email"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
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
              <label className="block text-gray-700">Phone Number {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
              <input
                type="text"
                name="phoneNumber"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
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

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white ${
                !isEnableEdit
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={isEnableEdit}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditDoctor);
