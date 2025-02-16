import { Flex, Heading } from '@chakra-ui/react';
import Leaderboard from './Leaderboard';

export default function AnalysisPage() {

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'}>

      <Heading>Analysis Page</Heading>

      <Leaderboard></Leaderboard>

    </Flex>
  )
}
