import {
  useColorModeValue,
  Flex,
  Stack,
  SimpleGrid,
  chakra,
  Button,
  Icon,
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
} from "@chakra-ui/react";
import { AiTwotoneLock } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useEffect } from "react";
import { ADMIN, MENTOR, SISWA } from "../../../api/API";
import useAdmin from "../../../zustand/todoAdmin";

export default function Admin() {
  const { admin, mentor, siswa, setAdmin, setMentor, setSiswa, remove } = useAdmin();

  const getData = (data, setData) => {
    setData(data);
  }

  useEffect(() => {
    getData(ADMIN, setAdmin);
    getData(MENTOR, setMentor);
    getData(SISWA, setSiswa);
  }, [setAdmin, setMentor, setSiswa]);

  const bg = useColorModeValue("white", "gray.700");
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
        color={"gray.500"}
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
          <span>{props.nama}</span>
          <chakra.span
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {props.created_at}
          </chakra.span>
          <Flex>
            <ButtonGroup variant="solid" size="sm" spacing={3}>
              <Button
                size="sm"
                variant="solid"
                leftIcon={<Icon as={AiTwotoneLock} />}
                colorScheme="purple"
              >
                Lihat Akun
              </Button>
              <IconButton
                colorScheme="red"
                variant="outline"
                icon={<BsFillTrashFill />}
                aria-label="Hapus"
                onClick={() => remove(props.api, props.id)}
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
            <Button rounded={"md"} py={"3"} {...setButton}>
              Tambah Akun {judul}
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
            {data.map((item) => {
              return <IsiTabs {...item} key={item.id} api={api} />;
            })}
          </Stack>
        </Flex>
      </Stack>
    );
  };

  return (
    <Container maxWidth="7xl" pt={20}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>List Mentor</Tab>
          <Tab>List Siswa</Tab>
          <Tab>List Admin</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{ContainerTabs("Mentor", mentor, MENTOR)}</TabPanel>
          <TabPanel>{ContainerTabs("Siswa", siswa, SISWA)}</TabPanel>
          <TabPanel>{ContainerTabs("Admin", admin, ADMIN)}</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
