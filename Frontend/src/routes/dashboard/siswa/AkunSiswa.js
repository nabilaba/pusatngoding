import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  Avatar,
  Divider,
  Text,
  Container,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/API";
import useLoginState from "../../../zustand/todoLogin";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { useNavigate } from "react-router-dom";
import Inputan from "../../../components/Inputan";
import { Link as LinkTo } from "react-router-dom";

export default function AkunSiswa() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { userId, loggedAs, setIsLoggedOut, setUserId, setLoggedAs } =
    useLoginState();
  const [nama_depan, setNamaDepan] = useState("");
  const [nama_belakang, setNamaBelakang] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [kota, setKota] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");

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
      navigate("/");
      setLoggedAs("");
      setUserId("");
      setIsLoggedOut();
      useLoginState.persist.clearStorage();
      localStorage.removeItem("tokenId");
    }
  }, [navigate, userId, loggedAs, setIsLoggedOut, setLoggedAs, setUserId]);

  const HandleSubmit = async (e, name, field) => {
    e.preventDefault();

    const data = {
      nama_depan,
      nama_belakang,
      no_telp,
      kota,
      pendidikan,
      tgl_lahir,
      ...user,
      [name]: field,
    };

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    await axios
      .put(`${BASE_URL}/${loggedAs}/${userId}`, data, { headers })
      .then((response) => {
        toast({
          title: "Berhasil menyunting.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      });
  };

  useEffect(() => {
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
            position: "top",
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

  const stylechange = {
    bg: "accentLight.400",
    color: useColorModeValue("white", "black"),
  };

  const stylewarn = {
    bg: "red.400",
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
          borderWidth={1}
          p={6}
          {...stylecontainer}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Informasi Akun
          </Heading>
          <FormControl>
            <FormLabel>Foto Profil</FormLabel>
            <Avatar size="2xl" src={user.avatar} as={LinkTo} to="foto-profil" />
          </FormControl>
          <Inputan
            judul="Nama Depan"
            change={setNamaDepan}
            plc={nama_depan || user.nama_depan}
            onSubmit={(e) => HandleSubmit(e, "nama_depan", nama_depan)}
            type="text"
          />
          <Inputan
            judul="Nama Belakang"
            change={setNamaBelakang}
            plc={nama_belakang || user.nama_belakang}
            onSubmit={(e) => HandleSubmit(e, "nama_belakang", nama_belakang)}
            type="text"
          />
          <Inputan
            judul="Tanggal Lahir"
            change={setTglLahir}
            plc={tgl_lahir || user.tgl_lahir}
            onSubmit={(e) => HandleSubmit(e, "tgl_lahir", tgl_lahir)}
            type="text"
          />
          <Inputan
            judul="Asal Kota"
            change={setKota}
            plc={kota || user.kota}
            onSubmit={(e) => HandleSubmit(e, "kota", kota)}
            type="text"
          />
          <Inputan
            judul="Pendidikan Sekarang"
            change={setPendidikan}
            plc={pendidikan || user.pendidikan}
            onSubmit={(e) => HandleSubmit(e, "pendidikan", pendidikan)}
            type="text"
          />
          <Inputan
            judul="No Telepon"
            change={setNoTelp}
            plc={no_telp || user.no_telp}
            onSubmit={(e) => HandleSubmit(e, "no_telp", no_telp)}
            type="text"
          />
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
            Ubah Email & Kata Sandi
          </Heading>
          <Text>Harap selalu ingat kata sandi yang digunakan.</Text>
          <Button
            as={LinkTo}
            to="email-password"
            w="max-content"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "accentLight.500",
            }}
            {...stylechange}
          >
            Ubah Email & Kata Sandi
          </Button>
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
