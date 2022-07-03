import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  useColorModeValue,
  Stack,
  Flex,
  Image,
  Text,
  Box,
  HStack,
  Icon,
  SimpleGrid, Input, InputGroup, InputRightElement, Button, IconButton
} from "@chakra-ui/react";
import { CalendarIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import LoadingFetchEffect from "../../components/LoadingFetchEffect";
import useTimeoutGlobal from "../../zustand/timeoutPindahHalaman";
import randomcolor from "randomcolor";

export default function Event() {
  const { timeout } = useTimeoutGlobal();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeout);
  });

  const EventContainer = () => {
    return (
      <Stack
        h={"full"}
        w="full"
        mx="auto"
        px={4}
        py={4}
        rounded="xl"
        borderWidth="1px"
        borderColor={randomcolor()}
        bg={useColorModeValue("white", "gray.800")}
        justify={"space-between"}
      >
        <Flex alignItems="center">
          <Image
            mr={4}
            w={10}
            h={10}
            fit="cover"
            display={{ base: "none", sm: "block" }}
            src="https://bit.ly/2ZqQZQZ"
            alt=""
            fallbackSrc="https://via.placeholder.com/150"
          />
          <Box>
            <Text
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              Lomba Mendesain
            </Text>
            <HStack>
              <Icon as={CalendarIcon} h={3} w={3} />
              <Text
                as="span"
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Senin, 20 Juni 2020
              </Text>
            </HStack>
          </Box>
        </Flex>

        <Text
          // noOfLines={2} nexttime
          mt={4}
          mb={2}
          as="p"
          color={useColorModeValue("gray.600", "gray.300")}
          align={"justify"}
        >
          Syarat Pendaftaran...
        </Text>

        <Flex justifyContent="space-between" alignItems="center">
          <Text
            as="span"
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Link: meet.google.com
          </Text>
        </Flex>
      </Stack>
    );
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container pt={4} maxW={"7xl"} data-aos="fade-up">
      <Stack>
        <Heading
          fontSize={{ base: "xl", sm: "3xl", md: "4xl" }}
          textAlign={"center"}
        >
          PUSAT EVENT NGODING
        </Heading>
        <HStack as="form"
        maxW={"lg"}
        // onSubmit={(e) => HandleCari(e)}
        >
          <InputGroup>
            <Input
              rounded="full"
              type="text"
              placeholder="Temukan event seputar ngoding..."
              // onChange={(e) => setQuery(e.target.value)}
              // value={query}
            />
            <InputRightElement width="4.75rem">
              <Button
                rounded="full"
                type="submit"
                colorScheme="blue"
                rightIcon={<SearchIcon />}
              >
                Cari
              </Button>
            </InputRightElement>
          </InputGroup>
          <IconButton
            rounded="full"
            colorScheme="red"
            icon={<CloseIcon />}
          />
        </HStack>
        <SimpleGrid
          w="full"
          autoRows={"1fr"}
          spacing={2}
          columns={{ base: 2, xl: 3 }}
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <EventContainer key={index} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
