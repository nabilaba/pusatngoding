import "./Hero.css";
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
      direction={{ base: "column", md: "row" }}
      maxW={"7xl"}
      pt={20}
    >
      <Flex
        py={{ base: 0, md: 8 }}
        flex={1}
        align={"center"}
        order={{ base: 2, md: 1 }}
      >
        <Stack spacing={6} w={"full"}>
          <Heading
            mt={{ base: 4, md: 0 }}
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontWeight={"bold"}
          >
            <Text fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} as={"span"}>
              Cari Mentor
            </Text>
            <br />
            Solusi Untuk Belajar Ngoding dan Raih Mimpimu
          </Heading>
          <Text fontSize={"md"} color={"gray.500"} align="justify">
            Platform pencarian mentor ngoding pribadi yang terpercaya dengan
            keahlian di berbagai lini perkodingan. Cari mentor ngoding pribadi
            ya dimana lagi selain di Pusat Ngoding!
          </Text>
          <Stack
            direction={{ base: "row", md: "row" }}
            spacing={4}
            align={"center"}
            justifyContent={"space-between"}
          >
            <Button
              as={LinkTo}
              to="/mendaftar"
              size={{ base: "md", md: "lg" }}
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
      </Flex>
      <Flex
        flex={1}
        align={"center"}
        justify={"center"}
        order={{ base: 1, md: 2 }}
      >
        <Box
          position={"absolute"}
          w={{ base: "270px", md: "350px" }}
          h={{ base: "270px", md: "350px" }}
          rounded={"full"}
          bg={"#61D2F2"}
          boxShadow={
            "0 0 0 40px rgba(97, 210, 242, 0.5), 0 0 0 70px rgba(97, 210, 242, 0.3), 0 0 0 100px rgba(97, 210, 242, 0.1)"
          }
          zIndex={1}
        />
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={ImgHero}
          zIndex={2}
        />
      </Flex>
    </Stack>
  );
}
