import * as Yup from "yup";

const resetPasswordSchema = Yup.object({
  userId: Yup.string().required("User ID is required"),
  isInitial: Yup.number().oneOf([0, 1], "Initial status must be 0 or 1").required("Initial status is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default resetPasswordSchema;