import React, { useState } from "react";
import { useFormik } from "formik";
import { reportSchema } from "../../yupSchema/reportSchema"; // Importing validation schema
import { FaPaperclip } from "react-icons/fa";
import { connect } from "react-redux";
import { closeViewReport } from "../../redux/actions/viewReportAction";
import { message } from "antd";
import { addReport } from "../../api/reportApi";

const Report = ({ viewReport, closeViewReport }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [file, setFile] = useState(null); // State to store the uploaded file

  const formik = useFormik({
    initialValues: {
      caseId: viewReport?.[1],
      ethnicGroup: "",
      dischargeDate: "",
      isolationStatus: "",
      isolationDateFrom: "",
      isolationDateTo: "",
      outcome: "",
      movementHistory: "",
      labResults: "",
      householdContacts: [
        { name: "", age: "", date: "", disposition: "" },
        { name: "", age: "", date: "", disposition: "" },
        { name: "", age: "", date: "", disposition: "" },
      ],
      otherContacts: [
        { name: "", age: "", date: "", disposition: "" },
        { name: "", age: "", date: "", disposition: "" },
        { name: "", age: "", date: "", disposition: "" },
      ],
      phiRemarks: "",
    },
    validationSchema: reportSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (file) {
          formData.append("file", file);
        }

        console.log(formData)

        const response = await addReport(formData);
        messageApi.success(response.message);
        setTimeout(()=>closeViewReport(), 1000)
      } catch (error) {
        console.error("Failed to update report:", error);
        messageApi.error("Failed to update report. Please try again.");
      }
    },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      {contextHolder}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-2xl font-medium mb-4">
            Communicable Disease Report
          </h1>

          {/* Ethnic Group */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Ethnic Group of the Patient
            </label>
            <select
              name="ethnicGroup"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ethnicGroup}
            >
              <option value="">Select</option>
              <option value="Sinhalese">Sinhalese</option>
              <option value="Sri Lankan Tamil">Sri Lankan Tamil</option>
              <option value="Indian Tamil">Indian Tamil</option>
              <option value="Sri Lankan Moor">Sri Lankan Moor</option>
              <option value="Burgher">Burgher</option>
              <option value="Malay">Malay</option>
              <option value="Other">Other</option>
            </select>
            {formik.touched.ethnicGroup && formik.errors.ethnicGroup && (
              <p className="text-red-500 text-sm">
                {formik.errors.ethnicGroup}
              </p>
            )}
          </div>

          {/* Date of Discharge */}
          <div className="mb-4">
            <label className="block text-gray-700">Date of Discharge</label>
            <input
              type="date"
              name="dischargeDate"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dischargeDate}
            />
            {formik.touched.dischargeDate && formik.errors.dischargeDate && (
              <p className="text-red-500 text-sm">
                {formik.errors.dischargeDate}
              </p>
            )}
          </div>

          {/* Isolation Status */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
            <div className="w-full md:w-1/3">
              <label className="block text-gray-700 font-medium mb-2">
                Where Isolated*
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isolationStatus"
                    value="Home"
                    className="accent-blue-600"
                    onChange={formik.handleChange}
                  />
                  <span>Home</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isolationStatus"
                    value="Hospital"
                    className="accent-blue-600"
                    onChange={formik.handleChange}
                  />
                  <span>Hospital</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isolationStatus"
                    value="Not Isolated"
                    className="accent-blue-600"
                    onChange={formik.handleChange}
                  />
                  <span>Not Isolated</span>
                </label>
              </div>
              {formik.touched.isolationStatus &&
                formik.errors.isolationStatus && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.isolationStatus}
                  </p>
                )}
            </div>

            {/* Isolation Date */}
            <div className="w-full md:w-1/3">
              <label className="block text-gray-700 font-medium mb-2">
                Isolation Date
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="date"
                  name="isolationDateFrom"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isolationDateFrom}
                />
                to
                <input
                  type="date"
                  name="isolationDateTo"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isolationDateTo}
                />
              </div>
              <div className="">
                {formik.touched.isolationDateFrom &&
                  formik.errors.isolationDateFrom && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.isolationDateFrom}
                    </p>
                  )}
                {formik.touched.isolationDateTo &&
                  formik.errors.isolationDateTo && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.isolationDateTo}
                    </p>
                  )}
              </div>
            </div>

            {/* Outcome */}
            <div className="w-full md:w-1/3">
              <label className="block text-gray-700 font-medium mb-2">
                Outcome*
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="outcome"
                    value="Recovered"
                    className="accent-green-600"
                    onChange={formik.handleChange}
                  />
                  <span>Recovered</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="outcome"
                    value="Died"
                    className="accent-red-600"
                    onChange={formik.handleChange}
                  />
                  <span>Died</span>
                </label>
              </div>
              {formik.touched.outcome && formik.errors.outcome && (
                <p className="text-red-500 text-sm">{formik.errors.outcome}</p>
              )}
            </div>
          </div>

          {/* Movement History */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Patient’s movement during three weeks prior to onset
            </label>
            <textarea
              name="movementHistory"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.movementHistory}
            />
            {formik.touched.movementHistory &&
              formik.errors.movementHistory && (
                <p className="text-red-500 text-sm">
                  {formik.errors.movementHistory}
                </p>
              )}
          </div>

          {/* Lab Results */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Laboratory results if available
            </label>
            <textarea
              name="labResults"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.labResults}
            />
            {formik.touched.labResults && formik.errors.labResults && (
              <p className="text-red-500 text-sm">{formik.errors.labResults}</p>
            )}
          </div>

          {/* Attach File */}
          <div className="flex flex-col gap-2">
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
            {file && <p className="text-sm text-gray-600">{file.name}</p>}
          </div>

          {/* Contacts Section */}
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-xl font-medium">Contacts Investigated</h2>

            {/* Household Contacts */}
            <h3 className="text-base text-[#080809] font-medium">
              Patient's Household
            </h3>
            <table className="w-full">
              <thead>
                <tr className="text-sm text-[#65686C]">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Age</th>
                  <th className="text-left py-2 px-4">Date of observation</th>
                  <th className="text-left py-2 px-4">Disposition</th>
                </tr>
              </thead>
              <tbody>
                {formik.values.householdContacts.map((contact, index) => (
                  <tr
                    key={index}
                    className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                  >
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        name={`householdContacts[${index}].name`}
                        value={contact.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        name={`householdContacts[${index}].age`}
                        value={contact.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="date"
                        name={`householdContacts[${index}].date`}
                        value={contact.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        name={`householdContacts[${index}].disposition`}
                        value={contact.disposition}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Other Contacts */}
            <h3 className="text-base text-[#080809] font-medium">
              Other Contacts
            </h3>
            <table className="w-full">
              <thead>
                <tr className="text-sm text-[#65686C]">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Age</th>
                  <th className="text-left py-2 px-4">Date of observation</th>
                  <th className="text-left py-2 px-4">Disposition</th>
                </tr>
              </thead>
              <tbody>
                {formik.values.otherContacts.map((contact, index) => (
                  <tr
                    key={index}
                    className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                  >
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        name={`otherContacts[${index}].name`}
                        value={contact.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        name={`otherContacts[${index}].age`}
                        value={contact.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="date"
                        name={`otherContacts[${index}].date`}
                        value={contact.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        name={`otherContacts[${index}].disposition`}
                        value={contact.disposition}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full bg-gray-200 rounded-md focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PHI Remarks */}
          <div className="mb-4">
            <label className="block text-gray-700">PHI Remarks</label>
            <textarea
              name="phiRemarks"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phiRemarks}
            />
            {formik.touched.phiRemarks && formik.errors.phiRemarks && (
              <p className="text-red-500 text-sm">{formik.errors.phiRemarks}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer"
              onClick={() => closeViewReport()}
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
    viewReport: state.viewReportReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeViewReport: () => dispatch(closeViewReport()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
