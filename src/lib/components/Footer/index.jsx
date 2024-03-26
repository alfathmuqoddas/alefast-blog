import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box maxW={"1192px"} mx={"auto"} px={[8, 4]} py={8} textAlign={"center"}>
      <Text fontSize={"16px"} fontWeight={"bold"}>
        Alefast
      </Text>
      <Text>&#169; {`${new Date().getFullYear()}`}</Text>
    </Box>
  );
};

export default Footer;
