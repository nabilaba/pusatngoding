import './Features.css'
import { Container,Box, SimpleGrid, chakra} from '@chakra-ui/react'

export default function Features() {
  return (
    <>
      <Container maxW={'7xl'} py='20'>
        <chakra.h2 fontSize={30} fontWeight={700} lineHeight={10}>
          Keunggulan <br />Pusat Ngoding
        </chakra.h2>
        <SimpleGrid pt='10' columns={{base: 2, xl: 4}} spacing={{base: '5', xl: '20'}} color={'white'}>
          <Box w='100%' rounded={'40'} bg='#F65C8B' px='8' py='4'>
            <chakra.span fontSize={{base: '36', md: '50'}} fontWeight='500'>
              #1
            </chakra.span>
              <br />
            <chakra.span fontSize={{base: '16', md: '24'}}>
              Pilihan Kursus Online/Offline
            </chakra.span>
            <Box my='4' w='100%' h={0.9} bg={'white'} />
          </Box>
          <Box w='100%' rounded={'40'} bg='#9E8AFC' px='8' py='4'>
            <chakra.span fontSize={{base: '36', md: '50'}} fontWeight='500'>
              #2
            </chakra.span>
              <br />
            <chakra.span fontSize={{base: '16', md: '24'}}>
              Mentor Berpengalaman
            </chakra.span>
            <Box my='4' w='100%' h={0.9} bg={'white'} />
          </Box>
          <Box w='100%' rounded={'40'} bg='#61D2F2' px='8' p='4'>
            <chakra.span fontSize={{base: '36', md: '50'}} fontWeight='500'>
              #3
            </chakra.span>
              <br />
            <chakra.span fontSize={{base: '16', md: '24'}}>
              Subjek Kursus Beragam
            </chakra.span>
            <Box my='4' w='100%' h={0.9} bg={'white'} />
          </Box>
          <Box w='100%' rounded={'40'} bg='#FF9B29' px='8' p='4'>
            <chakra.span fontSize={{base: '36', md: '50'}} fontWeight='500'>
              #4
            </chakra.span>
              <br />
            <chakra.span fontSize={{base: '16', md: '24'}}>
              Jumlah Siswa Aktif 1k
            </chakra.span>
            <Box my='4' w='100%' h={0.9} bg={'white'} />
          </Box>                              
        </SimpleGrid>
      </Container>
      <Box display={'flex'} justifyContent='center'>
        <Box w="80%" bg={'gray.300'} h={1}></Box>
      </Box>
    </>
  );
}
