import { useFormik } from "formik";
import { reportValidationSchema } from "../../yupSchema/phiSchema"; // Importing validation schema
import { FaPaperclip } from "react-icons/fa";
import { connect } from "react-redux";
import {closeViewReport} from '../../redux/actions/viewReport'

const Report = ({handleBack, closeViewReport}) => {
  const formik = useFormik({
    initialValues: {
      ethnicGroup: "",
      dischargeDate: "",
      isolationStatus: "",
      isolationDateFrom: "",
      isolationDateTo: "",
      outcome: "",
      movementHistory: "",
      labResults: "",
      phiRemarks: "",
    },
    validationSchema: reportValidationSchema, // Apply validation schema here
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
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
            <option value="Group A">Group A</option>
            <option value="Group B">Group B</option>
          </select>
          {formik.touched.ethnicGroup && formik.errors.ethnicGroup && (
            <p className="text-red-500 text-sm">{formik.errors.ethnicGroup}</p>
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
          {/* Isolation Status */}
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
          {formik.touched.movementHistory && formik.errors.movementHistory && (
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
          <input id="file-upload" type="file" className="hidden" />
        </div>

        {/* Contacts Section */}
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-xl font-medium">Contacts Investigated</h2>

          <h3 className="text-base text-[#080809] font-medium">
            Patient's Household
          </h3>

          <div className="">
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
                {[1, 2, 3].map((_, index) => (
                  <tr
                    key={index}
                    className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                  >
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        name={`householdName${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        placeholder="Enter Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[`householdName${index}`] || ""}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        name={`householdAge${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        placeholder="Enter Age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[`householdAge${index}`] || ""}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="date"
                        name={`householdObservationDate${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values[`householdObservationDate${index}`] ||
                          ""
                        }
                      />
                    </td>
                    <td className="py-2 px-4">
                      <select
                        name={`householdDisposition${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values[`householdDisposition${index}`] || ""
                        }
                      >
                        <option value="">Select Disposition</option>
                        <option value="Home">Home</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Quarantine">Quarantine</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
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
                {[1, 2, 3].map((_, index) => (
                  <tr
                    key={index}
                    className="text-sm bg-[#E2E5E9] border-b-3 border-solid border-white"
                  >
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        name={`otherName${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        placeholder="Enter Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[`otherName${index}`] || ""}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        name={`otherAge${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        placeholder="Enter Age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[`otherAge${index}`] || ""}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="date"
                        name={`otherObservationDate${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values[`otherObservationDate${index}`] || ""
                        }
                      />
                    </td>
                    <td className="py-2 px-4">
                      <select
                        name={`otherDisposition${index}`}
                        className="w-full px-2 py-1 bg-gray-200 rounded-md focus:outline-none"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[`otherDisposition${index}`] || ""}
                      >
                        <option value="">Select Disposition</option>
                        <option value="Home">Home</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Quarantine">Quarantine</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            className={`px-6 py-2 rounded-md text-white ${
              formik.isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!formik.isValid}
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
            onClick={() => closeViewReport()}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeViewReport: () => dispatch(closeViewReport()),
});

export default connect(null, mapDispatchToProps)(Report);