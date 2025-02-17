import { Flex, Heading } from '@chakra-ui/react';
import UnderConstruction from '../../components/UnderConstruction';

export default function WeatherStationPage() {

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'}>

      <Heading>Weather Station</Heading>

      <UnderConstruction></UnderConstruction>

    </Flex>
  )
}
