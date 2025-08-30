import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  eventName: Yup.string()
    .required("Event Name is required"),
  startDate: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date must be in the future"),
  startTime: Yup.string()
    .required("Start Time is required"),
  location: Yup.string()
    .required("Location is required"),
    description: Yup.string()
    .optional(),
});