import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ children }) => {
  const isAdminAuth = useSelector((store) => store.AuthReducer.isAdminAuth);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }
  return children;
};

export default AdminProtectedRoutes;
