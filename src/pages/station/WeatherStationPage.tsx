import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTemperatureHalf, FaWater } from "react-icons/fa6";
import { RiWindyFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import { OrbitProgress } from 'react-loading-indicators';
import CardIndividual from '../../components/elements/CardIndividual';
import Introduction from '../../components/elements/Introduction';
import UnderConstruction from '../../components/elements/UnderConstruction';
import { fetchCurrentStationData, StationResponseFormat } from '../../components/requests/stationBackend';
import { layoutConfig, useColor } from '../../components/style';
import MeasurementCard from '../startingPage/MeasurementCard';
import Map from './Map';


export default function WeatherStationPage() {
  const { t } = useTranslation();
  // const [currentWeather, setCurrentWeather] = useState(true);

  const [currentWeather, setCurrentWeather] = useState<StationResponseFormat | null>(null)

  const loadingColor = useColor('primary')

  useEffect(() => {
    fetchStationWeather()
  }, [])

  async function fetchStationWeather() {
    const weather = await fetchCurrentStationData();
    console.log(weather)
    // const reformattedWeather = weather.reduce((acc, entry) => {
    //   acc[entry.name] = entry.value;
    //   return acc;
    // }, {} as Record<string, string>);

    setCurrentWeather(weather);
  }


  return (
    <Flex direction='column' width='100%' gap={layoutConfig.gap} margin={layoutConfig.margin} overflow="auto" maxHeight={'calc(100dvh - 20px)'}>

      <Introduction header={t('weatherStation.title')} text={t('weatherStation.introduction')}></Introduction>

      <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }} flexWrap="wrap" justifyContent="center">
        {currentWeather ?
          <>
            <MeasurementCard measurement={t('data.temperature')} value={String(currentWeather['temperature'])} unit='°C' icon={FaTemperatureHalf} click='temperatur'></MeasurementCard>
            <MeasurementCard measurement={t('data.humidity')} value={String(Math.round((currentWeather['humidity']) * 100) / 100)} unit='%' icon={WiHumidity}></MeasurementCard>
            <MeasurementCard measurement={t('data.waterLevel')} value={String(currentWeather['water_temperature'])} unit='cm' icon={FaWater} click='waterLevel'></MeasurementCard>
          </>
          : <OrbitProgress color={loadingColor} size="medium" />
        }

      </Flex>

      <Flex gap={layoutConfig.gap}>
        <CardIndividual header={t('weatherStation.details')} body={t('weatherStation.description')}></CardIndividual>
        <Map></Map>
      </Flex>

      <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }}>
        {currentWeather ?
          <>

          </>
          : <OrbitProgress color={loadingColor} size="medium" />
        }
      </Flex>

      <Flex gap={layoutConfig.gap}>
        <CardIndividual header={t('weatherStation.technicalDetailsHeader')} body={t('weatherStation.technicalDetailsText')}></CardIndividual>
      </Flex>

    </Flex>
  )
}
