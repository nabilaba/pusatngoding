import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Divider,
  Text,
  Container,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLoginState from "../../../zustand/todoLogin";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { BASE_URL } from "../../../api/API";
import { useNavigate } from "react-router-dom";

export default function SuntingProfilMentor() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { userId, loggedAs, setIsLoggedOut, setUserId, setLoggedAs } = useLoginState();

  const getUser = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.get(`${BASE_URL}/${loggedAs}/${userId}`, {
      headers,
    });
    setUser(res.data);
  }, [userId, loggedAs]);

  const HandleDelete = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.delete(`${BASE_URL}/${loggedAs}/${userId}`, {
      headers,
    });
    if (res.status === 200) {
      setLoggedAs("");
      setUserId("");
      setIsLoggedOut();
      navigate("/");
      useLoginState.persist.clearStorage();
      localStorage.removeItem("tokenId");
    }
  }, [navigate, userId, loggedAs, setIsLoggedOut, setLoggedAs, setUserId]);

  useEffect(() => {
    setLoading(true);
    getUser().then(() => {
      setLoading(false);
    });
  }, [getUser]);

  const ContainerSuntingAkunSiswa = () => {
    return (
      <Stack as={Container} maxW={"7xl"} data-aos="fade-up">
        <Stack spacing={5} py={5} justifyContent={"center"}>
          <Stack
            spacing={4}
            w={"full"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            border="1px"
            borderColor={useColorModeValue("gray.200", "gray.500")}
            p={6}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Sunting Akun
            </Heading>
            <FormControl id="userName">
              <FormLabel>Foto Profil</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src={user.avatar}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">Ganti Gambar</Button>
                </Center>
              </Stack>
            </FormControl>
            <HStack>
              <FormControl id="firstName" isRequired>
                <FormLabel>Nama Depan</FormLabel>
                <Input
                  type="text"
                  placeholder={user.nama_depan}
                  _placeholder={{ color: "gray.500" }}
                  focusBorderColor={useColorModeValue(
                    "accentLight.400",
                    "accentDark.400"
                  )}
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Nama Belakang</FormLabel>
                <Input
                  type="text"
                  placeholder={user.nama_belakang}
                  _placeholder={{ color: "gray.500" }}
                  focusBorderColor={useColorModeValue(
                    "accentLight.400",
                    "accentDark.400"
                  )}
                />
              </FormControl>
            </HStack>
            <FormControl id="tanggalLahir">
              <FormLabel>Tanggal Lahir</FormLabel>
              <Input
                placeholder={user.tgl_lahir}
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                type="text"
              />
            </FormControl>
            <FormControl id="kota" isRequired>
              <FormLabel>Asal Kota</FormLabel>
              <Input
                placeholder={user.asal_kota}
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                type="text"
              />
            </FormControl>
            <FormControl id="lulusan" isRequired>
              <FormLabel>Pendidikan</FormLabel>
              <Input
                placeholder={user.pendidikan}
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                type="text"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder={user.email}
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Kata Sandi</FormLabel>
              <Input
                placeholder={user.password}
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                type="password"
              />
            </FormControl>
            <FormControl id="password2" isRequired>
              <FormLabel>Ulangi Kata Sandi</FormLabel>
              <Input
                placeholder={user.password}
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
                type="password"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={useColorModeValue("white", "black")}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={useColorModeValue("white", "black")}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            spacing={4}
            w={"full"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            border="1px"
            borderColor={useColorModeValue("gray.200", "gray.500")}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Hapus Akun
            </Heading>
            <Text>
              Penghapusan akun tidak bisa dibatalkan, anda harus mendaftar ulang
              untuk dapat menjadi parnter mentor kami lagi
            </Text>
            <Button
              bg={"red.400"}
              color={useColorModeValue("white", "black")}
              w="max-content"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "red.500",
              }}
              onClick={() => {
                HandleDelete();
              }}
            >
              Hapus Akun
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return isLoading ? <LoadingFetchEffect /> : <ContainerSuntingAkunSiswa />;
}
