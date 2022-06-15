import "./NotFound.css";
import Img404 from "../../assets/Img404.svg";
import { Image, Container, chakra } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <main>
      <Container pt={24} align={"center"} justify={"center"} maxW={"lg"}>
        <Image src={Img404} />
        <chakra.h1 fontWeight={700} fontSize={36}>
          Halaman Tidak Ditemukan
        </chakra.h1>
      </Container>
    </main>
  );
};

export default NotFound;
