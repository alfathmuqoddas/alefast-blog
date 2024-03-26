import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Box,
  Flex,
  Text,
  MenuItem,
  MenuList,
  Avatar,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Link as NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import { MdOutlineHome, MdExitToApp } from "react-icons/md";

const Header = () => {
  const { currentUser, signInWithGoogle, signOutFunc, loading } =
    useContext(AuthContext);
  return (
    <Box p={2} bg={"black"} color={"white"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box>Menu</Box>
        <Box>
          <ChakraLink as={NavLink} to="/">
            <Text fontSize={"30px"} fontWeight={"bold"}>
              Alefast
            </Text>
          </ChakraLink>
        </Box>
        <Box>
          {currentUser ? (
            <>
              <UserMenu
                action={
                  loading ? (
                    "loading..."
                  ) : (
                    <Avatar
                      name={currentUser.displayName}
                      src={currentUser.photoURL}
                      size={"sm"}
                    />
                  )
                }
                menuItems={
                  <MenuList borderRadius={"16px"} color={"black"}>
                    <MenuItem as={NavLink} to="/" icon={<MdOutlineHome />}>
                      Home
                    </MenuItem>
                    <MenuItem as={NavLink} to="/about">
                      About
                    </MenuItem>
                    <MenuItem onClick={signOutFunc} icon={<MdExitToApp />}>
                      Sign Out
                    </MenuItem>
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
