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
import { Link as LinkTo } from "react-router-dom";

export default function Transaksi() {
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
  return (
    <Container maxW={"7xl"} minH={"60vh"}>
      <Stack spacing={2}>
        <Heading
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          textAlign="right"
        >
          ID Transaksi: 1
        </Heading>
        <Stack borderWidth={1} p={5} borderRadius={20}>
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
            Detail Transaksi 📝
          </Heading>
          <Details kiri="Nama Pemesan" kanan="Rizky" />
          <Details kiri="Nama Mentor" kanan="Lil Peep" />
          <Details kiri="Biaya Kursus" kanan="Rp.100.000 / Jam" />
        </Stack>

        <Stack borderWidth={1} p={5} borderRadius={20}>
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
            Cara Pembayaran ✍
          </Heading>
          <OrderedList stylePosition="inside">
            <ListItem>
              Salin ID Transaksi di pojok kanan atau tangkapan layar pada
              halaman ini
            </ListItem>
            <ListItem>
              Klik tombol{" "}
              <Text as="span" fontWeight="bold">
                Bayar Sekarang
              </Text>{" "}
              yang nantinya otomatis mengirimkan pesan ke WhatsApp
            </ListItem>
            <ListItem>
              Kirimkan ID Transaksi atau tangkapan layar tersebut ke WhatsApp
              yang sudah ditujukan tadi
            </ListItem>
            <ListItem>Nantinya admin akan menginstrusikan pembayaran</ListItem>
            <ListItem>
              Jangan lupa mengirimkan bukti pembayaran dari bank yang anda
              gunakan
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
          >
            Bayar Sekarang
          </Button>
        </HStack>
      </Stack>
    </Container>
  );
}
