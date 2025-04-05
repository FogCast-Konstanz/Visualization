import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrbitProgress } from 'react-loading-indicators';
import Introduction from '../../components/Introduction';
import MeasurementCard from '../startingPage/MeasurementCard';

import { FaTemperatureHalf, FaWater } from "react-icons/fa6";
import { RiWindyFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import CardIndividual from '../../components/CardIndividual';
import PlotlyChart from '../../components/ui/plotly/DefaultChart';
import Map from './Map';

import { layoutConfig, useBackgroundColor, usePrimaryColor, useSurfaceColor, useTextColor } from '../../components/style';


export default function WeatherStationPage() {
  const { t } = useTranslation();
  const [currentWeather, setCurrentWeather] = useState(true);

  const loadingColor = usePrimaryColor()

  const dummyData = [{
    x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
    y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17, 10, 23],
    type: 'scatter',
    mode: 'lines+markers'
  }]

  return (
    <Flex direction='column' width='100%'gap={layoutConfig.gap} margin={layoutConfig.margin} overflow="auto" maxHeight={'calc(100dvh - 20px)'}>

      <Introduction header={t('weatherStation.title')} text={t('weatherStation.introduction')}></Introduction>

      <Flex gap={layoutConfig.gap}>
        <CardIndividual header={t('weatherStation.details')} body={t('weatherStation.description')}></CardIndividual>
        <Map></Map>
      </Flex>

      <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }}>
        {currentWeather ?
          <>
            <Flex flexDirection={{ lg: "column", base: 'column' }} flex={1}gap={layoutConfig.gap}>
              <MeasurementCard measurement={t('data.temperature')} value={'0'} unit='°C' icon={FaTemperatureHalf}></MeasurementCard>
              <MeasurementCard measurement={t('data.humidity')} value={'0'} unit='%' icon={WiHumidity}></MeasurementCard>
              <MeasurementCard measurement={t('data.waterLevel')} value={'0'} unit='cm' icon={FaWater}></MeasurementCard>
              <MeasurementCard measurement={t('data.windspeed')} value={'0'} unit='km/h' icon={RiWindyFill}></MeasurementCard>
            </Flex>
            <Flex flex={1}>
              <PlotlyChart data={dummyData} title={t('dataPage.fogMonth')} yAxis={t('dataPage.fogMonth')} xAxis={t('data.time')} dateFormat='day' />
            </Flex>
          </>
          : <OrbitProgress color={loadingColor} size="medium" />
        }
      </Flex>
    </Flex>
  )
}
