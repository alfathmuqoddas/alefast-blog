import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link as NavLink } from "react-router-dom";
import { useGetAllBlogs } from "../../../hooks/useBlog";

const AllBlogPosts = () => {
  const { docs, loading } = useGetAllBlogs({ collectionName: "blogPost" });
  console.log({ docs });

  return (
    <>
      <Box>All Blog Posts</Box>
      <Box>
        <ul>
          {docs.map((doc) => (
            <li key={doc.id}>
              <ChakraLink as={NavLink} to={`blog/${doc.id}`}>
                {doc.title}
              </ChakraLink>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default AllBlogPosts;
