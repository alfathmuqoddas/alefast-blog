import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as Navlink } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import AllBlogPosts from "./components/AllBlogPosts";
import CreateBlog from "./components/CreateBlog";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Box>
        {currentUser ? (
          <CreateBlog />
        ) : (
          <Box>You need to Login to Create Blog</Box>
        )}
        <AllBlogPosts />
      </Box>
    </>
  );
};

export default Home;
