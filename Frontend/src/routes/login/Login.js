import "./Login.css";
import { useState, useEffect } from "react";
import { Link as LinkTo, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import useLoginState from "../../zustand/todoLogin";
import axios from "axios";
import { LOGIN_AUTH } from "../../api/API";

export default function Login() {
  const { isLoggedIn, setIsLoggedIn, setLoggedAs, setUserId } = useLoginState();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    await axios
      .post(LOGIN_AUTH, user)
      .then((response) => {
        setUserId(response.data.user.id);
        setIsLoggedIn(true);
        setLoggedAs(response.data.user.role);
        localStorage.setItem("tokenId", response.data.tokenId);
      })
      .catch((error) => {
        toast({
          title: "Gagal.",
          description: `Email atau password salah.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container
      pt={4}
      pb={4}
      align={"center"}
      justify={"center"}
      maxW={"lg"}
      data-aos="fade-up"
    >
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"end"}
            >
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
