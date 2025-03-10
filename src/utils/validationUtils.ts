import { ApplicationFormDataState } from '../interfaces';

export const validateApplicationForm = (formData: ApplicationFormDataState) => {
  const errors: Partial<Record<keyof ApplicationFormDataState, string>> = {};

  if (!formData.firstName.trim()) errors.firstName = 'This field is required';
  if (!formData.lastName.trim()) errors.lastName = 'This field is required';
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!formData.coverLetter.trim())
    errors.coverLetter = 'This field is required';
  if (!formData.resume) errors.resume = 'Please upload your CV';

  return errors;
};
interface ValidationErrors {
  [key: string]: string;
}

interface AuthData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export const validateSignUpForm = (formData: AuthData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // First Name and Last Name validation
  if (!formData.firstName.trim()) errors.firstName = 'First name is required';
  if (!formData.lastName.trim()) errors.lastName = 'Last name is required';

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = 'Enter a valid email address';
  }

  // Password validation
  if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  } else if (!/[a-z]/.test(formData.password)) {
    errors.password = 'Password must contain at least one lowercase letter';
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = 'Password must contain at least one number';
  } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
    errors.password = 'Password must contain at least one special character';
  }

  // Confirm password validation
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Terms and conditions validation
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }

  return errors;
};
