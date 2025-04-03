import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { newCaseSchema } from "../../yupSchema/newCaseSchema";
import { FaPaperclip } from "react-icons/fa";
import { addNewCase } from "../../api/allCasesApi";
import { message } from "antd";
import { geDiseasesList } from "../../api/diseasesApi";
import { getInstitutesList } from "../../api/institutesApi";
import { connect } from "react-redux";

const NewCase = ({ AllLogins, handleViewNewCase }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [diseasesList, setDiseasesList] = useState([]);
  const [institutesList, setInstitutesList] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  const [notifier, setNotifier] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diseases = await geDiseasesList();
        const institutes = await getInstitutesList();

        setDiseasesList(diseases.data);
        setInstitutesList(institutes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        messageApi.error("Failed to load required data");
      }
    };

    fetchData();
  }, [messageApi]);

  useEffect(() => {
    setUserTypeId(AllLogins.data.userTypeId);
    setNotifier(AllLogins.data.userTypeId);
  }, [AllLogins]);

  const formik = useFormik({
    initialValues: {
      patientName: "",
      age: "",
      sex: "",
      guardian: "",
      diseaseName: "",
      caseStatus: "",
      natureOfConfirmation: "",
      confirmedBy: "",
      nicNo: "",
      phoneNumber: "",
      instituteId: "",
      dateOfOnset: "",
      dateOfAdmission: "",
      ward: "",
      bhtNumber: "",
      address: "",
      labResult: "",
      file: null,
    },
    validationSchema: newCaseSchema,
    validate: (values) => {
      const errors = {};

      if (!values.caseStatus) {
        errors.caseStatus = "Case Status is required";
      }

      if (values.caseStatus === "Confirmed" && !values.natureOfConfirmation) {
        errors.natureOfConfirmation =
          "Nature of Confirmation is required for confirmed cases";
      }

      if (values.age && Number(values.age) < 18 && !values.guardian) {
        errors.guardian = "Guardian is required for patients under 18";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      if (values.caseStatus === "Confirmed") {
        const currentDate = new Date().toISOString().split("T")[0];
        values.confirmedDate = currentDate;
      }

      if (AllLogins) {
        const currentDate = new Date().toISOString().split("T")[0];
        values.notifiedDate = currentDate;
      }

      Object.entries(values).forEach(([key, value]) => {
        if (key === "file" && value) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });
      if (remarks) formData.append("remarks", remarks);
      if (userTypeId) formData.append("confirmedBy", userTypeId);
      if (notifier) formData.append("notifier", notifier);
      
      try {
        const response = await addNewCase(formData);

        if (response?.message) {
          messageApi.success(response.message);
          resetForm();
          setRemarks("");
          setTimeout(() => handleViewNewCase(), 1000);
        } else {
          throw new Error("No response message");
        }
      } catch (error) {
        console.error("Error during case registration:", error);
        messageApi.error("Failed to register case. Please try again.");
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("file", file);
  };

  useEffect(() => {
    const age = Number(formik.values.age);
    if (age < 18) {
      formik.setFieldValue("nicNo", "");
    } else {
      formik.setFieldValue("guardian", "");
    }
  }, [formik.values.age]);

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Notification of a Communicable Disease
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">Name of Patient<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="patientName"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.patientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.patientName && formik.errors.patientName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.patientName}
                </p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">Age<span className="text-red-500">*</span></label>
              <input
                type="number"
                name="age"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min="0"
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm">{formik.errors.age}</p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">Sex<span className="text-red-500">*</span></label>
              <select
                name="sex"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.sex}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.sex && formik.errors.sex && (
                <p className="text-red-500 text-sm">{formik.errors.sex}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">
                {Number(formik.values.age) < 18 ? "Guardian" : "Guardian"}
                <span className="text-red-500">{Number(formik.values.age) < 18 ? "*" : ""}</span>
              </label>
              <input
                type="text"
                name="guardian"
                className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                  Number(formik.values.age) >= 18
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                value={formik.values.guardian}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={Number(formik.values.age) >= 18}
              />
              {formik.touched.guardian && formik.errors.guardian && (
                <p className="text-red-500 text-sm">{formik.errors.guardian}</p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">Disease<span className="text-red-500">*</span></label>
              <select
                name="diseaseName"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.diseaseName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Disease</option>
                {diseasesList.map((disease) => (
                  <option key={disease.id} value={disease.diseaseName}>
                    {disease.diseaseName}
                  </option>
                ))}
              </select>
              {formik.touched.diseaseName && formik.errors.diseaseName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.diseaseName}
                </p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">Case Status<span className="text-red-500">*</span></label>
              <select
                name="caseStatus"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.caseStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Status</option>
                <option value="Suspect">Suspect</option>
                <option value="Confirmed">Confirmed</option>
              </select>
              {formik.touched.caseStatus && formik.errors.caseStatus && (
                <p className="text-red-500 text-sm">
                  {formik.errors.caseStatus}
                </p>
              )}
            </div>
          </div>

          {formik.values.caseStatus === "Confirmed" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <label className="block text-gray-700">
                  Nature of Confirmation*
                </label>
                <div className="space-y-2">
                  {[
                    "Clinical only",
                    "Clinical and epidemiological",
                    "Clinical and bacteriological",
                    "Clinical and serological",
                    "Clinical, bacteriological and serological",
                    "Clinical and direct microscopy",
                  ].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={`nature-${option}`}
                        name="natureOfConfirmation"
                        value={option}
                        checked={formik.values.natureOfConfirmation === option}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <label
                        htmlFor={`nature-${option}`}
                        className="ml-2 text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                  {formik.touched.natureOfConfirmation &&
                    formik.errors.natureOfConfirmation && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.natureOfConfirmation}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="block text-gray-700">Remarks</label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">
                NIC No<span className="text-red-500">{Number(formik.values.age) >= 18 ? "*" : ""}</span>
              </label>
              <input
                type="text"
                name="nicNo"
                className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                  Number(formik.values.age) < 18
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                value={formik.values.nicNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={Number(formik.values.age) < 18}
              />
              {formik.touched.nicNo && formik.errors.nicNo && (
                <p className="text-red-500 text-sm">{formik.errors.nicNo}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">Phone Number<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">Institute<span className="text-red-500">*</span></label>
              <select
                name="instituteId"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.instituteId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Institute</option>
                {institutesList.map((institute) => (
                  <option
                    key={institute.id}
                    value={institute.id}
                  >
                    {institute.name}
                  </option>
                ))}
              </select>
              {formik.touched.instituteId && formik.errors.instituteId && (
                <p className="text-red-500 text-sm">
                  {formik.errors.instituteId}
                </p>
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
                max={new Date().toISOString().split("T")[0]}
              />
              {formik.touched.dateOfOnset && formik.errors.dateOfOnset && (
                <p className="text-red-500 text-sm">
                  {formik.errors.dateOfOnset}
                </p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">Date of Admission<span className="text-red-500">*</span></label>
              <input
                type="date"
                name="dateOfAdmission"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.dateOfAdmission}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max={new Date().toISOString().split("T")[0]}
              />
              {formik.touched.dateOfAdmission &&
                formik.errors.dateOfAdmission && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.dateOfAdmission}
                  </p>
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
                <p className="text-red-500 text-sm">{formik.errors.ward}</p>
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
                <p className="text-red-500 text-sm">
                  {formik.errors.bhtNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="block text-gray-700">
              Address of the Patient<span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          {/* Placeholder for location component */}
          <div className="text-gray-700">Location Here</div>

          <div className="flex flex-col gap-3">
            <label className="block text-gray-700">
              Laboratory Results (if available)
            </label>
            <textarea
              name="labResult"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.labResult}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
            />
            <label
              htmlFor="file-upload"
              className="w-fit flex items-center gap-2 px-4 py-2 bg-gray-200 text-black font-medium rounded-md hover:bg-gray-300 transition duration-200 cursor-pointer"
            >
              <FaPaperclip className="text-lg" />
              Attach Files
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            {formik.values.file && (
              <p className="text-gray-600 text-sm">{formik.values.file.name}</p>
            )}
          </div>

          <div className="flex justify-start gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200 cursor-pointer"
              onClick={handleViewNewCase}
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
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps, null)(NewCase);
