import {
  useColorModeValue,
  Flex,
  Stack,
  SimpleGrid,
  chakra,
  Button,
  IconButton,
  ButtonGroup,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Hide,
  useToast,
} from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { ADMIN, MENTOR, SISWA, KURSUS } from "../../../api/API";
import useAdmin from "../../../zustand/todoAdmin";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { Link as LinkTo } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";

export default function Admin() {
  const [isLoading, setLoading] = useState(true);

  const {
    admin,
    mentor,
    siswa,
    setAdmin,
    setMentor,
    setSiswa,
    remove,
    kursus,
    setKursus,
  } = useAdmin();

  useEffect(() => {
    setLoading(true);
    setAdmin(ADMIN).then(() => {
      setMentor(MENTOR).then(() => {
        setSiswa(SISWA)
          .then(() => setKursus(KURSUS))
          .finally(() => setLoading(false));
      });
    });
  }, [setAdmin, setMentor, setSiswa, setKursus]);

  const textColor = useColorModeValue("accentLight.400", "accentDark.400");
  const bg = useColorModeValue("gray.100", "gray.700");
  const bg2 = useColorModeValue("white", "gray.800");

  const setButton = {
    color: useColorModeValue("white", "black"),
    bg: useColorModeValue("accentLight.400", "accentDark.400"),
    _hover: {
      bg: useColorModeValue("accentLight.500", "accentDark.500"),
      transform: "translateY(-2px)",
      boxShadow: "lg",
    },
  };

  const kepalaTabel = () => {
    return (
      <SimpleGrid
        spacingY={3}
        columns={{
          base: 1,
          md: 3,
        }}
        w={{
          base: 220,
          md: "full",
        }}
        textTransform="uppercase"
        bg={bg}
        color={textColor}
        py={{
          base: 1,
          md: 2,
        }}
        px={{
          base: 2,
          md: 10,
        }}
        fontSize="md"
        fontWeight="hairline"
      >
        <span>Nama</span>
        <span>Dibuat pada</span>
        <span>Aksi</span>
      </SimpleGrid>
    );
  };

  const toast = useToast();
  const HandleRemove = (props) => {
    remove(props.api, props.id).then(() => {
      toast({
        title: "Berhasil.",
        description: `Akun telah dihapus.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const IsiTabs = (props) => {
    return (
      <Flex
        direction={{
          base: "row",
          md: "column",
        }}
        bg={bg2}
      >
        <Hide above="md">{kepalaTabel()}</Hide>
        <SimpleGrid
          spacingY={3}
          columns={{
            base: 1,
            md: 3,
          }}
          w="full"
          py={2}
          px={10}
          fontWeight="hairline"
        >
          <span>
            {props.nama} {props.nama_depan} {props.nama_belakang}
          </span>
          <chakra.span
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {props.created_at}
          </chakra.span>
          <Flex>
            <ButtonGroup variant="solid" size="sm" spacing={3}>
              <IconButton
                as={LinkTo}
                to={`${props.judul}/${props.id}`}
                colorScheme="blue"
                variant="outline"
                icon={<ViewIcon />}
                aria-label="Lihat"
              />
              <IconButton
                colorScheme="red"
                variant="outline"
                icon={<BsFillTrashFill />}
                aria-label="Hapus"
                onClick={() => HandleRemove(props)}
              />
            </ButtonGroup>
          </Flex>
        </SimpleGrid>
      </Flex>
    );
  };

  const ContainerTabs = (judul, data, api) => {
    return (
      <Stack>
        <Stack
          direction="row"
          spacing={4}
          justify={"space-between"}
          align={"center"}
        >
          <Heading>List {judul}</Heading>
          {judul !== "Siswa" ? (
            <Button
              as={LinkTo}
              to={`tambah-${judul.toLowerCase()}`}
              rounded={"md"}
              py={"3"}
              {...setButton}
            >
              Tambah {judul}
            </Button>
          ) : null}
        </Stack>
        <Flex w="full" alignItems="center" justifyContent="center">
          <Stack
            direction={{
              base: "column",
            }}
            w="full"
            bg={{
              md: bg,
            }}
            shadow="lg"
            spacing={0}
          >
            <Hide below="md">{kepalaTabel()}</Hide>
            {data.map((item, index) => {
              return <IsiTabs {...item} key={index} api={api} judul={judul} />;
            })}
          </Stack>
        </Flex>
      </Stack>
    );
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxWidth="7xl" pt={4}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>List Mentor</Tab>
          <Tab>List Siswa</Tab>
          <Tab>List Admin</Tab>
          <Tab>List Kursus</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{ContainerTabs("Mentor", mentor, MENTOR)}</TabPanel>
          <TabPanel>{ContainerTabs("Siswa", siswa, SISWA)}</TabPanel>
          <TabPanel>{ContainerTabs("Admin", admin, ADMIN)}</TabPanel>
          <TabPanel>{ContainerTabs("Kursus", kursus, KURSUS)}</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
