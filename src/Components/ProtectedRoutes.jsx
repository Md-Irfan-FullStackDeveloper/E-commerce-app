import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const toast = useToast();

  if (!isAuthenticated) {
    loginWithRedirect();

    toast({
      title: "Please Login Admin",
      description: "You are not authenticated",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
  return children;
};

export default ProtectedRoutes;
