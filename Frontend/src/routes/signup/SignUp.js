import "./SignUp.css";
import { useEffect } from "react";
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
  HStack,
  useToast,
} from "@chakra-ui/react";
import useLoginState from "../../zustand/todoLogin";
import axios from "axios";
import { REGISTER_AUTH } from "../../api/API";
import { useState } from "react";

export default function SignUp() {
  const { isLoggedIn } = useLoginState();
  const navigate = useNavigate();
  const [nama_depan, setNamaDepan] = useState("");
  const [nama_belakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const role = "siswa";
  const toast = useToast();

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Gagal.",
        description: "Perulangan sandi tidak sama",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    const data = {
      nama_depan,
      nama_belakang,
      email,
      no_telp,
      password,
      role,
    };

    axios
      .post(REGISTER_AUTH, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast({
          title: "Berhasil mendaftar.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/masuk");
      })
      .catch((err) => {
        toast({
          title: "Gagal.",
          description: "Email sudah pernah digunakan",
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
          Membuat Akun Baru
        </Heading>
        <Stack
          spacing={2}
          my={10}
          as={"form"}
          onSubmit={(e) => HandleSubmit(e)}
        >
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>Nama Depan</FormLabel>
                <Input
                  type="text"
                  focusBorderColor={useColorModeValue(
                    "accentLight.400",
                    "accentDark.400"
                  )}
                  value={nama_depan}
                  onChange={(e) => setNamaDepan(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName" isRequired>
                <FormLabel>Nama Belakang</FormLabel>
                <Input
                  type="text"
                  focusBorderColor={useColorModeValue(
                    "accentLight.400",
                    "accentDark.400"
                  )}
                  value={nama_belakang}
                  onChange={(e) => setNamaBelakang(e.target.value)}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="nomer" isRequired>
            <FormLabel>Nomer Telepon</FormLabel>
            <Input
              type="text"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              value={no_telp}
              onChange={(e) => setNoTelp(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Kata Sandi</FormLabel>
            <Input
              type="password"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="password2" isRequired>
            <FormLabel>Ulangi Kata Sandi</FormLabel>
            <Input
              type="password"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Stack pt={6}>
            <Button
              type={"submit"}
              color={useColorModeValue("white", "black")}
              bg={useColorModeValue("accentLight.400", "accentDark.400")}
              _hover={{
                bg: useColorModeValue("accentLight.500", "accentDark.500"),
              }}
            >
              Mendaftar
            </Button>
          </Stack>
        </Stack>
        <Text textAlign={"center"}>
          Sudah memiliki akun?{" "}
          <Link
            as={LinkTo}
            to="/masuk"
            color={useColorModeValue("accentLight.400", "accentDark.400")}
          >
            Masuk
          </Link>
        </Text>
      </Box>
    </Container>
  );
}
