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
  InputRightElement,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import useLoginState from "../../zustand/todoLogin";
import axios from "axios";
import { LOGIN_AUTH } from "../../api/API";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const [passwordType, setPasswordType] = useState(false);
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
      .post(LOGIN_AUTH, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
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
          my={4}
          as={"form"}
          onSubmit={(e) => HandleSubmit(e)}
        >
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              size={"lg"}
              type="email"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
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
          <Stack pt={2} spacing={8}>
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
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
