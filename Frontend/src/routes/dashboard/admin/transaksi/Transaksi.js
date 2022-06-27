import {
  Container,
  Heading,
  HStack,
  OrderedList,
  ListItem,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import LoadingFetchEffect from "../../../../components/LoadingFetchEffect";
import { MENTOR, KURSUS, TRANSAKSI, SISWA } from "../../../../api/API";
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

  useEffect(() => {
    getKursus().then(() => setLoading(false));
  }, [getKursus, isLoading]);

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
              Admin akan merubah status pada detail dibawah ke "Pembayaran
              Diterima"
            </ListItem>
            <ListItem>
              Admin akan menghubungi mentor sesuai ID Mentor / Kursus yang
              kalian pesan
            </ListItem>
            <ListItem>
              Mentor akan mengirimkan konfirmasi ke WhatsApp yang kalian gunakan
            </ListItem>
          </OrderedList>
        </Stack>
      </Stack>
    </Container>
  );
}
