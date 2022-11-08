import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../Redux/AppReducer/action";
import axios from "axios";
import { GET_DATA_SUCCESS } from "../Redux/AppReducer/actionType";
import { BsHeart, BsBagDashFill } from "react-icons/bs";
import { addToCart } from "../Redux/CartReducer/action";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((store) => store.AppReducer);
  const [singleItem, setSingleItem] = useState();
  const toast = useToast();
  const { addToCartError, addToCartSuccess, duplicate } = useSelector(
    (store) => store.CartReducer
  );

  useEffect(() => {
    if (data.length === 0) {
      axios
        .get(`https://my-json-server-live.herokuapp.com/AllProducts`)
        .then((r) => {
          dispatch({ type: GET_DATA_SUCCESS, payload: r.data });
        })
        .catch((err) => console.log(err));
    }
  }, [data.length, dispatch]);

  useEffect(() => {
    if (id) {
      let item = data?.find((el) => +el.id === +id);
      item && setSingleItem(item);
    }
  }, [id, data]);

  const handleAddToCart = () => {
    dispatch(addToCart(singleItem));

    if (addToCartSuccess) {
      toast({
        title: "Product added to cart Successful.",
        description: "We have added this product to your cart.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else if (addToCartError) {
      toast({
        title: "Product added to cart Unsuccessful.",
        description: "Failed to add product to cart.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else if (duplicate) {
      toast({
        title: "Product added to cart Successful.",
        description: "We have added this product to your cart.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // console.log(singleItem);
  // console.log(data);

  return (
    <>
      {singleItem ? (
        <Flex
          boxShadow={"md"}
          p="1rem"
          justify="space-between"
          w={["90%", "80%", "80%"]}
          m={["50px auto", "50px auto"]}
          direction={["column", "row"]}
        >
          <Box m={["auto", "0px"]} w={["95%", "45%"]} cursor="pointer">
            <Image
              h="100%"
              transition="ease-in-out"
              onMouseEnter={(e) =>
                (e.target.src = `${singleItem.image[0].dataAltImage}`)
              }
              onMouseLeave={(e) =>
                (e.target.src = `${singleItem.image[0].src}`)
              }
              w="100%"
              src={singleItem.image[0].src}
            />
          </Box>

          <Stack
            m={["1.5rem auto", "0px"]}
            spacing="1.5rem"
            w={["95%", "45%"]}
            bg="grey.300"
          >
            <Flex align="center" justify="space-between">
              <Text fontSize={"xl"} fontWeight="500">
                {singleItem.title}
              </Text>
              <BsHeart cursor="pointer" size="1.3rem" />
            </Flex>
            <Text fontSize={"2xl"} fontWeight="600">
              Rs.{singleItem.price}
            </Text>

            <Box>
              <Text fontSize={"lg"}>Colors</Text>
              <Flex m="1rem 0px" gap="0.5rem">
                {singleItem.swatches?.map((el) => (
                  <Box
                    border="1px solid gray"
                    cursor="pointer"
                    h="25px"
                    w="25px"
                    bg={el.colorCode}
                    borderRadius="50%"
                  ></Box>
                ))}
              </Flex>
            </Box>

            <Box>
              <Text fontSize={"lg"}>Sizes</Text>
              <Flex m="1rem" gap="1rem">
                <Text cursor="pointer">S</Text>
                <Text cursor="pointer">M</Text>
                <Text cursor="pointer">L</Text>
                <Text cursor="pointer">XL</Text>
                <Text cursor="pointer">XXL</Text>
              </Flex>
            </Box>

            <Flex align="center" gap="0.5rem">
              <Text fontSize={"lg"}>Review</Text>
              <Box>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Box>
            </Flex>

            <Button
              bg="teal"
              borderRadius={"none"}
              color="white"
              display="flex"
              gap="1rem"
              _hover={"none"}
              onClick={handleAddToCart}
            >
              Add <BsBagDashFill />{" "}
            </Button>
          </Stack>
        </Flex>
      ) : (
        <>
          <Text>Loading </Text>
        </>
      )}
    </>
  );
};

export default SingleProduct;
