import {
  Container,
  Stack,
  Text,
  Box,
  Flex,
  IconButton,
  ButtonGroup,
  HStack,
  Heading,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { TRANSAKSI } from "../../../../api/API";
import { useState, useEffect, useCallback } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link as LinkTo } from "react-router-dom";
import LoadingFetchEffect from "../../../../components/LoadingFetchEffect";

export default function ListTransaksi() {
  const [transaksi, setTransaksi] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const toast = useToast();
  const HandleRemove = (props) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const { id } = props;
    axios
      .delete(`${TRANSAKSI}/${id}`, {
        headers,
      })
      .then((res) => {
        toast({
          title: "Berhasil.",
          description: `Riwayat Transaksi telah dihapus.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTransaksi(transaksi.filter((transaksi) => transaksi.id !== id));
      })
      .catch((err) => {
        toast({
          title: "Gagal.",
          description: `Riwayat Transaksi gagal dihapus.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const getData = useCallback(async (api, setData) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const response = await axios.get(`${api}`, {
      headers,
    });
    setData(response.data);
  }, []);

  useEffect(() => {
    getData(TRANSAKSI, setTransaksi).then(() => setLoading(false));
  }, [getData]);

  const ItemTransaksi = (props) => {
    return (
      <HStack
        borderWidth="1px"
        borderRadius={"md"}
        p={4}
        justify="space-between"
      >
        <Box>
          <Text>ID Transaksi: {props.id}</Text>
          <Text>Status: {props.status}</Text>
          <Text color={useColorModeValue("gray.600", "gray.300")}>
            {props.created_at}
          </Text>
        </Box>
        <Flex>
          <ButtonGroup variant="solid" size="sm" spacing={3}>
            <IconButton
              as={LinkTo}
              to={`${props.id}`}
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
      </HStack>
    );
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW="7xl" data-aos="fade-up">
      <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
        Riwayat Transaksi
      </Heading>
      <Stack spacing={2} mt={2}>
        {transaksi.map((transaksi, index) => (
          <ItemTransaksi key={index} {...transaksi} />
        ))}
      </Stack>
    </Container>
  );
}
