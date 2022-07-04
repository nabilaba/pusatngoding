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
    <Stack as={Container} maxW={"7xl"} spacing={10} py={10} data-aos="fade-up" mt={10}>
      <Stack maxW="lg" textAlign="center" alignSelf="center">
        <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
          Keunggulan Pusat Ngoding
        </Heading>
        <Text color={"gray.500"}>
          Beberapa keunggulan Pusat Ngoding yang ada dibandingkan dengan
          platform yang lainnya
        </Text>
      </Stack>
      <Flex w="full" justifyContent="center" alignItems="center">
        <SimpleGrid
          w="full"
          columns={{ base: 2, xl: 4 }}
          spacing={4}
          color={"white"}
        >
          <Stack
            justify={"space-between"}
            w="100%"
            rounded={"xl"}
            bgGradient="linear(to-b, rgba(246, 92, 139, 1), rgba(246, 92, 139, 1))"
            px="8"
            py="8"
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
            bgGradient="linear(to-b, rgba(158, 138, 252, 1), rgba(158, 138, 252, 1))"
            px="8"
            py="8"
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
            bgGradient="linear(to-b, rgba(97, 210, 242, 1), rgba(97, 210, 242, 1))"
            px="8"
            py="8"
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
            bgGradient="linear(to-b, rgba(255, 155, 41, 1), rgba(255, 155, 41, 1))"
            px="8"
            py="8"
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
