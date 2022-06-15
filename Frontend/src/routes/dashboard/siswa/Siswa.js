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
import { StarIcon, SearchIcon } from "@chakra-ui/icons";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { Link as LinkTo } from "react-router-dom";

export default function Siswa() {
  return (
    <Stack pt={"20"}>
      <Container maxW={"7xl"}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Cari Mentor"
            focusBorderColor={useColorModeValue(
              "accentLight.400",
              "accentDark.400"
            )}
            shadow={"md"}
            _focus={{
              shadow: "md",
            }}
          />
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
          {Array(7)
            .fill("")
            .map((i) => (
              <CardMentor key={i} />
            ))}
        </SimpleGrid>
      </Container>
    </Stack>
  );
}

function CardMentor() {
  return (
    <Stack
      as={LinkTo}
      to={"/mentor/Nabil Aziz Bima Anggita"}
      borderWidth="1px"
      borderRadius="2xl"
      bg={useColorModeValue("white", "gray.700")}
      shadow={"lg"}
    >
      <Image
        src="https://avatars.githubusercontent.com/u/45154878?v=4"
        alt=""
        borderRadius="2xl"
        h="full"
        maxH="xs"
        w="full"
        objectFit="cover"
        objectPosition="center"
      />

      <Box p="3">
        <Heading fontSize="2xl">Nabil Aziz Bima Anggita</Heading>
        <Heading fontSize="lg">Mentor Frontend</Heading>
        <Heading fontSize="md">Sukoharjo</Heading>
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
      </Box>
    </Stack>
  );
}
