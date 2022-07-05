import {
  Container,
  Heading,
  HStack,
  OrderedList,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { MENTOR, KURSUS, TRANSAKSI, SISWA } from "../../../api/API";
import axios from "axios";

export default function Transaksi() {
  const param = useParams();
  const [isLoading, setLoading] = useState(true);
  const [mentor, setMentor] = useState({});
  const [kursus, setKursus] = useState({});
  const [siswa, setSiswa] = useState({});
  const [transaksi, setTransaksi] = useState({});

  const navigate = useNavigate();
  const toast = useToast();

  const getKursus = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    const response = await axios.get(`${TRANSAKSI}/${param.transaksiId}`, {
      headers,
    });
    setTransaksi(response.data);

    const responseKursus = await axios.get(
      `${KURSUS}/${response.data.kursusId}`,
      {
        headers,
      }
    );
    setKursus(responseKursus.data);

    const responseSiswa = await axios.get(`${SISWA}/${response.data.siswaId}`, {
      headers,
    });
    setSiswa(responseSiswa.data);

    const responseMentor = await axios.get(
      `${MENTOR}/${responseKursus.data.mentorId}`,
      {
        headers,
      }
    );
    setMentor(responseMentor.data);
  }, [param.transaksiId]);

  const HandleBatal = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    const data = {
      ...transaksi,
      status: "Dibatalkan Mentor",
    };

    const response = await axios.put(
      `${TRANSAKSI}/${param.transaksiId}`,
      data,
      { headers }
    );
    if (response.status === 200) {
      toast({
        title: "Berhasil membatalkan transaksi.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/dashboard/transaksi");
    }
  };

  const HandleSetujui = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    const data = {
      ...transaksi,
      status: "Disetujui Mentor",
    };

    const response = await axios.put(
      `${TRANSAKSI}/${param.transaksiId}`,
      data,
      { headers }
    );
    if (response.status === 200) {
      toast({
        title: "Berhasil menyetujui transaksi.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/dashboard/transaksi");
    }
  };

  useEffect(() => {
    getKursus().then(() => {
      setLoading(false);
    });
  }, [getKursus, isLoading]);

  const stylesetujui = {
    bg: "green.400",
    color: useColorModeValue("white", "black"),
  };

  const stylewarn = {
    bg: "red.400",
    color: useColorModeValue("white", "black"),
  };

  const Details = ({ kiri, kanan }) => {
    return (
      <HStack justifyContent="space-between">
        <Text>{kiri}</Text>
        <Text>{kanan}</Text>
      </HStack>
    );
  };
  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW={"7xl"} minH={"60vh"} pt={4} data-aos="fade-up">
      <Stack spacing={2}>
        <Heading
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          textAlign="right"
        >
          ID Transaksi: {param.transaksiId}
        </Heading>
        <Stack borderWidth={1} p={5} borderRadius={20}>
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
            Detail Transaksi 📝
          </Heading>
          <Details
            kiri="Nama Pemesan"
            kanan={`${siswa.nama_depan} ${siswa.nama_belakang}`}
          />
          <Details
            kiri="Nama Mentor"
            kanan={`${mentor.nama_depan} ${mentor.nama_belakang}`}
          />
          <Details kiri="Nama Kursus" kanan={`${kursus.nama}`} />
          <Details kiri="Modul" kanan={`${kursus.modul}`} />
          <Details kiri="Tanggal Transaksi" kanan={`${kursus.created_at}`} />
          <Details kiri="Biaya Kursus" kanan={`${mentor.price}`} />
          <Details kiri="Status" kanan={`${transaksi.status}`} />
        </Stack>

        <Stack borderWidth={1} p={5} borderRadius={20}>
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
            Cara Pembayaran ✍
          </Heading>
          <OrderedList stylePosition="inside">
            <ListItem>
              Klik tombol{" "}
              <Text as="span" fontWeight="bold">
                Bayar Sekarang
              </Text>{" "}
              yang nantinya otomatis mengirimkan pesan ke WhatsApp
            </ListItem>
            <ListItem>
              Nantinya admin akan mengecek pesan tersebut valid atau tidak
            </ListItem>
            <ListItem>
              Setelah admin mengkonfirmasi, maka admin akan mengirimkan pesan
            </ListItem>
            <ListItem>
              Kirimkan nominal uang yang sesuai dengan yang tertera di pesan
            </ListItem>
            <ListItem>
              Admin akan merubah status menjadi "Menunggu Persetujuan Mentor"
            </ListItem>
            <ListItem>
              Mentor akan memutuskan apakah bisa mengajar atau tidak
            </ListItem>
            <ListItem>
              Jika mentor bisa mengajar, maka admin akan membuatkan grup
              WhatsApp dengan judul sesuai ID transaksi
            </ListItem>
            <ListItem>
              Di akhir pembelajaran jika berjalan lancar, maka status menjadi
              "Transaksi Sukses", dan mentor menerima nominal uang yang telah
              dibayarkan
            </ListItem>
          </OrderedList>
        </Stack>
        {transaksi.status === "Menunggu Persetujuan Mentor" ? (
          <HStack justify="end">
            <Button
              w="max-content"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "red.500",
              }}
              onClick={() => {
                HandleBatal(transaksi.id);
              }}
              {...stylewarn}
            >
              Batalkan
            </Button>
            <Button
              w="max-content"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "green.500",
              }}
              onClick={() => {
                HandleSetujui(transaksi.id);
              }}
              {...stylesetujui}
            >
              Setujui
            </Button>
          </HStack>
        ) : null}
      </Stack>
    </Container>
  );
}
