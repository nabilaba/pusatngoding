import {
  Avatar,
  Box,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

const testimonials = [
  {
    nama: "William Saputra P.",
    posisi: "Chief Marketing Officer",
    motivasi:
      "Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan",
    univ: "Univ. Ruangguru Indonesia",
    avatar: "",
  },
  {
    nama: "William Saputra P.",
    posisi: "Chief Marketing Officer",
    motivasi:
      "Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan",
    univ: "Univ. Ruangguru Indonesia",
    avatar: "",
  },
  {
    nama: "William Saputra P.",
    posisi: "Chief Marketing Officer",
    motivasi:
      "Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan",
    univ: "Univ. Ruangguru Indonesia",
    avatar: "",
  },
  {
    nama: "William Saputra P.",
    posisi: "Chief Marketing Officer",
    motivasi:
      "Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan",
    univ: "Univ. Ruangguru Indonesia",
    avatar: "",
  },
  {
    nama: "William Saputra P.",
    posisi: "Chief Marketing Officer",
    motivasi:
      "Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan",
    univ: "Univ. Ruangguru Indonesia",
    avatar: "",
  },
];

function TestimonialCard(props) {
  const { nama, posisi, motivasi, univ, avatar } = props;
  return (
    <Flex
      boxShadow={"lg"}
      maxW={"640px"}
      direction={{ base: "column", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      _after={{
        content: '""',
        position: "absolute",
        height: "21px",
        width: "29px",
        left: "35px",
        top: "-10px",
      }}
    >
      <Avatar
        src={avatar}
        height={"80px"}
        width={"80px"}
        alignSelf={"center"}
        m={{ base: "0 0 35px 0", md: "0 50px 0 0" }}
      />
      <Flex
        direction={"column"}
        textAlign={"left"}
        justifyContent={"space-between"}
      >
        <Flex justifyContent={"space-between"} wrap={{ base: "wrap" }}>
          <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
            {nama}
          </chakra.p>
          <chakra.span
            fontWeight={"medium"}
            color={"gray.500"}
            fontStyle="italic"
          >
            {posisi}
          </chakra.span>
        </Flex>
        <chakra.span>{univ}</chakra.span>
        <chakra.p fontWeight={"medium"} fontSize={"15px"} pb={4} mt={2}>
          {motivasi}
        </chakra.p>
      </Flex>
    </Flex>
  );
}

export default function GridBlurredBackdrop() {
  return (
    <Flex
      textAlign={"center"}
      pt={10}
      px={{ lg: "28" }}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
    >
      <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"} pt={20}>
        <chakra.h1
          py={5}
          fontSize={30}
          fontWeight={"bold"}
          color={useColorModeValue("gray.700", "gray.50")}
        >
          TIM KAMI
        </chakra.h1>
      </Box>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacing={"10"}
        mt={5}
        mx={"auto"}
      >
        {testimonials.map((cardInfo, index) => (
          <TestimonialCard {...cardInfo} index={index} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
