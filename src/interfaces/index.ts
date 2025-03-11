export interface Job {
  id: number | string;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  skills: string[];
  description: string;
  salary: string;
  tools: string[];
  category: string;
  slots: number;
  requirements: string[];
}

export interface JobCategory {
  title: string;
  icon: string;
  count: number;
  link: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ApplicationFormDataState {
  firstName: string;
  lastName: string;
  email: string;
  resume: File | null;
  coverLetter: string;
}
export interface SubmitApplicationParams {
  jobId: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  coverLetter: string;
  resume: string | null;
}
export interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
export interface SignInFormData {
  email: string;
  password: string;
}
export interface ValidationErrors {
  [key: string]: string;
}


