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
import { BASE_URL } from "../../../../api/API";
import useLoginState from "../../../../zustand/todoLogin";
import LoadingFetchEffect from "../../../../components/LoadingFetchEffect";
import { useNavigate, useParams } from "react-router-dom";
import Inputan from "../../../../components/Inputan";

export default function InformasiAkunMentor() {
  const param = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { setIsLoggedOut, setUserId, setLoggedAs } = useLoginState();
  const [nama_depan, setNamaDepan] = useState("");
  const [nama_belakang, setNamaBelakang] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [kota, setKota] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [motivasi, setMotivasi] = useState("");
  const [keahlian, setKeahlian] = useState("");

  const toast = useToast();

  const getUser = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.get(`${BASE_URL}/mentor/${param.id}`, {
      headers,
    });
    setUser(res.data);
  }, [param.id]);

  const HandleDelete = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.delete(`${BASE_URL}/mentor/${param.id}`, {
      headers,
    });
    if (res.status === 200) {
      navigate("/dashboard");
    }
  }, [navigate, param.id]);

  const HandleSubmit = (e, name, field) => {
    e.preventDefault();

    const data = {
      nama_depan,
      nama_belakang,
      no_telp,
      kota,
      pendidikan,
      price,
      status,
      email,
      password,
      motivasi,
      keahlian,
      ...user,
      [name]: field,
    };

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    axios
      .put(`${BASE_URL}/mentor/${param.id}`, data, { headers })
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
          border="1px"
          p={6}
          {...stylecontainer}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Informasi Akun
          </Heading>
          <FormControl>
            <FormLabel>Foto Profil</FormLabel>
            <Avatar size="2xl" src={user.avatar} />
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
            judul="Patokan Harga"
            change={setPrice}
            plc={price || user.price}
            onSubmit={(e) => HandleSubmit(e, "price", price)}
            type="text"
          />
          <Inputan
            judul="Keahlian"
            change={setKeahlian}
            plc={keahlian || user.keahlian}
            onSubmit={(e) => HandleSubmit(e, "keahlian", keahlian)}
            type="text"
          />
          <Inputan
            judul="Status"
            change={setStatus}
            plc={status || user.status}
            onSubmit={(e) => HandleSubmit(e, "status", status)}
            type="text"
          />
          <Inputan
            judul="Motivasi"
            change={setMotivasi}
            plc={motivasi || user.motivasi}
            onSubmit={(e) => HandleSubmit(e, "motivasi", motivasi)}
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
          <Inputan
            judul="Email"
            change={setEmail}
            plc={email || user.email}
            onSubmit={(e) => HandleSubmit(e, "email", email)}
            type="text"
          />
          <Inputan
            judul="Kata Sandi"
            change={setPassword}
            plc={password || user.password}
            onSubmit={(e) => HandleSubmit(e, "password", password)}
            type="password"
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
