import { Container, chakra, Flex, Image, Box, useColorModeValue, Stack, Button, SimpleGrid } from '@chakra-ui/react';
import './Hero.css';
import ImgHero from '../../../assets/ImgHero.svg'

export default function Hero() {
  return (
    <>
      <Container maxW='7xl' pt={{base: '24', md: '20'}}>
        <SimpleGrid columns={[1, null, 2]} alignItems='center'>
          <Box maxW='700px' mb={{base: '20'}}>
            <chakra.h1 lineHeight={{base: '8', md: '10'}}>
              <chakra.span fontSize={{base: '36', md: '48'}} fontWeight={700}>Cari Mentor</chakra.span>
              <br />
              <chakra.span fontSize={{base: '24', md: '36'}} fontWeight={650}>Solusi Untuk Belajar Ngoding dan
              <br />
                <chakra.span color={'accentDark.300'}>Raih Mimpimu</chakra.span>
              </chakra.span>
            </chakra.h1>
            <chakra.p letterSpacing={'wider'} fontSize={16} py='4'>
            Platform pencarian mentor ngoding pribadi yang terpercaya dengan
            keahlian di berbagai lini perkodingan. Cari mentor ngoding pribadi
            ya dimana lagi selain di Pusat Ngoding!
            </chakra.p>
            <SimpleGrid pt={4} alignItems={'center'} columns={3} spacing={{base: '3', md: '20'}}>
              <Button fontSize={{base: 'sm', md: '18'}} rounded={'full'} color={useColorModeValue("white", "black")} bg={useColorModeValue("accentLight.400", "accentDark.400")} _hover={{ bg: useColorModeValue("accentLight.500", "accentDark.500"),}} px={{base: '16', md: '24'}} py={{base: '3', md: '6'}}>
                Daftar Sekarang
              </Button>
              <Box>
                <chakra.span fontWeight={800} fontSize={{base: '16', md: '28'}}>
                  300+
                </chakra.span>
                <br />
                <chakra.span fontSize={{base: '14'}}>Mentor Terdaftar </chakra.span></Box>
              <Box>
                <chakra.span fontWeight={800} fontSize={{base: '16', md: '28'}}>
                  3k+
                </chakra.span>
                <br />
                <chakra.span fontSize={{base: '14'}}>Ulasan Positif Siswa </chakra.span></Box>
            </SimpleGrid>
          </Box>
          <Flex maxW='100%'>
            <Image src={ImgHero} />
          </Flex>
        </SimpleGrid>
      </Container>
    </>
  );
}
