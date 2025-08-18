// frontend/src/routes/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika ada user, cek apakah perannya diizinkan
  if (user) {
    // Jika rute ini memerlukan peran tertentu dan peran user tidak cocok
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Arahkan ke halaman "tidak diizinkan" atau kembali ke dasbor
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    // Jika peran cocok atau rute tidak memerlukan peran spesifik
    return <Outlet />;
  }

  // Jika tidak ada user sama sekali
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;