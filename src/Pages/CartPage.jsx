import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../Components/CartItem";

const CartPage = () => {
  const { cartData } = useSelector((store) => store.CartReducer);
  const local = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(cartData ? cartData : local);
  const toast = useToast();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState();
  const [productPrice, setProductPrice] = useState();
  const [prevQuantity, setPrevQuantity] = useState();
  const [orderPrice, setOrderPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalItem, setTotalItem] = useState();
  const [discountCoupon, setDiscountCoupon] = useState("");
  const [discountCount, setDiscountCount] = useState(0);
  const [reducerValue, forceUpdate] = useReducer((x = 0) => x + 1);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    setCart(data);
    setTotalItem(data?.length);
  }, [reducerValue]);

  useEffect(() => {
    let sum = 0;
    if (orderPrice === 0 || total === 0 || cart?.length) {
      cart?.map((el) => (sum += el.price));
      setOrderPrice(sum);
      setTotal(sum + 100);
    }
  }, [orderPrice, cart?.length]);

  useEffect(() => {
    let updatedTotal = productPrice ? productPrice : 0;
    if (productPrice && Number(quantity) > prevQuantity) {
      setTotal((prev) => prev + updatedTotal);
    } else if (Number(quantity) < prevQuantity) {
      setTotal((prev) => prev - updatedTotal);
    }
  }, [productPrice]);

  useEffect(() => {
    setPrevQuantity(Number(quantity) > 1 ? Number(quantity) : 0);
    if (+quantity > 1 && +quantity >= prevQuantity) {
      setTotalItem((prev) => prev + Number(quantity));
    } else if (+quantity < prevQuantity) {
      setTotalItem((prev) => prev - prevQuantity + Number(quantity));
    }
  }, [quantity]);

  const handleDiscount = () => {
    if (discountCoupon === "masai100") {
      setTotal((prev) => prev - 100);
      toast({
        title: "Discount Coupon applied.",
        description: "We've discount the amount.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setDiscountCount(1);
    }
  };

  return (
    <>
      {cart ? (
        <Box w={["90%", "80%"]} m={["50px auto", "50px auto"]}>
          <Flex align="center" w="100%" m="auto" gap="1rem" justify="center">
            <Heading textAlign="center" size={["md", "lg"]}>
              Your cart
            </Heading>
            <Text fonts>{totalItem} items</Text>
          </Flex>

          <Flex
            w="100%"
            justify="space-between"
            m="25px auto"
            flexDirection={["column", "row"]}
          >
            <Box w={["100%", "70%", "65%"]}>
              <Scrollbars style={{ width: "100%", height: "100vh" }}>
                <Stack p="1rem" spacing={5} w="100%">
                  {cart &&
                    cart?.map((el) => (
                      <CartItem
                        forceUpdate={forceUpdate}
                        key={el.id}
                        data={el}
                        setQuantity={setQuantity}
                        setProductPrice={setProductPrice}
                      />
                    ))}
                  {cart.length === 0 && (
                    <Box>
                      <Text textAlign="center">Nothing in cart</Text>
                      <Text textAlign="center" mt="0.5rem" fontSize="12px">
                        Add something
                      </Text>
                    </Box>
                  )}
                </Stack>
              </Scrollbars>
            </Box>

            {/* right side  */}
            <Stack
              w={["100%", "25%", "30%"]}
              m={["1.5rem 0px", "0px 0px 1.5rem 0px"]}
              spacing={7}
            >
              <Box>
                <Text fontSize="14px" fontWeight="500">
                  Add discount code
                </Text>
                <Flex gap="15px">
                  <Input
                    onChange={(e) => setDiscountCoupon(e.target.value)}
                    borderColor="black"
                    borderRadius={"none"}
                  />
                  <Button
                    bg="white"
                    border="1px solid black"
                    borderRadius={"none"}
                    onClick={handleDiscount}
                    disabled={discountCount === 1}
                  >
                    Add
                  </Button>
                </Flex>
              </Box>

              <Box w="100%">
                <Flex justify="space-between">
                  <Text fontSize="12px" fontWeight="500">
                    Order price
                  </Text>
                  <Text fontSize="12px" fontWeight="500">
                    Rs. {orderPrice}
                  </Text>
                </Flex>

                <Flex mt="1rem" justify="space-between">
                  <Text fontSize="12px" fontWeight="500">
                    Delivery
                  </Text>
                  <Text fontSize="12px" fontWeight="500">
                    Rs. 100
                  </Text>
                </Flex>
              </Box>

              <Box w="100%" border="0.5px solid black"></Box>

              <Flex w="100%" justify="space-between">
                <Text fontWeight="500" fontSize="1.3rem">
                  Total
                </Text>
                <Text fontWeight="500" fontSize="1.3rem">
                  Rs. {total}
                </Text>
              </Flex>

              <Button
                size={["sm", "sm", "lg"]}
                borderRadius="none"
                color="white"
                bg="black"
                onClick={() => navigate("/checkout", { replace: true })}
                _hover={{ bg: "blackAlpha.800" }}
              >
                Continue to checkout
              </Button>

              {/* accordian */}
              <Box w="100%">
                <Accordion size="sm">
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "teal", color: "white" }}
                      >
                        <Box flex="1" textAlign="left">
                          Delivery
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Prices and delivery costs are not confirmed until you've
                      reached the checkout. Customers would receive an
                      SMS/WhatsApp notifications regarding deliveries on the
                      registered phone number
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "teal", color: "white" }}
                      >
                        <Box flex="1" textAlign="left">
                          Return and Refund policy
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      30 days withdrawal and free returns. Read more about
                      return and refund policy.
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Stack>
          </Flex>
        </Box>
      ) : (
        <Box w={["90%", "80%"]} m={["50px auto", "50px auto"]}>
          <Heading textAlign="center">Cart is empty add something</Heading>
        </Box>
      )}
    </>
  );
};

export default CartPage;
