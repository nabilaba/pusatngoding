import {
  Container,
  Flex,
  Box,
  chakra,
  Avatar,
  useColorModeValue,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

export default function Testimonials() {
  const hiasan = `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`;

  return (
    <Container maxW={"7xl"}>
      <Flex justify={"center"} data-aos="fade-up">
        <Stack maxW="xl" textAlign="center">
          <Heading
            textAlign={"center"}
            fontSize="28"
            fontWeight={700}
            lineHeight={10}
          >
            Tanggapan Para Siswa?
          </Heading>
          <Text color={"gray.500"}>
            Mereka yang pernah mencoba menggunakan jasa kami,
            menyebutkan bahwa kami menyediakan layanan yang sangat bagus.
          </Text>
        </Stack>
      </Flex>
      <Stack spacing={20} mt={20}>
        <Flex
          justify={"flex-start"}
          data-aos="fade-up-right"
          _after={{
            content: '""',
            position: "absolute",
            height: "21px",
            width: "29px",
            left: "35px",
            top: "-10px",
            backgroundSize: "cover",
            backgroundImage: hiasan,
          }}
          _before={{
            content: '""',
            position: "absolute",
            zIndex: "-1",
            height: "full",
            maxW: "4xl",
            width: "full",
            filter: "blur(40px)",
            transform: "scale(0.98)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            top: 0,
            left: 0,
            bgImage: backgrounds[0],
          }}
        >
          <Box
            maxW={"4xl"}
            boxShadow={"lg"}
            width={"full"}
            rounded={"xl"}
            p={10}
            justifyContent={"space-between"}
            position={"relative"}
            bg={useColorModeValue("white", "gray.800")}
            borderWidth={1}
          >
            <Flex
              justify={"space-around"}
              wrap={{ base: "wrap", md: "nowrap" }}
            >
              <Box maxW="sm" display="flex" alignItems={"center"}>
                <Avatar
                  height={"100px"}
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYRtkmin6enItRvBvbIs9cmK3q95i5sjr_U1mFp27bgENdklC0o9pvb2TQlktcmiy6yk&usqp=CAU"
                  }
                  width={"100px"}
                  alignSelf={"center"}
                  m={{ base: "0 0 30px 0", md: "0 30px 0 10px" }}
                />
              </Box>
              <Box maxW="100%">
                <Box textAlign={"justify"}>
                  <Text>
                    Seneng banget tau platform pusat ngoding dengan biaya mentor
                    yang terjangkau dan kualitas mereka yang berkompeten,
                    sekarang saya sudah lebih percaya diri dan ga takut sama
                    yang namanya ngoding.
                  </Text>
                  <Text>
                    Thanks buat Tim yang sudah buat platform Pusat Ngoding!
                  </Text>
                </Box>
                <br />
                <chakra.span fontWeight={600} color={"teal.600"}>
                  Agil Pangestu.
                </chakra.span>
                <chakra.span pl="2">- Siswa SMAN 1 Bandung</chakra.span>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex
          justify={"flex-end"}
          data-aos="fade-up-left"
          _after={{
            content: '""',
            position: "absolute",
            height: "21px",
            width: "29px",
            right: "35px",
            top: "-10px",
            backgroundSize: "cover",
            backgroundImage: hiasan,
          }}
          _before={{
            content: '""',
            position: "absolute",
            zIndex: "-1",
            height: "full",
            maxW: "4xl",
            width: "full",
            filter: "blur(40px)",
            transform: "scale(0.98)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            top: 0,
            right: 0,
            bgImage: backgrounds[1],
          }}
        >
          <Box
            maxW={"4xl"}
            boxShadow={"lg"}
            width={"full"}
            rounded={"xl"}
            p={10}
            justifyContent={"space-between"}
            position={"relative"}
            bg={useColorModeValue("white", "gray.800")}
            borderWidth={1}
          >
            <Flex
              justify={"space-around"}
              wrap={{ base: "wrap-reverse", md: "nowrap" }}
            >
              <Box maxW="100%">
                <Box textAlign={"justify"}>
                  <Text>
                    Platform ini sangat membantu saya dalam mempelajari berbagai
                    bahasa pemrograman dan hemat dari sisi waktu juga tenaga
                    dengan mendapatkan mentor yang sangat hebat. Next Time saya
                    akan menggunakan platform ini lagi.
                  </Text>
                  <Text>Terima Kasih Pusat Ngoding!</Text>
                </Box>
                <br />
                <chakra.span fontWeight={600} color={"green.600"}>
                  Galih Aryanto.
                </chakra.span>
                <chakra.span pl="2">- Siswa SMKN 1 Purwokerto</chakra.span>
              </Box>
              <Box display="flex" alignItems={"center"} justify="center">
                <Avatar
                  src={
                    "https://i.pinimg.com/474x/db/1e/29/db1e29c7ba309d373c313ff6f2810a7d.jpg"
                  }
                  height={"100px"}
                  width={"100px"}
                  alignSelf={"center"}
                  m={{ base: "0 0 30px 0", md: "0 10px 0 30px" }}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex
          justify={"flex-start"}
          data-aos="fade-up-right"
          _after={{
            content: '""',
            position: "absolute",
            height: "21px",
            width: "29px",
            left: "35px",
            top: "-10px",
            backgroundSize: "cover",
            backgroundImage: hiasan,
          }}
          _before={{
            content: '""',
            position: "absolute",
            zIndex: "-1",
            height: "full",
            maxW: "4xl",
            width: "full",
            filter: "blur(40px)",
            transform: "scale(0.98)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            top: 0,
            left: 0,
            bgImage: backgrounds[2],
          }}
        >
          <Box
            maxW={"4xl"}
            boxShadow={"lg"}
            width={"full"}
            rounded={"xl"}
            p={10}
            justifyContent={"space-between"}
            position={"relative"}
            bg={useColorModeValue("white", "gray.800")}
            borderWidth={1}
          >
            <Flex
              justify={"space-around"}
              wrap={{ base: "wrap", md: "nowrap" }}
            >
              <Box maxW="sm" display="flex" alignItems={"center"}>
                <Avatar
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFNXJ2kFjrB4rGFIGX0WJ-E19bUDyaWVA9tw&usqp=CAU"
                  }
                  height={"100px"}
                  width={"100px"}
                  alignSelf={"center"}
                  m={{ base: "0 0 30px 0", md: "0 30px 0 10px" }}
                />
              </Box>
              <Box maxW="100%">
                <Box textAlign={"justify"}>
                  <Text>
                    Ini adalah platform yang selama ini dicari-cari. Buat saya
                    yang bukan seorang mahasiswa IT, bahasa pemrograman cukup
                    sulit untuk dipelajari sendirian, termasuk belajar melalui
                    bootcamp-bootcamp. Thanks Pusat Ngoding sudah mempertemukan
                    saya dengan mentor berkompeten dan profesional.
                  </Text>
                </Box>
                <br />
                <chakra.span fontWeight={600} color={"blue.600"}>
                  Gilang Ramadhan.
                </chakra.span>
                <chakra.span pl="2">- Siswa SMKN 1 Pekalongan</chakra.span>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
