import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  eventName: Yup.string()
    .required("Event Name is required")
    .min(3, "Event Name must be at least 3 characters"),
  startDate: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date must be in the future"),
  startTime: Yup.string()
    .required("Start Time is required"),
  location: Yup.string()
    .required("Location is required")
    .min(5, "Location must be at least 5 characters"),
  details: Yup.string()
    .optional(),
  photo: Yup.mixed()
    .nullable()
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true; // No file is acceptable
      return value.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true; // No file is acceptable
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    }),
});