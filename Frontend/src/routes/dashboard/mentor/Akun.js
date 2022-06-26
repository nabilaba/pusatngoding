import {
  Flex,
  Text,
  Box,
  Stack,
  useColorModeValue,
  Image,
  Heading,
  Icon,
  Tag,
  TagLabel,
  HStack,
} from "@chakra-ui/react";
import { MdEmail, MdLocationOn, MdSchool } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";

export default function Akun(props) {
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
          shadow="md"
          rounded="lg"
          overflow="hidden"
        >
          <Image
            w="full"
            h={60}
            fit="cover"
            objectPosition="center"
            src={props.avatar}
            alt="avatar"
          />

          <HStack align="center" px={6} py={3} bg="gray.900" spacing={2}>
            <Tag size="lg" colorScheme="yellow" borderRadius="full">
              <Icon as={FaChalkboardTeacher} h={4} w={4} mr={2} />
              <TagLabel>{props.status}</TagLabel>
            </Tag>
            <Tag size="lg" colorScheme="green" borderRadius="full">
              <Icon as={FaDollarSign} h={4} w={4} mr={2} />
              <TagLabel>{props.price}</TagLabel>
            </Tag>
          </HStack>

          <Stack pt={4} pb={2} px={6} spacing={2}>
            <Heading
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              {props.nama_depan} {props.nama_belakang}
            </Heading>

            <Text color={useColorModeValue("gray.700", "gray.400")}>
              {props.motivasi}
            </Text>
            <Stack spacing={4} py={2}>
              <Profile
                dataName={props.keahlian}
                dataIcon={BsFillBriefcaseFill}
              />
              <Profile dataName={props.kota} dataIcon={MdLocationOn} />
              <Profile dataName={props.pendidikan} dataIcon={MdSchool} />
              <Profile dataName={props.email} dataIcon={MdEmail} />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
