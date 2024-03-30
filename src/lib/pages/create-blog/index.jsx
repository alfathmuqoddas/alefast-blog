import FormCreateBlog from "./components/FormCreateBlog";
import { useState, useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Text, Link as Chakralink } from "@chakra-ui/react";
import { createBlog } from "../../hooks/useBlog";
import { serverTimestamp } from "firebase/firestore";
import { Link as NavLink } from "react-router-dom";

const CreateBlog = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState([]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { uid, displayName, photoURL } = await currentUser;
      await createBlog("blogPost", {
        ...formData,
        user_id: uid,
        user_displayName: displayName,
        user_photoUrl: photoURL,
        created_at: serverTimestamp(),
      });
      alert("Blog entry is succesfully created");
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <Text fontSize={"2xl"} fontWeight={"bold"} mb={4}>
        Create Blog
      </Text>
      <FormCreateBlog onSubmit={handleSubmit} onChange={handleInput} />
      <Flex gap={2} mt={4}>
        <Chakralink as={NavLink} to="/">
          <Button colorScheme="red">Cancel</Button>
        </Chakralink>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Create Blog!
        </Button>
      </Flex>
    </div>
  );
};

export default CreateBlog;
