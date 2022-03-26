import { Box, Text, Flex } from '@chakra-ui/layout';
import GradientLayout from '../components/gradientLayout';
import prisma from '../lib/prisma';
import { Image } from '@chakra-ui/react';

function Home({ artists }) {
  return (
    <GradientLayout
      roundImage
      color='purple'
      image='https://placem.at/people?w=300&h=300&random=some_seed'
      subtitle='profile'
      title='Brian Wong'
      description='15 public playlists'>
      <Box color='white' paddingX='40px'>
        <Box marginBottom='40px'>
          <Text fontSize='2xl' fontWeight='bold'>Top artist this month</Text>
          <Text fontSize='sm'>only visible to you</Text>
        </Box>
        <Flex>
          {artists.map(artist => (
            <Box paddingX='10px' width='20%'>
              <Box bg='gray.900' borderRadius='4px' padding='15px' width='100%'>
                <Image
                  src={`https://placem.at/people?w=300&h=300&random=${Math.random()}`}
                  borderRadius='100%'
                />
                <Box>
                  <Text fontSize='large'>{artist.name}</Text>
                  <Text fontSize='sm'>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  }
}

export default Home;
