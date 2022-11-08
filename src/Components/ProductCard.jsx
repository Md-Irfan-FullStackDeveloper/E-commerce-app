import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsBagDashFill, BsHeartFill } from "react-icons/bs";
import CustomBtn from "./CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Redux/AppReducer/action";
import { useState } from "react";
import { addToCart } from "../Redux/CartReducer/action";

const ProductCard = ({ data, deleteCategory, btnTitle, forceUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { cartData, addToCartError, addToCartSuccess, duplicate } = useSelector(
    (store) => store.CartReducer
  );

  const handleClick = () => {
    navigate(`/products/${data.id}`, { replace: true });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(data));
    setTimeout(() => {
      if (addToCartSuccess) {
        toast({
          title: "Product added to cart Successful.",
          description: "We have added this product to your cart.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
      else if(addToCartError){
        toast({
          title: "Product added to cart Unsuccessful.",
          description: "Adding product to cart failed.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
      else if(duplicate){
        toast({
          title: "Product added to cart Successful.",
          description: "We have added this product to your cart.",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }, 1000);
  };

  // console.log(cartData);
  return (
    <Box boxShadow={"md"} cursor="pointer">
      <Box onClick={handleClick} w="100%">
        <Image
          transition="ease-in-out"
          onMouseEnter={(e) => (e.target.src = `${data.image[0].dataAltImage}`)}
          onMouseLeave={(e) => (e.target.src = `${data.image[0].src}`)}
          src={data.image[0].src}
          objectFit="contain"
        />
      </Box>
      <Box onClick={handleClick} p="0px 1rem" m="1rem 0">
        <Text fontSize={"lg"} _hover={{ color: "dodgerblue" }}>
          {data.title}
        </Text>
        <Text fontWeight="bold" _hover={{ color: "red" }}>
          Rs.{data.price}
        </Text>
      </Box>
      <Flex m="auto" w="max-content" gap="7px">
        {data?.swatches?.map((el, index) => (
          <Box
            key={index}
            border="1px solid gray"
            cursor="pointer"
            h="15px"
            w="15px"
            bg={el.colorCode}
            borderRadius="50%"
          ></Box>
        ))}
        {data?.swatches === undefined && (
          <Box
            border="1px solid gray"
            cursor="pointer"
            h="15px"
            w="15px"
            bg={"#ccc"}
            borderRadius="50%"
          ></Box>
        )}
      </Flex>

      <Button
        size={["xs", "sm"]}
        m={["1rem auto", "1rem auto"]}
        w={["90%"]}
        borderRadius={"none"}
        colorScheme="teal"
        display="flex"
        gap="1rem"
        onClick={handleAddToCart}
      >
        Add <BsBagDashFill />{" "}
      </Button>

      <CustomBtn
        key={data.id}
        title={btnTitle}
        deleteCategory={deleteCategory}
        id={data.id}
        data={data}
        forceUpdate={forceUpdate}
      />
    </Box>
  );
};

export default ProductCard;
