import * as Yup from "yup";

export const doctorSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    reg_number: Yup.string().required("Registration Number is required"),
    area: Yup.string().required("Area is required"),
    email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
    .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
    password: Yup.string()
    .min(8, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .matches(/[A-Z]/, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .matches(/[a-z]/, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .matches(/[^A-Za-z0-9]/, "Password must be at least 8 characters, one capital letter, one lowercase letter, one symbol")
    .required("Password is required"),
  });

  export const doctorEditSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    reg_number: Yup.string().required("Registration Number is required"),
    area: Yup.string().required("Area is required"),
    email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
    .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
  });