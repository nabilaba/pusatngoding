import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Text,
  Box,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import LoadingFetchEffect from "../../components/LoadingFetchEffect";
import useTimeoutGlobal from "../../zustand/timeoutPindahHalaman";

const dataRoadmap = [
  {
    judul: "Frontend",
    warnaTeks: "pink.600",
    warnaTeksDark: "pink.400",
  },
  {
    judul: "Backend",
    warnaTeks: "yellow.600",
    warnaTeksDark: "yellow.400",
  },
  {
    judul: "DevOps",
    warnaTeks: "teal.600",
    warnaTeksDark: "teal.400",
  },
  {
    judul: "React",
    warnaTeks: "green.600",
    warnaTeksDark: "green.400",
  },
  {
    judul: "Angular",
    warnaTeks: "blue.600",
    warnaTeksDark: "blue.400",
  },
  {
    judul: "Android",
    warnaTeks: "red.600",
    warnaTeksDark: "red.400",
  },
  {
    judul: "Python",
    warnaTeks: "yellow.600",
    warnaTeksDark: "yellow.400",
  },
  {
    judul: "Golang",
    warnaTeks: "teal.600",
    warnaTeksDark: "teal.400",
  },
  {
    judul: "Java",
    warnaTeks: "green.600",
    warnaTeksDark: "green.400",
  },
  {
    judul: "PostgreSQL-DBA",
    warnaTeks: "blue.600",
    warnaTeksDark: "blue.400",
  },
];

export default function Event() {
  const { timeout } = useTimeoutGlobal();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeout);
  });

  const Feature = (props) => {
    return (
      <Box
        as={"a"}
        href={`http://roadmap.sh/${props.judul.toLowerCase()}`}
        target="_blank"
        borderRadius={"xl"}
        p={{ base: 5, lg: 5 }}
        bg={useColorModeValue("rgba(0,0,0,.05)", "rgba(255,255,255,.05)")}
      >
        <Heading
          fontSize={{ base: "lg", xl: "xl" }}
          lineHeight="shorter"
          fontWeight="bold"
          color={useColorModeValue(props.warnaTeks, props.warnaTeksDark)}
        >
          {props.judul}
        </Heading>
        <Text fontSize={"md"}>
          Alur menjadi {props.judul} di tahun 2022 dapat dilihat di sini.
        </Text>
      </Box>
    );
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container pt={4} maxW={"7xl"} data-aos="fade-up">
      <Heading fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}>
        Halo, 👋
      </Heading>
      <Text color={"gray.500"}>
        Roadmap adalah suatu peta ataupun panduan yang bisa digunakan sebagai
        petunjuk dalam mengarahkan jalan, di pelaksanaan suatu program kegiatan
        dalam kurun waktu tertentu. Nah, roadmap juga bisa digunakan dalam
        proses produksi perusahaan.
      </Text>
      <Flex w="auto" justifyContent="center" alignItems="center" mt={'2'}>
        <SimpleGrid
          columns={{ base: 2, lg: 4 }}
          spacing={"1"}
          w={"full"}
          autoRows={"1fr"}
        >
          {dataRoadmap.map((item) => {
            return <Feature {...item} key={item.judul} />;
          })}
        </SimpleGrid>
      </Flex>
    </Container>
  );
}
