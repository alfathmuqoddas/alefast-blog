import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as Navlink } from "react-router-dom";

const Home = () => {
  return (
    <>
      Home{" "}
      <ChakraLink as={Navlink} to="/about">
        About
      </ChakraLink>
    </>
  );
};

export default Home;
