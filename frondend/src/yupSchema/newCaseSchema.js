import * as Yup from "yup";

export const newCaseSchema = Yup.object({
  patientName: Yup.string().required("Name of the patient is required"),
  age: Yup.number().required("Age is required").positive().integer(),
  sex: Yup.string().required("Sex is required"),
  diseaseName: Yup.string().required("Disease is required"),
  caseStatus: Yup.string().required("Case status is required"),
  phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone Number must be 10 digits").required("Phone number is required"),
  instituteId: Yup.string().required("Institute is required"),
  dateOfOnset: Yup.date().required("Date of Onset is required"),
  dateOfAdmission: Yup.date().required("Date of Admission is required"),
  ward: Yup.string().required("Ward is required"),
  bhtNumber: Yup.string().required("B.H.T. Number is required"),
  address: Yup.string().required("Address is required"),
});