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
} from "@chakra-ui/react";
import { Link as LinkTo, useParams } from "react-router-dom";
import OpenWhatsApp from "./OpenWhatsApp";
import { MENTOR, KURSUS, SISWA, TRANSAKSI } from "../../../../api/API";
import { useState, useEffect } from "react";
import LoadingFetchEffect from "../../../../components/LoadingFetchEffect";
import axios from "axios";

export default function Transaksi() {
  const param = useParams();
  const [mentor, setMentor] = useState([]);
  const [kursus, setKursus] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("tokenId"),
      };
      const response = await axios
        .get(`${TRANSAKSI}/${param.transaksiId}`, {
          headers,
        })
        .then((res) => {
          const data = res.data;
          const responseKursus = axios.get(`${KURSUS}/${data.kursusId}`, {
            headers,
          });

          responseKursus.then((res) => {
            const dataKursus = res.data;
            const responseMentor = axios.get(
              `${MENTOR}/${dataKursus.mentorId}`,
              {
                headers,
              }
            );

            Promise.all([responseMentor]).then((res) => {
              const dataMentor = res[0].data;
              setMentor(dataMentor);
            });
          });

          const responseSiswa = axios.get(`${SISWA}/${data.siswaId}`, {
            headers,
          });

          Promise.all([responseKursus, responseSiswa]).then((res) => {
            setKursus(res[0].data);
            setSiswa(res[1].data);
            setTransaksi(data);
          });
        });
    };

    getData().then(() => {
      setLoading(false);
    });
  }, [param.transaksiId]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  const stylewarn = {
    bg: "red.400",
    color: useColorModeValue("white", "black"),
  };
  const stylesuccess = {
    bg: "green.400",
    color: useColorModeValue("white", "black"),
  };
  const Details = ({ kiri, kanan }) => {
    return (
      <HStack justifyContent="space-between">
        <Text>{kiri}</Text>
        <Text fontWeight="bold">{kanan}</Text>
      </HStack>
    );
  };
  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW={"7xl"} minH={"60vh"} pt={4}>
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
          <Details kiri="Biaya Kursus" kanan="Rp.100.000 / Jam" />
          <Details kiri="Status" kanan="Lunas" />
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
        <HStack justify="end">
          <Button
            as={LinkTo}
            to={-1}
            w="max-content"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "red.500",
            }}
            {...stylewarn}
          >
            Batal
          </Button>
          <Button
            w="max-content"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "green.500",
            }}
            {...stylesuccess}
            onClick={() => {
              OpenWhatsApp("+6283146542084", "Lil Peep", param.transaksiId);
            }}
          >
            Bayar Sekarang
          </Button>
        </HStack>
      </Stack>
    </Container>
  );
}
