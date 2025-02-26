import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Plot from 'react-plotly.js'
import MultipleAxisGraph, { MultipleAxisData } from '../../../components/plotly/MultipleAxis'

export default function AdvancedMode() {
    const { t } = useTranslation();

    const [weatherIcons, setWeatherIcons] = useState<{ time: string; icon: string }[]>([]);
    const [weatherData, setWeatherData] = useState<{ time: string; temp: number; humidity: number }[]>([]);
    const [weatherModel, setWeatherModel] = useState("icon_seamless");

    const [temp, setTemperature] = useState<MultipleAxisData[] | null>(null);
    const [humidity, setHumidity] = useState<MultipleAxisData[] | null>(null);

    useEffect(() => {
        fetchWeather();
    }, [weatherModel]);

    async function fetchWeather() {
        try {
            // setTemperature([]);
            // setHumidity([]);
            const url = `https://api.open-meteo.com/v1/forecast?latitude=47.66033&longitude=9.17582&hourly=temperature_2m,relative_humidity_2m&model=${weatherModel}`;

            const response = await fetch(url);
            const data = await response.json();
            const currentTime = new Date().toLocaleTimeString();

            console.log(data)

            const updatedWeatherData: { time: string; temp: number; humidity: number }[] = await data.hourly.time.map((time: string, index: number) => ({
                time,
                temp: data.hourly.temperature_2m[index],
                humidity: data.hourly.relative_humidity_2m[index]
            }));

            // const updatedWeatherIcons = data.hourly.time.map((time: string, index: number) => ({
            //     time,
            //     icon: `https://www.weatherbit.io/static/img/icons/${data.hourly.weathercode[index]}.png`
            // }));
            // setWeatherIcons(updatedWeatherIcons);

            console.log("updatedWeather", updatedWeatherData)
            // setTimeout(() => setWeatherData(updatedWeatherData), 0);

            setTimeout(() => setHumidity([{
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.humidity),
                type: "scatter",
                name: "Humidity"
            }]), 0);

            setTimeout(() => setTemperature([{
                x: updatedWeatherData.map(entry => entry.time),
                y: updatedWeatherData.map(entry => entry.temp),
                type: "scatter",
                name: "Temperature"
            }]), 0);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const currentTime = new Date().toISOString().slice(0, 16); // Get current time in format matching API response

    return (
        <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' maxWidth={'100%'}>


            <select onChange={(e) => setWeatherModel(e.target.value)} value={weatherModel}>
                <option value="icon_seamless">ICON Seamless</option>
                <option value="gfs">GFS</option>
                <option value="ecmwf">ECMWF</option>
            </select>
            {temp && humidity ? <MultipleAxisGraph y1={temp} y2={humidity} title={t('startingPage.forcastGraph') + '**'} /> : <></>}
            
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
