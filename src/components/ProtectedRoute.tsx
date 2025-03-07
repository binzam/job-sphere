import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/auth/sign-in" />;
};

export default ProtectedRoute;
