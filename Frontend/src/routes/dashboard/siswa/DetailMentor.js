import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  useColorModeValue,
  HStack,
  Icon,
  TagLabel,
  Tag,
  Link,
  Avatar,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { BsStarFill } from "react-icons/bs";

const dataKomen = [
  {
    avatar: "https://source.unsplash.com/random/200x200?sig=1",
    nama: "Lil Peep",
    text: `"Jos mantep materi yang diberikan"`,
    tgl: "Jum'at, 10 Juni 2022",
    star: "4.6",
  },
  {
    avatar: "https://source.unsplash.com/random/200x200?sig=2",
    nama: "XXXTentacion",
    text: `"Ga nyesel belajar sama Nabil"`,
    tgl: "Kamis, 9 Juni 2022",
    star: "4.6",
  },
  {
    avatar: "https://source.unsplash.com/random/200x200?sig=3",
    nama: "Lil Tracy",
    text: `"Walaupun tugas yang diberikan guru di kampus sangat susah, semua terbantu gara-gara Pusat Ngoding dan kak Nabil. Terima kasih Pusat Ngoding dan kak Nabil"`,
    tgl: "Rabu, 8 Juni 2022",
    star: "4.6",
  },
  {
    avatar: "https://source.unsplash.com/random/200x200?sig=4",
    nama: "Sadboyprolific",
    text: `"Belajar sama Nabil kurang dari 2 jam sudah paham akan apa itu react dan cara menggunakannya"`,
    tgl: "Rabu, 8 Juni 2022",
    star: "4.6",
  },
  {
    avatar: "https://source.unsplash.com/random/200x200?sig=5",
    nama: "Powfu",
    text: `"Terima kasih telah membantu saya mas"`,
    tgl: "Selasa, 7 Juni 2022",
    star: "4.6",
  },
  {
    avatar: "https://source.unsplash.com/random/200x200?sig=7",
    nama: "Lund",
    text: `"Mantap mas Nabil tidak mengecewakan. Terima kasih juga buat Pusat Ngoding"`,
    tgl: "Senin, 6 Juni 2022",
    star: "4.6",
  },
  {
    avatar: "https://source.unsplash.com/random/200x200?sig=8",
    nama: "Komandan Leke",
    text: `"Memuaskan"`,
    tgl: "Senin, 6 Juni 2022",
    star: "4.6",
  },
];

export default function DetailMentor() {
  const Komen = (props) => {
    return (
      <Stack
        h={"full"}
        w="full"
        mx="auto"
        px={4}
        py={4}
        rounded="xl"
        shadow="lg"
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.500")}
        bg={useColorModeValue("white", "gray.800")}
        justify={"space-between"}
      >
        <Flex alignItems="center">
          <Avatar
            mr={4}
            w={10}
            h={10}
            rounded="full"
            fit="cover"
            display={{ base: "none", sm: "block" }}
            src={props.avatar}
            alt="avatar"
          />
          <Box>
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {props.nama}
            </Link>
            <HStack>
              <Icon as={BsStarFill} h={3} w={3} />
              <Text fontSize="md" color="gray.500">
                {props.star}
              </Text>
            </HStack>
          </Box>
        </Flex>

        <Text
          noOfLines={2}
          mt={4}
          mb={2}
          as="p"
          color={useColorModeValue("gray.600", "gray.300")}
          align={"justify"}
        >
          {props.text}
        </Text>

        <Flex justifyContent="space-between" alignItems="center">
          <Text
            as="span"
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {props.tgl}
          </Text>
          <Link _hover={{ textDecor: "underline" }}>Lihat Selengkapnya</Link>
        </Flex>
      </Stack>
    );
  };
  return (
    <Container maxW={"7xl"} pt={20}>
      <Stack
        spacing={{ base: 8, md: 10 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Stack flex={1}>
          <Box>
            <Heading fontSize={{ base: "2xl", sm: "4xl", xl: "5xl" }}>
              Nabil Aziz Bima Anggita
            </Heading>
            <Heading fontSize={{ base: "lg", sm: "xl", lg: "3xl" }}>
              Mentor Frontend
            </Heading>
            <Heading fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>
              Sukoharjo
            </Heading>
          </Box>

          <Stack direction={"column"}>
            <HStack spacing={"1"}>
              <StarIcon
                color={useColorModeValue("accentLight.500", "accentDark.500")}
              />
              <Text fontSize="sm" fontWeight={"bold"}>
                4.6
              </Text>
              <Text fontSize="xs" fontWeight={"bold"} color="gray.500">
                (10 feedback)
              </Text>
            </HStack>
            <Text my={2}>
              Saya adalah seorang Frontend Developer dengan pengalaman 5 tahun.
            </Text>
            <HStack spacing={2}>
              <Tag size="lg" colorScheme="blue" borderRadius="2xl">
                <Icon as={FaDollarSign} h={4} w={4} mr={2} />
                <TagLabel>Rp. 500.000 / Jam</TagLabel>
              </Tag>
              <Tag size="lg" colorScheme="blue" borderRadius="2xl">
                <Icon as={FaChalkboardTeacher} h={4} w={4} mr={2} />
                <TagLabel>Online</TagLabel>
              </Tag>
            </HStack>
          </Stack>
          <Heading fontSize={"lg"}>Feedback Pengguna</Heading>
          <SimpleGrid w="full" autoRows={"1fr"} spacing={2}>
            {dataKomen.map((item) => (
              <Komen key={item.nama} {...item} />
            ))}
          </SimpleGrid>
        </Stack>
        <Stack>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={"https://avatars.githubusercontent.com/u/45154878?v=4"}
            fit={"cover"}
            objectPosition={"center"}
            h={{ base: "100%", sm: "300px", lg: "400px" }}
          />
          <Button
            rounded={"md"}
            w={"full"}
            size={"lg"}
            py={"3"}
            color={useColorModeValue("white", "black")}
            bg={useColorModeValue("accentLight.400", "accentDark.400")}
            _hover={{
              bg: useColorModeValue("accentLight.500", "accentDark.500"),
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Reservasi
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
