import {
  SimpleGrid,
  Box,
  Container,
  Image,
  Heading,
  InputLeftElement,
  InputGroup,
  Input,
  Text,
  HStack,
  useColorModeValue,
  Tag,
  TagLabel,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { StarIcon, SearchIcon } from "@chakra-ui/icons";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { Link as LinkTo } from "react-router-dom";
import { MENTOR } from "../../../api/API";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import axios from "axios";

function CardMentor(props) {
  return (
    <Stack
      as={LinkTo}
      to={`kursusId=${props.id}${props.kursus.id}`}
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
        <Heading fontSize="2xl">{props.nama}</Heading>
        <Heading fontSize="lg">
          {props.kursus.nama} - {props.kursus.modul}
        </Heading>
        <Heading fontSize="md">{props.kota}</Heading>
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
}

export default function Siswa() {
  const [isLoading, setLoading] = useState(true);
  const [mentor, setMentor] = useState([]);

  const getMentor = useCallback(async () => {
    setLoading(true);
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    await axios
      .get(MENTOR, { headers })
      .then((res) => {
        const mentorRequests = res.data.map((todo) =>
          axios
            .get(`${MENTOR}/${todo.id}/kursus`, { headers })
            .then((response) => ({ ...todo, kursus: response.data }))
        );

        return Promise.all(mentorRequests);
      })
      .then((res) => setMentor(res))
      .then(() => setLoading(false));
  }, [setMentor]);

  useEffect(() => {
    getMentor();
  }, [getMentor]);

  const searchstyle = {
    focusBorderColor: useColorModeValue("accentLight.400", "accentDark.400"),
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Stack pt={"4"} data-aos="fade-up">
      <Container maxW={"7xl"}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input type="text" placeholder="Cari Mentor" {...searchstyle} />
        </InputGroup>
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
