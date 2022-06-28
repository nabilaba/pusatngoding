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
  TableContainer,
  Tbody,
  Tr,
  Td,
  Table,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { MENTOR, KURSUS, SISWA } from "../../../api/API";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";

export default function DetailMentor() {
  const param = useParams();
  const [isLoading, setLoading] = useState(true);

  const [mentor, setMentor] = useState([]);
  const [kursus, setKursus] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [dataKomentar, setDataKomentar] = useState([]);

  const getKursusInfo = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.get(`${MENTOR}/${param.mentorId}`, { headers });
    setMentor(res.data);

    const res2 = await axios.get(`${KURSUS}/${param.kursusId}`, { headers });
    setKursus(res2.data);

    const res3 = await axios.get(`${SISWA}`, { headers });
    setSiswa(res3.data);

    const res4 = await axios.get(`${MENTOR}/${param.mentorId}/komentar`, {
      headers,
    });
    setDataKomentar(res4.data);
  }, [param.mentorId, param.kursusId]);

  useEffect(() => {
    setLoading(true);
    getKursusInfo().finally(() => setLoading(false));
  }, [getKursusInfo]);

  const Komen = (props) => {
    return (
      <Stack
        h={"full"}
        w="full"
        mx="auto"
        px={4}
        py={4}
        rounded="xl"
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
          {props.komentar.content}
        </Text>

        <Flex justifyContent="space-between" alignItems="center">
          <Text
            as="span"
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {props.komentar.created_at}
          </Text>
          <Link _hover={{ textDecor: "underline" }}>Lihat Selengkapnya</Link>
        </Flex>
      </Stack>
    );
  };

  const stylestaricon = {
    color: useColorModeValue("accentLight.500", "accentDark.500"),
  };

  const stylebutton = {
    color: useColorModeValue("white", "black"),
    bg: useColorModeValue("accentLight.400", "accentDark.400"),
    _hover: {
      bg: useColorModeValue("accentLight.500", "accentDark.500"),
      transform: "translateY(2px)",
      boxShadow: "lg",
    },
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW={"7xl"} pt={4} data-aos="fade-up">
      <Stack
        spacing={{ base: 8, md: 10 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Stack flex={1}>
          <Box>
            <Heading fontSize={{ base: "2xl", sm: "4xl", xl: "5xl" }}>
              {mentor.nama}
            </Heading>
            <Heading fontSize={{ base: "lg", sm: "xl", lg: "3xl" }}>
              {kursus.nama} - {kursus.modul}
            </Heading>
            <Heading fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>
              {mentor.kota}
            </Heading>
          </Box>

          <Box direction={"column"}>
            <HStack spacing={"1"}>
              <StarIcon {...stylestaricon} />
              <Text fontSize="sm" fontWeight={"bold"}>
                4.6
              </Text>
            </HStack>
            <Text>{mentor.motivasi}</Text>

            <Box my={3}>
              <Heading fontSize={{ base: "lg", sm: "xl", lg: "xl" }}>
                Deskripsi Kursus
              </Heading>
              <Text>{kursus.deskripsi}</Text>
            </Box>
            <HStack spacing={2}>
              <Tag size="lg" colorScheme="blue" borderRadius="2xl">
                <Icon as={FaDollarSign} h={4} w={4} mr={2} />
                <TagLabel>{mentor.price}</TagLabel>
              </Tag>
              <Tag size="lg" colorScheme="blue" borderRadius="2xl">
                <Icon as={FaChalkboardTeacher} h={4} w={4} mr={2} />
                <TagLabel>{mentor.status}</TagLabel>
              </Tag>
            </HStack>
          </Box>
          <Heading fontSize={"lg"}>
            {Object.keys(dataKomentar).length} Feedback Pengguna
          </Heading>
          <SimpleGrid w="full" autoRows={"1fr"} spacing={2}>
            {siswa.map((item) =>
              dataKomentar
                .filter((item2) => item2.siswaId === item.id)
                .map((item3, index) => (
                  <Komen key={index} {...item} komentar={item3} />
                ))
            )}
          </SimpleGrid>
        </Stack>
        <Stack>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={mentor.avatar}
            fit={"cover"}
            objectPosition={"center"}
            h={{ base: "100%", sm: "300px", lg: "400px" }}
          />
          <TableContainer borderWidth={1} my={3} borderRadius={"md"}>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>KEAHLIAN</Td>
                  <Td>{mentor.keahlian}</Td>
                </Tr>
                <Tr>
                  <Td>LULUSAN</Td>
                  <Td>Oxford University</Td>
                </Tr>
                <Tr>
                  <Td>TANGGAL BERGABUNG</Td>
                  <Td>{mentor.created_at}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Button
            rounded={"md"}
            w={"full"}
            size={"lg"}
            py={"3"}
            {...stylebutton}
          >
            Reservasi
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
