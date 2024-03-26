import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: "99px", // Adjust the value as needed
      },
    },
    Input: {
      baseStyle: {
        borderRadius: "xl",
      },
    },
  },
});

export default customTheme;
