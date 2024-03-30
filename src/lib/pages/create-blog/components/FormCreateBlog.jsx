import { FormControl, Input } from "@chakra-ui/react";

const FormCreateBlog = ({ onSubmit, onChange }) => {
  return (
    <FormControl onSubmit={onSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Insert Blog Title"
        mb={2}
        borderRadius={"18px"}
        onChange={onChange}
        required
      />

      <Input
        type="text"
        name="content"
        placeholder="Insert Blog Content"
        minH={36}
        borderRadius={"18px"}
        onChange={onChange}
        required
      />
    </FormControl>
  );
};

export default FormCreateBlog;
