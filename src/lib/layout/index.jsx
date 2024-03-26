import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <Box minH={"100vh"} position={"relative"}>
      <Header />
      <Box maxW={"1192px"} minH={"100vh"} px={[8, 4]} mx={"auto"} py={16}>
        <Outlet />
      </Box>
      <Box minW={"100%"} bg={"#F8F7F3"}>
        <Footer />
      </Box>
      <ScrollRestoration />
    </Box>
  );
};

export default Layout;
