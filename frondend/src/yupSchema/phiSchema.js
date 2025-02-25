import * as Yup from "yup";

export const phiSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  registrationNumber: Yup.string()
    .matches(/^\d+$/, "Registration Number must be numbers only")
    .required("Registration Number is required"),
  moh: Yup.string().required("MOH is required"),
  area: Yup.string().required("Area is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
  username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});
