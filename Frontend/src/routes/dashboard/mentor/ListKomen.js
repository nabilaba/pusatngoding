import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Heading,
  Text,
  Avatar,
  Stack,
  Icon,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";

export default function ListKomen(props) {
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
              {props.nama_depan} {props.nama_belakang}
            </Link>
            <HStack>
              <Icon as={BsStarFill} h={3} w={3} />
              <Text fontSize="md" color="gray.500">
                {props.komentar.rate}
              </Text>
            </HStack>
          </Box>
        </Flex>

        <Text
          // noOfLines={2} nexttime
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
  return (
    <Stack>
      <Heading size={"md"}>
        Anda Mendapat{" "}
        {props.komentar.filter((item) => item.kursusId === props.kursus.id).length &&
          (
            props.komentar
              .filter((item) => item.kursusId === props.kursus.id)
              .map((item) => item.rate)
              .reduce((a, b) => a + b, 0) /
            props.komentar.filter((item) => item.kursusId === props.kursus.id).length
          ).toFixed(2)}{" "}
        Rating di Akhir-Akhir ini
      </Heading>
      <SimpleGrid w="full" autoRows={"1fr"} spacing={2}>
        {props.siswa.map((item) =>
          props.komentar
            .filter(
              (item2) =>
                item2.siswaId === item.id && item2.kursusId === props.kursus.id
            )
            .map((item3, index) => (
              <Komen key={index} {...item} komentar={item3} />
            ))
        )}
      </SimpleGrid>
    </Stack>
  );
}
