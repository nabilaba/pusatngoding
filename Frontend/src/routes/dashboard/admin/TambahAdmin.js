import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  HStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { REGISTER_AUTH } from "../../../api/API";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignUpMentor() {
  const [passwordType, setPasswordType] = useState(false);
  const [passwordType2, setPasswordType2] = useState(false);
  const navigate = useNavigate();
  const [nama_depan, setNamaDepan] = useState("");
  const [nama_belakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const role = "admin";
  const toast = useToast();

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast({
        title: "Gagal.",
        description: "Perulangan sandi tidak sama",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const data = {
      nama_depan,
      nama_belakang,
      email,
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
          title: "Berhasil membuat akun.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/dashboard");
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

  return (
    <Container
      pt={4}
      pb={4}
      align={"center"}
      justify={"center"}
      maxW={"2xl"}
      data-aos="fade-up"
    >
      <Box
        rounded={"3xl"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"md"}
        p={8}
      >
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Buat Akun Admin Baru
        </Heading>
        <Stack
          spacing={2}
          mt={10}
          as={"form"}
          onSubmit={(e) => HandleSubmit(e)}
        >
          <HStack w='full'>
            <Box w='full'>
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
            <Box w='full'>
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
          <FormControl id="password" isRequired>
            <FormLabel>Kata Sandi</FormLabel>
            <InputGroup size={"lg"}>
              <Input
                type={passwordType ? "text" : "password"}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  icon={passwordType ? <ViewIcon /> : <ViewOffIcon />}
                  onClick={() => setPasswordType(!passwordType)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password2" isRequired>
            <FormLabel>Ulangi Kata Sandi</FormLabel>
            <InputGroup size={"lg"}>
              <Input
                type={passwordType2 ? "text" : "password"}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  icon={passwordType2 ? <ViewIcon /> : <ViewOffIcon />}
                  onClick={() => setPasswordType2(!passwordType2)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
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
      </Box>
    </Container>
  );
}
