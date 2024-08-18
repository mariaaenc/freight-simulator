import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PublicRouteProps {
  element: React.ReactElement;
  restricted?: boolean;
  redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, restricted = false, redirectPath = "/simulate-freight" }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return user && restricted ? <Navigate to={redirectPath} /> : element;
};

export default PublicRoute;
