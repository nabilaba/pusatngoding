import "./Event.css";
import { Container, Heading, useColorModeValue } from "@chakra-ui/react";

export default function Event() {
  return (
    <Container align={"center"} justify={"center"} maxW={"lg"}>
      <Heading
        fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
        color={useColorModeValue("accentLight.400", "accentDark.400")}
      >
        Segera Datang
      </Heading>
    </Container>
  );
}
