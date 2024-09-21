// src/Component/Routes/RedirectAfterLogin.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectAfterLogin = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo?.role === 'partner') {
    return <Navigate to="/partner/dashboard" replace />;
  }

  if (userInfo?.role === 'frenchise') {
    return <Navigate to="/frenchise/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default RedirectAfterLogin;
