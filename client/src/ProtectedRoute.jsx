// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;