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
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { TAMBAH_KURSUS, MENTOR } from "../../../../api/API";
import { useState, useEffect, useCallback } from "react";
import LoadingFetchEffect from "../../../../components/LoadingFetchEffect";

export default function TambahKursus() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [modul, setModul] = useState("");
  const [mentorDipilih, setMentorDipilih] = useState(0);
  const [mentor, setMentor] = useState([]);
  const toast = useToast();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nama,
      deskripsi,
      modul,
      mentorId: mentorDipilih,
    };

    await axios
      .post(TAMBAH_KURSUS, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast({
          title: "Berhasil membuat kursus.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMentor = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    await axios
      .get(MENTOR, { headers })
      .then((response) => {
        setMentor(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getMentor();
  }, [getMentor]);

  const stylecontainer = {
    bg: useColorModeValue("white", "gray.700"),
  };

  const styleinput = {
    focusBorderColor: useColorModeValue("accentLight.400", "accentDark.400"),
  };

  const stylesubmit = {
    color: useColorModeValue("white", "black"),
    bg: useColorModeValue("accentLight.400", "accentDark.400"),
    _hover: {
      bg: useColorModeValue("accentLight.500", "accentDark.500"),
    },
  };
  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container
      pt={4}
      pb={4}
      align={"center"}
      justify={"center"}
      maxW={"2xl"}
      data-aos="fade-up"
    >
      <Box rounded={"3xl"} boxShadow={"md"} p={8} {...stylecontainer}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Buat Akun Mentor Baru
        </Heading>
        <Stack
          spacing={2}
          mt={10}
          as={"form"}
          onSubmit={(e) => HandleSubmit(e)}
        >
          <FormControl id="nama" isRequired>
            <FormLabel>Nama Kursus</FormLabel>
            <Input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              {...styleinput}
            />
          </FormControl>
          <FormControl id="deskripsi" isRequired>
            <FormLabel>Deskripsi</FormLabel>
            <Input
              type="text"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              {...styleinput}
            />
          </FormControl>
          <FormControl id="modul" isRequired>
            <FormLabel>Modul</FormLabel>
            <Input
              type="text"
              value={modul}
              onChange={(e) => setModul(e.target.value)}
              {...styleinput}
            />
          </FormControl>
          <FormControl id="modul" isRequired>
            <FormLabel>Mentor</FormLabel>
            <Select
              placeholder="Pilih Mentor"
              onChange={(e) => setMentorDipilih(Number(e.target.value))}
            >
              {mentor.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nama_depan} {item.nama_belakang}
                </option>
              ))}
            </Select>
          </FormControl>
          <Stack pt={6}>
            <Button type={"submit"} {...stylesubmit}>
              Tambahkan
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
