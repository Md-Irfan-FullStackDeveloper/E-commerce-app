import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Skeleton,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Redux/AppReducer/action";
import { store } from "../Redux/store";

const ProductItem = ({ item, index, handleDelete }) => {
  const deleteProductLoading = useSelector(
    (store) => store.AppReducer.deleteProductLoading
  );

  const handleChangeStatus = (e) => {
    const status = e.target.value;
    
  };

  return (
    <Flex
      border="1px solid teal"
      w="100%"
      justify="space-between"
      align="center"
      p="0.5rem"
    >
      <Text fontSize="12px">Sr.no - {index + 1}</Text>
      <Box>
        <Image h="100px" objectFit="contain" src={item.image[0].src} />
      </Box>
      <Text fontSize="12px">{item.title}</Text>

      <MdDelete
        onClick={() => handleDelete(item.id)}
        cursor="pointer"
        size="1.2rem"
      />

      <Select size={["xs", "sm"]} w="max-content" onChange={handleChangeStatus}>
        <option>Update Status</option>
        <option value="orderPlaced">Order placed</option>
        <option value="orderShipped">Order shipped</option>
        <option value="paymentMade">Payment made</option>
        <option value="inTransit">In transit</option>
        <option value="delivered">Delivered</option>
      </Select>
    </Flex>
  );
};

export default ProductItem;
