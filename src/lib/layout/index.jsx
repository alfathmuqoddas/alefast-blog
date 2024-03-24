import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box maxW={"1192px"} px={[8, 0]} mx={"auto"} my={16}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
