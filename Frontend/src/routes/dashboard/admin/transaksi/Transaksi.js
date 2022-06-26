import {
  Container,
  Heading,
  HStack,
  OrderedList,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import {  useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingFetchEffect from "../../../../components/LoadingFetchEffect";

export default function Transaksi() {
  const param = useParams();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

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
            kanan={"Dummy"}
          />
          <Details
            kiri="Nama Mentor"
            kanan={`Dummy2`}
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
      </Stack>
    </Container>
  );
}
