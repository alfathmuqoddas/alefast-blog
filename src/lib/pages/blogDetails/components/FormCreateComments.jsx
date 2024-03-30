import {
  Box,
  Flex,
  FormControl,
  Text,
  Avatar,
  Textarea,
  Button,
} from "@chakra-ui/react";
const FormCreateComments = ({ userData, onSubmit, onChange }) => {
  return (
    <Box mt={4} mb={8} borderRadius={"16px"}>
      <Flex gap={4} alignItems={"center"}>
        <Avatar
          size={"sm"}
          name={userData.displayName}
          src={userData.photoURL}
        />
        <Text fontWeight={"bold"}>{userData.displayName}</Text>
      </Flex>
      <FormControl onSubmit={onSubmit} onChange={onChange} pt={2}>
        <Textarea
          name="comment_content"
          placeholder="What's your thought?"
          variant={"unstyled"}
          required
        />
      </FormControl>
      <Button colorScheme={"blue"} onClick={onSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default FormCreateComments;
