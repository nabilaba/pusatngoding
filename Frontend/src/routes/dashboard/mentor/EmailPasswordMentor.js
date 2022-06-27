import {
  Heading,
  Stack,
  useColorModeValue,
  Container,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/API";
import useLoginState from "../../../zustand/todoLogin";
import LoadingFetchEffect from "../../../components/LoadingFetchEffect";
import { useNavigate } from "react-router-dom";
import Inputan from "../../../components/Inputan";
import { Link as LinkTo } from "react-router-dom";

export default function SuntingProfilMentor() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { userId, loggedAs, setIsLoggedOut, setUserId, setLoggedAs } =
    useLoginState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const getUser = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.get(`${BASE_URL}/${loggedAs}/${userId}`, {
      headers,
    });
    setUser(res.data);
  }, [userId, loggedAs]);

  const HandleSubmit = (e, name, field) => {
    e.preventDefault();

    const data = {
      email,
      password,
      ...user,
      [name]: field,
    };

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };

    axios
      .put(`${BASE_URL}/${loggedAs}/${userId}`, data, { headers })
      .then((response) => {
        toast({
          title: "Berhasil menyunting.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      });
  };

  useEffect(() => {
    getUser()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast({
            title: "Anda harus login ulang.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          setLoggedAs("");
          setUserId("");
          setIsLoggedOut();
          navigate("/");
          useLoginState.persist.clearStorage();
          localStorage.removeItem("tokenId");
        }
      });
  }, [getUser, toast, navigate, setIsLoggedOut, setLoggedAs, setUserId]);

  const stylecontainer = {
    bg: useColorModeValue("white", "gray.700"),
    borderColor: useColorModeValue("gray.200", "gray.500"),
  };

  const stylewarn = {
    bg: "red.400",
    color: useColorModeValue("white", "black"),
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Stack as={Container} maxW={"7xl"} data-aos="fade-up">
      <Stack spacing={5} py={5} justifyContent={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          rounded={"xl"}
          border="1px"
          p={6}
          {...stylecontainer}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Ubah Email & Kata Sandi Akun
          </Heading>
          <Inputan
            judul="Email"
            change={setEmail}
            plc={email || user.email}
            onSubmit={(e) => HandleSubmit(e, "email", email)}
            type="text"
          />
          <Inputan
            judul="Kata Sandi"
            change={setPassword}
            plc={password || user.password}
            onSubmit={(e) => HandleSubmit(e, "password", password)}
            type="password"
          />
          <Button
            as={LinkTo}
            to={-1}
            w="max-content"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "red.500",
            }}
            {...stylewarn}
          >
            Batal
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
