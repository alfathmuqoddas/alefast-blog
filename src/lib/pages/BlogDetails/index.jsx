import { useParams } from "react-router-dom";
import { useGetBlogById } from "../../hooks/useBlog";
import { Box, Text } from "@chakra-ui/react";

const BlogDetails = () => {
  let { id } = useParams();
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
