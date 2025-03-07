import { createContext, useState, useEffect, ReactNode } from 'react';
import { getAuthUser,  signIn, signUp } from '../api/auth';
import { User } from '../interfaces';

type UserContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(getAuthUser());

  useEffect(() => {
    if (user) localStorage.setItem('jobSphereUser', JSON.stringify(user));
  }, [user]);

  const login = async (email: string, password: string) => {
    const authUser = await signIn(email, password);
    if (authUser) {
      setUser(authUser);
      return true;
    }
    return false;
  };

  const register = async (newUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const createdUser = await signUp(newUser);
    if (createdUser) {
      setUser(createdUser);
      return true;
    }
    return false;
  };
 
  const logout = () => {
    localStorage.removeItem("jobSphereUser");
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
