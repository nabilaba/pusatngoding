import {
  SimpleGrid,
  Box,
  Container,
  Image,
  Heading,
  InputGroup,
  Input,
  Text,
  HStack,
  useColorModeValue,
  Tag,
  TagLabel,
  Icon,
  Stack,
  useToast,
  Button,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { StarIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { Link as LinkTo, useNavigate } from "react-router-dom";
import { MENTOR, KOMENTAR } from "../../../api/API";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import axios from "axios";
import useLoginState from "../../../zustand/todoLogin";

export default function Siswa() {
  const [isLoading, setLoading] = useState(true);
  const [mentor, setMentor] = useState([]);
  const [dataKomentar, setDataKomentar] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();
  const { setIsLoggedOut, setLoggedAs, setUserId } = useLoginState();

  const [query, setQuery] = useState("");

  const getMentor = useCallback(
    async (val) => {
      setLoading(true);
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("tokenId"),
      };
      const anu = val ? `?q=${val}` : "";
      await axios
        .get(`${MENTOR}${anu}`, { headers })
        .then((res) => {
          const mentorRequests = res.data.map((todo) =>
            axios
              .get(`${MENTOR}/${todo.id}/kursus`, { headers })
              .then((response) => ({ ...todo, kursus: response.data }))
          );

          return Promise.all(mentorRequests);
        })
        .then((res) => setMentor(res));

      const res = await axios.get(`${KOMENTAR}`, {
        headers,
      });
      setDataKomentar(res.data);

      setLoading(false);
    },
    [setMentor]
  );

  useEffect(() => {
    getMentor().catch((err) => {
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
  }, [getMentor, toast, setLoggedAs, setUserId, setIsLoggedOut, navigate]);

  const searchstyle = {
    focusBorderColor: useColorModeValue("accentLight.400", "accentDark.400"),
  };

  const CardMentor = (props) => {
    return (
      <Stack
        as={LinkTo}
        to={`${props.id}-${props.kursus.id}`}
        borderWidth="1px"
        borderRadius="2xl"
        bg={useColorModeValue("white", "gray.700")}
        shadow={"lg"}
      >
        <Image
          src={props.avatar}
          alt=""
          borderRadius="2xl"
          h="full"
          maxH="xs"
          w="full"
          objectFit="cover"
          objectPosition="center"
        />

        <Box p="3">
          <Heading fontSize="2xl">
            {props.nama_depan} {props.nama_belakang}
          </Heading>
          <Heading fontSize="lg">
            {props.kursus.nama} - {props.kursus.modul}
          </Heading>
          <Heading fontSize="md">{props.kota}</Heading>
          <HStack spacing={"1"}>
            <StarIcon
              color={useColorModeValue("accentLight.500", "accentDark.500")}
            />
            <Text fontSize="sm" fontWeight={"bold"}>
              {dataKomentar.filter((item) => item.kursusId === props.kursus.id)
                .length &&
                (
                  dataKomentar
                    .filter((item) => item.kursusId === props.kursus.id)
                    .map((item) => item.rate)
                    .reduce((a, b) => a + b, 0) /
                  dataKomentar.filter(
                    (item) => item.kursusId === props.kursus.id
                  ).length
                ).toFixed(2)}
            </Text>
            <Text fontSize="xs" fontWeight={"bold"} color="gray.500">
              (
              {
                dataKomentar.filter((item) => item.kursusId === props.kursus.id)
                  .length
              }{" "}
              feedback)
            </Text>
          </HStack>
          <Text my={2} noOfLines={2}>
            {props.motivasi}
          </Text>
          <HStack spacing={2}>
            <Tag size="lg" colorScheme="blue" borderRadius="2xl">
              <Icon as={FaDollarSign} h={4} w={4} mr={2} />
              <TagLabel>{props.price}</TagLabel>
            </Tag>
            <Tag size="lg" colorScheme="blue" borderRadius="2xl">
              <Icon as={FaChalkboardTeacher} h={4} w={4} mr={2} />
              <TagLabel>{props.status}</TagLabel>
            </Tag>
          </HStack>
        </Box>
      </Stack>
    );
  };

  const HandleCari = async (e) => {
    e.preventDefault();
    getMentor(query);
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Stack pt={"4"} data-aos="fade-up">
      <Container maxW={"7xl"}>
        <HStack as="form" onSubmit={(e) => HandleCari(e)}>
          <InputGroup>
            <Input
              rounded="full"
              type="text"
              placeholder="Cari dengan kata kunci apapun disini..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              {...searchstyle}
            />
            <InputRightElement width="4.75rem">
              <Button
                rounded="full"
                type="submit"
                colorScheme="blue"
                rightIcon={<SearchIcon />}
              >
                Cari
              </Button>
            </InputRightElement>
          </InputGroup>
          <IconButton
            rounded="full"
            colorScheme="red"
            icon={<CloseIcon />}
            onClick={
              () => {
                setQuery("");
                getMentor();
              }
            }
          />
        </HStack>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={5}
          my={5}
          w={"full"}
          justifyContent={"center"}
          autoRows={"1fr"}
          autoColumns={"1fr"}
        >
          {mentor.map((item) =>
            item.kursus.map((kursus, index) => (
              <CardMentor key={index} {...item} kursus={kursus} />
            ))
          )}
        </SimpleGrid>
      </Container>
    </Stack>
  );
}
