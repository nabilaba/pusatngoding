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
import useLoginState from "../../zustand/todoLogin";

export default function Login() {
  const { setIsLoggedIn, setLoggedAs } = useLoginState();
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const HandleSubmit = (e) => {
    if (
      email === "mentor@gmail.com" ||
      email === "siswa@gmail.com" ||
      email === "pusatngoding@admin.com"
    ) {
      if (email === "mentor@gmail.com") {
        setLoggedAs("mentor");
      } else if (email === "siswa@gmail.com") {
        setLoggedAs("siswa");
      } else {
        setLoggedAs("admin");
      }

      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Email atau Password Salah");
    }

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
            <Input
              type="email"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Kata Sandi</FormLabel>
            <Input
              type="password"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
            />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox mr={32}>Ingat Saya</Checkbox>
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
