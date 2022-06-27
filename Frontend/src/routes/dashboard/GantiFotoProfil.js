import {
  Container,
  Stack,
  Avatar,
  useToast,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import { BASE_URL, API_FOTO } from "../../api/API";
import useLoginState from "../../zustand/todoLogin";
import LoadingFetchEffect from "../../components/LoadingFetchEffect";

export default function GantiFotoProfil() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [fotoBaru, setFotoBaru] = useState("");
  const toast = useToast();
  const { userId, loggedAs, setIsLoggedOut, setUserId, setLoggedAs } =
    useLoginState();

  const getUser = useCallback(async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("tokenId"),
    };
    const res = await axios.get(`${BASE_URL}/${loggedAs}/${userId}`, {
      headers,
    });
    setUser(res.data);
  }, [userId, loggedAs]);

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

  const HandleAvatar = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fotoBaru);
    data.append("upload_preset", "tutorial");
    data.append("cloud_name", "pusatngoding");
    axios
      .post(API_FOTO, data)
      .then((res) => {
        const headers = {
          Authorization: "Bearer " + localStorage.getItem("tokenId"),
        };
        const data = {
          ...user,
          avatar: res.data.url,
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
            navigate(-1);
          });
      })
      .catch((err) => {
        toast({
          title: "Gagal upload ke server.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Stack as={Container} maxW={"4xl"} data-aos="fade-up">
      <Stack spacing={5} py={5} justifyContent={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          rounded={"xl"}
          borderWidth={1}
          p={6}
        >
          <Stack spacing={6} justify="center" align="center">
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Ganti Foto Profil
            </Heading>
            <Avatar
              size="2xl"
              src={(fotoBaru && URL.createObjectURL(fotoBaru)) || user.avatar}
            />
            <Stack as="form" onSubmit={HandleAvatar} w={"full"} maxW={"xl"}>
              <input
                type="file"
                onChange={(e) => {
                  setFotoBaru(e.target.files[0]);
                }}
                ref={inputRef}
                accept="image/*"
                style={{ display: "none" }}
              ></input>
              <HStack w="full">
                <Button
                  onClick={() => {
                    setFotoBaru("");
                    navigate(-1);
                  }}
                  w="full"
                  colorScheme="red"
                >
                  BATAL
                </Button>
                <Button
                  onClick={() => inputRef.current.click()}
                  w="full"
                  colorScheme="green"
                >
                  PILIH GAMBAR
                </Button>
              </HStack>
              <Button type="submit" colorScheme="teal" w="full">
                SIMPAN
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
