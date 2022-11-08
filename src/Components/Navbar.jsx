import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../Assets/logo.png";
import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { FaAlignJustify } from "react-icons/fa";
import { BsFillCartCheckFill, BsHeartFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import LoginMenu from "./LoginMenu";
import { useSelector } from "react-redux";
import MenuLogin from "./MenuLogin";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { cartData } = useSelector((store) => store.CartReducer);
  const { wishlistData } = useSelector((store) => store.WishlistReducer);
  const cartLocal = JSON.parse(localStorage.getItem("cart"));
  const wishlistLocal = JSON.parse(localStorage.getItem("wishlist"));
  const [cart, setCart] = useState(cartData?.length > 0 ? cartData : cartLocal);
  const [wishlist, setWishlist] = useState(
    wishlistData?.length > 0 ? wishlistData : wishlistLocal
  );
  const btnRef = useRef();
  const navigate = useNavigate();

  const handleNavigate = (location) => {
    if (location === "/adminPage" && isAuthenticated) {
      navigate(location, { replace: true });
    } else if (location === "/cartpage" && isAuthenticated) {
      navigate(location, { replace: true });
      onClose();
    } else {
      navigate(location, { replace: true });
      onClose();
    }
  };

  useEffect(() => {
    if (cartData?.length || !cartLocal || cartData?.length === 0) {
      setCart(cartData);
    }
  }, [cartData?.length], cartLocal);

  useEffect(() => {
    if (wishlistData?.length || !wishlistLocal || wishlistData?.length === 0) {
      setWishlist(wishlistData);
    }
  }, [wishlistData?.length], wishlistLocal);

  console.log(wishlistData);

  return (
    <Flex
      align="center"
      w="100%"
      justify="space-around"
      h="80px"
      boxShadow="md"
    >
      <Box cursor="pointer" onClick={() => navigate("/", { replace: true })}>
        <Image src={logo} w="80px" />
      </Box>

      <Flex
        w={["60%", "90%", "45%"]}
        align="center"
        gap={["1rem", "1rem", "none"]}
        justify={["flex-end", "flex-end", "space-between"]}
      >
        <Flex
          display={["none", "none", "flex"]}
          w={["90%", "90%"]}
          gap={["0.8rem", "1rem"]}
          align="center"
          justify="space-between"
        >
          <Text
            onClick={() => handleNavigate("/")}
            fontWeight="500"
            _hover={{ cursor: "pointer", color: "teal" }}
          >
            Home
          </Text>
          <Text
            onClick={() => handleNavigate("/products/mens")}
            fontWeight="500"
            _hover={{ cursor: "pointer", color: "teal" }}
          >
            Mens
          </Text>
          <Text
            onClick={() => handleNavigate("/products/womens")}
            fontWeight="500"
            _hover={{ cursor: "pointer", color: "teal" }}
          >
            Womens
          </Text>
          <Text
            onClick={() => handleNavigate("/products/kids")}
            fontWeight="500"
            _hover={{ cursor: "pointer", color: "teal" }}
          >
            Kids
          </Text>
          <Text
            onClick={() => handleNavigate("/products/sports")}
            fontWeight="500"
            _hover={{ cursor: "pointer", color: "teal" }}
          >
            Sports
          </Text>
          {isAuthenticated ? <MenuLogin /> : <LoginMenu />}
        </Flex>

        {/* icons and admin  */}
        <Flex
          gap={["1rem", "1.2rem"]}
          ml={["1rem", "2rem", "1rem"]}
          align="center"
        >
          <Flex onClick={() => handleNavigate("/cartpage")} cursor="pointer">
            <BsFillCartCheckFill size="1.5rem" />
            {`(${cart ? cart.length : 0})`}
          </Flex>
          <Flex
            align="center"
            onClick={() => handleNavigate("/wishlist")}
            cursor="pointer"
          >
            <BsHeartFill size="1.3rem" />
            {`(${wishlist ? wishlist.length : 0})`}
          </Flex>
          <Text
            onClick={() => handleNavigate("/adminPage")}
            fontWeight="500"
            _hover={{ cursor: "pointer", color: "teal" }}
          >
            Admin
          </Text>
        </Flex>
      </Flex>

      {/* Hamberger menu bar */}
      <Box display={["block", "block", "none"]}>
        <Button ref={btnRef} bg="none" onClick={onOpen}>
          <FaAlignJustify size="1.5rem" />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation Links</DrawerHeader>

            <DrawerBody>
              <Stack spacing={5}>
                <Text
                  onClick={() => handleNavigate("/")}
                  fontWeight="500"
                  _hover={{ cursor: "pointer", color: "teal" }}
                >
                  Home
                </Text>
                <Text
                  onClick={() => handleNavigate("/products/mens")}
                  fontWeight="500"
                  _hover={{ cursor: "pointer", color: "teal" }}
                >
                  Mens
                </Text>
                <Text
                  onClick={() => handleNavigate("/products/womens")}
                  fontWeight="500"
                  _hover={{ cursor: "pointer", color: "teal" }}
                >
                  Womens
                </Text>
                <Text
                  onClick={() => handleNavigate("/products/kids")}
                  fontWeight="500"
                  _hover={{ cursor: "pointer", color: "teal" }}
                >
                  Kids
                </Text>
                <Text
                  onClick={() => handleNavigate("/products/sports")}
                  fontWeight="500"
                  _hover={{ cursor: "pointer", color: "teal" }}
                >
                  Sports
                </Text>
                {isAuthenticated ? (
                  <MenuLogin close={onClose} />
                ) : (
                  <LoginMenu close={onClose} />
                )}
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button w="100%" variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default Navbar;
