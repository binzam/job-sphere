import axios from 'axios';
export const signUp = async (user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const existingUser = await axios.get(
      `${import.meta.env.VITE_API_URL}users?email=${user.email}`
    );

    if (existingUser.data.length > 0) {
      console.error('Email already exists.');
      return null;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}users`,
      user
    );
    return response.status === 201 ? response.data : null;
  } catch (error) {
    console.error('Sign-up error:', error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}users?email=${email}&password=${password}`
  );
  const users = response.data;
  console.log(response);
  if (users.length === 0) {
    console.log('User not found');
    return null;
  }

  const user = users[0];

  if (user.password !== password) {
    console.log('Incorrect password');
    return null;
  }

  return user;
};

export const getAuthUser = () => {
  return JSON.parse(localStorage.getItem('jobSphereUser') || 'null');
};
