import './SignUpMentor.css'
import { Container, chakra, Box, Button, useColorModeValue } from '@chakra-ui/react'

export default function SignUpGuru() {
  return (
    <>
      <Container maxW={'7xl'} minH={'xl'} display='flex' alignItems='center'>
        <Box w='100%'>
          <chakra.span fontWeight={800} fontSize={32}>
            Ingin Bergabung Sebagai Partner Mentor Kami?
          </chakra.span>
          <br />
          <chakra.span fontWeight={800} fontSize={32}>
            Bagikan Pengalamanmu Sekarang Bersama Mentor-Mentor Lainnya.
          </chakra.span>
          <br />
          <Button color={useColorModeValue("white", "black")} bg={useColorModeValue("accentLight.400", "accentDark.400")} _hover={{ bg: useColorModeValue("accentLight.500", "accentDark.500"),}} p='4' mt={4}>
            Baca Selengkapnya
          </Button>
        </Box>
      </Container>
      <Box display={'flex'} justifyContent='center'>
        <Box w="80%" bg={'gray.300'} h={1}></Box>
      </Box>
    </>
  );
}
