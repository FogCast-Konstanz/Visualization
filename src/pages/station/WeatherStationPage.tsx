import { Card, Flex, Image, Popover, PopoverArrow, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { FaTemperatureHalf, FaWater } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { OrbitProgress } from 'react-loading-indicators';
import CardIndividual from '../../components/elements/CardIndividual';
import Introduction from '../../components/elements/Introduction';
import { FallbackDataFormat, fetchFallbackData, fetchStationData, parseWeatherStationToXYFormat, StationResponseFormat } from '../../components/requests/stationBackend';
import { layoutConfig, useColor } from '../../components/style';
import MeasurementCard from '../startingPage/MeasurementCard';
import Map from './Map';
import { convertToPlotlyChartFormat, PlotlyChartDataFormat } from '../../components/plotly/PlotlyChartFormat';
import PlotlyChart from '../../components/plotly/DefaultChart';
import CurrentWeather from './currentWeather';


export default function WeatherStationPage() {
    const { t } = useTranslation();
    const [weather, setWeather] = useState<PlotlyChartDataFormat[] | null>(null)
    const [fallbackSummary, setFallbackSummary] = useState<{ count: number, models: string[] } | null>(null)
    const [ceilometerImageUrl, setCeilometerImageUrl] = useState(`https://www.dwd.de/DWD/forschung/luftchemie/chm15k_konstanz.png?ts=${Date.now()}`)
    const loadingColor = useColor('primary')

    useEffect(() => {
        fetchStationWeather()
    }, [])

    useEffect(() => {
        const updateImage = () => setCeilometerImageUrl(
            `https://www.dwd.de/DWD/forschung/luftchemie/chm15k_konstanz.png?ts=${Date.now()}`
        )
        updateImage()
        const intervalId = setInterval(updateImage, 60 * 60 * 1000)
        return () => clearInterval(intervalId)
    }, [])

    async function fetchStationWeather() {

        const start = new Date("2025-07-24T00:00:00")
        const stop = new Date("2100-01-01T00:00:00")
        const demoMode = new URLSearchParams(window.location.search).has('fallbackDemo')
        const [stationData, fallbackData] = await Promise.all([
            fetchStationData(start, stop),
            fetchFallbackData(start, stop),
        ])
        const measured = stationData
            ? stationData.filter(entry => !isFallback(entry))
            : demoMode ? createDemoStationData() : []
        const displayedMeasured = demoMode ? createDemoStationData() : measured
        if (displayedMeasured.length === 0) { return }

        // The station endpoint contains both kinds of points. Keep measured
        // and estimated values separate so the chart cannot imply equal quality.
        const fallback = demoMode
            ? []
            : (fallbackData ?? []).filter(entry => entry.is_fallback !== false)
        const demoFallback = demoMode
            ? createDemoFallback(displayedMeasured)
            : []
        const displayedFallback = [...fallback, ...demoFallback]
        const fallbackModels = [...new Set(displayedFallback
            .map(entry => entry.forecast_model)
            .filter((model): model is string => Boolean(model)))]

        const traces: PlotlyChartDataFormat[] = [
            createTrace(displayedMeasured, 'temperature', t('data.temperature'), 'y1', '#e67e22'),
            createTrace(displayedMeasured, 'water_temperature', t('data.waterTemp'), 'y1', '#3498db'),
            createTrace(displayedMeasured, 'humidity', t('data.humidity'), 'y2', '#27ae60'),
            createFallbackTrace(displayedFallback, 'temperature', t('data.temperature'), 'y1', '#e67e22'),
            createFallbackTrace(displayedFallback, 'water_temperature', t('data.waterTemp'), 'y1', '#3498db'),
            createFallbackTrace(displayedFallback, 'humidity', t('data.humidity'), 'y2', '#27ae60'),
        ].filter(trace => trace.x.length > 0)

        setFallbackSummary({ count: displayedFallback.length, models: fallbackModels })
        setWeather(traces)
    }

    function isFallback(entry: StationResponseFormat): boolean {
        return entry.is_fallback === true || entry.is_fallback === 'true'
    }

    function createDemoFallback(data: StationResponseFormat[]): FallbackDataFormat[] {
        const source = data.slice(-12)
        const firstTimestamp = new Date(data[data.length - 1].time).getTime() + 60 * 60 * 1000
        return source.map((entry, index) => ({
            timestamp: new Date(firstTimestamp + index * 60 * 60 * 1000).toISOString(),
            temperature: entry.temperature + 1.5 + index * 0.03,
            humidity: Math.max(0, Math.min(100, entry.humidity - 4)),
            water_temperature: entry.water_temperature + 0.8,
            is_fallback: true,
            forecast_quality: 'demo',
            forecast_model: 'basic_lstm (Demo)',
            model_version: 'local-demo',
            forecast_reason: 'visualisation_demo',
        }))
    }

    function createDemoStationData(): StationResponseFormat[] {
        const start = new Date('2025-07-24T00:00:00Z').getTime()
        const interval = 6 * 60 * 60 * 1000
        const count = Math.floor((Date.now() - start) / interval) + 1
        return Array.from({ length: count }, (_, index) => {
            const timestamp = new Date(start + index * interval)
            const wave = Math.sin(index / 5)
            const seasonal = Math.sin(index / 240) * 5
            return {
                time: timestamp.toISOString(),
                temperature: 12 + seasonal + wave * 2,
                humidity: Math.max(25, Math.min(95, 72 - seasonal * 1.5 - wave * 8)),
                water_temperature: 13.5 + seasonal * 0.35 + wave * 0.4,
            }
        })
    }

    function createTrace(
        data: StationResponseFormat[],
        value: 'temperature' | 'water_temperature' | 'humidity',
        name: string,
        yAxis: 'y1' | 'y2',
        color: string,
    ): PlotlyChartDataFormat {
        const trace = convertToPlotlyChartFormat(
            parseWeatherStationToXYFormat(data, value, `${name} (${t('weatherStation.measured')})`),
            'line',
            yAxis,
            color,
        )
        trace.line = { color, shape: 'spline' }
        return trace
    }

    function createFallbackTrace(
        data: FallbackDataFormat[],
        value: 'temperature' | 'water_temperature' | 'humidity',
        name: string,
        yAxis: 'y1' | 'y2',
        color: string,
    ): PlotlyChartDataFormat {
        const points = data.filter(entry => entry[value] !== undefined && entry[value] !== null)
        const trace = convertToPlotlyChartFormat(
            {
                x: points.map(entry => entry.timestamp),
                y: points.map(entry => entry[value] as number),
                name: `${name} (${t('weatherStation.fallback')})`,
            },
            'dashedLine',
            yAxis,
            color,
            0.85,
        )
        trace.mode = 'lines+markers'
        trace.line = { color, dash: 'dashdot', shape: 'spline', width: 3 }
        trace.marker = {
            symbol: 'diamond',
            size: 7,
            color,
            line: { color: '#222222', width: 1 },
        }
        return trace
    }


    return (
        <Flex direction='column' width='calc(100% - 20px)' minW="0" gap={layoutConfig.gap} margin={layoutConfig.margin} overflow="auto" maxHeight={'calc(100dvh - 20px)'}>

            <Introduction
                header={t('weatherStation.title')}
                text={t('weatherStation.description')}
            />

            <CurrentWeather></CurrentWeather>

            <Flex gap={layoutConfig.gap} flexDirection="column">
                {weather ?
                    <PlotlyChart
                        data={weather}
                        title={t('weatherStation.graph')}
                        titleContent={
                            fallbackSummary && fallbackSummary.count > 0 &&
                                    <Popover trigger="hover" placement="top-start">
                                        <PopoverTrigger>
                                            <InfoOutlineIcon
                                                aria-label={t('weatherStation.fallbackNoticeTitle')}
                                                color={useColor('primaryVariant')}
                                                boxSize={4}
                                                cursor="help"
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent backgroundColor="white" color="gray.800" padding={3} maxW="420px" fontSize="sm">
                                            <PopoverArrow />
                                            <Text fontWeight="bold" mb={1}>{t('weatherStation.fallbackNoticeTitle')}</Text>
                                            <Text>
                                                {t('weatherStation.fallbackNotice', {
                                                    count: fallbackSummary.count,
                                                    models: fallbackSummary.models.join(', ') || t('weatherStation.fallbackModelUnknown'),
                                                })}
                                            </Text>
                                        </PopoverContent>
                                    </Popover>
                        }
                        yAxis={t('data.temperature')}
                        xAxis={t('data.time')}
                        y2Axis={t('data.humidity')}
                        dateFormat='day'
                        customLayout={{
                            xaxis: {
                                title: {
                                    text: '',
                                },
                                range: getDataRange(weather),
                                rangeslider: {
                                    visible: true,
                                    thickness: 0.08,
                                },
                            },

                            annotations: [
                                {
                                    text: t('data.time'),
                                    x: 0.5,
                                    xref: 'paper',
                                    y: -0.23,
                                    yref: 'paper',
                                    showarrow: false,
                                    xanchor: 'center',
                                    yanchor: 'top',
                                },
                            ],

                            margin: {
                                l: 50,
                                r: 40,
                                t: 0,
                                b: 110,
                            },

                            legend: {
                                orientation: 'h',
                                x: 0.5,
                                y: -0.34,
                                xanchor: 'center',
                                yanchor: 'top',
                                traceorder: 'normal',
                            },
                        }} />
                    : <Flex width="100%" justifyContent="center" alignItems="center" minH="180px">
                        <OrbitProgress color={loadingColor} size="medium" />
                    </Flex>
                }
            </Flex>

            <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }}>
                <Image
                    src="/assets/weatherstation/Steg.jpeg"
                    alt="Weather station at the HTWG pier"
                    width="100%"
                    maxW={{ lg: "40%", base: "100%" }}
                    objectFit="cover"
                    borderRadius="md"
                />
                <Map></Map>
            </Flex>

            <Flex gap={layoutConfig.gap}>
                <CardIndividual header={t('weatherStation.technicalDetailsHeader')} body={t('weatherStation.technicalDetailsText')}></CardIndividual>
            </Flex>

            <Card
                bg={useColor('background')}
                color={useColor('text')}
                padding={layoutConfig.padding}
                borderRadius={layoutConfig.borderRadius}
                width="100%"
            >
                <Flex direction="column" align="center" gap={layoutConfig.smallGap}>
                    <Text fontWeight="bold" textAlign="center" fontSize="18px">
                        {t('data.ceilometer')}
                    </Text>
                    <Image
                        src={ceilometerImageUrl}
                        alt="DWD Ceilometer Konstanz"
                        width="90%"
                        maxH="600px"
                        objectFit="contain"
                        fallback={<OrbitProgress color={loadingColor} size="medium" />}
                    />
                </Flex>
            </Card>

            <Card
                bg={useColor('background')}
                color={useColor('text')}
                padding={layoutConfig.padding}
                borderRadius={layoutConfig.borderRadius}
                width="100%"
            >
                <Flex direction="column" align="center" gap={layoutConfig.smallGap}>
                    <Text fontWeight="bold" textAlign="center" fontSize="18px">
                        {t('data.uvSensor')}
                    </Text>
                    <Text textAlign="center">
                        {t('data.comingSoon')}
                    </Text>
                </Flex>
            </Card>

        </Flex>
    )
}

function getDataRange(data: PlotlyChartDataFormat[]): [string, string] | undefined {
    const timestamps = data
        .flatMap(trace => trace.x)
        .map(value => new Date(value).getTime())
        .filter(Number.isFinite)
    if (timestamps.length === 0) {
        return undefined
    }
    return [
        new Date(Math.min(...timestamps)).toISOString(),
        new Date(Math.max(...timestamps)).toISOString(),
    ]
}
