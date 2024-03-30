import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { deleteBlogById } from "../../../hooks/useBlog";
import { useContext } from "react";
import { AuthContext } from "../../../components/AuthContext";

const Comments = ({ comments }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Box>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Box key={comment.id} pb={4}>
            <Flex gap={4} alignItems={"center"}>
              <Avatar
                name={comment.user_displayName}
                src={comment.user_photoURL}
                size={"sm"}
              />
              <Box>
                <Text fontWeight={"bold"}>{comment.user_displayName}</Text>
                <Text>{comment.comment_content}</Text>
                {comment &&
                currentUser &&
                comment.user_id &&
                currentUser.uid &&
                comment.user_id === currentUser.uid ? (
                  <Text
                    fontSize={"xs"}
                    pt={2}
                    onClick={() => deleteBlogById("comment", comment.id)}
                  >
                    Delete
                  </Text>
                ) : (
                  <></>
                )}
              </Box>
            </Flex>
          </Box>
        ))
      ) : (
        <>No Comments Exists</>
      )}
    </Box>
  );
};

export default Comments;
