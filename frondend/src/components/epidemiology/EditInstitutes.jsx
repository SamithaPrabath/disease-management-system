import { viewEdit } from "../../redux/actions/viewEditAction";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { instituteSchema } from "../../yupSchema/epidemiologySchema";
import { sriLankaProvinces } from "../../assets/citysAndProvinces";
import { getAllInstitutesData, updateInstitutes } from "../../api/institutesApi";

const EditInstitutes = ({ AllViewEditReducer, viewEdit }) => {
  const [cities, setCities] = useState([]);
  const [isEnableEdit, setIsEnableEdit] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInstitutesData();

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
      instituteName: userData[0]?.name || "",
      registrationNumber: userData[0]?.registrationNumber || "",
      email: userData[0]?.email || "",
      phoneNumber: userData[0]?.phoneNumber || "",
      address: userData[0]?.address || "",
      province: userData[0]?.province || "",
      city: userData[0]?.city || "",
    },
    enableReinitialize: true,
    validationSchema: instituteSchema,
    onSubmit: async (values) => {
      try {
        const id = userData[0]?.id;
    
        if (!id) {
          console.error("ID not found!");
          return;
        }

        const response = await updateInstitutes(id, values);
    
        alert(response.message);
    
      } catch (error) {
        console.error("Error updating record:", error);
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
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <div className="w-full flex flex-row items-center justify-between">
          {/* Heading */}
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Edit Institutes
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
          {/* Institute Name */}
          <div>
            <label className="block text-gray-700">Institute Name</label>
            <input
              type="text"
              name="instituteName"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
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
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
              {...formik.getFieldProps("registrationNumber")}
            />
            {formik.touched.registrationNumber &&
              formik.errors.registrationNumber && (
                <p className="text-red-500">
                  {formik.errors.registrationNumber}
                </p>
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500">{formik.errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-black"
              }`}
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
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditInstitutes);
