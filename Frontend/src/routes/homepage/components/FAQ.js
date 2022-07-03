import {
  Stack,
  Container,
  Text,
  Heading,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

const data = [
  {
    tanya: "Apa itu Pusat Ngoding?",
    jawab:
      "Pusat Ngoding adalah sebuah platform website pencarian mentor ngoding pribadi yang terpercaya dengan keahlian di berbagai lini perkodingan.",
  },
  {
    tanya: "Apa yang membedakan Pusat Ngoding dengan yang lain?",
    jawab:
      "Tentu saja dari segi layanan yang ditawarkan, di Pusat Ngoding sangat mengutamakan mentor yang mempunyai keahlian dalam halnya perkodingan. Tak hanya itu saja, di Pusat Ngoding lebih mengutamakan kepuasan siswa yang mendaftar dalam halnya perhitungan biaya yang dikenakan oleh masing-masing mentor.",
  },
  {
    tanya:
      "Apakah Pusat Ngoding membuka kesempatan bagi seseorang untuk menjadi mentor?",
    jawab:
      "Untuk saat ini iya. Anda bisa mendaftarkan diri anda sebagai mentor di Pusat Ngoding dengan cara memencet tombol “Cara Mendaftar” di halaman utama ini.",
  },
  {
    tanya: "Kursus apa saja yang tersedia di Pusat Ngoding?",
    jawab:
      "Kursus yang tersedia sampai saat ini bergantung pada mentor yang kami miliki. Untuk saat terdapat berbagai kursus seperti Kursus Java, Kursus HTML, Kursus CSS, Kursus React, dan masing banyak lagi. Disini kami membagi dalam sebuah modul seperti Frontend, Backend, Android Developer, dan lain-lain.",
  },
  {
    tanya: "Siapa saja yang boleh mendaftar sebagai siswa di Pusat Ngoding?",
    jawab:
      "Kami menargetkan mereka yang sudah SMA/SMK, Sarjana/Diploma, dan Lulusan Dari Perguruang Tinggi. Namun tidak menutup kemungkinan, siapapun bisa mendaftar di Pusat Ngoding.",
  },
  {
    tanya:
      "Bagaimana jika saya telah mengirimkan uang namun mentor tidak dapat menyetujui transaksi?",
    jawab:
      "Kami menerapkan sistem rekening bersama atau biasa disebut dengan rekber. Jika mentor tidak dapat menyetujui transaksi, maka kami akan mengembalikan uang yang telah anda kirimkan ke rekening anda.",
  },
];

export default function FAQ() {
  const AccordionContainer = (props) => (
    <AccordionItem border="0">
      <AccordionButton px={0} _hover={{ bg: "none" }}>
        <Box flex="1" textAlign="left">
          {props.tanya}
        </Box>
        <AccordionIcon ml={5} />
      </AccordionButton>
      <AccordionPanel pb={4} px={0}>
        <Text color={"gray.500"} align="justify">
          {props.jawab}
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );

  return (
    <Stack
      as={Container}
      mt={20}
      maxW={"7xl"}
      align="center"
      justifyContent="center"
      minH={{ base: "auto", lg: "70vh" }}
      data-aos="fade-up"
    >
      <Stack
        p={{base: 5, lg: 10}}
        bg={useColorModeValue("gray.100", "gray.900")}
        rounded="xl"
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 10 }}
      >
        <Stack flex={1}>
          <Stack>
            <Text
              color={useColorModeValue("accentLight.500", "accentDark.500")}
            >
              Support
            </Text>
            <Heading as="h2">FAQ</Heading>
            <Text fontSize={"md"} color={"gray.500"} align="justify">
              Segala sesuatu yang harus anda ketahui dari Pusat Ngoding. Jika
              ada pertanyaan lainnya yang ingin anda tanyakan, bisa menanyakan
              kepada kami melalui formulir yang ada pada website ini.
            </Text>
          </Stack>
        </Stack>
        <Stack flex={1}>
          <Accordion allowToggle w="full">
            {data.map((item, index) => (
              <AccordionContainer key={index} {...item} />
            ))}
          </Accordion>
        </Stack>
      </Stack>
    </Stack>
  );
}
