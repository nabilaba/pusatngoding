import ImgHero from "../../../assets/ImgHero.png";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Container,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as LinkTo } from "react-router-dom";

export default function Hero() {
  return (
    <Stack
      as={Container}
      direction={{ base: "column", lg: "row" }}
      maxW={"7xl"}
    >
      <Flex
        py={{ base: 0, md: 8 }}
        flex={1}
        align={"center"}
        order={{ base: 2, lg: 1 }}
        data-aos="fade-right"
      >
        <Stack spacing={6} w={"full"}>
          <Heading
            mt={{ base: 4, md: 0 }}
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontWeight={"bold"}
          >
            <Text
              fontWeight="extrabold"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            >
              Pusat Ngoding
            </Text>
            <Text fontSize={{ base: "2xl", md: "3xl", lg: "3xl" }}>
              Solusi Untuk Belajar Ngoding dan Raih Mimpimu
            </Text>
          </Heading>
          <Text fontSize={"md"} color={"gray.500"} align="justify">
            Platform pencarian mentor ngoding pribadi yang terpercaya dengan
            keahlian di berbagai lini perkodingan. Cari mentor ngoding pribadi
            ya dimana lagi selain di Pusat Ngoding!
          </Text>
          <Stack
            direction={{ base: "column-reverse", sm: "row", md: "row" }}
            align={"center"}
            justifyContent={{ base: "space-around", sm: "space-between" }}
            spacing={{ sm: "20" }}
          >
            <Box>
              <Button
                as={LinkTo}
                to="/mendaftar"
                size={{ base: "md", md: "lg" }}
                w={{ base: "xs", sm: "full" }}
                rounded={"full"}
                color={useColorModeValue("white", "black")}
                bg={useColorModeValue("accentLight.400", "accentDark.400")}
                _hover={{
                  bg: useColorModeValue("accentLight.500", "accentDark.500"),
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Daftar Sekarang
              </Button>
            </Box>
            <Stack
              // border={"1px solid black"}
              direction={{ base: "row", md: "row" }}
              spacing={{ base: "12", md: "16" }}
              align={"center"}
              justifyContent={"space-between"}
              w={{ md: "full" }}
            >
              <Box>
                <Heading>300+</Heading>
                <Text color="gray.500" as={"span"} fontSize={"md"}>
                  Mentor Terdaftar
                </Text>
              </Box>
              <Box>
                <Heading>3k+</Heading>
                <Text color="gray.500" as={"span"} fontSize={"md"}>
                  Ulasan Positif Siswa
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Flex
        data-aos="fade-left"
        flex={1}
        align={"center"}
        justify={"center"}
        order={{ base: 1, lg: 2 }}
        pl={{ md: "40px" }}
      >
        <Image p={5} alt={""} objectFit={"cover"} src={ImgHero} />
      </Flex>
    </Stack>
  );
}
