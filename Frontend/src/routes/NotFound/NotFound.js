import Img404 from "../../assets/Img404.svg";
import { Image, Container, Heading, Stack } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Stack
      as={Container}
      align={"center"}
      justify={"center"}
      maxW={"7xl"}
      textAlign={"center"}
    >
      <Image
        src={Img404}
        alt=""
        boxSize={{ base: "xs", md: "sm" }}
        objectFit="cover"
      />
      <Heading>Halaman Tidak Ditemukan</Heading>
    </Stack>
  );
};

export default NotFound;
