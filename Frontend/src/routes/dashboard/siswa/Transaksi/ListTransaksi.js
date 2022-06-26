import { Container, Stack, Text } from "@chakra-ui/react";
import { TRANSAKSI } from "../../../../api/API";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListTransaksi() {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("tokenId"),
      };
      const response = await axios.get(`${TRANSAKSI}`, {
        headers,
      });
      setTransaksi(response.data);
    };

    getData();
  }, []);

  return (
    <Container maxW="7xl">
      {transaksi.map((transaksi) => (
        <Stack borderWidth="1px" borderColor="gray.200" p="4">
          <Text>{transaksi.id}</Text>
          <Text>{transaksi.kursusId}</Text>
          <Text>{transaksi.siswaId}</Text>
          <Text>{transaksi.status}</Text>
          <Text>{transaksi.createdAt}</Text>
        </Stack>
      ))}
    </Container>
  );
}
