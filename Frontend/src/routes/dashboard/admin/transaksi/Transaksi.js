import {
  Container,
  Heading,
  HStack,
  OrderedList,
  ListItem,
  Stack,
  Text,
  useToast,
  Radio,
  RadioGroup,
  Button,
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

  const [status, setStatus] = useState("");

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

  const HandleUpdateStatus = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    const data = {
      ...transaksi,
      status: status,
    };

    await axios
      .put(`${TRANSAKSI}/${param.transaksiId}`, data, {
        headers,
      })
      .then(() => {
        toast({
          title: "Berhasil",
          description: "Status berhasil diubah",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate(-1);
      })
      .catch((err) => {
        toast({
          title: "Gagal",
          description: "Status gagal diubah",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
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
              Jika mentor bisa mengajar, maka admin akan membuatkan grup WhatsApp dengan judul sesuai ID transaksi
            </ListItem>
            <ListItem>
              Di akhir pembelajaran jika berjalan lancar, maka status menjadi
              "Transaksi Sukses", dan mentor menerima nominal uang yang telah
              dibayarkan
            </ListItem>
          </OrderedList>
        </Stack>

        <Stack
          as="form"
          justify="space-between"
        >
          <Stack>
            <Text>Status</Text>
            <RadioGroup onChange={setStatus} value={status || transaksi.status}>
              <Stack>
                <Radio value="Belum Dibayar">Belum Dibayar</Radio>
                <Radio value="Menunggu Persetujuan Mentor">Menunggu Persetujuan Mentor</Radio>
                <Radio value="Disetujui Mentor">Disetujui Mentor</Radio>
                <Radio value="Dibatalkan Siswa">Dibatalkan Siswa</Radio>
                <Radio value="Dibatalkan Mentor">Dibatalkan Mentor</Radio>
                <Radio value="Dibatalkan Admin">Dibatalkan Admin</Radio>
                <Radio value="Transaksi Sukses">Transaksi Sukses</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
          <Button onClick={HandleUpdateStatus} w="max-content">Simpan</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
