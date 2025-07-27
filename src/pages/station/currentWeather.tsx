import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTemperatureHalf, FaWater } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { OrbitProgress } from 'react-loading-indicators';
import { fetchCurrentStationData, StationResponseFormat } from '../../components/requests/stationBackend';
import { layoutConfig, useColor } from '../../components/style';
import MeasurementCard from '../startingPage/MeasurementCard';

export default function CurrentWeather() {
    const { t } = useTranslation();
    const [currentWeather, setCurrentWeather] = useState<StationResponseFormat | null>(null)
    const [noCurrentDataAvailable, setNoCurrentDataAvailable] = useState<Boolean>(false);

    const loadingColor = useColor('primary')
    const textColor = useColor('text');

    useEffect(() => {
        fetchStationWeather()
    }, [])

    async function fetchStationWeather() {
        let currentWeather = await fetchCurrentStationData();

        if (currentWeather == null) {
            setNoCurrentDataAvailable(true);
        } else {
            setNoCurrentDataAvailable(false);
            setCurrentWeather(currentWeather);
        }
    }


    return (
        <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }} flexWrap="wrap" justifyContent="center">
            {!noCurrentDataAvailable ?
                currentWeather ?
                    <>
                        <MeasurementCard measurement={t('data.temperature')} value={String(Math.round((currentWeather['temperature']) * 100) / 100)} unit='°C' icon={FaTemperatureHalf} click='temperatur' />
                        <MeasurementCard measurement={t('data.humidity')} value={String(Math.round((currentWeather['humidity']) * 100) / 100)} unit='%' icon={WiHumidity} />
                        <MeasurementCard measurement={t('data.waterTemp')} value={String(Math.round((currentWeather['water_temperature']) * 100) / 100)} unit='°C' icon={FaWater} click='waterLevel' />
                        <Text fontSize="sm" color={textColor} textAlign="center" width="100%">
                            {t('data.lastUpdated')}: {new Date(currentWeather['time']).toLocaleString()}
                        </Text>
                    </>
                    : <OrbitProgress color={loadingColor} size="medium" />
                :
                <>
                    <Text fontSize="sm" color={textColor} textAlign="center" width="100%">
                        {t('weatherStation.noDataAvailable')}
                    </Text>
                </>
            }
        </Flex>
    )
}
