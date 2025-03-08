import axios from 'axios';
import bcrypt from 'bcryptjs';

export const signUpUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}) => {
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.password ||
    !userData.confirmPassword
  ) {
    return { success: false, message: 'All fields are required.' };
  }
  if (userData.password !== userData.confirmPassword) {
    return { success: false, message: 'Passwords must match.' };
  }
  if (!userData.agreeToTerms) {
    return {
      success: false,
      message: 'You must agree to the terms of service.',
    };
  }

  try {
    const { data: existingUser } = await axios.get(
      `${import.meta.env.VITE_API_URL}users?email=${userData.email}`
    );
    if (existingUser.length > 0) {
      return { success: false, message: 'Email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}users`, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
    });

    return response.status === 201
      ? { success: true }
      : { success: false, message: 'Sign-up failed. Please try again.' };
  } catch (err) {
    console.error('Sign-up error:', err);
    return { success: false, message: 'Sign-up failed. Please try again.' };
  }
};

export const signInUser = async (email: string, password: string) => {
  if (!email || !password) {
    return { success: false, message: 'Both fields are required.' };
  }

  try {
    const { data: users } = await axios.get(
      `${import.meta.env.VITE_API_URL}users?email=${email}`
    );

    if (users.length === 0) {
      return { success: false, message: 'Incorrect credentials.' };
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Incorrect credentials.' };
    }

    return {
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  } catch (err) {
    console.error('Sign-in error:', err);
    return { success: false, message: 'Sign-in failed. Please try again.' };
  }
};
