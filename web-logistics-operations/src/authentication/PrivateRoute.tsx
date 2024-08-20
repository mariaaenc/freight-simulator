import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { updateAxiosHeaders } from '../axiosConfig';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const isTokenExpired = idTokenResult.expirationTime < new Date().toISOString();
          if (isTokenExpired) {
            await signOut(auth);
            setIsAuthenticated(false);
          } else {
            updateAxiosHeaders()
            const customerUid = user.uid;
            const token = await user.getIdToken();
        
            localStorage.setItem('x-customer-uid', customerUid);
            localStorage.setItem('authorization', token);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error checking auth:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
