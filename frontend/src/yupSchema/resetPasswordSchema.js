import * as Yup from "yup";

const resetPasswordSchema = Yup.object({
  userId: Yup.string().required("User ID is required"),
  isInitial: Yup.number().oneOf([0, 1], "Initial status must be 0 or 1").required("Initial status is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .matches(/[A-Z]/, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .matches(/[a-z]/, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .matches(/[^A-Za-z0-9]/, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default resetPasswordSchema;