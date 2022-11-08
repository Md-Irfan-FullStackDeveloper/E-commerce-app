import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box m="50px auto" borderTop="1px solid gray" p="1rem" w={["90%", "80%"]}>
      <Text align="center" fontSize={"sm"}>
        Powered by Swag Fashion
      </Text>
      <Text
        align="center"
        mt="7px"
        color="blue.500"
        fontWeight="bold"
        _hover={{ cursor: "pointer", textDecoration: "underline" }}
        fontSize={"sm"}
      >
        About us
      </Text>
      <Text
        align="center"
        mt="7px"
        color="blue.500"
        fontWeight="bold"
        _hover={{ cursor: "pointer", textDecoration: "underline" }}
        fontSize={"sm"}
      >
        Contact us
      </Text>
    </Box>
  );
};

export default Footer;
