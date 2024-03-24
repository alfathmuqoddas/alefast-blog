import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Box,
  Flex,
  Text,
  MenuItem,
  MenuList,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = () => {
  const { currentUser, signInWithGoogle, signOutFunc, loading } =
    useContext(AuthContext);
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Box>
          <ChakraLink as={NavLink} to="/">
            <Text fontSize={"30px"} fontWeight={"bold"}>
              Alefast Blog
            </Text>
          </ChakraLink>
        </Box>
        <Box>
          {currentUser ? (
            <>
              <UserMenu
                action={loading ? "loading..." : currentUser.displayName}
                menuItems={
                  <MenuList>
                    <MenuItem as={NavLink} to="/">
                      Home
                    </MenuItem>
                    <MenuItem as={NavLink} to="/about">
                      About
                    </MenuItem>
                    <MenuItem onClick={signOutFunc}>Sign Out</MenuItem>
                  </MenuList>
                }
              />
            </>
          ) : (
            <UserMenu
              action={loading ? "loading..." : "Sign In"}
              menuItems={
                <MenuList>
                  <MenuItem onClick={signInWithGoogle}>
                    Sign In With Google
                  </MenuItem>
                </MenuList>
              }
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
