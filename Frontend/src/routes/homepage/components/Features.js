import "./Features.css";
import {
  Container,
  Box,
  SimpleGrid,
  Heading,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Features() {
  return (
    <Stack as={Container} maxW={"7xl"} spacing={5} py={10} data-aos="fade-up">
      <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
        Keunggulan <br />
        Pusat Ngoding
      </Heading>
      <Flex w="auto" justifyContent="center" alignItems="center">
        <SimpleGrid
          columns={{ base: 2, xl: 4 }}
          spacing={{ base: "4", xl: "20" }}
          color={"white"}
        >
          <Stack
            justify={"space-between"}
            w="100%"
            rounded={"xl"}
            bg="#F65C8B"
            px="8"
            py="4"
          >
            <Text fontSize={{ base: "36", md: "50" }} fontWeight="500">
              #1
            </Text>
            <Text fontSize={{ base: "16", md: "24" }}>
              Pilihan Kursus Online/Offline
            </Text>
            <Box mt="auto" w="100%" h={0.9} bg={"white"} />
          </Stack>
          <Stack
            justify={"space-between"}
            w="100%"
            rounded={"xl"}
            bg="#9E8AFC"
            px="8"
            py="4"
          >
            <Text fontSize={{ base: "36", md: "50" }} fontWeight="500">
              #2
            </Text>
            <Text fontSize={{ base: "16", md: "24" }}>
              Mentor Berpengalaman
            </Text>
            <Box mt="auto" w="100%" h={0.9} bg={"white"} />
          </Stack>
          <Stack
            justify={"space-between"}
            w="100%"
            rounded={"xl"}
            bg="#61D2F2"
            px="8"
            p="4"
          >
            <Text fontSize={{ base: "36", md: "50" }} fontWeight="500">
              #3
            </Text>
            <Text fontSize={{ base: "16", md: "24" }}>
              Subjek Kursus Beragam
            </Text>
            <Box mt="auto" w="100%" h={0.9} bg={"white"} />
          </Stack>
          <Stack
            justify={"space-between"}
            w="100%"
            rounded={"xl"}
            bg="#FF9B29"
            px="8"
            p="4"
          >
            <Text fontSize={{ base: "36", md: "50" }} fontWeight="500">
              #4
            </Text>
            <Text fontSize={{ base: "16", md: "24" }}>
              Jumlah Siswa Aktif 1k
            </Text>
            <Box mt="auto" w="100%" h={0.9} bg={"white"} />
          </Stack>
        </SimpleGrid>
      </Flex>
    </Stack>
  );
}
