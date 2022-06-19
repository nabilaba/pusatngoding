import "./SignUp.css";
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
} from "@chakra-ui/react";

export default function SignUp() {
  const useNavigateTo = useNavigate();

  const HandleSubmit = (e) => {
    useNavigateTo("/masuk");
    e.preventDefault();
  };
  
  return (
    <Container pt={4} pb={4} align={"center"} justify={"center"} maxW={"lg"}>
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
            />
          </FormControl>
          <FormControl id="nomer" isRequired>
            <FormLabel>Nomer Telepon</FormLabel>
            <Input
              type="number"
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
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
