import * as yup from "yup";

const EmailSchema = yup
  .string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    "Invalid email address"
  )
  .trim("Email cannot include trailing spaces")
  .max(80, "Invalid email address")
  .required("Email Address is required");

export const PasswordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(30, "Password can be at most 30 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]/,
    "Password must contain at least one special character"
  )
  .required("Password is required");

export const SignInSchema = yup.object().shape({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpSchema = yup.object().shape({
  email: EmailSchema,
  password: PasswordSchema,
});
