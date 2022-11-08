import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import {
  addToWishlist,
  deleteWishlistItem,
} from "../Redux/WishlistReducer/action";

const CustomBtn = ({ title, id, data, deleteCategory, forceUpdate }) => {
  const dispatch = useDispatch();
  const {
    addToWishlistSuccess,
    addToWishlistError,
    deleteWishlistError,
    deleteWishlistSuccess,
    duplicate,
  } = useSelector((store) => store.WishlistReducer);
  const toast = useToast();

  const handleClick = () => {
    if (title === "Delete") {
      dispatch(deleteWishlistItem(data));
      forceUpdate();

      if (deleteWishlistSuccess) {
        toast({
          title: "Product deleted from wishlist Successful.",
          description: "We have deleted this product to your Wishlist.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else if (deleteWishlistError) {
        toast({
          title: "Product deleting Unsuccessful.",
          description: "Failed to delete product from wishlist.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else if (duplicate) {
        toast({
          title: "Product already added in cart.",
          description: "Adding product to cart failed.",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } else if (title === "Add") {
      dispatch(addToWishlist(data));

      if (addToWishlistSuccess) {
        toast({
          title: "Product added to wishlist Successful.",
          description: "We have added this product to your Wishlist.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else if (addToWishlistError) {
        toast({
          title: "Product added to wishlist Unsuccessful.",
          description: "Failed to add product to wishlist.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  return (
    <>
      <Button
        size={["xs", "sm"]}
        m={["1rem auto", "1rem auto"]}
        w={["90%"]}
        borderRadius={"none"}
        colorScheme="teal"
        display="flex"
        gap="1rem"
        onClick={handleClick}
      >
        {title && title}
        {title === "Delete" ? <MdDelete color="red" /> : <BsHeartFill />}
      </Button>
    </>
  );
};

export default CustomBtn;
