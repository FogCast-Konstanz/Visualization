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
import CurrentWeather from './currentWeather';


export default function WeatherStationPage() {
    const { t } = useTranslation();
    const [weather, setWeather] = useState<PlotlyChartDataFormat[] | null>(null)
    const loadingColor = useColor('primary')

    useEffect(() => {
        fetchStationWeather()
    }, [])

    async function fetchStationWeather() {

        /* Get date of last year */
        const dateLastWeek = new Date();
        dateLastWeek.setDate(dateLastWeek.getDate() - 7)

        const weather = await fetchStationData(new Date("2025-07-24T00:00:00"), new Date("2100-01-01T00:00:00"));
        if (!weather) {return}
        // const waterLevel = await fetchWaterLevelHistory(dateLastYear, new Date())
        const temperature = parseWeatherStationToXYFormat(weather, 'temperature')
        const water_temperature = parseWeatherStationToXYFormat(weather, 'water_temperature')
        const humidity = parseWeatherStationToXYFormat(weather, 'humidity')

        setWeather([(convertToPlotlyChartFormat(temperature, 'scatter', 'y1')), (convertToPlotlyChartFormat(water_temperature, 'scatter', 'y1')), (convertToPlotlyChartFormat(humidity, 'scatter', 'y2'))])
    }


    return (
        <Flex direction='column' width='100%' gap={layoutConfig.gap} margin={layoutConfig.margin} overflow="auto" maxHeight={'calc(100dvh - 20px)'}>

            <Introduction header={t('weatherStation.title')} text={t('weatherStation.introduction')}></Introduction>

            <CurrentWeather></CurrentWeather>

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
