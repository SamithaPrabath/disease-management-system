import { useFormik } from "formik";
import { diseasesSchema } from "../../yupSchema/epidemiologySchema";
import { viewEdit } from "../../redux/actions/viewEditAction";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAllDiseasesData, updateDiseases } from "../../api/diseasesApi";
import { message } from "antd";

const EditDiseases = ({ AllViewEditReducer, viewEdit }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setUserData] = useState(null); // Start as null to handle loading
  const [isEnableEdit, setIsEnableEdit] = useState(true); // Edit mode disabled by default

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDiseasesData();
        const filteredData = response.data.find(
          (item) => item.id === AllViewEditReducer?.[1]
        );
        setUserData(filteredData || {});
      } catch (error) {
        console.error("Failed to fetch data:", error);
        messageApi.error("Failed to load disease data");
      }
    };

    if (AllViewEditReducer?.[1]) fetchData();
  }, [AllViewEditReducer, messageApi]);

  const formik = useFormik({
    initialValues: {
      id: userData?.id || "",
      diseaseName: userData?.diseaseName || "",
      category: userData?.category || "",
      modeOfTransmission: userData?.modeOfTransmission || "",
      description: userData?.description || "",
    },
    enableReinitialize: true, // Reinitialize when userData changes
    validationSchema: diseasesSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const id = values.id;
        if (!id) {
          throw new Error("Disease ID not found");
        }

        const response = await updateDiseases(id, values);
        if (response?.message) {
          messageApi.success(response.message);
          setIsEnableEdit(true); // Disable edit mode after success
          setTimeout(() => viewEdit(), 1000);
        } else {
          messageApi.error("Update failed");
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
            Edit Diseases
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
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-gray-700">Disease Code {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
              <input
                type="text"
                name="id"
                className="w-full px-4 py-2 rounded-md focus:outline-none bg-gray-300 text-gray-500 cursor-not-allowed"
                value={formik.values.id}
                disabled // Always disabled
              />
            </div>

            <div>
              <label className="block text-gray-700">Disease Name {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
              <input
                type="text"
                name="diseaseName"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                }`}
                value={formik.values.diseaseName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isEnableEdit}
              />
              {formik.touched.diseaseName && formik.errors.diseaseName && (
                <p className="text-red-500 text-sm">{formik.errors.diseaseName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Category {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
                <select
                  name="category"
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit}
                >
                  <option value="">Select Category</option>
                  <option value="Viral">Viral</option>
                  <option value="Bacterial">Bacterial</option>
                  <option value="Parasitic">Parasitic</option>
                  <option value="Fungal">Fungal</option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-sm">{formik.errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700">Mode of Transmission {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
                <input
                  type="text"
                  name="modeOfTransmission"
                  className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                    isEnableEdit
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-black"
                  }`}
                  value={formik.values.modeOfTransmission}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isEnableEdit}
                />
                {formik.touched.modeOfTransmission && formik.errors.modeOfTransmission && (
                  <p className="text-red-500 text-sm">{formik.errors.modeOfTransmission}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Description {!isEnableEdit ? <span className="text-red-500">*</span> : ""}</label>
              <textarea
                name="description"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-black"
                  }`}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isEnableEdit}
                rows={4}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm">{formik.errors.description}</p>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className={`px-6 py-2 rounded-md text-white cursor-pointer ${
                  !isEnableEdit
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={isEnableEdit}
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
          <p className="text-gray-700">Loading disease data...</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditDiseases);