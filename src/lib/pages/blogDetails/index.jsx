import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useGetBlogById,
  deleteBlogById,
  createBlog,
  useGetAllCommentsByBlogId,
  deleteAllCommentByBlogId,
} from "../../hooks/useBlog";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { AuthContext } from "../../components/AuthContext";
import { useContext } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import FormCreateComments from "./components/FormCreateComments";
import Comments from "./components/Comments";
import { serverTimestamp } from "firebase/firestore";

const BlogDetails = () => {
  let { id } = useParams();
  const [commentFormData, setCommentFormData] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { postData, loading, error } = useGetBlogById({ blogId: id });
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useGetAllCommentsByBlogId({
    postId: id,
  });
  const navigate = useNavigate();

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleCommentInput = (e) => {
    setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    try {
      e.preventDefault();
      const { uid, displayName, photoURL } = await currentUser;
      await createBlog("comment", {
        ...commentFormData,
        post_id: id,
        user_id: uid,
        user_displayName: displayName,
        user_photoUrl: photoURL,
        created_at: serverTimestamp(),
      });
      setCommentFormData([]);
    } catch (error) {
      alert({ error });
      console.log({ error });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlogById("blogPost", id);
      await deleteAllCommentByBlogId("comment", id);
      alert("Blog successfully deleted");
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Box>
      <Box pb={8}>
        {postData &&
        currentUser &&
        postData.user_id &&
        currentUser.uid &&
        postData.user_id === currentUser.uid ? (
          <Button colorScheme={"red"} onClick={handleDelete} px={4} mb={8}>
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
          {postData.title}
        </Text>
        <Text>{postData.content}</Text>
        <Text>BlogId: {id}</Text>
      </Box>
      <Box p={8} pb={4} borderRadius={"16px"} bg={"#F8F7F3"} mt={8}>
        <Text fontWeight={"bold"}>Comments</Text>

        {currentUser ? (
          <FormCreateComments
            userData={currentUser}
            onSubmit={handleCommentSubmit}
            onChange={handleCommentInput}
          />
        ) : (
          <Box mt={4} mb={8}>
            <Text>You have to login to comment!</Text>
          </Box>
        )}

        {commentsError ? <>{commentsError.message}</> : <></>}

        {commentsLoading ? <>Loading...</> : <Comments comments={comments} />}
      </Box>
    </Box>
  );
};

export default BlogDetails;
