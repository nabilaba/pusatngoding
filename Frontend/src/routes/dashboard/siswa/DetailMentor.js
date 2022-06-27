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
  Avatar,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Table,
  useToast,
  Textarea,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { StarIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {
  MENTOR,
  KURSUS,
  SISWA,
  KOMENTAR,
  TAMBAH_TRANSAKSI,
  TAMBAH_KOMENTAR,
} from "../../../api/API";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { useNavigate } from "react-router-dom";
import useLoginState from "../../../zustand/todoLogin";

export default function DetailMentor() {
  const param = useParams();
  const [isLoading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(0);

  const [mentor, setMentor] = useState([]);
  const [kursus, setKursus] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [dataKomentar, setDataKomentar] = useState([]);

  const { setIsLoggedOut, setLoggedAs, setUserId, userId } = useLoginState();

  const toast = useToast();
  const navigate = useNavigate();

  const HandleTransaksi = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    const dataTransaksi = {
      status: "Belum Dibayar",
      kursusId: Number(param.kursusId),
      siswaId: userId,
    };

    const res = await axios.post(`${TAMBAH_TRANSAKSI}`, dataTransaksi, {
      headers,
    });

    if (res.status === 200) {
      toast({
        title: "Berhasil",
        description: "Berhasil membuat transaksi",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setRedirect(res.data.transaksi.id);
    }
  }, [param.kursusId, toast, userId]);

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

    const res4 = await axios.get(`${KOMENTAR}`, {
      headers,
    });
    setDataKomentar(res4.data);
  }, [param.mentorId, param.kursusId]);

  const [komentarBaru, setKomentarBaru] = useState("");
  const [ratingBaru, setRatingBaru] = useState(0);

  const HandleKomentarBaru = useCallback(
    async (e) => {
      e.preventDefault();
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("tokenId"),
      };

      const data = {
        content: komentarBaru,
        rate: Number(ratingBaru),
        siswaId: Number(userId),
        kursusId: Number(param.kursusId),
        commented: true,
      };

      const res = await axios.post(TAMBAH_KOMENTAR, data, { headers });
      if (res.status === 200) {
        toast({
          title: "Berhasil menambahkan komentar.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setDataKomentar([...dataKomentar, res.data.komentar]);
      }
    },
    [komentarBaru, ratingBaru, toast, param.kursusId, userId, dataKomentar]
  );

  useEffect(() => {
    redirect && navigate(`/dashboard/transaksi/${redirect}`);
  }, [redirect, navigate, param.mentorId, param.kursusId]);

  useEffect(() => {
    getKursusInfo()
      .then(() => setLoading(false))
      .catch((err) => {
        if (err.response.status === 401) {
          toast({
            title: "Anda harus login ulang.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setLoggedAs("");
          setUserId("");
          setIsLoggedOut();
          navigate("/");
          useLoginState.persist.clearStorage();
          localStorage.removeItem("tokenId");
        }
      });
  }, [getKursusInfo, setIsLoggedOut, setLoggedAs, setUserId, navigate, toast]);

  const Komen = (props) => {
    return (
      <Stack
        h={"full"}
        w="full"
        mx="auto"
        p={4}
        rounded="xl"
        borderWidth={1}
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
            <Text
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
            >
              {props.nama_depan} {props.nama_belakang}
            </Text>
            <HStack>
              <Icon as={BsStarFill} h={3} w={3} />
              <Text fontSize="md" color="gray.500">
                {props.komentar.rate}
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
                {dataKomentar.filter((item) => item.kursusId === kursus.id)
                  .length &&
                  (
                    dataKomentar
                      .filter((item) => item.kursusId === kursus.id)
                      .map((item) => item.rate)
                      .reduce((a, b) => a + b, 0) /
                    dataKomentar.filter((item) => item.kursusId === kursus.id)
                      .length
                  ).toFixed(2)}
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
          <Stack
            w="full"
            as={"form"}
            rounded="xl"
            borderWidth={1}
            p={4}
            onSubmit={(e) => {
              HandleKomentarBaru(e);
            }}
          >
            <Text fontWeight="bold">Kolom Feedback</Text>
            <HStack>
              <StarIcon {...stylestaricon} />
              <RadioGroup onChange={setRatingBaru}>
                <Stack direction="row">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                </Stack>
              </RadioGroup>
            </HStack>
            <Textarea
              placeholder="Tulis feedback mu disini"
              onChange={(e) => {
                setKomentarBaru(e.target.value);
              }}
            />
            <Button
              type="submit"
              alignSelf="end"
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              size={"md"}
            >
              Kirim
            </Button>
          </Stack>
          <Heading fontSize={"lg"}>
            {dataKomentar.filter((item) => item.kursusId === kursus.id).length}{" "}
            Feedback Pengguna
          </Heading>
          <SimpleGrid w="full" autoRows={"1fr"} spacing={2}>
            {siswa.map((item) =>
              dataKomentar
                .filter(
                  (item2) =>
                    item2.siswaId === item.id && item2.kursusId === kursus.id
                )
                .map((item3, index) => (
                  <Komen key={index} {...item} komentar={item3} />
                ))
            )}
          </SimpleGrid>
        </Stack>
        <Stack flex={1 / 2}>
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
                  <Td>BERGABUNG</Td>
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
            onClick={() => HandleTransaksi()}
            {...stylebutton}
          >
            Buat Transaksi
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
