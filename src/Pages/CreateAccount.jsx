import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createAccount, login } from "../Redux/AuthReducer/action";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const comingFrom = location?.state?.from;
  const isCreated = useSelector((s) => s.AuthReducer.isCreated);
  const isLoading = useSelector((s) => s.AuthReducer.isLoading);
  const isCreatedError = useSelector((s) => s.AuthReducer.isCreatedError);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = {
      name: name && name,
      email: email && email,
      password: password && password,
      username: username && username,
      mobile: mobile && mobile,
      description: description,
    };
    console.log(loginDetails)
    dispatch(createAccount(loginDetails));
  };

  useEffect(() => {
    if (isCreated) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      setTimeout(() => {
        navigate("/login", { replace: true, state: { from: comingFrom } });
      }, 1000);
    } else if (isCreatedError) {
      toast({
        title: "Account created failed",
        description: "User already exists try to login.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }, [isCreated, isCreatedError]);

  // console.log(isCreated);
  // console.log(isCreatedError);

  return (
    <Box
      p="1rem 2rem"
      boxShadow={"lg"}
      m={["50px auto", "50px auto"]}
      w={["80%", "60%", "50%"]}
    >
      <Text color="teal" fontSize="1.5rem" fontWeight="bold" textAlign="center">
        Create an account
      </Text>

      <form onSubmit={handleSubmit} ref={formRef}>
        <FormControl isRequired>
          <FormLabel mt="1rem">Name</FormLabel>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mt="1rem">Email</FormLabel>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mt="1rem">Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mt="1rem">Username</FormLabel>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mt="1rem">Number</FormLabel>
          <Input
            type="number"
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
          />
        </FormControl>

        <FormControl>
          <FormLabel mt="1rem">Description</FormLabel>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        </FormControl>

        <Flex justify="center" align="center">
          <Button
            bg="teal.500"
            color="white"
            _hover="none"
            m="1rem auto"
            type="submit"
          >
            {isLoading && <Spinner mr="0.5rem" />} Create
          </Button>

          <Button
            bg="teal.500"
            color="white"
            _hover="none"
            m="1rem auto"
            onClick={() => formRef.current.reset()}
          >
            Reset
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CreateAccount;
