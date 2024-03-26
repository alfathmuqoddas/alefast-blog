import { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Text,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../../../hooks/useBlog";
import { AuthContext } from "../../../components/AuthContext";
import { AddIcon } from "@chakra-ui/icons";
import { serverTimestamp } from "firebase/firestore";

export const FormCreateBlog = ({ onSubmit, onChange }) => {
  return (
    <FormControl onSubmit={onSubmit} onChange={onChange}>
      <Input
        type="text"
        name="title"
        placeholder="Insert Blog Title"
        mb={2}
        borderRadius={"18px"}
      />
      <Input
        type="text"
        name="content"
        placeholder="Insert Blog Content"
        minH={36}
        borderRadius={"18px"}
      />
    </FormControl>
  );
};

const CreateBlog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useContext(AuthContext);

  const { navigate } = useNavigate();

  const [formData, setFormData] = useState([]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { uid, displayName, photoURL } = await currentUser;
      await useCreateBlog("blogPost", {
        ...formData,
        user_id: uid,
        user_displayName: displayName,
        user_photoUrl: photoURL,
        created_at: serverTimestamp(),
      });
      alert("Blog entry is succesfully created");
      onClose();
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <>
      <Button onClick={onOpen} px={4} colorScheme="blue" borderRadius={"99px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={2}>
          <AddIcon boxSize={3} />
          <Text>Create Blog</Text>
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"22px"}>
          <ModalHeader>Create Blog Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormCreateBlog onSubmit={handleSubmit} onChange={handleInput} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBlog;
