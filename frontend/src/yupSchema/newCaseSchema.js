import * as Yup from "yup";

export const newCaseSchema = Yup.object({
  patientName: Yup.string().required("Name of the patient is required"),
  age: Yup.number().required("Age is required").positive().integer(),
  sex: Yup.string().required("Sex is required"),
  diseaseName: Yup.string().required("Disease is required"),
  caseStatus: Yup.string().required("Case status is required"),
  nicNo: Yup.string()
    .test('nic-format', 'NIC must be either 9 digits followed by V or 12 digits', (value) => {
      if (!value) return true; // Allow empty if not required
      const oldFormat = /^[0-9]{9}[Vv]$/; // 9 digits + V
      const newFormat = /^[0-9]{12}$/; // 11 digits
      return oldFormat.test(value) || newFormat.test(value);
    }),
  phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone Number must be 10 digits").required("Phone number is required"),
  instituteId: Yup.string().required("Institute is required"),
  dateOfOnset: Yup.date().required("Date of Onset is required"),
  dateOfAdmission: Yup.date().required("Date of Admission is required"),
  address: Yup.string().required("Address is required"),
});