import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Container,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL, MENTOR } from "../../../../api/API";
import useLoginState from "../../../../zustand/todoLogin";
import LoadingFetchEffect from "../../../../components/LoadingFetchEffect";
import { useNavigate, useParams } from "react-router-dom";
import Inputan from "../../../../components/Inputan";

export default function InformasiKursus() {
  const param = useParams();
  const navigate = useNavigate();
  const { setIsLoggedOut, setUserId, setLoggedAs } = useLoginState();
  const [isLoading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [modul, setModul] = useState("");
  const [mentor, setMentor] = useState([]);
  const [data, setData] = useState([]);

  const toast = useToast();

  const getUser = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.get(`${BASE_URL}/kursus/${param.id}`, {
      headers,
    });
    setData(res.data);
  }, [param.id]);

  const HandleDelete = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.delete(`${BASE_URL}/kursus/${param.id}`, {
      headers,
    });
    if (res.status === 200) {
      navigate("/dashboard");
    }
  }, [navigate, param.id]);

  const HandleSubmit = (e, name, field) => {
    e.preventDefault();

    const dataBody = {
      nama,
      deskripsi,
      modul,
      ...data,
      [name]: field,
    };

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    axios
      .put(`${BASE_URL}/kursus/${param.id}`, dataBody, { headers })
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

  const getMentor = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    await axios
      .get(MENTOR, { headers })
      .then((response) => {
        setMentor(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUser()
      .then(() => {
        getMentor().then(() => {
          setLoading(false);
        });
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
  }, [
    getUser,
    toast,
    navigate,
    setIsLoggedOut,
    setLoggedAs,
    setUserId,
    getMentor,
  ]);

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
            Informasi Kursus
          </Heading>
          <Inputan
            judul="Nama Kursus"
            change={setNama}
            plc={nama || data.nama}
            onSubmit={(e) => HandleSubmit(e, "nama", nama)}
            type="text"
          />
          <Inputan
            judul="Deskripsi"
            change={setDeskripsi}
            plc={deskripsi || data.deskripsi}
            onSubmit={(e) => HandleSubmit(e, "deskripsi", deskripsi)}
            type="text"
          />
          <Inputan
            judul="Modul"
            change={setModul}
            plc={modul || data.modul}
            onSubmit={(e) => HandleSubmit(e, "modul", modul)}
            type="text"
          />
          <FormControl w="full">
            <FormLabel>Mentor</FormLabel>
            <Text>
              {mentor.filter((item) => item.id === data.mentorId)[0].nama_depan}{" "}
              {
                mentor.filter((item) => item.id === data.mentorId)[0]
                  .nama_belakang
              }
            </Text>
          </FormControl>
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
            Hapus Kursus
          </Heading>
          <Text>
            Penghapusan kursus tidak bisa dibatalkan, anda harus membuat ulang
            lagi
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
            Hapus Kursus
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
