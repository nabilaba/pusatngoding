import "./About.css";
import { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  Text,
  Container,
  Box,
  Avatar,
  Center,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import LoadingFetchEffect from "../../components/LoadingFetchEffect";
import useTimeoutGlobal from "../../zustand/timeoutPindahHalaman";

const data = [
  {
    nama: "Nabil Aziz Bima Anggita",
    status: "Univ. Muhammadiyah Surakarta",
    text: `"Just listening to Lil Peep and you will knowing who i am"`,
    avatar: "https://avatars.githubusercontent.com/u/45154878?v=4",
    sbg: "Frontend Developer",
    github: "https://github.com/nabilaba"
  },
  {
    nama: "Anggun Lenteraningati",
    status: "Univ. Ruangguru Indonesia",
    text: `"Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan"`,
    avatar: "https://avatars.githubusercontent.com/u/90821767?v=4",
    sbg: "Frontend Developer",
    github: "https://github.com/AnggunLntra"
  },
  {
    nama: "Soultan Ali Hadji",
    status: "Univ. Ruangguru Indonesia",
    text: `"Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan"`,
    avatar: "https://avatars.githubusercontent.com/u/79008954?v=4",
    sbg: "Frontend Developer",
    github: "https://github.com/SoultanAliHadji"
  },
  {
    nama: "Achmad Izhar",
    status: "Univ. Ruangguru Indonesia",
    text: `"Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan"`,
    avatar: "https://avatars.githubusercontent.com/u/72540494?v=4",
    sbg: "Backend Developer",
    github: "https://github.com/Zharonk"
  },
  {
    nama: "Irsan Nur Hidayat",
    status: "Univ. Ruangguru Indonesia",
    text: `"Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan"`,
    avatar: "https://avatars.githubusercontent.com/u/84580327?v=4",
    sbg: "Backend Developer",
    github: "https://github.com/irsannh"
  },
  {
    nama: "Sean Sebastian",
    status: "Univ. Ruangguru Indonesia",
    text: `"Salah satu dari sekian hal yang membuat saya memilih untuk menjadi programmer adalah karena pekerjaan ini penuh dengan tantangan"`,
    avatar: "https://avatars.githubusercontent.com/u/100177839?v=4",
    sbg: "Backend Developer",
    github: "https://github.com/seanlim12"
  },
];

export default function About() {
  const { timeout } = useTimeoutGlobal();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeout);
  });

  const About = (props) => {
    return (
      <Stack
        as="a"
        href={props.github}
        target="_blank"
        spacing={{ base: 0, lg: 8 }}
        direction={"row"}
        h={"100%"}
        p={10}
        borderWidth="1px"
        borderRadius="lg"
        justifyContent={"center"}
        borderColor={useColorModeValue('rgba(107, 222, 255, 1)','rgba(97, 210, 242, 1)')}
        boxShadow={useColorModeValue('5px 5px 5px 0 rgba(208, 245, 255, 1)', '5px 5px 5px 0 rgba(97, 210, 242, 0.15)')
        }
      >
        <Avatar
          size={"xl"}
          src={props.avatar}
          display={{ base: "none", lg: "block" }}
        />
        <Stack spacing={5} textAlign={{ base: "center", lg: "left" }}>
          <Box>
            <Center>
              <Avatar
                size={"xl"}
                src={props.avatar}
                display={{ base: "block", lg: "none" }}
                mb={2}
              />
            </Center>
            <Stack
              align="center"
              justify={"space-between"}
              direction={{ base: "column", lg: "row" }}
            >
              <Box>
                <Heading size={"sm"}>{props.nama}</Heading>
                <Text as={"span"} fontWeight={"normal"}>
                  {props.status}
                </Text>
              </Box>
              <Text as={"i"} fontWeight={"normal"}>
                {props.sbg}
              </Text>
            </Stack>
          </Box>
          <Text align={"justify"}>{props.text}</Text>
        </Stack>
      </Stack>
    );
  };
  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Stack as={Container} maxW={"7xl"} pt={4} pb={4} data-aos="fade-up">
      <Heading
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        textAlign={"center"}
        my={5}
      >
        TIM KAMI
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 4, xl: 8 }}
        autoRows={"1fr"}
      >
        {data.map((item, index) => {
          return <About {...item} key={index} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}
