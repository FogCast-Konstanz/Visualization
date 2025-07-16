import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTemperatureHalf, FaWater } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { OrbitProgress } from 'react-loading-indicators';
import CardIndividual from '../../components/elements/CardIndividual';
import Introduction from '../../components/elements/Introduction';
import { fetchCurrentStationData, fetchStationData, parseWeatherStationToXYFormat, StationResponseFormat } from '../../components/requests/stationBackend';
import { layoutConfig, useColor } from '../../components/style';
import MeasurementCard from '../startingPage/MeasurementCard';
import Map from './Map';
import { convertToPlotlyChartFormat, PlotlyChartDataFormat } from '../../components/plotly/PlotlyChartFormat';
import PlotlyChart from '../../components/plotly/DefaultChart';


export default function WeatherStationPage() {
    const { t } = useTranslation();
    const [currentWeather, setCurrentWeather] = useState<StationResponseFormat | null>(null)
    const [noCurrentDataAvailable, setNoCurrentDataAvailable] = useState<Boolean>(false);

    const [weather, setWeather] = useState<PlotlyChartDataFormat[] | null>(null)
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


        /* Get date of last year */
        const dateHistory = new Date();
        dateHistory.setFullYear(dateHistory.getFullYear() - 1, 0, 1); // Set to Jan 1st

        const weather = await fetchStationData(dateHistory, new Date("2100-01-01T00:00:00"));
        if (!weather) {return}
        // const waterLevel = await fetchWaterLevelHistory(dateLastYear, new Date())
        const temperature = parseWeatherStationToXYFormat(weather, 'temperature')
        const water_temperature = parseWeatherStationToXYFormat(weather, 'water_temperature')
        const humidity = parseWeatherStationToXYFormat(weather, 'humidity')

        setWeather([(convertToPlotlyChartFormat(temperature, 'scatter', 'y1')), (convertToPlotlyChartFormat(water_temperature, 'scatter', 'y1')), (convertToPlotlyChartFormat(humidity, 'scatter', 'y2'))])


        console.log(currentWeather)
    }


    return (
        <Flex direction='column' width='100%' gap={layoutConfig.gap} margin={layoutConfig.margin} overflow="auto" maxHeight={'calc(100dvh - 20px)'}>

            <Introduction header={t('weatherStation.title')} text={t('weatherStation.introduction')}></Introduction>

            <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }} flexWrap="wrap" justifyContent="center">
                {!noCurrentDataAvailable ?
                    currentWeather ?
                        <>
                            <MeasurementCard measurement={t('data.temperature')} value={String(Math.round((currentWeather['temperature']) * 100) / 100)} unit='°C' icon={FaTemperatureHalf} click='temperatur' />
                            <MeasurementCard measurement={t('data.humidity')} value={String(Math.round((currentWeather['humidity']) * 100) / 100)} unit='%' icon={WiHumidity} />
                            <MeasurementCard measurement={t('data.waterTemperature')} value={String(Math.round((currentWeather['water_temperature']) * 100) / 100)} unit='°C' icon={FaWater} click='waterLevel' />
                            <Text fontSize="sm" color={textColor} textAlign="center" width="100%">
                                {t('data.lastUpdated')}: {new Date(currentWeather['time']).toLocaleString()}
                            </Text>
                        </>
                        : <OrbitProgress color={loadingColor} size="medium" />
                    :
                    <>
                        {/* <MeasurementCard measurement={t('data.temperature')} value={'-'} unit='°C' icon={FaTemperatureHalf} click='temperatur' />
                        <MeasurementCard measurement={t('data.humidity')} value={'-'} unit='%' icon={WiHumidity} />
                        <MeasurementCard measurement={t('data.waterTemperature')} value={'-'} unit='°C' icon={FaWater} click='waterLevel' /> */}
                        <Text fontSize="sm" color={textColor} textAlign="center" width="100%">
                            {t('weatherStation.noDataAvailable')}
                        </Text>
                    </>
                }
            </Flex>

            <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }}>
                {weather ?
                    <>
                        {weather ?
                            <PlotlyChart
                                data={weather}
                                title={t('weatherStation.graph')}
                                yAxis={t('data.temperature')}
                                xAxis={t('data.time')}
                                y2Axis={t('data.humidity')}
                                dateFormat='day' />
                            : <OrbitProgress color={loadingColor} size='medium' />}
                    </>
                    : <OrbitProgress color={loadingColor} size="medium" />
                }
            </Flex>

            <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }}>
                <CardIndividual header={t('weatherStation.details')} body={t('weatherStation.description')}></CardIndividual>
                <Map></Map>
            </Flex>

            <Flex gap={layoutConfig.gap}>
                <CardIndividual header={t('weatherStation.technicalDetailsHeader')} body={t('weatherStation.technicalDetailsText')}></CardIndividual>
            </Flex>

        </Flex>
    )
}
