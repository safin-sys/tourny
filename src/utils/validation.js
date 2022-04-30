import * as yup from 'yup';

export const signup = yup.object().shape({
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Passwords must match"),
});

export const login = yup.object().shape({
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
});