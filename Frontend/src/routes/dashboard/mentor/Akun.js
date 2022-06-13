import {
  Flex,
  Text,
  Box,
  Stack,
  useColorModeValue,
  Image,
  Heading,
  Icon,
  Button,
  Tag,
  TagLabel,
  HStack,
} from "@chakra-ui/react";
import { MdEmail, MdLocationOn, MdSchool, MdBuild } from "react-icons/md";
import { BsFillBriefcaseFill, BsStarFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { Link as LinkTo } from "react-router-dom";

const dataAkun = [
  {
    dataName: "4.6",
    dataIcon: BsStarFill,
  },
  {
    dataName: "Frontend Developer",
    dataIcon: BsFillBriefcaseFill,
  },
  {
    dataName: "Sukoharjo",
    dataIcon: MdLocationOn,
  },
  {
    dataName: "Oxford",
    dataIcon: MdSchool,
  },
  {
    dataName: "nabilazizbimaanggita@gmail.com",
    dataIcon: MdEmail,
  },
];

export default function Akun() {
  const Profile = (props) => {
    return (
      <Flex
        alignItems="center"
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Icon as={props.dataIcon} h={6} w={6} mr={2} />
        <Heading px={2} fontSize="sm">
          {props.dataName}
        </Heading>
      </Flex>
    );
  };
  return (
    <Stack>
      <Box w={{ base: "full", lg: "sm" }} mx={"auto"}>
        <Box
          w="full"
          mx="auto"
          bg={useColorModeValue("white", "gray.700")}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <Image
            w="full"
            h={60}
            fit="cover"
            objectPosition="center"
            src="https://avatars.githubusercontent.com/u/45154878?v=4"
            alt="avatar"
          />

          <HStack align="center" px={6} py={3} bg="gray.900" spacing={2}>
            <Tag size="lg" colorScheme="yellow" borderRadius="full">
              <Icon as={FaChalkboardTeacher} h={4} w={4} mr={2} />
              <TagLabel>Online</TagLabel>
            </Tag>
            <Tag size="lg" colorScheme="green" borderRadius="full">
              <Icon as={FaDollarSign} h={4} w={4} mr={2} />
              <TagLabel>Rp.500.000 / Jam</TagLabel>
            </Tag>
          </HStack>

          <Stack py={4} px={6} spacing={2}>
            <Heading
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              Nabil Aziz Bima Anggita
            </Heading>

            <Text color={useColorModeValue("gray.700", "gray.400")}>
              Saya adalah seorang Frontend Developer dengan pengalaman 5 tahun.
            </Text>
            <Stack spacing={4} py={2}>
              {dataAkun.map((item) => (
                <Profile {...item} key={item.dataName} />
              ))}
            </Stack>
            <Button
              leftIcon={<MdBuild />}
              as={LinkTo}
              to="akun"
              w="full"
              px={8}
              rounded={"md"}
              color={useColorModeValue("white", "black")}
              bg={useColorModeValue("accentLight.400", "accentDark.400")}
              _hover={{
                bg: useColorModeValue("accentLight.500", "accentDark.500"),
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Sunting Akun
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
