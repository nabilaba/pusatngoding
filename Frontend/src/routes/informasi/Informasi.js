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
import binaracademy from "../../assets/selebihnya/binaracademy.png";
import revou from "../../assets/selebihnya/revou.svg";
import hacktiv8 from "../../assets/selebihnya/hacktiv8.webp";
import purwadhika from "../../assets/selebihnya/purwadhika.svg";
import impactbyte from "../../assets/selebihnya/impactbyte.svg";
import haltev from "../../assets/selebihnya/haltev.png";
import alterraacademy from "../../assets/selebihnya/alterraacademy.png";
import kodingnext from "../../assets/selebihnya/kodingnext.webp";
import digitalskola from "../../assets/selebihnya/digitalskola.png";
import devschool from "../../assets/selebihnya/devschool.png";

const data = [
  {
    name: "Binar Academy",
    url: "https://binaracademy.com",
    image: binaracademy,
  },
  {
    name: "Alterra Academy",
    url: "https://academy.alterra.id",
    image: alterraacademy,
  },
  {
    name: "Revou",
    url: "https://revou.id",
    image: revou,
  },
  {
    name: "Hacktiv8",
    url: "https://hacktiv8.com",
    image: hacktiv8,
  },
  {
    name: "Purwadhika",
    url: "https://purwadhika.com",
    image: purwadhika,
  },
  {
    name: "Impact Byte",
    url: "https://impactbyte.com",
    image: impactbyte,
  },
  {
    name: "Haltev",
    url: "https://haltev.com",
    image: haltev,
  },
  {
    name: "Koding Next",
    url: "https://kodingnext.com",
    image: kodingnext,
  },
  {
    name: "Digital Skola",
    url: "https://digitalskola.com",
    image: digitalskola,
  },
  {
    name: "Dev School",
    url: "https://devschool.id",
    image: devschool,
  },
];

export default function Informasi() {
  const { timeout } = useTimeoutGlobal();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeout);
  });

  const textcolor = useColorModeValue("accentLight.500", "accentDark.500");

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW="7xl">
      <Heading fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }} color={textcolor}>
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
      <Stack mt={5}>
        <Text fontWeight={"semibold"}>Platform Bootcamp</Text>
        <SimpleGrid columns={{ base: 3, sm: 4, md: 5, lg: 8 }} autoRows="1fr" gap={2}>
          {data.map((item, index) => (
            <Stack
              as="a"
              href={item.url}
              target="_blank"
              borderWidth={1}
              w="full"
              h="75px"
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
    </Container>
  );
}
