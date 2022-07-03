import {
  Container,
  Flex,
  Box,
  chakra,
  Avatar,
  useColorModeValue,
  Text, Heading
} from "@chakra-ui/react";

export default function Testimonials() {
  return (
    <Container maxW={"7xl"}>
      <Flex justify={"center"} py="10" data-aos="fade-up">
        <Heading
          textAlign={"center"}
          fontSize="28"
          fontWeight={700}
          lineHeight={10}
        >
          Bagaimana <br />
          Kami di Mata Para Siswa?
        </Heading>
      </Flex>
      <Flex justify={"flex-start"} data-aos="fade-up-right">
        <Box
          maxW={"4xl"}
          rounded={{ base: "20", sm: "40" }}
          p={8}
          my="5"
          borderWidth={1}
          bg={useColorModeValue("gray.50", "rgba(255,255,255,.05)")}
        >
          <Flex justify={"space-around"} wrap={{ base: "wrap", md: "nowrap" }}>
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
                  yang terjangkau dan kualitas mereka yang berkompeten, sekarang
                  saya sudah lebih percaya diri dan ga takut sama yang namanya
                  ngoding.
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
      <Flex justify={"flex-end"} data-aos="fade-up-left">
        <Box
          maxW={"4xl"}
          rounded={{ base: "20", sm: "40" }}
          p={8}
          my="5"
          borderWidth={1}
          bg={useColorModeValue("gray.50", "rgba(255,255,255,.05)")}
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
                  dengan mendapatkan mentor yang sangat hebat.
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
      <Flex justify={"flex-start"} data-aos="fade-up-right">
        <Box
          maxW={"4xl"}
          rounded={{ base: "20", sm: "40" }}
          p={8}
          my="5"
          borderWidth={1}
          bg={useColorModeValue("gray.50", "rgba(255,255,255,.05)")}
        >
          <Flex justify={"space-around"} wrap={{ base: "wrap", md: "nowrap" }}>
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
                <Text>Ini adalah platform yang selama ini dicari-cari.</Text>
                <Text>
                  Buat saya yang bukan seorang mahasiswa IT, bahasa pemrograman
                  cukup sulit untuk dipelajari sendirian, termasuk belajar
                  melalui bootcamp-bootcamp.
                </Text>
                <Text>
                  Thanks Pusat Ngoding sudah mempertemukan saya dengan mentor
                  berkompeten dan profesional.
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
    </Container>
  );
}
