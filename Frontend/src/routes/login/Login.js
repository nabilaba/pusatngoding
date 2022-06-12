import "./Login.css";
import { useState } from "react";
import { Link as LinkTo, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const useNavigateTo = useNavigate();

  const HandleSubmit = (e) => {
    if (email === "mentor@gmail.com") props.setIsMentor(true);
    else props.setIsMentor(false);

    useNavigateTo("/dashboard");
    e.preventDefault();
  };

  return (
    <Container pt={20} pb={4} align={"center"} justify={"center"} maxW={"lg"}>
      <Box
        rounded={"3xl"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"md"}
        p={8}
      >
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Masuk ke Akun
        </Heading>
        <Stack
          spacing={4}
          my={10}
          as={"form"}
          onSubmit={(e) => HandleSubmit(e)}
        >
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Kata Sandi</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox mr={32} colorSheme={useColorModeValue("accentLight.400", "accentDark.400")}>Ingat Saya</Checkbox>
              <Link
                color={useColorModeValue("accentLight.400", "accentDark.400")}
              >
                Lupa Kata Sandi?
              </Link>
            </Stack>
            <Button
              type={"submit"}
              color={useColorModeValue("white", "black")}
              bg={useColorModeValue("accentLight.400", "accentDark.400")}
              _hover={{
                bg: useColorModeValue("accentLight.500", "accentDark.500"),
              }}
            >
              Masuk
            </Button>
          </Stack>
        </Stack>
        <Text textAlign={"center"}>
          Belum memiliki akun?{" "}
          <Link
            as={LinkTo}
            to="/mendaftar"
            color={useColorModeValue("accentLight.400", "accentDark.400")}
          >
            Daftar Sekarang
          </Link>
        </Text>
      </Box>
    </Container>
  );
}
