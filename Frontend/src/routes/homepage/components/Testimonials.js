import './Testimonials.css'
import { Container, Flex, Box, chakra, Avatar } from '@chakra-ui/react';

export default function Testimonials() {
  return (
    <>
      <Container maxW={'7xl'} >
        <Flex justify={'center'} py='10'>
          <chakra.span textAlign={'center'} fontSize='28' fontWeight={700} lineHeight={10}>
          Bagaimana <br />Kami di Mata Para Siswa?
          </chakra.span>
        </Flex>
        <Flex justify={'flex-start'}>
          <Box maxW={'4xl'} rounded={40} p={8} my='4' borderColor='black' borderWidth={1}>
            <Flex justify={'space-around'} wrap={{base: 'wrap', md: 'nowrap'}}>
              <Box maxW='sm' display='flex' alignItems={'center'}>
              <Avatar
                  height={'100px'}
                  width={'100px'}
                  alignSelf={'center'}
                  m={{base: '0 0 30px 0', md: '0 30px 0 10px'}}
                />
              </Box>
              <Box maxW='100%'>
                <chakra.p textAlign={'justify'}>
                  Platform ini sangat membantu saya dalam mempelajari berbagai bahasa pemrograman 
                  dan hemat dari sisi waktu juga tenaga dengan mendapatkan mentor yang sangat hebat. 
                  Ini adalah apa yang cari selama ini karena bahasa pemrograman cukup sulit bagi 
                  saya untuk mempelajarinya sendirian, termasuk belajar melalui bootcamp-bootcamp 
                  yang dapat dijumpai. Dengan biaya mentor yang terjangkau dan kulaitas mereka yang 
                  berkompeten, sekarang saya sudah lebih percaya didri dalam mempelajari koding 
                  lebih lagi. Terima kasih Pusat Ngoding!
                </chakra.p>
                <br />
                <chakra.span fontWeight={600}>
                  William Saputra P.
                </chakra.span>
                <chakra.span pl='2'>
                  - Siswa SMKN 1 Purwokerto
                </chakra.span>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex justify={'flex-end'}>
          <Box maxW={'4xl'} rounded={40} p={8} my='4' borderColor='black' borderWidth={1}>
            <Flex justify={'space-around'} wrap={{base: 'wrap-reverse', md: 'nowrap'}}>
              <Box maxW='100%'>
                <chakra.p textAlign={'justify'}>
                  Platform ini sangat membantu saya dalam mempelajari berbagai bahasa pemrograman 
                  dan hemat dari sisi waktu juga tenaga dengan mendapatkan mentor yang sangat hebat. 
                  Ini adalah apa yang cari selama ini karena bahasa pemrograman cukup sulit bagi 
                  saya untuk mempelajarinya sendirian, termasuk belajar melalui bootcamp-bootcamp 
                  yang dapat dijumpai. Dengan biaya mentor yang terjangkau dan kulaitas mereka yang 
                  berkompeten, sekarang saya sudah lebih percaya didri dalam mempelajari koding 
                  lebih lagi. Terima kasih Pusat Ngoding!
                </chakra.p>
                <br />
                <chakra.span fontWeight={600}>
                  William Saputra P.
                </chakra.span>
                <chakra.span pl='2'>
                  - Siswa SMKN 1 Purwokerto
                </chakra.span>
              </Box>
              <Box display='flex' alignItems={'center'} justify='center'>
                <Avatar
                  height={'100px'}
                  width={'100px'}
                  alignSelf={'center'}
                  m={{base: '0 0 30px 0', md: '0 10px 0 30px'}}
                />
              </Box>              
            </Flex>          
          </Box>
        </Flex>
        <Flex justify={'flex-start'}>
          <Box maxW={'4xl'} rounded={40} p={8} my='4' borderColor='black' borderWidth={1}>
            <Flex justify={'space-around'} wrap={{base: 'wrap', md: 'nowrap'}}>
              <Box maxW='sm' display='flex' alignItems={'center'}>
              <Avatar
                  height={'100px'}
                  width={'100px'}
                  alignSelf={'center'}
                  m={{base: '0 0 30px 0', md: '0 30px 0 10px'}}
                />
              </Box>
              <Box maxW='100%'>
                <chakra.p textAlign={'justify'}>
                  Platform ini sangat membantu saya dalam mempelajari berbagai bahasa pemrograman 
                  dan hemat dari sisi waktu juga tenaga dengan mendapatkan mentor yang sangat hebat. 
                  Ini adalah apa yang cari selama ini karena bahasa pemrograman cukup sulit bagi 
                  saya untuk mempelajarinya sendirian, termasuk belajar melalui bootcamp-bootcamp 
                  yang dapat dijumpai. Dengan biaya mentor yang terjangkau dan kulaitas mereka yang 
                  berkompeten, sekarang saya sudah lebih percaya didri dalam mempelajari koding 
                  lebih lagi. Terima kasih Pusat Ngoding!
                </chakra.p>
                <br />
                <chakra.span fontWeight={600}>
                  William Saputra P.
                </chakra.span>
                <chakra.span pl='2'>
                  - Siswa SMKN 1 Purwokerto
                </chakra.span>
              </Box>
            </Flex>
          </Box>
        </Flex>           
      </Container>
    </>
  );
}
