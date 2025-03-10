import { Flex, Select, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Plot from 'react-plotly.js'
import MultipleAxisGraph, { MultipleAxisData } from '../../../components/plotly/MultipleAxis'
import SelectModels from '../../../components/SelectModels'
import CloudGraph, { CloudDataType } from '../../../components/plotly/CloudGraph'
import { default as DWDForcast, default as dwdForcast } from '../../../components/requests/dwdForcast'
import { convertToPlotlyChartFormat, PlotlyChartDataFormat } from '../../../components/plotly/PlotlyChartFormat'
import PlotlyChart from '../../../components/ui/plotly/DefaultChart'
import { OrbitProgress } from 'react-loading-indicators'
import { fetchActualWeather } from '@/components/requests/actualBackend'

export default function AdvancedMode() {
    const { t } = useTranslation();

    const [forecast, setForecast] = useState<PlotlyChartDataFormat[] | null>(null);
    const [forecastSymbols, setForecastSymbols] = useState<PlotlyChartDataFormat | null>(null);

    const [weatherIcons, setWeatherIcons] = useState<{ time: string; icon: string }[]>([]);
    const [weatherModel, setWeatherModel] = useState<string[]>([]);
    const [cloudCoverData, setCloudCoverData] = useState<CloudDataType | null>(null);

    const [temp, setTemperature] = useState<MultipleAxisData[] | null>(null);
    const [humidity, setHumidity] = useState<MultipleAxisData[] | null>(null);
    const [visibility, setVisibility] = useState<MultipleAxisData[] | null>(null);

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

            const updatedWeatherData: { time: string; temp: number; humidity: number, cloudCover: number, cloudCoverLow: number, cloudCoverMid: number, cloudCoverHigh: number, visibility: number }[] = await data.hourly.time.map((time: string, index: number) => ({
                time,
                temp: data.hourly.temperature_2m[index],
                humidity: data.hourly.relative_humidity_2m[index],
                cloudCover: data.hourly.cloudcover[index],
                cloudCoverLow: data.hourly.cloudcover_low[index],
                cloudCoverMid: data.hourly.cloudcover_mid[index],
                cloudCoverHigh: data.hourly.cloudcover_high[index],
                visibility: data.hourly.visibility[index]
            }));

            // const updatedWeatherIcons = data.hourly.time.map((time: string, index: number) => ({
            //     time,
            //     icon: `https://www.weatherbit.io/static/img/icons/${data.hourly.weathercode[index]}.png`
            // }));
            // setWeatherIcons(updatedWeatherIcons);

            setHumidity([{
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.humidity),
                type: "scatter",
                name: "Humidity"
            }]);

            setTemperature([{
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.temp),
                type: "scatter",
                name: "Temperature"
            }])

            setCloudCoverData({
                time: data.hourly.time,
                low: data.hourly.cloudcover_low,
                mid: data.hourly.cloudcover_mid,
                high: data.hourly.cloudcover_high,
                visibility: data.hourly.visibility
            })

            setVisibility([{
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.visibility),
                type: "scatter",
                name: "Visibility"
            }])

            const scaleCloud = (values: number[], center: number) => {
                const up = values.map(v => center + (v / 12));
                const down = values.map(v => center - (v / 12)).reverse();
                return { up, down };
            };



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
            // setForecastSymbols(convertToPlotlyChartFormat(weatherSymbolsTemp, 'text'))
        }
    }

    return (
        <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' maxWidth={'100%'} height={'calc(100vh - 100px)'} overflow='hidden' overflowY={'scroll'}>
            <SelectModels selectModels={weatherModel} setSelectModels={setWeatherModel}></SelectModels>

            {temp && humidity ? <MultipleAxisGraph y1={temp} y2={humidity} title={t('startingPage.forcastGraph') + '**' + weatherModel} xAxis='Time' y1Axis='Temperature °C' y2Axis='Humidity %' /> : <></>}
            {/* {visibility && cloudCover ? <MultipleAxisGraph y1={visibility} y2={cloudCover} title={t('startingPage.forcastGraph') + '**' + weatherModel} xAxis='Time' y1Axis='Temperature °C' y2Axis='Humidity %' /> : <></>} */}
            {cloudCoverData ? <CloudGraph cloudData={cloudCoverData}></CloudGraph> : <></>}

            {/* <Flex gap='10px' height={'50%'}>
                {forecast ?
                    <PlotlyChart data={[...forecast]} customLayout={{}} title={'Vorhersage'} yAxis='Temperature °C' xAxis='Time' y2Axis='Humidity %' />
                    : <OrbitProgress size="medium" />}
            </Flex> */}

            <div style={{ display: "flex", overflowX: "auto" }}>
                {weatherIcons.map((entry) => (
                    <div key={entry.time} style={{ margin: "5px", textAlign: "center" }}>
                        <img src={entry.icon} alt="Weather Icon" style={{ width: "50px", height: "50px" }} />
                        <p>{entry.time}</p>
                    </div>
                ))}
            </div>
        </Flex>
    )
}
