import {
  Container,
  Heading,
  Stack,
  Box,
  Text,
  Img,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import hero from "../../assets/img/mendaftarmentor/hero.png";
import mendaftarmentor1 from "../../assets/img/mendaftarmentor/1.png";
import mendaftarmentor2 from "../../assets/img/mendaftarmentor/2.png";
import mendaftarmentor3 from "../../assets/img/mendaftarmentor/3.png";
import mendaftarmentor4 from "../../assets/img/mendaftarmentor/4.png";

const syarats = [
  {
    judul: "Siapkan Foto Terbaru dan Foto KTP",
    deskripsi:
      "Demi mendapat identitas anda tinggal dimana dan umur berapa, kami membutuhkan foto terbaru dan foto KTP dari anda.",
    img: mendaftarmentor1,
    direction: "row",
  },
  {
    judul: "Mengisi Formulir Pendaftaran",
    deskripsi:
      "Setelah mempersiapkan foto terbaru dan foto KTP anda, selanjutnya adalah mengisi formulir pendaftaran pada kotak paling bawah.",
    img: mendaftarmentor2,
    direction: "row-reverse",
  },
  {
    judul: "Menunggu Persetujuan",
    deskripsi:
      "Setelah mengisi formulir pendaftaran, kami akan mempertimbangkan anda menjadi bagian dari mentor kami, anda akan menerima email konfirmasi.",
    img: mendaftarmentor3,
    direction: "row",
  },
  {
    judul: "Selamat Bergabung",
    deskripsi: "Selamat! anda resmi bergabung sebagai mentor di Pusat Ngoding.",
    img: mendaftarmentor4,
    direction: "row-reverse",
  },
];

export default function CaraMendaftarMentor() {
  const ContainerSyarat = (props) => {
    return (
      <Stack
        alignItems="center"
        spacing={{
          base: 10,
          md: 24,
        }}
        direction={{ base: "column", md: props.direction }}
      >
        <Box flex={1}>
          <Heading
            mb={4}
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            {props.judul}
          </Heading>
          <Text
            textAlign={{
              base: "center",
              sm: "left",
            }}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            fontSize={{
              md: "lg",
            }}
          >
            {props.deskripsi}
          </Text>
        </Box>
        <Box flex={1} w="md" h="md" p={10} align={"center"}>
          <Img
            src={props.img}
            h="full"
            fit="cover"
            objectPosition="center"
          ></Img>
        </Box>
      </Stack>
    );
  };

  return (
    <Container maxW={"7xl"}>
      <Stack py={3} spacing={10}>
        <Stack align={"center"} spacing={10}>
          <Stack textAlign={"center"}>
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>
              Kesempatan Untuk Anda!
            </Heading>
            <Text fontSize={"md"} color={"gray.500"} maxW={"3xl"}>
              Pusat Ngoding sedang membuka kesempatan bagi semua orang untuk
              bergabung sebagai mentor. Manfaatkan sebaik mungkin dan jangan
              ragu untuk bergabung. Kami nantikan anda mendaftar sebagai bagian
              dari kami!
            </Text>
          </Stack>
          <Img src={hero} w="2xl" />
        </Stack>
        <Stack>
          <Stack borderWidth={1} p={10} borderRadius={20}>
            <Stack spacing={10} p={5}>
              {syarats.map((syarat) => (
                <ContainerSyarat key={syarat.judul} {...syarat} />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Button
          as="a"
          href="https://docs.google.com/forms/d/e/1FAIpQLSex0ml4hdrempgQ04eu9Sqy5A1kUdfMfQjfywLz74zjDEWOOw/viewform?usp=sf_link"
          color={useColorModeValue("white", "black")}
          bg={useColorModeValue("accentLight.400", "accentDark.400")}
          _hover={{
            bg: useColorModeValue("accentLight.500", "accentDark.500"),
          }}
          p="4"
          w="full"
          target="_blank"
        >
          Link Pendaftaran
        </Button>
      </Stack>
    </Container>
  );
}
