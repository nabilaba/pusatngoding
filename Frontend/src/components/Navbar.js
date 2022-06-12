import "./Navbar.css";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as LinkTo } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Links = [
  { nama: "Peta Jalan", link: "/roadmap" },
  { nama: "Acara", link: "/acara" },
  { nama: "Tentang", link: "/tentang" },
];

const NavLink = ({ nama, link, onClick }) => (
  <Text
    as={LinkTo}
    to={link}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      bg: useColorModeValue("gray.200", "gray.700"),
      textDecoration: "none",
    }}
    onClick={onClick}
  >
    {nama}
  </Text>
);

export default function Navbar() {
  const bgnavbar = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(26, 32, 44, 0.8)"
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        as="header"
        position={"fixed"}
        top={0}
        w={"full"}
        zIndex={9999}
        bg={bgnavbar}
        backdropFilter="auto"
        backdropsaturation="180%"
        backdropBlur="5px"
        boxShadow="sm"
      >
        <Container maxW={"7xl"}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              variant="ghost"
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <HStack as={LinkTo} to="/" alignItems={"center"}>
                  <Image src={Logo} alt="" />
                  <Heading
                    as="h3"
                    size="md"
                    fontWeight={500}
                    display={{ base: "none", sm: "block" }}
                  >
                    <Text
                      color={useColorModeValue("accentLight.400", "accentDark.400")}
                      as={"span"}
                      position={"relative"}
                      _after={{
                        content: "''",
                        width: "full",
                        height: "15%",
                        position: "absolute",
                        bottom: 1,
                        left: 0,
                        bg: useColorModeValue(
                          "accentLight.100",
                          "accentDark.900"
                        ),
                        zIndex: -1,
                      }}
                    >
                      pusat
                    </Text>
                    <br />
                    ngoding
                  </Heading>
                </HStack>
              </Box>
            </HStack>
            <Flex alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
                mr={4}
              >
                {Links.map((link) => (
                  <NavLink key={link.nama} {...link} />
                ))}
              </HStack>
              <IconButton
                variant={"ghost"}
                size={"md"}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                mr={4}
                onClick={toggleColorMode}
              />
              <Button
                as={LinkTo}
                to="/masuk"
                variant={"solid"}
                color={useColorModeValue("white", "black")}
                bg={useColorModeValue("accentLight.400", "accentDark.400")}
                _hover={{
                  bg: useColorModeValue("accentLight.500", "accentDark.500"),
                }}
                size={"sm"}
              >
                MASUK
              </Button>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link.nama} {...link} onClick={onClose} />
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
}
