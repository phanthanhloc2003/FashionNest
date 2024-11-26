import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}