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
  useColorModeValue,
} from "@chakra-ui/react";
import { TRANSAKSI } from "../../../api/API";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLoginState from "../../../zustand/todoLogin";
import { ViewIcon } from "@chakra-ui/icons";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { Link as LinkTo } from "react-router-dom";

export default function ListTransaksi() {
  const [transaksi, setTransaksi] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { userId } = useLoginState();

  const getData = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const response = await axios.get(`${TRANSAKSI}`, {
      headers,
    });
    setTransaksi(response.data);
  }, []);

  useEffect(() => {
    getData().then(() => {
      setLoading(false);
    });
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
          </ButtonGroup>
        </Flex>
      </HStack>
    );
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW="7xl" data-aos="fade-up" minH={"70vh"}>
      <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
        Riwayat Transaksi
      </Heading>
      <Stack spacing={2} mt={2}>
        {transaksi
          .filter((item) => item.siswaId === userId)
          .map((item, index) => (
            <ItemTransaksi key={index} {...item} />
          ))}
      </Stack>
    </Container>
  );
}
