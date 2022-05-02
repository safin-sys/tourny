import * as yup from 'yup';

export const signupVal = yup.object().shape({
    name: yup.string().min(3, "Name must be atleast 3 characters").required("IGN is required"),
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Passwords must match"),
});

export const loginVal = yup.object().shape({
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
});