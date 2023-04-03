import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

export const registerByOrganizationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  name: Yup.string().required("Name is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pin: Yup.number().required("Pin is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("password") , null], "Password must match"),
});

export const registerByUserSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
   lastName: Yup.string().required("Last Name is required"),
  //  phoneNumber: Yup.string().required("Phone Number is required"),
   state: Yup.string().required("State is required"),
   city: Yup.string().required("City is required"),
   pin: Yup.number().required("Pin is required"),
   gender: Yup.string().required("Gender is required"),
  dob : Yup.string().required("Date of Birth is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("password") , null], "Password must match"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

export const passwordSchema = Yup.object({
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Password must match"),
});

export const passwordChangeSchema = Yup.object({
  oldPassword: Yup.string().min(8).required("Password is required"),
  newPassword: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("newPassword") , null], "Password must match"),
});