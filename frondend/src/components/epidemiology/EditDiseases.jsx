import { useFormik } from "formik";
import { diseasesSchema } from "../../yupSchema/epidemiologySchema";
import { viewEdit } from "../../redux/actions/viewEditAction";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAllDiseasesData, updateDiseases } from "../../api/diseasesApi";
import { message } from "antd";

const EditDiseases = ({ AllViewEditReducer, viewEdit }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [userData, setUserData] = useState([]);
  const [isEnableEdit, setIsEnableEdit] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDiseasesData();

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
      diseaseCode: userData[0]?.diseaseCode || "",
      diseaseName: userData[0]?.diseaseName || "",
      category: userData[0]?.category || "",
      modeOfTransmission: userData[0]?.modeOfTransmission || "",
      description: userData[0]?.description || "",
    },
    enableReinitialize: true,
    validationSchema: diseasesSchema,
    onSubmit: async (values) => {
      try {
        const id = userData[0]?.id;

        if (!id) {
          console.error("ID not found!");
          return;
        }

        const response = await updateDiseases(id, values);
        if (response && response.message) {
          messageApi.success(response.message);
        } else {
          messageApi.error("Registration failed");
        }
      } catch (error) {
        console.error("Error updating record:", error);
      }
    },
  });

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <div className="w-full flex flex-row items-center justify-between">
          {/* Heading */}
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Edit Diseases
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

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-gray-700">Disease Code</label>
            <input
              type="text"
              name="diseaseCode"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-black"
              }`}
              value={formik.values.diseaseCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.diseaseCode && formik.errors.diseaseCode && (
              <p className="text-red-500">{formik.errors.diseaseCode}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Disease Name</label>
            <input
              type="text"
              name="diseaseName"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-black"
              }`}
              value={formik.values.diseaseName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.diseaseName && formik.errors.diseaseName && (
              <p className="text-red-500">{formik.errors.diseaseName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-300 text-black"
                }`}
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Category</option>
                <option value="Viral">Viral</option>
                <option value="Bacterial">Bacterial</option>
                <option value="Parasitic">Parasitic</option>
                <option value="Fungal">Fungal</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-red-500">{formik.errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">
                Mode of Transmission
              </label>
              <input
                type="text"
                name="modeOfTransmission"
                className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                  isEnableEdit
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-300 text-black"
                }`}
                value={formik.values.modeOfTransmission}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.modeOfTransmission &&
                formik.errors.modeOfTransmission && (
                  <p className="text-red-500">
                    {formik.errors.modeOfTransmission}
                  </p>
                )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                isEnableEdit
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-black"
              }`}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white cursor-pointer ${
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

export default connect(mapStateToProps, mapDispatchToProps)(EditDiseases);
