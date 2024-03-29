import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetBlogById, useDeleteBlogById } from "../../hooks/useBlog";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { AuthContext } from "../../components/AuthContext";
import { useContext } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const BlogDetails = () => {
  let { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { documentData, loading, error } = useGetBlogById({ blogId: id });
  const navigate = useNavigate();

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleDelete = async () => {
    try {
      await useDeleteBlogById(id);
      alert("Blog successfully deleted");
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Box>
      {documentData &&
      currentUser &&
      documentData.user_id &&
      currentUser.uid &&
      documentData.user_id === currentUser.uid ? (
        <Button colorScheme={"red"} onClick={handleDelete} px={4} mb={8}>
          <Flex alignItems={"center"} justifyContent={"space-between"} gap={2}>
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
  );
};

export default BlogDetails;
