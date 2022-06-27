import {
  Container,
  Box,
  Button,
  useColorModeValue,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link as LinkTo } from "react-router-dom";

export default function SignUpGuru() {
  return (
    <Stack
      minH={{ base: "auto", lg: "100vh" }}
      as={Container}
      w="full"
      alignItems="center"
      justifyContent="center"
      maxW={"7xl"}
      p={50}
    >
      <Box w="100%" data-aos="fade-up">
        <Heading
          fontSize={{ base: "3xl", sm: "4xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="shorter"
          color={useColorModeValue("gray.900", "gray.100")}
        >
          <Text>Ingin Bergabung Sebagai Partner Mentor Kami?</Text>
          <Text color={useColorModeValue("gray.500", "gray.500")}>
            Bagikan Pengalamanmu Sekarang Bersama Mentor-Mentor Lainnya.
          </Text>
        </Heading>
        <Button
          as={LinkTo}
          to={"cara_mendaftar_mentor"}
          color={useColorModeValue("white", "black")}
          bg={useColorModeValue("accentLight.400", "accentDark.400")}
          _hover={{
            bg: useColorModeValue("accentLight.500", "accentDark.500"),
          }}
          p="4"
          mt={4}
        >
          Cara Mendaftar
        </Button>
      </Box>
    </Stack>
  );
}
