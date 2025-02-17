import { Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import LineGraph from "../.././components/plotly/LineGraph"
import ForcastCard, { ForcastCardProps } from './ForcastCard'
import MeasurementCard from './MeasurementCard'

import { FaTemperatureHalf, FaWater } from "react-icons/fa6"
import { RiWindyFill } from "react-icons/ri"
import { WiHumidity } from "react-icons/wi"
// import { fetchForecast } from '../../components/requests/dwd'

import DWDForcast from '../../components/requests/dwdForcast'

import { OrbitProgress } from 'react-loading-indicators'

import { useTranslation } from 'react-i18next'
import { LineGraphData } from '../.././components/plotly/LineGraph'
import DataSource from '../../components/DataSource'
import { fetchActualWeather } from '../../components/requests/actualBackend'
import dwdForcast from '../../components/requests/dwdForcast'

export default function StartingPage() {
  const { t } = useTranslation();

  const [forecast, setForecast] = useState<LineGraphData[] | null>(null);
  const [forecastIcons, setForecastIcons] = useState<ForcastCardProps[] | null>(null);

  const [currentWeather, setCurrentWeather] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const weather = await fetchActualWeather();

    const reformattedWeather = weather.reduce((acc, entry) => {
      acc[entry.name] = entry.value;
      return acc;
    }, {} as Record<string, string>);
    setCurrentWeather(reformattedWeather);

    await DWDForcast.fetchData("10929");

    setForecast(DWDForcast.getHourlyValues())
    setForecastIcons(DWDForcast.getHourlyForcastValuesIcon())

    console.log(dwdForcast.getHourlyForcastValuesIcon())
  };

  const loadingColor = useColorModeValue('#4C8C8C', '#AFDBF5')

  return (
    <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' margin={'10px'} maxWidth={'100%'}>
      <Heading>{t('startingPage.title')}</Heading>

      <Flex gap='10px' flexDirection={{ lg: "row", base: 'column' }}>
        <MeasurementCard measurement={t('startingPage.temperature')} value={currentWeather['temperature']} unit='°C' icon={FaTemperatureHalf}></MeasurementCard>
        <MeasurementCard measurement={t('startingPage.humidity')} value={String(parseFloat(currentWeather['humidity']) * 100)} unit='%' icon={WiHumidity}></MeasurementCard>
        <MeasurementCard measurement={t('startingPage.waterTemp')} value={currentWeather['']} unit='°C' icon={FaWater}></MeasurementCard>
        <MeasurementCard measurement={t('startingPage.windspeed')} value={currentWeather['wind_speed']} unit='km/h' icon={RiWindyFill}></MeasurementCard>
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
          )) : <OrbitProgress color={loadingColor} size="medium" />}
        </Flex>
      </Card>
      <Flex gap='10px'>
        {forecast ? 
          <LineGraph values={forecast} title={t('startingPage.forcastGraph') + '**'} /> : 
          <OrbitProgress color={loadingColor} size="medium" />}
      </Flex>

      <DataSource></DataSource>
    </Flex>
  )
}
