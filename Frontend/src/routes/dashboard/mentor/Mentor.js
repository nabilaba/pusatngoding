import { Box, Stack, Container, Hide } from "@chakra-ui/react";
import Akun from "./Akun";
import AkunMobile from "./AkunMobile";
import ListKomen from "./ListKomen";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL, KOMENTAR, SISWA, KURSUS } from "../../../api/API";
import useLoginState from "../../../zustand/todoLogin";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";

export default function Mentor(props) {
  const { userId, loggedAs } = useLoginState();
  const [isLoading, setLoading] = useState(true);
  const [mentor, setMentor] = useState({});
  const [komentar, setKomentar] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [kursus, setKursus] = useState([]);

  const getUser = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.get(`${BASE_URL}/${loggedAs}/${userId}`, {
      headers,
    });
    setMentor(res.data);

    const res2 = await axios.get(`${SISWA}`, { headers });
    setSiswa(res2.data);

    const res3 = await axios.get(`${KOMENTAR}`, {
      headers,
    });
    setKomentar(res3.data);

    const res4 = await axios.get(`${KURSUS}`, {
      headers,
    });
    res4.data.filter((item) => ((item.mentorId === userId) ? setKursus(item) : null));
  }, [userId, loggedAs]);

  useEffect(() => {
    setLoading(true);
    getUser().then(() => {
      setLoading(false);
    });
  }, [getUser]);

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Stack as={Container} maxW={"7xl"}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={5}
        py={5}
        justifyContent={"center"}
      >
        <Hide below="lg">
          <Akun {...mentor} komentar={komentar} />
        </Hide>
        <Hide above="lg">
          <AkunMobile {...mentor} komentar={komentar} />
        </Hide>
        <Box flex="1">
          <ListKomen kursus={kursus} siswa={siswa} komentar={komentar} />
        </Box>
      </Stack>
    </Stack>
  );
}
