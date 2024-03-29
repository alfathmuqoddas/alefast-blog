import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  Avatar,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
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
          <SimpleGrid columns={[1, null, 3]} spacing={16}>
            {docs.map((doc) => (
              <Box key={doc.id} w={"100%"} borderColor={"grey"} className="">
                <ChakraLink
                  as={NavLink}
                  to={`blog/${doc.id}`}
                  _hover={{ textDecoration: "none" }}
                >
                  <Box>
                    <Image
                      src={`https://picsum.photos/seed/${doc.id}/480/480`}
                      objectFit="cover"
                      minW={"100%"}
                      h={"auto"}
                      borderRadius={"22px"}
                    ></Image>
                  </Box>
                  <Box>
                    <Flex alignItems={"center"} gap={2} py={4}>
                      <Avatar
                        name={doc.user_displayName}
                        src={doc.user_photoUrl}
                      />

                      <Text fontSize={"24px"} fontWeight={"bold"}>
                        {doc.title}
                      </Text>
                    </Flex>
                    <Text _hover={{ textDecoration: "underline" }}>
                      Learn More
                    </Text>
                  </Box>
                </ChakraLink>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default AllBlogPosts;
