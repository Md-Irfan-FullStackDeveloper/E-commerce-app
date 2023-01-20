import {
  Box,
  Flex,
  Image,
  Select,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Redux/AppReducer/action";
import { deleteCartItem } from "../Redux/CartReducer/action";

const CartItem = ({ data, forceUpdate, setQuantity, setProductPrice }) => {
  const dispatch = useDispatch();
  const { deleteCartItemError, deleteCartItemSuccess } = useSelector(
    (store) => store.CartReducer
  );
  const toast = useToast();

  const handleDelete = () => {
    dispatch(deleteCartItem(data));
    forceUpdate();

    if (deleteCartItemSuccess) {
      
    } else if (deleteCartItemError) {
      toast({
        title: "Product deleted from cart unsuccess.",
        description: "Failed to delete product.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
    setProductPrice(data?.price * Number(e.target.value));
  };

  return (
    <Flex
      w="100%"
      p="1rem"
      border="1px solid teal"
      justify="space-between"
      borderRadius="10px"
    >
      <Flex gap="2rem" flexDirection={["column", "row"]}>
        <Box w={["100%", "100px"]}>
          <Image src={data?.image[0].src} objectFit="contain" />
        </Box>

        <Stack spacing="1rem">
          <Box>
            <Text>{data?.title}</Text>
            <Text>Rs. {data?.price}</Text>
          </Box>

          <Flex
            gap="1rem"
            align="center"
            flexDirection={["column", "column", "row"]}
            justify="space-between"
          >
            <Text fontSize="12px" fontWeight="500">
              Art.no. {data?.id}
            </Text>
            <Text>Color: {data?.swatches[0].colorName}</Text>
          </Flex>

          <Box>
            <Select
              onChange={handleQuantity}
              m={["auto", "0px"]}
              w={["50%", "max-content"]}
            >
              {new Array(10).fill(0).map((el, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
      </Flex>

      <Box m={["0px 0px 0px 1rem", "0"]}>
        <MdDelete onClick={handleDelete} cursor="pointer" size="1.6rem" />
      </Box>
    </Flex>
  );
};

export default CartItem;
