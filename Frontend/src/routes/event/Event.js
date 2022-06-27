import { useEffect, useState } from "react";
import { Container, Heading, useColorModeValue } from "@chakra-ui/react";
import LoadingFetchEffect from "../../components/LoadingFetchEffect";
import useTimeoutGlobal from "../../zustand/timeoutPindahHalaman";

export default function Event() {
  const { timeout } = useTimeoutGlobal();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeout);
  });

  const textcolor = useColorModeValue("accentLight.400", "accentDark.400");

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container
      align={"center"}
      justify={"center"}
      maxW={"lg"}
      data-aos="fade-up"
    >
      <Heading
        fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
        color={textcolor}
      >
        Segera Datang
      </Heading>
    </Container>
  );
}
