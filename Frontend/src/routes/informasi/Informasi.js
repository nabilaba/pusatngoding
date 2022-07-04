import {
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoadingFetchEffect from "../../components/LoadingFetchEffect";
import useTimeoutGlobal from "../../zustand/timeoutPindahHalaman";
import bootcamp from "./bootcamp";
import forum from "./forum";
import belajar from "./belajar";
import praktekcoding from "./praktekcoding";
import codesnippets from "./codesnippets";

export default function Informasi() {
  const { timeout } = useTimeoutGlobal();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeout);
  });

  const textcolor = useColorModeValue("accentLight.500", "accentDark.500");

  const ContainerInformasi = (props) => {
    return (
      <Stack mt={5}>
        <Text fontWeight={"semibold"}>{props.judul}</Text>
        <SimpleGrid
          columns={{ base: 3, sm: 4, md: 5, lg: 8 }}
          autoRows="1fr"
          gap={2}
        >
          {props.data.map((item, index) => (
            <Stack
              as="a"
              href={item.url}
              target="_blank"
              borderWidth={1}
              w="full"
              h="60px"
              p={2}
              bg="white"
              key={index}
            >
              <Image
                src={item.image}
                alt={item.name}
                fit={"contain"}
                w="full"
                h="full"
              />
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    );
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW="7xl" data-aos="fade-up" pt={4}>
      <Heading
        fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
        color={textcolor}
      >
        Informasi
      </Heading>
      <Text color={"gray.500"}>
        Banyak platform website maupun aplikasi yang menyediakan pembelajaran
        coding, forum tanya jawab coding, dan yang berhubungan dengan koding
        lainnya. Namun sayangnya banyak juga orang yang masih awam atau tidak
        tahu dengan platform yang membantu mereka untuk menjadi developer.
        Disini kami sudah menyediakan beberapa platform yang bisa membantu anda
        untuk menjadi developer.
      </Text>
      <ContainerInformasi judul="Platform Belajar Mandiri" data={belajar} />
      <ContainerInformasi judul="Code Snippets" data={codesnippets} />
      <ContainerInformasi judul="Praktek Coding" data={praktekcoding} />
      <ContainerInformasi judul="Forum Tanya Jawab" data={forum} />
      <ContainerInformasi judul="Platform Bootcamp" data={bootcamp} />
    </Container>
  );
}
