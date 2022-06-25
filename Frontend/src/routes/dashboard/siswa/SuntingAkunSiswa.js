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
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/API";
import useLoginState from "../../../zustand/todoLogin";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { useNavigate } from "react-router-dom";

export default function SuntingProfilMentor() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { userId, loggedAs, setIsLoggedOut, setUserId, setLoggedAs } =
    useLoginState();
  const [nama_depan, setNamaDepan] = useState(user.nama_depan);
  const [nama_belakang, setNamaBelakang] = useState(user.nama_belakang);
  const [email, setEmail] = useState(user.email);
  const [no_telp, setNoTelp] = useState(user.no_telp);
  const [kota, setKota] = useState(user.kota);
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [pendidikan, setPendidikan] = useState(user.pendidikan);
  const [tgl_lahir, setTglLahir] = useState(user.tgl_lahir);

  const toast = useToast();

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
      kota,
      password,
      pendidikan,
      tgl_lahir,
    };

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    axios
      .put(`${BASE_URL}/${loggedAs}/${userId}`, data, { headers })
      .then((response) => {
        toast({
          title: "Berhasil menyunting.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    getUser()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast({
            title: "Anda harus login ulang.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setLoggedAs("");
          setUserId("");
          setIsLoggedOut();
          navigate("/");
          useLoginState.persist.clearStorage();
          localStorage.removeItem("tokenId");
        }
      });
  }, [getUser, toast, navigate, setIsLoggedOut, setLoggedAs, setUserId]);

  const stylecontainer = {
    bg: useColorModeValue("white", "gray.700"),
    borderColor: useColorModeValue("gray.200", "gray.500"),
  };

  const styleinput = {
    focusBorderColor: useColorModeValue("accentLight.400", "accentDark.400"),
  };

  const stylewarn = {
    bg: "red.400",
    color: useColorModeValue("white", "black"),
  };

  const styleperbarui = {
    bg: "blue.400",
    color: useColorModeValue("white", "black"),
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Stack as={Container} maxW={"7xl"} data-aos="fade-up">
      <Stack spacing={5} py={5} justifyContent={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          rounded={"xl"}
          border="1px"
          p={6}
          {...stylecontainer}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Sunting Akun
          </Heading>
          <Stack
            spacing={2}
            my={10}
            as={"form"}
            onSubmit={(e) => HandleSubmit(e)}
          >
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
                  <FormControl id="avatar">
                    <FormLabel>Ganti Gambar</FormLabel>
                    <Input type="file" />
                  </FormControl>
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
                  onChange={(e) => setNamaDepan(e.target.value)}
                  {...styleinput}
                />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Nama Belakang</FormLabel>
                <Input
                  type="text"
                  placeholder={user.nama_belakang}
                  _placeholder={{ color: "gray.500" }}
                  onChange={(e) => setNamaBelakang(e.target.value)}
                  {...styleinput}
                />
              </FormControl>
            </HStack>
            <FormControl id="tanggalLahir">
              <FormLabel>Tanggal Lahir</FormLabel>
              <Input
                placeholder={user.tgl_lahir}
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => setTglLahir(e.target.value)}
                {...styleinput}
              />
            </FormControl>
            <FormControl id="kota" isRequired>
              <FormLabel>Asal Kota</FormLabel>
              <Input
                placeholder={user.kota}
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => setKota(e.target.value)}
                {...styleinput}
              />
            </FormControl>
            <FormControl id="lulusan" isRequired>
              <FormLabel>Pendidikan</FormLabel>
              <Input
                placeholder={user.pendidikan}
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => setPendidikan(e.target.value)}
                {...styleinput}
              />
            </FormControl>
            <FormControl id="no_telp" isRequired>
              <FormLabel>Nomer Telepon</FormLabel>
              <Input
                placeholder={user.no_telp}
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => setNoTelp(e.target.value)}
                {...styleinput}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder={user.email}
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                {...styleinput}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Kata Sandi</FormLabel>
              <Input
                placeholder={user.password}
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                {...styleinput}
              />
            </FormControl>
            <FormControl id="password2" isRequired>
              <FormLabel>Ulangi Kata Sandi</FormLabel>
              <Input
                placeholder={user.password}
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                {...styleinput}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                w="full"
                _hover={{
                  bg: "red.500",
                }}
                onClick={() => {
                  navigate(-1);
                }}
                {...stylewarn}
              >
                Cancel
              </Button>
              <Button
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                {...styleperbarui}
              >
                Perbarui
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          spacing={4}
          w={"full"}
          rounded={"xl"}
          border="1px"
          {...stylecontainer}
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
            w="max-content"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "red.500",
            }}
            onClick={() => {
              HandleDelete();
            }}
            {...stylewarn}
          >
            Hapus Akun
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
