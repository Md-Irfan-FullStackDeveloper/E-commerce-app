import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { mensCategoryList } from "./MensPage";
import { womensCategoryList } from "./WomensPage";
import { kidsCategoryList } from "./KidsPage";
import { sportsCategoryList } from "./SportsPage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, getData } from "../Redux/AppReducer/action";
import ProductItem from "../Components/ProductItem";
import Scrollbars from "react-custom-scrollbars-2";

const AdminPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const loading = useSelector((store) => store.AppReducer.addProductLoading);
  const success = useSelector((store) => store.AppReducer.addProductSuccess);
  const error = useSelector((store) => store.AppReducer.addProductError);
  const data = useSelector((store) => store.AppReducer.data);
  const isLoading = useSelector((store) => store.AppReducer.isLoading);
  const { deleteProductLoading, deleteProductSuccess, deleteProductError } =
    useSelector((store) => store.AppReducer);
  const dispatch = useDispatch();
  const toast = useToast();
  const [displayProducts, setDisplayProducts] = useState();
  const [allCategories, setAllCategories] = useState();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [src, setSrc] = useState("");
  const [altSrc, setAltSrc] = useState("");
  const [image, setImage] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [mainCategory, setMainCategory] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const productdata = {
      id: Math.random() * 100000,
      title: title && title,
      category: category && category,
      image: image && image,
      price: price && price,
    };
    console.log(productdata);
    dispatch(addProduct(mainCategory, productdata));
    dispatch(addProduct("/AllProducts", productdata));
  };

  const handleAddImages = () => {
    if (src && altSrc) {
      const obj = { src: src, dataAltImage: altSrc };
      setImage([obj]);
    }
  };

  const handleCategory = (e) => {
    setMainCategory(e.target.value);
    if (e.target.value === "/men") {
      setAllCategories(mensCategoryList);
    } else if (e.target.value === "/women") {
      setAllCategories(womensCategoryList);
    } else if (e.target.value === "/kid") {
      setAllCategories(kidsCategoryList);
    } else if (e.target.value === "/sport") {
      setAllCategories(sportsCategoryList);
    }
  };

  const handleDisplayProduct = (e) => {
    const category = e.target.value;
    setDisplayProducts(e.target.value);
    if (category === "/AllProducts") {
      dispatch(getData(category));
    } else if (category === "/men") {
      dispatch(getData(category));
    } else if (category === "/women") {
      dispatch(getData(category));
    } else if (category === "/kid") {
      dispatch(getData(category));
    } else if (category === "/sport") {
      dispatch(getData(category));
    } else {
      dispatch(getData("/AllProducts"));
    }
  };

  // handling delete product
  const handleDelete = (id) => {
    if (displayProducts) {
      dispatch(deleteProduct("/AllProducts", id));
      dispatch(deleteProduct(displayProducts, id));
    } else {
      dispatch(deleteProduct("/AllProducts", id));
    }
  };

  // handling error and success
  useEffect(() => {
    if (success) {
      toast({
        title: "Product Addes Successful.",
        description: "Now you can see it on respective product page.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (error) {
      toast({
        title: "Product Addes Unsuccessful.",
        description: "Check your product details",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }, [success, error]);

  // delete error and success handling
  useEffect(() => {
    if (deleteProductSuccess === true) {
      toast({
        title: "Product deleted successfully.",
        description: "We've deleted this product",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }

    if (deleteProductError === true) {
      toast({
        title: "Product deleted unsuccessfully.",
        description: "Failed to delete",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }, [deleteProductSuccess, deleteProductError]);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getData("/AllProducts"));
    }
  }, [data]);

  // console.log(userDetails)
  return (
    <Box p="1rem 2rem" h="100vh" w={["90%", "85%", "80%"]} m="auto">
      <Heading m="25px 0px 0px 0px" size="md" textAlign="center" color="teal">
        Welcome to Admin Page
      </Heading>

      <Flex
        boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
        w="100%"
        h="70px"
        m="25px 0px"
        p="0px 1rem"
        borderRadius="10px"
        justify="flex-end"
        align="center"
        gap="1rem"
      >
        <Text>{data.length} Items</Text>

        <Select
          size={["xs", "sm"]}
          w="max-content"
          onChange={handleDisplayProduct}
        >
          <option>See products</option>
          <option value="/allProcuts">All Products</option>
          <option value="/men">Mens Products</option>
          <option value="/women">Womens Products</option>
          <option value="/kid">Kids Products</option>
          <option value="/sport">Sports Products</option>
        </Select>

        <Button
          borderRadius="none"
          colorScheme="teal"
          size={["xs", "sm"]}
          onClick={onOpen}
        >
          Add Products
        </Button>

        <Modal size={["sm", "md", "2xl"]} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Add Products</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleAdd}>
                <Stack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Product Title</FormLabel>
                    <Input
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter product title"
                      size={["sm", "md"]}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Product Image url</FormLabel>
                    <Input
                      onChange={(e) => setSrc(e.target.value)}
                      placeholder="Image url"
                      size={["sm", "md"]}
                    />
                    <Input
                      mt="7px"
                      onChange={(e) => setAltSrc(e.target.value)}
                      placeholder="Alternate url"
                      size={["sm", "md"]}
                    />
                    <Button
                      mt="10px"
                      size={["sm", "md"]}
                      onClick={handleAddImages}
                      colorScheme="teal"
                      _hover={"none"}
                    >
                      Add url
                    </Button>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Product Price</FormLabel>
                    <Input
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      size={["sm", "md"]}
                      placeholder="Enter product price"
                    />
                  </FormControl>

                  <Text fontSize="sm" color="red">
                    Note: First select the main category to see product category
                  </Text>
                  {/* add categories */}
                  <Flex gap="1rem" justify="space-between">
                    <FormControl isRequired>
                      <FormLabel>Select main category</FormLabel>
                      <Select size={["sm", "md"]} onChange={handleCategory}>
                        <option>Main category</option>
                        <option value="/men">Mens</option>
                        <option value="/women">Womens</option>
                        <option value="/sport">Sports</option>
                        <option value="/kid">Kids</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Product Category</FormLabel>
                      <Select
                        size={["sm", "md"]}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Select Category</option>
                        {allCategories?.map((el, index) => {
                          return (
                            <option key={index} value={el}>
                              {el.split("_").map((item, index) => {
                                if (index !== 0) {
                                  return `${item.toUpperCase()}`;
                                }
                              })}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Flex>

                  <FormControl isRequired>
                    <FormLabel>Product Quantity</FormLabel>
                    <Input
                      size={["sm", "md"]}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      placeholder="Enter product quantity"
                    />
                  </FormControl>

                  <Button
                    borderRadius={"none"}
                    bg="teal"
                    color="white"
                    _hover={{ bg: "teal.500" }}
                    size={["sm", "md"]}
                    type="submit"
                  >
                    {loading && <Spinner mr="0.5rem" />} Add product
                  </Button>
                </Stack>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button
                borderRadius="none"
                colorScheme="teal"
                size={["sm", "md"]}
                w="100%"
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      {/* displaying products */}
      <Box m="25px auto" w={["90%", "80%", "70%"]}>
        <Scrollbars style={{ width: "100%", height: "80vh" }}>
          <Stack w="100%" p="1rem">
            {data &&
              data?.map((el, index) => (
                <ProductItem
                  handleDelete={handleDelete}
                  key={index}
                  item={el}
                  index={index}
                />
              ))}

            {isLoading && <Spinner m="auto" color="teal" size="xl" />}
          </Stack>
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default AdminPage;
