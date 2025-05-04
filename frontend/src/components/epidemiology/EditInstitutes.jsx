import { useFormik } from "formik";
import { instituteEditSchema } from "../../yupSchema/epidemiologySchema";
import { viewEdit } from "../../redux/actions/viewEditAction";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getAllInstitutesData,
  updateInstitutes,
} from "../../api/institutesApi";
import { message } from "antd";
import { sriLankaProvinces } from "../../assets/citysAndProvinces";

const EditInstitutes = ({ AllViewEditReducer, viewEdit }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setUserData] = useState(null); // Start as null for loading state
  const [isEnableEdit, setIsEnableEdit] = useState(true); // View mode by default
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllInstitutesData();
        const filteredData = response.data.find(
          (item) => item.id === AllViewEditReducer?.[1]
        );
        setCities([filteredData?.city] || []);
        setUserData(filteredData || {});
      } catch (error) {
        console.error("Failed to fetch data:", error);
        messageApi.error("Failed to load institute data");
      }
    };

    if (AllViewEditReducer?.[1]) fetchData();
  }, [AllViewEditReducer, messageApi]);

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber || "",
      address: userData?.address || "",
      province: userData?.province || "",
      city: userData?.city || "",
    },
    enableReinitialize: true, // Reinitialize when userData changes
    validationSchema: instituteEditSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const id = userData?.id;
        if (!id) {
          throw new Error("Institute ID not found");
        }

        const response = await updateInstitutes(id, values);
        if (response?.status === 200 && response.message) {
          messageApi.success(response.message);
          setIsEnableEdit(true); // Switch back to view mode on success
          setTimeout(() => viewEdit(), 1000);
        } else {
          messageApi.error(response?.message || "Update failed");
        }
      } catch (error) {
        console.error("Error updating record:", error);
        messageApi.error(error.message || "An error occurred during update");
      } finally {
        setSubmitting(false); // Ensure submitting state is reset
      }
    },
  });

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    formik.setFieldValue("province", province);

    const selected = sriLankaProvinces.find((p) => p.province === province);
    setCities(selected ? selected.cities : []);
  };

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Edit Institutes
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
              onClick={() => setIsEnableEdit(true)}
            >
              Cancel
            </button>
          )}
        </div>

        {userData ? (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Institute Name */}
            <div>
              <label className="block text-gray-700">Institute Name {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                {...formik.getFieldProps("name")}
                disabled={isEnableEdit}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Two-column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Email Address */}
              <div>
                <label className="block text-gray-700">Email Address {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  {...formik.getFieldProps("email")}
                  disabled={isEnableEdit}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700">Phone Number {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  {...formik.getFieldProps("phoneNumber")}
                  disabled={isEnableEdit}
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
              <label className="block text-gray-700">Address {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
              <input
                type="text"
                name="address"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                {...formik.getFieldProps("address")}
                disabled={isEnableEdit}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm">{formik.errors.address}</p>
              )}
            </div>

            {/* Two-column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Province */}
              <div>
                <label className="block text-gray-700">Province {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
                <select
                  name="province"
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.province}
                  onChange={handleProvinceChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit}
                >
                  {isEnableEdit ? (
                    <option value={formik.values.province}>
                      {formik.values.province}
                    </option>
                  ) : (
                    sriLankaProvinces.map((province) => (
                      <option key={province.province} value={province.province}>
                        {province.province}
                      </option>
                    ))
                  )}
                </select>
                {formik.touched.province && formik.errors.province && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.province}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-gray-700">City {!isEnableEdit ? <span className="text-red-500">*</span> : ""}  </label>
                <select
                  name="city"
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit || !formik.values.province
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit || !formik.values.province}
                >
                  {isEnableEdit ? (
                    <option value={formik.values.city}>
                      {formik.values.city}
                    </option>
                  ) : (
                    cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))
                  )}
                </select>
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500 text-sm">{formik.errors.city}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className={`px-6 py-2 rounded-md text-white cursor-pointer ${
                  !isEnableEdit && formik.isValid && !formik.isSubmitting
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={
                  isEnableEdit || !formik.isValid || formik.isSubmitting
                }
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer transition"
                onClick={() => viewEdit()}
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-700">Loading institute data...</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditInstitutes);
