import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as Navlink } from "react-router-dom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import AllBlogPosts from "./components/AllBlogPosts";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import { AddIcon } from "@chakra-ui/icons";

const CreateBlogButton = () => {
  return (
    <ChakraLink as={Navlink} to="/create-blog">
      <Button px={4} colorScheme="blue" borderRadius={"99px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={2}>
          <AddIcon boxSize={3} />
          <Text>Create Blog</Text>
        </Flex>
      </Button>
    </ChakraLink>
  );
};

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Box>
        {currentUser ? (
          <CreateBlogButton />
        ) : (
          <Box>You need to Login to Create Blog</Box>
        )}
        <AllBlogPosts />
      </Box>
    </>
  );
};

export default Home;
