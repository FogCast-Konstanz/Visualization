import { useEffect, useState } from 'react'
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
// import { fetchForecast } from '../../components/requests/dwd'

import DWDForcast from '../../components/requests/dwdForcast'

import { OrbitProgress } from 'react-loading-indicators'

import { LineGraphData } from '../.././components/plotly/LineGraph'

export default function StartingPage() {

  const [forecast, setForecast] = useState<LineGraphData[] | null>(null);
  const [forecastIcons, setForecastIcons] = useState<ForcastCardProps[] | null>(null);
  const [error, setError] = useState(null);

  const [temperature, setTemperature] = useState<LineGraphData[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await DWDForcast.fetchData("10929");

    setForecast(DWDForcast.getHourlyValues())
    setForecastIcons(DWDForcast.getHourlyForcastValuesIcon())
  };

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

  const forcast2: ForcastCardProps[] = [
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'sunny', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'snowy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'thunder', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'partlySunny', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'rainy', 'humidity': '70%' },
    { 'time': '12:00', 'temperature': '10', 'weather': 'cloudy', 'humidity': '70%' }
  ]

  return (
    <Flex direction='column' width="calc(100vw - 250px)" gap='10px' margin={'10px'} ml='0' maxWidth={'100%'}>
      <Heading>Wetter in Konstanz</Heading>

      <Flex gap='10px'>
        <MeasurementCard measurement='Temperature' value='10' unit='°C' icon={FaTemperatureHalf}></MeasurementCard>
        <MeasurementCard measurement='Humiditiy' value='40' unit='%' icon={WiHumidity}></MeasurementCard>
        <MeasurementCard measurement='Watertemp' value='4' unit='°C' icon={FaWater}></MeasurementCard>
        <MeasurementCard measurement='Windspeed' value='10' unit='km/h' icon={RiWindyFill}></MeasurementCard>
      </Flex>

      <Card bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
        color={useColorModeValue('custom_light.text', 'custom_dark.text')}
        padding='10px'
        overflow={'hidden'}
      >
        <Flex gap='10px' overflow='hidden' overflowX="auto" pb={'10px'}
          sx={{
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: useColorModeValue('custom_light.surface', 'custom_dark.surface'),
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: useColorModeValue('custom_light.text', 'custom_dark.text'),
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: useColorModeValue('custom_light.primary_variant', 'custom_dark.primary_variant'),
            }
          }}
        >
          {forecastIcons ? forecastIcons.map((forcastElem, index) => (
            <ForcastCard {...forcastElem} key={index}></ForcastCard>
          )) : <OrbitProgress color={useColorModeValue('custom_light.primary', 'custom_dark.primary')} size="medium" />}
        </Flex>
      </Card>
      <Flex gap='10px'>
        {forecast ? 
          <LineGraph values={forecast} title={'Modelle VS Real'} /> : 
          <OrbitProgress color={useColorModeValue('custom_light.background', 'custom_dark.background')} size="medium" />}
        <BarGraph values={dataValues} title={'Bar Graph'} />
      </Flex>

    </Flex>
  )
}
