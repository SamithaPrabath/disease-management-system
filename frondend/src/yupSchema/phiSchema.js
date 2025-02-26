import * as Yup from "yup";

export const reportValidationSchema = Yup.object({
  ethnicGroup: Yup.string().required("Ethnic Group is required"),
  dischargeDate: Yup.date().required("Date of Discharge is required"),
  isolationDateFrom: Yup.date().required("Isolation start date is required"),
  isolationDateTo: Yup.date()
    .min(
      Yup.ref("isolationDateFrom"),
      "Isolation end date must be after start date"
    )
    .required("Isolation end date is required"),
  movementHistory: Yup.string().required(
    "Patient’s movement history is required"
  ),
  isolationStatus: Yup.string().required("Isolation status is required"),
  outcome: Yup.string().required("Outcome is required"),
  labResults: Yup.string().required("Laboratory results are required"),
  phiRemarks: Yup.string().required("PHI Remarks are required"),
});
