import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import MeasurementCard from './MeasurementCard'
import ForcastCard, { ForcastCardProps } from './ForcastCard'
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";
import LineGraph from "../.././components/plotly/LineGraph";
import BarGraph from "../../components/plotly/BarGraph";

import { FaTemperatureHalf, FaWater } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { RiWindyFill } from "react-icons/ri";

export default function StartingPage() {
  const dataValues = [
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17, 10, 23],
      name: 'Model 1'
    },
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [11, 14, 12, 16, 11, 14, 12, 16, 11, 14, 12, 16, 11, 24],
      name: 'Model 2'
    },
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [12, 13, 11, 15, 12, 13, 11, 15, 12, 13, 11, 15, 12, 25],
      name: 'Model 3'
    },
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [13, 12, 10, 14, 13, 12, 10, 14, 13, 12, 10, 14, 13, 26],
      name: 'Real'
    },
  ];

  const forcast: ForcastCardProps[] = [
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'sunny', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'snow', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'thunder', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'partlySunny', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'rainy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' }
  ]

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'} ml='0'>
      <Heading>Wetter in Konstanz</Heading>

      <Flex width='100%' gap='10px'>
        <MeasurementCard measurement='Temperature' value='10' unit='°C' icon={FaTemperatureHalf}></MeasurementCard>
        <MeasurementCard measurement='Humiditiy' value='40' unit='%' icon={WiHumidity}></MeasurementCard>
        <MeasurementCard measurement='Watertemp' value='4' unit='°C' icon={FaWater}></MeasurementCard>
        <MeasurementCard measurement='Windspeed' value='10' unit='km/h' icon={RiWindyFill}></MeasurementCard>
      </Flex>

      <Card bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
        color={useColorModeValue('custom_light.text', 'custom_dark.text')} width='100%'
        padding='10px'
        overflow={'hidden'}
      >
        <Flex gap='10px' overflow='hidden' maxWidth='100%'>
          {forcast.map((forcastElem, index) => (
            <ForcastCard {...forcastElem} key={index}></ForcastCard>
          ))}
        </Flex>
      </Card>
      <Flex gap='10px'>
        <LineGraph values={dataValues} title={'Modelle VS Real'} />
        <BarGraph values={dataValues} title={'Bar Graph'} />
      </Flex>

    </Flex>
  )
}
