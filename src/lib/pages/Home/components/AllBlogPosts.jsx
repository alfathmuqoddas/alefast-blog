import { Box, Flex, Link as ChakraLink, Text, Avatar } from "@chakra-ui/react";
import { Link as NavLink } from "react-router-dom";
import { useGetAllBlogs } from "../../../hooks/useBlog";

const AllBlogPosts = () => {
  const { docs, loading } = useGetAllBlogs({ collectionName: "blogPost" });
  console.log({ docs });
  return (
    <>
      <Box py={8}>
        <Text fontSize={"30px"} fontWeight={"bold"}>
          All Blog Posts
        </Text>
      </Box>
      {loading ? (
        <>Loading...</>
      ) : (
        <Box>
          {docs.map((doc) => (
            <Box
              key={doc.id}
              maxW={48}
              my={4}
              border={"1px"}
              borderRadius={"16px"}
              p={2}
              borderColor={"grey"}
            >
              <ChakraLink as={NavLink} to={`blog/${doc.id}`}>
                <Flex
                  alignItems={"center"}
                  gap={2}
                  justifyContent={"space-between"}
                >
                  <Avatar
                    name={`photoUrl_${doc.user_id}`}
                    src={doc.user_photoUrl}
                  />

                  <Text>{doc.title}</Text>
                </Flex>
              </ChakraLink>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default AllBlogPosts;
