import { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(() => getAuthUser());

  const signUp = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }) => {
    setLoading(true);
    setError(null);
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setError('All fields are required.');
      setLoading(false);
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords must match.');
      setLoading(false);
      return false;
    }
    if (!userData.agreeToTerms) {
      setError('You must agree to terms of service.');
      setLoading(false);
      return false;
    }
    try {
      const { data: existingUser } = await axios.get(
        `${import.meta.env.VITE_API_URL}users?email=${userData.email}`
      );
      if (existingUser.length > 0) {
        setError('Email already exists.');
        setLoading(false);
        return false;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const response = await axios.post(import.meta.env.VITE_API_URL, {
        ...userData,
        password: hashedPassword,
      });

      if (response.status === 201) {
        setUser(response.data);
        localStorage.setItem('jobSphereUser', JSON.stringify(response.data));
        setLoading(false);
        return true;
      }
    } catch (err) {
      setError('Sign-up failed. Please try again.');
      console.error('Sign-up error:', err);
    }

    setLoading(false);
    return false;
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError('Both fields are required.');
      setLoading(false);
      return false;
    }
    try {
      const { data: users } = await axios.get(
        `${import.meta.env.VITE_API_URL}users?email=${email}`
      );

      if (users.length === 0) {
        setError('User not found.');
        setLoading(false);
        return false;
      }

      const user = users[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        setError('Incorrect password.');
        setLoading(false);
        return false;
      }

      setUser(user);
      localStorage.setItem('jobSphereUser', JSON.stringify(user));
      setLoading(false);
      return true;
    } catch (err) {
      setError('Sign-in failed. Please try again.');
      console.error('Sign-in error:', err);
    }

    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('jobSphereUser');
    setUser(null);
  };

  return { user, loading, error, signUp, signIn, logout };
};

const getAuthUser = () => {
  return JSON.parse(localStorage.getItem('jobSphereUser') || 'null');
};
