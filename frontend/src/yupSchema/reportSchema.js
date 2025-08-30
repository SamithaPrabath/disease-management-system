import * as Yup from "yup";

export const reportSchema = Yup.object({
  caseId: Yup.string().required("Id is required"),
  ethnicGroup: Yup.string().required("Ethnic Group is required"),
  dischargeDate: Yup.date().required("Date of Discharge is required"),
  isolationStatus: Yup.string().required("Isolation status is required"),
  isolationDateFrom: Yup.date()
    .when('isolationStatus', {
      is: (status) => status !== "Not Isolated",
      then: () => Yup.date().required("Isolation start date is required"),
      otherwise: () => Yup.date().nullable()
    }),
  isolationDateTo: Yup.date()
    .when('isolationStatus', {
      is: (status) => status !== "Not Isolated",
      then: () => Yup.date()
        .min(Yup.ref("isolationDateFrom"), "Isolation end date must be after start date")
        .required("Isolation end date is required"),
      otherwise: () => Yup.date().nullable()
    }),
  movementHistory: Yup.string().required("Patient's movement history is required"),
  outcome: Yup.string().required("Outcome is required"),
  phiRemarks: Yup.string().required("PHI Remarks are required"),
});
