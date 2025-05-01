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

  const [files, setFiles] = useState([]); // State to store multiple uploaded files

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
        
        // Add the case ID
        formData.append("caseId", values.caseId);
        
        // Add other form fields
        formData.append("ethnicGroup", values.ethnicGroup);
        formData.append("dischargeDate", values.dischargeDate);
        formData.append("isolationStatus", values.isolationStatus);
        formData.append("isolationDateFrom", values.isolationDateFrom);
        formData.append("isolationDateTo", values.isolationDateTo);
        formData.append("outcome", values.outcome);
        formData.append("movementHistory", values.movementHistory);
        formData.append("labResults", values.labResults);
        formData.append("phiRemarks", values.phiRemarks);
        
        // Handle the householdContacts array properly
        // Filter out empty contacts
        const filteredHouseholdContacts = values.householdContacts.filter(
          contact => contact.name || contact.age || contact.date || contact.disposition
        );
        
        // Handle each contact individually for better backend processing
        filteredHouseholdContacts.forEach((contact, index) => {
          if (contact.name) formData.append(`householdContacts[${index}][name]`, contact.name);
          if (contact.age) formData.append(`householdContacts[${index}][age]`, contact.age);
          if (contact.date) formData.append(`householdContacts[${index}][date]`, contact.date);
          if (contact.disposition) formData.append(`householdContacts[${index}][disposition]`, contact.disposition);
        });
        
        // Handle the otherContacts array properly
        // Filter out empty contacts
        const filteredOtherContacts = values.otherContacts.filter(
          contact => contact.name || contact.age || contact.date || contact.disposition
        );
        
        // Handle each contact individually for better backend processing
        filteredOtherContacts.forEach((contact, index) => {
          if (contact.name) formData.append(`otherContacts[${index}][name]`, contact.name);
          if (contact.age) formData.append(`otherContacts[${index}][age]`, contact.age);
          if (contact.date) formData.append(`otherContacts[${index}][date]`, contact.date);
          if (contact.disposition) formData.append(`otherContacts[${index}][disposition]`, contact.disposition);
        });

        // Also include stringified versions as fallback
        formData.append("householdContactsJSON", JSON.stringify(filteredHouseholdContacts));
        formData.append("otherContactsJSON", JSON.stringify(filteredOtherContacts));

        // Append all files with the same field name to allow the backend to receive them as an array
        if (files.length > 0) {
          files.forEach(file => {
            formData.append("files", file);
          });
        }

        // For debugging - check formData content
        console.log("Sending report data to backend:");
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]));
        }

        const response = await addReport(formData);
        if (response.status === 200 || response.status === 201) {
          messageApi.success(response.message);
          setTimeout(() => closeViewReport(), 1000);
        } else {
          messageApi.error(response.message || "Failed to update report. Please try again.");
        }
      } catch (error) {
        console.error("Failed to update report:", error);
        messageApi.error("Failed to update report. Please try again.");
      }
    },
  });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setFiles([]);
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
              Patient's movement during three weeks prior to onset
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

          {/* Attach Files */}
          <div className="flex flex-col gap-2 mb-4">
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
              multiple
            />
            {files.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">Selected files ({files.length}):</p>
                  <button 
                    type="button" 
                    className="text-blue-500 hover:text-blue-700 text-sm"
                    onClick={clearAllFiles}
                  >
                    Clear All
                  </button>
                </div>
                <ul className="pl-5 text-sm text-gray-600 list-disc">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{file.name}</span>
                      <button 
                        type="button" 
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() => removeFile(index)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                  <th className="text-left py-2 px-4">Observation</th>
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
                  <th className="text-left py-2 px-4">Observation</th>
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
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
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
