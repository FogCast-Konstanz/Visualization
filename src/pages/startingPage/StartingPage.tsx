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
import { useTranslation } from 'react-i18next'

export default function StartingPage() {
  const { t } = useTranslation();

  const [forecast, setForecast] = useState<LineGraphData[] | null>(null);
  const [forecastIcons, setForecastIcons] = useState<ForcastCardProps[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await DWDForcast.fetchData("10929");

    setForecast(DWDForcast.getHourlyValues())
    setForecastIcons(DWDForcast.getHourlyForcastValuesIcon())
  };

  return (
    <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' margin={{lg: '10px 10px 10px 0', base: '10px 10px 10px 10px'}} maxWidth={'100%'}>
      <Heading>{t('startingPage.title')}</Heading>

      <Flex gap='10px' flexDirection={{ lg: "row", base: 'column' }}>
        <MeasurementCard measurement={t('startingPage.temperature')} value='10' unit='°C' icon={FaTemperatureHalf}></MeasurementCard>
        <MeasurementCard measurement={t('startingPage.humidity')} value='40' unit='%' icon={WiHumidity}></MeasurementCard>
        <MeasurementCard measurement={t('startingPage.waterTemp')} value='4' unit='°C' icon={FaWater}></MeasurementCard>
        <MeasurementCard measurement={t('startingPage.windspeed')} value='10' unit='km/h' icon={RiWindyFill}></MeasurementCard>
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
      </Flex>

    </Flex>
  )
}
