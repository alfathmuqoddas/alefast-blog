import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <Box minH={"100vh"} position={"relative"}>
      <Header />
      <Box maxW={"1192px"} minH={"100vh"} px={[8, 4]} mx={"auto"} py={16}>
        {children}
      </Box>
      <Box minW={"100%"} bg={"#F8F7F3"}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
