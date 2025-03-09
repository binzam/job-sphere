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
