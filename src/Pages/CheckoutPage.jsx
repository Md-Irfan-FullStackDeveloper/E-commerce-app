import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADDTO_CART_SUCCESS } from "../Redux/CartReducer/actionType";

const CheckoutPage = () => {
  const [discount, setDiscount] = useState("");
  const toast = useToast();
  const [count, setCount] = useState(0);
  const cartLocal = JSON.parse(localStorage.getItem("cart"));
  const { cartData } = useSelector((store) => store.CartReducer);
  const [cart, setCart] = useState(cartData?.length > 0 ? cartData : cartLocal);
  const [totalAmount, setTotalAmount] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDiscount = () => {
    if (discount === "masai200") {
      setCount(1);
      setTotalAmount((prev) => prev - 200);

      toast({
        title: "Discount Coupon applied.",
        description: "We've discount the amount.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Invalid Coupon.",
        description: "Dicount coupon not applied.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleOrder = () => {
    if (
      email &&
      firstName &&
      lastName &&
      addressLine1 &&
      addressLine2 &&
      postcode &&
      city &&
      state
    ) {
      navigate("/OrderPage", { replace: true });
      toast({
        title: "Order Successfuly placed.",
        description: "Your order is placed successfuly.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Please fill information.",
        description: "Fill all information.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    localStorage.removeItem("cart");
    dispatch({ type: ADDTO_CART_SUCCESS, payload: [] });
  };

  useEffect(() => {
    let sum = 0;
    if (cart?.length > 0) {
      cart?.map((el) => (sum += el.price));
      setTotalAmount(sum);
    }
  }, []);

  useEffect(() => {
    if (discount === "") {
      setCount(0);
    }
  }, [discount]);

  // console.log(cartData);
  // console.log(cartLocal);
  return (
    <Flex
      w={["90%", "80%"]}
      m="50px auto"
      direction={["column", "row"]}
      justify="space-between"
      p="1rem"
    >
      <Box w={["100%", "60%"]}>
        <Box m={["2rem 0px", "2rem"]}>
          <Heading size="md">My Information</Heading>
          <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
            <FormLabel>Email</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              borderRadius="none"
              type="email"
              borderColor="gray"
              maxW="250px"
            />
          </FormControl>
        </Box>

        <Stack spacing="1.5rem" m={["2rem 0px", "2rem"]}>
          <Heading size="md">Delivery Address</Heading>
          <Flex align="center" gap="1rem">
            <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
              <FormLabel>First Name</FormLabel>
              <Input
                onChange={(e) => setFirstName(e.target.value)}
                borderRadius="none"
                borderColor="gray"
                maxW="250px"
              />
            </FormControl>

            <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
              <FormLabel>Last Name</FormLabel>
              <Input
                onChange={(e) => setLastName(e.target.value)}
                borderRadius="none"
                borderColor="gray"
                maxW="250px"
              />
            </FormControl>
          </Flex>

          <Flex align="center" gap="1rem">
            <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
              <FormLabel>Address Line 1</FormLabel>
              <Input
                onChange={(e) => setAddressLine1(e.target.value)}
                borderRadius="none"
                borderColor="gray"
                maxW="250px"
              />
            </FormControl>

            <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
              <FormLabel>Address Line 2</FormLabel>
              <Input
                onChange={(e) => setAddressLine2(e.target.value)}
                borderRadius="none"
                borderColor="gray"
                maxW="250px"
              />
            </FormControl>
          </Flex>

          <Flex align="center" gap="1rem">
            <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
              <FormLabel>Postcode</FormLabel>
              <Input
                onChange={(e) => setPostcode(e.target.value)}
                borderRadius="none"
                borderColor="gray"
                maxW="250px"
              />
            </FormControl>

            <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
              <FormLabel>City or District</FormLabel>
              <Input
                onChange={(e) => setCity(e.target.value)}
                borderRadius="none"
                borderColor="gray"
                maxW="250px"
              />
            </FormControl>
          </Flex>

          <FormControl fontSize="0.8rem" isRequired mt="1.5rem">
            <FormLabel>State</FormLabel>
            <Input
              onChange={(e) => setState(e.target.value)}
              borderRadius="none"
              borderColor="gray"
              maxW="250px"
            />
          </FormControl>
        </Stack>
      </Box>

      <Box w={["100%", "35%"]}>
        <Heading size="md">Your Order</Heading>

        <FormControl fontSize="0.8rem" mt="1.5rem">
          <FormLabel>Add a discount code</FormLabel>
          <Flex align="center" gap="1rem">
            <Input
              onChange={(e) => setDiscount(e.target.value)}
              borderRadius="none"
              borderColor="gray"
              maxW="250px"
            />
            <Button
              disabled={count === 1}
              onClick={handleDiscount}
              bg="white"
              border="1px solid black"
              borderRadius={"none"}
            >
              Add
            </Button>
          </Flex>
        </FormControl>

        <Box m="1.5rem 0px">
          <Flex align="center" w="100%" justify="space-between">
            <Text fontSize="14px">Total Items</Text>
            <Text fontSize="12px">{cart ? cart?.length : 0}</Text>
          </Flex>
        </Box>

        <Box m="1.5rem 0px">
          <Flex align="center" w="100%" justify="space-between">
            <Text fontWeight="bold">Total Amount</Text>
            <Text fontWeight="bold">{totalAmount}</Text>
          </Flex>
        </Box>

        <Button
          borderRadius="none"
          _hover={{ bg: "blackAlpha.800" }}
          bg="black"
          color="white"
          size={["sm", "sm", "lg"]}
          w="100%"
          onClick={handleOrder}
        >
          Place Order
        </Button>
      </Box>
    </Flex>
  );
};

export default CheckoutPage;
