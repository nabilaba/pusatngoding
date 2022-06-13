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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
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
export default function ListKomen() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [komenDibuka, setKomenDibuka] = useState([]);

  const LihatSelengakpnya = (props) => {
    setKomenDibuka(props);
    onOpen();
  };

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
          <Link
            onClick={() => LihatSelengakpnya(props)}
            _hover={{ textDecor: "underline" }}
          >
            Lihat Selengkapnya
          </Link>
        </Flex>
      </Stack>
    );
  };

  return (
    <Stack>
      <Heading size={"md"}>Anda Mendapat 4.6 Rating di Akhir-Akhir ini</Heading>
      <SimpleGrid w="full" autoRows={"1fr"} spacing={2}>
        {dataKomen.map((item) => (
          <Komen key={item.nama} {...item} />
        ))}
      </SimpleGrid>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "md", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{komenDibuka.nama}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{komenDibuka.text}</ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              size="sm"
              color={useColorModeValue("white", "black")}
              bg={useColorModeValue("accentLight.400", "accentDark.400")}
              _hover={{
                bg: useColorModeValue("accentLight.500", "accentDark.500"),
              }}
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
