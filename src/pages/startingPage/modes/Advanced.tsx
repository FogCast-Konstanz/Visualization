import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OrbitProgress } from 'react-loading-indicators'
import CloudGraph, { CloudDataType } from '../../../components/plotly/CloudGraph'
import { convertToPlotlyChartFormat, PlotlyChartDataFormat } from '../../../components/plotly/PlotlyChartFormat'
import { default as DWDForcast } from '../../../components/requests/dwdForcast'
import SelectModels from '../../../components/SelectModels'
import PlotlyChart from '../../../components/ui/plotly/DefaultChart'

export default function AdvancedMode() {
    const { t } = useTranslation();

    const [forecast, setForecast] = useState<PlotlyChartDataFormat[] | null>(null);
    const [forecastSymbols, setForecastSymbols] = useState<PlotlyChartDataFormat | null>(null);

    const [weatherModel, setWeatherModel] = useState<string[]>([]);
    const [cloudData, setCloudData] = useState<PlotlyChartDataFormat[] | null>(null)

    useEffect(() => {
        fetchWeather();
        fetchDWD();
    }, [weatherModel]);

    async function fetchWeather() {
        try {
            // TODO: Adjust request to show use multiple models and backend
            const url = `https://api.open-meteo.com/v1/forecast?latitude=47.66033&longitude=9.17582&hourly=temperature_2m,relative_humidity_2m,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility&model=${weatherModel[0]}`;

            const response = await fetch(url);
            const data = await response.json();

            const scaleCloud = (values: number[], center: number) => {
                const up = values.map(v => center + (v / 12));
                const down = values.map(v => center - (v / 12)).reverse();
                return { up, down };
            };

            const xTime = data.hourly.time.concat([...data.hourly.time].reverse())
            const scaledHigh = scaleCloud(data.hourly.cloudcover_high, 75)
            const scaledMid = scaleCloud(data.hourly.cloudcover_mid, 50)
            const scaledLow = scaleCloud(data.hourly.cloudcover_low, 25)
            setCloudData(
                [
                    convertToPlotlyChartFormat({ x: xTime, y: scaledHigh.up.concat(scaledHigh.down), name: 'High Cloud Cover' }, 'cloud', 'y1', 'lightblue'),
                    convertToPlotlyChartFormat({ x: xTime, y: scaledMid.up.concat(scaledMid.down), name: 'Mid Cloud Cover' }, 'cloud', 'y1', '#808080'),
                    convertToPlotlyChartFormat({ x: xTime, y: scaledLow.up.concat(scaledLow.down), name: 'Low Cloud Cover' }, 'cloud', 'y1', '#202020'),
                    convertToPlotlyChartFormat({ x: xTime, y: data.hourly.visibility.map((v: number) => v / 1000), name: 'Visibility'}, 'dashedLine', 'y2', 'orange')
                ]
            )

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    async function fetchDWD() {
        await DWDForcast.fetchData("10929");

        /* Convert to Plotly format */
        const humidity = DWDForcast.getNextXDaysHumidity(2)
        const temperature = DWDForcast.getNextXDaysTemperature(2)

        const weatherSymbolsTemp = DWDForcast.getWeatherSymbolsHourlyNextXDays(2)
        if (weatherSymbolsTemp && humidity && temperature) {
            setForecast([convertToPlotlyChartFormat(humidity, 'scatter', 'y2'), convertToPlotlyChartFormat(temperature, 'scatter', 'y1')])
            setForecastSymbols(convertToPlotlyChartFormat(weatherSymbolsTemp, 'text'))
        }
    }

    return (
        <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' height={'calc(100vh - 100px)'} overflow='hidden' overflowY={'scroll'}>
            <SelectModels selectModels={weatherModel} setSelectModels={setWeatherModel}></SelectModels>

            {/* <Flex>
                {temp && humidity ? <MultipleAxisGraph y1={temp} y2={humidity} title={t('startingPage.forcastGraph') + '**' + weatherModel} xAxis='Time' y1Axis='Temperature °C' y2Axis='Humidity %' /> : <></>}
            </Flex> */}

            <Flex gap='10px'>
                {forecast && forecastSymbols ?
                    <PlotlyChart data={[...forecast, forecastSymbols]} title={t('startingPage.forecast')} yAxis={t('startingPage.temperature') + ' °C'} xAxis={t('startingPage.time')} y2Axis={t('startingPage.humidity') + ' %'} showNow={true} />
                    : <OrbitProgress size="medium" />}
            </Flex>

            <Flex>
                {cloudData ? <PlotlyChart title={'Cloudcover'} data={cloudData} yAxis={t('startingPage.temperature') + ' °C'} xAxis={t('startingPage.time')} y2Axis={t('startingPage.humidity') + ' %'} showNow={true}></PlotlyChart> : <>miau</>}
            </Flex>
        </Flex>
    )
}
