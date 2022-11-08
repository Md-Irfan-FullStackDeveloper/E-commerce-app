import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import { url } from "../Redux/AppReducer/action";

const WishListPage = () => {
  const { wishlistData } = useSelector((store) => store.WishlistReducer);
  const local = JSON.parse(localStorage.getItem("wishlist"));
  const [wishlist, setWishlist] = useState(wishlistData ? wishlistData : local);
  const [reducerValue, forceUpdate] = useReducer((x = 0) => x + 1);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist"));
    setWishlist(data);
  }, [reducerValue]);

  // console.log(wishlist);
  return (
    <>
      {wishlist ? (
        <Box w={["90%", "80%"]} m={["50px auto", "50px auto"]}>
          <Flex justify="center" align="center" gap="1rem">
            <Heading textAlign="center" size={["sm", "md"]}>
              Your Favorites
            </Heading>
            <Text fontSize="xs">{wishlist?.length} items</Text>
          </Flex>

          <SimpleGrid
            m="25px auto"
            w="100%"
            columns={["2", "3", "4"]}
            spacing={4}
          >
            {wishlist &&
              wishlist?.map((el) => (
                <ProductCard
                  key={el.id}
                  data={el}
                  deleteCategory="/WishList"
                  btnTitle="Delete"
                  forceUpdate={forceUpdate}
                />
              ))}
          </SimpleGrid>

          {wishlist?.length === 0 && (
            <Box>
              <Text textAlign="center">Nothing in favorites</Text>
              <Text textAlign="center" mt="0.5rem" fontSize="12px">
                Add something
              </Text>
            </Box>
          )}
        </Box>
      ) : (
        <Box w={["90%", "80%"]} m={["50px auto", "50px auto"]}>
          <Heading textAlign="center">Wishlist is empty add something</Heading>
        </Box>
      )}
    </>
  );
};

export default WishListPage;
