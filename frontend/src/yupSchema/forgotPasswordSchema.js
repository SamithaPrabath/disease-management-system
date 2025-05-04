import * as Yup from "yup";

const forgotPasswordSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
  username: Yup.string()
    .required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  consentAgreed: Yup.boolean()
    .oneOf([true], "You must agree to the privacy policy")
    .required("You must agree to the privacy policy"),
});

export default forgotPasswordSchema; 