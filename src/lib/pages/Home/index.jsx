import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as Navlink } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import AllBlogPosts from "./components/AllBlogPosts";

const Home = () => {
  return (
    <>
      <Box>
        <AllBlogPosts />
      </Box>
    </>
  );
};

export default Home;
