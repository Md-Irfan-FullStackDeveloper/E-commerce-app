import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";

const SearchBar = () => {
 
    
  return (
    <Stack
      borderRadius="10px"
      align="center"
      gap="1rem"
      p="1rem"
      h="150px"
      m={["50px auto"]}
      w={["90%", "80%", "60%"]}
      border="0.5px solid teal"
    >
      <Text fontSize={["1rem", "1.5rem"]} fontWeight="600">
        Search Products, What you want
      </Text>
      <Flex align="center" w="100%">
        <Input
          borderRight="none"
          borderBottomRightRadius="0"
          borderTopRightRadius="0"
          placeholder="Search products"
        />
        <Button
          bg="teal"
          color="white"
          _hover="none"
          borderBottomLeftRadius="0"
          borderTopLeftRadius="0"
        >
          Search
        </Button>
      </Flex>
    </Stack>
  );
};

export default SearchBar;
