import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Divider,
  Text,
  Container,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function SuntingProfilMentor() {
  return (
    <Stack as={Container} maxW={"7xl"}>
      <Stack spacing={5} py={5} justifyContent={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.500")}
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Sunting Akun
          </Heading>
          <FormControl id="userName">
            <FormLabel>Foto Profil</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  src="https://avatars.githubusercontent.com/u/45154878?v=4"
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Ganti Gambar</Button>
              </Center>
            </Stack>
          </FormControl>
          <HStack>
            <FormControl id="firstName" isRequired>
              <FormLabel>Nama Depan</FormLabel>
              <Input
                type="text"
                placeholder="Nabil"
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
                  "accentLight.400",
                  "accentDark.400"
                )}
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Nama Belakang</FormLabel>
              <Input
                type="text"
                placeholder="Aziz Bima Anggita"
                _placeholder={{ color: "gray.500" }}
                focusBorderColor={useColorModeValue(
              "accentLight.400",
              "accentDark.400"
            )}
              />
            </FormControl>
          </HStack>
          <FormControl id="notelp" isRequired>
            <FormLabel>No Telp</FormLabel>
            <Input
              type="text"
              placeholder="081234567890"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor={useColorModeValue(
              "accentLight.400",
              "accentDark.400"
            )}
            />
          </FormControl>
          <FormControl id="tanggalLahir">
            <FormLabel>Tanggal Lahir</FormLabel>
            <Input
              placeholder="Sukoharjo"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor={useColorModeValue(
              "accentLight.400",
              "accentDark.400"
            )}
              type="text"
            />
          </FormControl>
          <FormControl id="kota" isRequired>
            <FormLabel>Asal Kota</FormLabel>
            <Input
              placeholder="Sukoharjo"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor={useColorModeValue(
              "accentLight.400",
              "accentDark.400"
            )}
              type="text"
            />
          </FormControl>
          <FormControl id="lulusan" isRequired>
            <FormLabel>Pendidikan</FormLabel>
            <Input
              placeholder="Semester 2"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor={useColorModeValue(
              "accentLight.400",
              "accentDark.400"
            )}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="nabilazizbimaanggita@gmail.com"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Kata Sandi</FormLabel>
            <Input
              placeholder="********"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              type="password"
            />
          </FormControl>
          <FormControl id="password2" isRequired>
            <FormLabel>Ulangi Kata Sandi</FormLabel>
            <Input
              placeholder="********"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor={useColorModeValue(
                "accentLight.400",
                "accentDark.400"
              )}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={useColorModeValue("white", "black")}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={useColorModeValue("white", "black")}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          spacing={4}
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.500")}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Hapus Akun
          </Heading>
          <Text>
            Penghapusan akun tidak bisa dibatalkan, anda harus mendaftar ulang
            untuk dapat menjadi parnter mentor kami lagi
          </Text>
          <Button
            bg={"red.400"}
            color={useColorModeValue("white", "black")}
            w="max-content"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "red.500",
            }}
          >
            Hapus Akun
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
