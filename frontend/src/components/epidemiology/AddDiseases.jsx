import React from "react";
import { useFormik } from "formik";
import { diseasesSchema } from "../../yupSchema/epidemiologySchema";
import { message } from "antd";
import { addDiseases } from "../../api/diseasesApi";

const AddDiseases = ({ handleBack }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      diseaseName: "",
      category: "",
      modeOfTransmission: "",
      description: "",
    },
    validationSchema: diseasesSchema,
    onSubmit: async (values) => {
      try {
        const response = await addDiseases(values);

        if (response && (response.status === 200 || response.status === 201) && response.message) {
          messageApi.success(response.message);
          setTimeout(() => {
            handleBack();
          }, 1000);
        } else {
          messageApi.error(response?.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        messageApi.error("An error occurred during registration.");
      }
    },
  });

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Add Diseases
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-gray-700">Disease Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="diseaseName"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
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
              <label className="block text-gray-700">Category <span className="text-red-500">*</span></label>
              <select
                name="category"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
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
                Mode of Transmission <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="modeOfTransmission"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
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
            <label className="block text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
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
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
              onClick={() => handleBack()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDiseases;
