import { useParams } from "react-router-dom";
import { useGetBlogById } from "../../hooks/useBlog";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useDeleteBlogById } from "../../hooks/useBlog";
import { AuthContext } from "../../components/AuthContext";
import { useContext } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const BlogDetails = () => {
  let { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { documentData, loading, error } = useGetBlogById({ blogId: id });

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <Box>
        {documentData &&
        currentUser &&
        documentData.user_id &&
        currentUser.uid &&
        documentData.user_id === currentUser.uid ? (
          <Button
            colorScheme={"red"}
            onClick={() => useDeleteBlogById(id)}
            px={2}
            mb={8}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
            >
              <DeleteIcon boxSize={4} />
              <Text>Delete</Text>
            </Flex>
          </Button>
        ) : (
          <></>
        )}
        <Text fontSize={"30px"} fontWeight={"semibold"}>
          {documentData.title}
        </Text>
        <Text>{documentData.content}</Text>
        <Text>BlogId: {id}</Text>
      </Box>
    </>
  );
};

export default BlogDetails;
