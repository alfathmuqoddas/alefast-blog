import { useParams } from "react-router-dom";
import { useGetBlogById } from "../../hooks/useBlog";
import { Box, Text, Button } from "@chakra-ui/react";
import { useDeleteBlogById } from "../../hooks/useBlog";
import { AuthContext } from "../../components/AuthContext";
import { useContext } from "react";

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
          <Button colorScheme={"red"} onClick={() => useDeleteBlogById(id)}>
            Delete Blog
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
