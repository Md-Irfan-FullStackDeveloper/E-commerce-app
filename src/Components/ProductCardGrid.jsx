import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductCardGrid = ({ data, loading, category }) => {
  const loadingItem = new Array(9).fill(0);
  return (
    <SimpleGrid
      spacing={5}
      m={["10px auto", "auto", "auto"]}
      columns={[2, 2, 3]}
      w={["100%", "75%", "75%"]}
    >
      {data &&
        data?.map((el) => (
          <ProductCard
            btnTitle="Add"
            category={category}
            key={el.id}
            data={el}
          />
        ))}

      {loading &&
        loadingItem.map((el, index) => (
          <Box key={index + 1} p="1rem">
            <Skeleton w="100%" h="300px"></Skeleton>
            <SkeletonText w="100%"></SkeletonText>
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default ProductCardGrid;
