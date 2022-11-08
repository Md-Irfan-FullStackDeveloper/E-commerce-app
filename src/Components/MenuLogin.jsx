import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SIGNOUT } from "../Redux/AuthReducer/actionType";

const MenuLogin = ({ close }) => {
  const { logout, user } = useAuth0();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState();

  const handleSignOut = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <Menu>
      <MenuButton>
        <FaUserCircle cursor="pointer" size="1.5rem" />
      </MenuButton>
      <MenuList minW="300px" p="1rem">
        <Stack spacing={3}>
          <Text
            color="teal"
            textAlign="center"
            fontWeight="bold"
            fontSize="1.5rem"
          >
            Welcome
          </Text>

          {user.name && (
            <Text fontSize="14px" textAlign="center">
              Name :- {user.name}
            </Text>
          )}

          <Text fontSize="14px" textAlign="center">
            Email :- {user.email}
          </Text>
        </Stack>

        <MenuItem m="1rem 0">
          <Button
            w="100%"
            color="white"
            bg="teal"
            _hover={"none"}
            size={["sm", "md"]}
            onClick={handleSignOut}
          >
            SignOut
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuLogin;
