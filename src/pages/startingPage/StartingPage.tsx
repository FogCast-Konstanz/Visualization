import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import MeasurementCard from './measurementCard'
import ForcastCard from './ForcastCard'

export default function StartingPage() {
  const [count, setCount] = useState(0)

  const forcast: { time: string, temperature: string, weather: 'cloudy' | 'rainy' | 'sunny', humidity: string }[] = [
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' }
  ]

  return (
    <Flex direction='column' width='100%' gap='10px'>
      <Flex width='100%' gap='10px'>
        <MeasurementCard measurement='Temperature' value='10' unit='°C'></MeasurementCard>
        <MeasurementCard measurement='Temperature' value='10' unit='°C'></MeasurementCard>
        <MeasurementCard measurement='Temperature' value='10' unit='°C'></MeasurementCard>
        <MeasurementCard measurement='Temperature' value='10' unit='°C'></MeasurementCard>
      </Flex>

      <Card bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
        color={useColorModeValue('custom_light.text', 'custom_dark.text')} width='100%'
        padding='10px'
        >
          <Flex gap='10px' overflow='hidden' maxWidth='100%'>
          {forcast.map((forcastElem, index) => (
            <ForcastCard {...forcastElem}></ForcastCard>
        ))}
          </Flex>
        
      </Card>
    </Flex>

  )
}
