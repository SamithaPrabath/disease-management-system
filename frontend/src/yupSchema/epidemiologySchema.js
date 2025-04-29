import * as Yup from "yup";

export const phiSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  moh: Yup.string().required("MOH is required"),
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
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
    .required("Password is required"),
});

export const phiEditSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  moh: Yup.string().required("MOH is required"),
  area: Yup.string().required("Area is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
});

export const mohSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  area: Yup.string().required("Area is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
  username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
    .required("Password is required"),
});

export const mohEditSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  area: Yup.string().required("Area is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
});

export const instituteSchema = Yup.object().shape({
  name: Yup.string().required("Institute Name is required"),
  registrationNumber: Yup.string().required("Registration Number is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  province: Yup.string().required("Please select a province"),
  city: Yup.string().required("Please select a city"),
  username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
    .required("Password is required"),
});

export const instituteEditSchema = Yup.object().shape({
  name: Yup.string().required("Institute Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  province: Yup.string().required("Please select a province"),
  city: Yup.string().required("Please select a city"),
});

export const diseasesSchema = Yup.object({
  diseaseName: Yup.string().required("Disease Name is required"),
  category: Yup.string().required("Category is required"),
  modeOfTransmission: Yup.string().required("Mode of Transmission is required"),
});
