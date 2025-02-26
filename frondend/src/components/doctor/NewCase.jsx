import React, { useEffect } from "react";
import { useFormik } from "formik";
import { newCaseSchema } from "../../yupSchema/newCaseSchema";
import { FaPaperclip } from "react-icons/fa";

const NewCase = ({ handleViewNewCase }) => {
  const formik = useFormik({
    initialValues: {
      patientName: "",
      age: "",
      sex: "",
      guardian: "",
      disease: "",
      caseStatus: "",
      nicNo: "",
      telephone: "",
      institute: "",
      dateOfOnset: "",
      dateOfAdmission: "",
      ward: "",
      bhtNumber: "",
      address: "",
      labResult: "",
      file: null, // Add file to initialValues
    },
    validationSchema: newCaseSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      console.log("Form values:", values);
      // Here you can send formData to your backend
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
  };

  useEffect(() => {
    if (formik.values.age < 18) {
      formik.setFieldValue("nicNo", ""); // Clear NIC No if age < 18
      formik.setFieldValue("guardian", ""); // Clear guardian if age >= 18
    } else {
      formik.setFieldValue("guardian", ""); // Clear guardian if age >= 18
    }
  }, [formik.values.age]);

  return (
    <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
      <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
        Notification of a communicable disease
      </h2>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-3">
          <div className="w-1/2 flex flex-col gap-3">
            <label className="block text-gray-700">Name of patient*</label>
            <input
              type="text"
              name="patientName"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.patientName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.patientName && formik.errors.patientName && (
              <p className="text-red-500">{formik.errors.patientName}</p>
            )}
          </div>

          <div className="w-1/4 flex flex-col gap-3">
            <label className="block text-gray-700">Age</label>
            <input
              type="text"
              name="age"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-500">{formik.errors.age}</p>
            )}
          </div>

          <div className="w-1/4 flex flex-col gap-3">
            <label className="block text-gray-700">Sex</label>
            <select
              name="sex"
              className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md"
              value={formik.values.sex}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formik.touched.sex && formik.errors.sex && (
              <p className="text-red-500">{formik.errors.sex}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="w-1/2 flex flex-col gap-3">
            <label className="block text-gray-700">
              Pediatric Patients-Name of Mother /Father /Guardian
            </label>
            <input
              type="text"
              name="guardian"
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none
              ${formik.values.age >= 18 ? "cursor-not-allowed" : ""}
              `}
              value={formik.values.guardian}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.age >= 18} // Disable if age >= 18
            />
            {formik.touched.guardian && formik.errors.guardian && (
              <p className="text-red-500">{formik.errors.guardian}</p>
            )}
          </div>

          <div className="w-1/4 flex flex-col gap-3">
            <label className="block text-gray-700">Disease</label>
            <select
              name="sex"
              className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md"
              value={formik.values.disease}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Disease</option>
              <option value="">option</option>
            </select>
            {formik.touched.disease && formik.errors.disease && (
              <p className="text-red-500">{formik.errors.disease}</p>
            )}
          </div>

          <div className="w-1/4 flex flex-col gap-3">
            <label className="block text-gray-700">Case Status</label>
            <select
              name="sex"
              className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md"
              value={formik.values.caseStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Status</option>
              <option value="Suspect">Suspect</option>
              <option value="Confirmed">Confirmed</option>
            </select>
            {formik.touched.caseStatus && formik.errors.caseStatus && (
              <p className="text-red-500">{formik.errors.caseStatus}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="w-1/2 flex flex-col gap-3">
            <label className="block text-gray-700">NIC No</label>
            <input
              type="text"
              name="nicNo"
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none
              ${formik.values.age < 18 ? "cursor-not-allowed" : ""}
              `}
              value={formik.values.nicNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.age < 18} // Disable if age < 18
            />
            {formik.touched.nicNo && formik.errors.nicNo && (
              <p className="text-red-500">{formik.errors.nicNo}</p>
            )}
          </div>

          <div className="w-1/2 flex flex-col gap-3">
            <label className="block text-gray-700">Telephone Number</label>
            <input
              type="text"
              name="telephone"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.telephone && formik.errors.telephone && (
              <p className="text-red-500">{formik.errors.telephone}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="w-1/2 flex flex-col gap-3">
            <label className="block text-gray-700">Institute*</label>
            <input
              type="text"
              name="institute"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.institute}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.institute && formik.errors.institute && (
              <p className="text-red-500">{formik.errors.institute}</p>
            )}
          </div>

          <div className="w-1/4 flex flex-col gap-3">
            <label className="block text-gray-700">Date of Onset</label>
            <input
              type="date"
              name="dateOfOnset"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.dateOfOnset}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateOfOnset && formik.errors.dateOfOnset && (
              <p className="text-red-500">{formik.errors.dateOfOnset}</p>
            )}
          </div>

          <div className="w-1/4 flex flex-col gap-3">
            <label className="block text-gray-700">Date of Admission*</label>
            <input
              type="date"
              name="dateOfAdmission"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.dateOfAdmission}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateOfAdmission &&
              formik.errors.dateOfAdmission && (
                <p className="text-red-500">{formik.errors.dateOfAdmission}</p>
              )}
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="w-1/2 flex flex-col gap-3">
            <label className="block text-gray-700">Ward</label>
            <input
              type="text"
              name="ward"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.ward}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.ward && formik.errors.ward && (
              <p className="text-red-500">{formik.errors.ward}</p>
            )}
          </div>

          <div className="w-1/2 flex flex-col gap-3">
            <label className="block text-gray-700">B.H.T Number</label>
            <input
              type="text"
              name="bhtNumber"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.bhtNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.bhtNumber && formik.errors.bhtNumber && (
              <p className="text-red-500">{formik.errors.bhtNumber}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="block text-gray-700">Address of the Patient*</label>
          <textarea
            name="address"
            className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500">{formik.errors.address}</p>
          )}
        </div>

        <div>Location Here</div>

        <div className="flex flex-col gap-3">
          <label className="block text-gray-700">
            Laboratory results if available
          </label>
          <textarea
            name="labResult"
            className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
            value={formik.values.labResult}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="file-upload"
            className="w-1/8 flex items-center gap-2 px-4 py-2 bg-gray-200 text-black font-medium rounded-md hover:bg-gray-300 transition duration-200 cursor-pointer"
          >
            <FaPaperclip className="text-lg" />
            Attach Files
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-left gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
            onClick={() => handleViewNewCase()}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCase;
