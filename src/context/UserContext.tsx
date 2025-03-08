import { createContext, ReactNode, useEffect, useState } from 'react';
import { signInUser, signUpUser } from '../api/auth';
export type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
};
type UserContextType = {
  user: AuthUser | null;
  loading: boolean;
  signInError: string | null;
  signUpError: string | null;
  signUp: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};
const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  signInError: null,
  signUpError: null,
  signUp: async () => false,
  signIn: async () => false,
  logout: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser());
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  useEffect(() => {
    localStorage.setItem('jobSphereUser', JSON.stringify(user));
    return () => {
      localStorage.removeItem('jobSphereUser');
    };
  }, [user]);

  const signUp = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }) => {
    setLoading(true);
    setSignUpError(null);

    const result = await signUpUser(userData);
    if (result.success) {
      setLoading(false);
      return true;
    } else {
      setSignUpError(result.message ?? null);
      setLoading(false);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setSignInError(null);

    const result = await signInUser(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      localStorage.setItem('jobSphereUser', JSON.stringify(result.user));
      setLoading(false);
      return true;
    } else {
      setSignInError(result.message ?? null);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jobSphereUser');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signInError,
    signUpError,
    signUp,
    signIn,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const getAuthUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem('jobSphereUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export { UserContext, UserProvider };
