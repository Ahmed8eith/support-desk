import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config'; // Your Firebase setup

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading spinner
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
