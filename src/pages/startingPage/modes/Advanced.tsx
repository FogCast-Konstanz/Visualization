import { Flex, Select, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Plot from 'react-plotly.js'
import MultipleAxisGraph, { MultipleAxisData } from '../../../components/plotly/MultipleAxis'
import SelectModels from '../../../components/SelectModels'

export default function AdvancedMode() {
    const { t } = useTranslation();

    const [weatherIcons, setWeatherIcons] = useState<{ time: string; icon: string }[]>([]);
    const [weatherModel, setWeatherModel] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<{ time: string[]; low: {up: number[], down: number[]}; mid: {up: number[], down: number[]}; high: {up: number[], down: number[]}; visibility: number[] } | null>(null);

    const [temp, setTemperature] = useState<MultipleAxisData[] | null>(null);
    const [humidity, setHumidity] = useState<MultipleAxisData[] | null>(null);
    const [visibility, setVisibility] = useState<MultipleAxisData[] | null>(null);
    const [cloudCover, setCloudCover] = useState<MultipleAxisData[] | null>(null);

    useEffect(() => {
        fetchWeather();
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

            setCloudCover([{
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.cloudCover),
                type: "scatter",
                name: "CloudCover"
            }, {
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.cloudCoverLow),
                type: "scatter",
                name: "CloudCover"
            }, {
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.cloudCoverMid),
                type: "scatter",
                name: "CloudCover"
            }, {
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.cloudCoverHigh),
                type: "scatter",
                name: "CloudCover"
            }])

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

            setWeatherData({
                time: data.hourly.time.concat([...data.hourly.time].reverse()),
                low: scaleCloud(data.hourly.cloudcover_low, 25),
                mid: scaleCloud(data.hourly.cloudcover_mid, 50),
                high: scaleCloud(data.hourly.cloudcover_high, 75),
                visibility: data.hourly.visibility.map((v: number) => v / 1000),
            });

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    return (
        <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' maxWidth={'100%'}>
            <SelectModels selectModels={weatherModel} setSelectModels={setWeatherModel}></SelectModels>

            {temp && humidity ? <MultipleAxisGraph y1={temp} y2={humidity} title={t('startingPage.forcastGraph') + '**' + weatherModel} xAxis='Time' y1Axis='Temperature °C' y2Axis='Humidity %' /> : <></>}
            {visibility && cloudCover ? <MultipleAxisGraph y1={visibility} y2={cloudCover} title={t('startingPage.forcastGraph') + '**' + weatherModel} xAxis='Time' y1Axis='Temperature °C' y2Axis='Humidity %' /> : <></>}

            <div style={{ display: "flex", overflowX: "auto" }}>
                {weatherIcons.map((entry) => (
                    <div key={entry.time} style={{ margin: "5px", textAlign: "center" }}>
                        <img src={entry.icon} alt="Weather Icon" style={{ width: "50px", height: "50px" }} />
                        <p>{entry.time}</p>
                    </div>
                ))}
            </div>
            <div>
                {weatherData ? (
                    <Plot data={[
                        {
                            x: weatherData.time,
                            y: weatherData.high.up.concat(weatherData.high.down),
                            fill: "toself",
                            type: "scatter",
                            mode: "lines",
                            line: { color: 'black', width: 1 }, opacity: 0.6,
                            name: "High Cloud Cover",
                        },
                        {
                            x: weatherData.time,
                            y: weatherData.mid.up.concat(weatherData.mid.down.reverse()),
                            fill: "toself",
                            type: "scatter",    
                            mode: "lines",
                            line: { color: 'gray', width: 1 }, opacity: 0.6,
                            name: "Mid Cloud Cover",
                        },
                        {
                            x: weatherData.time,
                            y: weatherData.low.up.concat(weatherData.low.down.reverse()),
                            fill: "toself",
                            type: "scatter",
                            mode: "lines",
                            line: { color: 'lightblue', width: 1 }, opacity: 0.6,
                            name: "Low Cloud Cover",
                        },
                        {
                            x: weatherData.time,
                            y: weatherData.visibility,
                            type: "scatter",
                            mode: "lines",
                            name: "Visibility (km)",
                            yaxis: "y2",
                            line: { color: "red", dash: "dash", width: 2 },
                        },
                    ]}
                        layout={{
                            title: "Cloud Cover and Visibility Over Time",
                            xaxis: { title: "Time" },
                            yaxis: { title: "Cloud Cover (%)", range: [0, 100] },
                            yaxis2: {
                                title: "Visibility (km)",
                                overlaying: "y",
                                side: "right",
                            },
                            paper_bgcolor: "white",
                            plot_bgcolor: "white",
                        }}
                    />
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
        </Flex>
    )
}
