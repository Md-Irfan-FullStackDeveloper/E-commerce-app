import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Text,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginMenu = ({ close }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect()
    close();
  };

  return (
    <Menu>
      <MenuButton
        fontWeight="500"
        _hover={{ cursor: "pointer", color: "teal" }}
      >
        Login
      </MenuButton>
      <MenuList w="400px" p="1.5rem">
        <Text fontSize="14px">
          {" "}
          Want to login. If you are new click on signUp otherwise click on login{" "}
        </Text>
        <MenuItem m='1rem 0' _hover={{ bg: "none" }}>
          <Button
            onClick={handleLogin}
            w="100%"
            bg="teal.500"
            color="white"
            _hover={"none"}
          >
            User Login
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LoginMenu;
