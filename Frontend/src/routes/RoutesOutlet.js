import { Flex, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"

export default function RoutesOutlet() {
  return (
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
