import {
  Flex,
  Box,
  HStack,
  Image,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";

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
        <HStack alignItems={"center"}>
          <Image src={Logo} alt="" />
          <Heading
            as="h3"
            size="md"
            fontWeight={500}
            display={{ base: "none", sm: "block" }}
          >
            <Text
              color={useColorModeValue("accentLight.400", "accentDark.400")}
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "15%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: useColorModeValue("accentLight.100", "accentDark.900"),
                zIndex: -1,
              }}
            >
              pusat
            </Text>
            <br />
            ngoding
          </Heading>
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
      <Box my={"auto"}>
        <ScrollToTop />
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
