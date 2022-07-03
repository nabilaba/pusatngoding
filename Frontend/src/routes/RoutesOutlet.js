import {
  Flex,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { useEffect, useState } from "react";
import ReactTypingEffect from "react-typing-effect";

export default function RoutesOutlet() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  const KontenLoading = () => {
    return (
      <Box>
        <HStack alignItems={"center"} spacing={0}>
          <ReactTypingEffect
            typingDelay={1000}
            speed={50}
            eraseSpeed={50}
            eraseDelay={1000}
            cursorRenderer={cursor => null}
            text={["pusat"]}
          />
          <Text>{`ngoding.`}</Text>
        </HStack>
      </Box>
    );
  };

  return isLoading ? (
    <Flex h="100vh" align="center" justify="center">
      <KontenLoading />
    </Flex>
  ) : (
    <Flex minH={"100vh"} justifyContent={"space-between"} direction={"column"}>
      <Navbar />
      <Box my={"auto"} h="full" style={{ overflow: "hidden" }}>
        <ScrollToTop />
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
