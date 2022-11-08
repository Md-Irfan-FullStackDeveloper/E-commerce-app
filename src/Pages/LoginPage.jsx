import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { login } from "../Redux/AuthReducer/action";

const activeStyle = {
  color: "blue",
  textDecoration: "underline",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location?.state?.from || "/";
  const toast = useToast();
  const isAdminAuth = useSelector((store) => store.AuthReducer.isAdminAuth);
  const token = useSelector((store) => store.AuthReducer.token);
  const isError = useSelector((store) => store.AuthReducer.isError);
  const isLoading = useSelector((store) => store.AuthReducer.isLoading);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginDetails = {
      password: password && password,
      username: username && username,
    };
    dispatch(login(loginDetails));
  };

  useEffect(() => {
    if (isAdminAuth && token) {
      toast({
        title: "Login Successful.",
        description: `Your are logged in successfuly ${token.token}`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          isAdminAuth: isAdminAuth,
          token: token.token,
          username: username,
        })
      );
      setTimeout(() => {
        navigate("/adminPage", { replace: true });
      }, 2000);
    }
  }, [isAdminAuth, token]);

  // console.log(isError);
  // console.log(isAdminAuth);
  return (
    <Box
      p="1rem 2rem"
      h="100vh"
      boxShadow={"lg"}
      m={["50px auto", "50px auto"]}
      w={["80%", "60%", "50%"]}
    >
      <Text color="teal" fontSize="1.5rem" fontWeight="bold" textAlign="center">
        Login
      </Text>
      {/* error handling */}
      <Text textAlign="center" color="red">
        {isError && "Wrong user details, Check your credentials"}
      </Text>

      <form onSubmit={handleLogin}>
        <FormControl mt="1rem" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mt="1rem">Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            m="1rem 0"
            placeholder="Enter Password"
          />
        </FormControl>

        <Button
          type="submit"
          w="100%"
          bg="teal.500"
          color="white"
          _hover="none"
          m="auto"
        >
          {isLoading && <Spinner mr="0.5rem" />} Login
        </Button>
      </form>

      <Box m="25px auto">
        <Text textAlign="center" color="gray.900" fontSize="14px">
          If you are new admin click here{" "}
          <NavLink
            to="/createAccount"
            _hover={{ TextDecoder: "underline" }}
            style={({ isActive }) => (isActive ? activeStyle : activeStyle)}
            state={{ from: comingFrom }}
          >
            Create new account
          </NavLink>
        </Text>
      </Box>
    </Box>
  );
};

export default LoginPage;
