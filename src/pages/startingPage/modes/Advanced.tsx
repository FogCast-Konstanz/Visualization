import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrbitProgress } from 'react-loading-indicators';
import { useSearchParams } from 'react-router-dom';
import SelectParameter from '../../../components/elements/muiltiSelect/SelectMeasurements';
import SelectModels from '../../../components/elements/muiltiSelect/SelectModels';
import PlotlyChart from '../../../components/plotly/DefaultChart';
import { convertToPlotlyChartFormat, PlotlyChartDataFormat, weekdayAnnotations, PlotlyChartBasicFormat } from '../../../components/plotly/PlotlyChartFormat';
import { extractCurrentWeatherForecastHourly, fetchCurrentForecast, weatherDataOptions } from '../../../components/requests/currentForecacstBackend';
import { layoutConfig, useColor } from '../../../components/style';
import { toUtcPlotlyIsoString } from '../../../components/time';
import DataSource from '../../impressum/DataSource';
import { convertCodesAndIsDaysToAscii } from '../../../components/requests/mapWeatherCodes';


type Preset = {
    name: string,
    models: string[],
    measurements: string[]
};

const defaultPresets: Preset[] = [
    { name: 'Standard', models: ['icon_d2'], measurements: ['apparent_temperature'] },
    { name: 'MultiModel Temp', models: ['icon_d2', 'gfs_global'], measurements: ['apparent_temperature', 'temperature_2m'] },
    { name: 'Full Wind View', models: ['icon_d2'], measurements: ['wind_direction_10m', 'wind_gusts_10m', 'apparent_temperature'] },
    { name: 'Weather Overview', models: ['icon_d2', 'gfs_global'], measurements: ['weather_code', 'temperature_2m', 'precipitation'] }
];

const LOCAL_STORAGE_KEY = 'customPresets';


export default function AdvancedMode() {
    const { i18n, t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [weatherModel, setWeatherModel] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '["icon_d2"]'))
    const [measurements, setMeasurement] = useState(JSON.parse(searchParams.get('measurements') ?? '["apparent_temperature"]'))

    const [temperatureForecast, setTemperatureForecast] = useState<{ [key: string]: PlotlyChartDataFormat[]; } | null>(null);
    const [weatherIconsData, setWeatherIconsData] = useState<PlotlyChartDataFormat[] | null>(null);
    const [weekdays, setWeekdays] = useState<any | null>(null);
    const [isDay, setIsDay] = useState<{ x: string[], y: number[] }>({ x: [], y: [] });
    const [isLoading, setIsLoading] = useState(true);

    const [customPresets, setCustomPresets] = useState<Preset[]>([]);

    useEffect(() => {
        const savedPresets = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedPresets) {
            try {
                setCustomPresets(JSON.parse(savedPresets));
            } catch { }
        }
    }, []);

    function saveCurrentAsPreset() {
        const name = prompt('Preset name:');
        if (!name) return;

        const newPreset: Preset = {
            name,
            models: weatherModel,
            measurements
        };

        const updatedPresets = [...customPresets, newPreset];
        setCustomPresets(updatedPresets);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPresets));
    }

    useEffect(() => {
        setIsLoading(true);
        fetchForecastsWeatherModels().finally(() => setIsLoading(false));
        setSearchParams({ models: JSON.stringify(weatherModel), measurements: JSON.stringify(measurements), userMode: '2' });
    }, [weatherModel, measurements]);

    async function fetchForecastsWeatherModels() {
        if (weatherModel.length === 0 || measurements.length === 0) {
            setTemperatureForecast(null);
            setWeatherIconsData(null);
            return;
        }

        let newData: { [key: string]: PlotlyChartDataFormat[] } = {};
        let weatherIconTraces: PlotlyChartDataFormat[] = [];
        let is_day_data: any = null;

        const forecasts = await Promise.all(weatherModel.map(model => fetchCurrentForecast(model)));
        
        // 1. Find the forecast array with the most entries (longest period)
        let leadForecast = forecasts[0];
        let leadForecastModelName = weatherModel[0];
        let maxTimeSteps = leadForecast.length;
        let leadIndex = 0

        forecasts.forEach((currentForecast, index) => {
            if (currentForecast.length > maxTimeSteps) {
                maxTimeSteps = currentForecast.length;
                leadForecast = currentForecast;
                leadForecastModelName = weatherModel[index];
                leadIndex = index
            }
        });

        forecasts[leadIndex] = forecasts[0]
        forecasts[0] = leadForecast

        weatherModel[leadIndex] = weatherModel[0]
        weatherModel[0] = leadForecastModelName

        // 2. Use the "lead" forecast (the longest array) to set up the time-based annotations
        if (leadForecast) {
            is_day_data = extractCurrentWeatherForecastHourly(leadForecast, 'is_day', 'is_day');
            setIsDay({ x: is_day_data.x.map((time: any) => toUtcPlotlyIsoString(time)), y: is_day_data.y });

            const timeData = extractCurrentWeatherForecastHourly(leadForecast, measurements[0], leadForecastModelName);
            setWeekdays(weekdayAnnotations(timeData.x, true, i18n.language));
        }

        let y_icon_level = 0;
        forecasts.forEach((currentModelForecast, index) => {
            const model = weatherModel[index];
            const otherMeasurements = measurements.filter((m: any) => m !== 'weather_code');

            for (const measurement of otherMeasurements) {
                const data = extractCurrentWeatherForecastHourly(currentModelForecast, measurement, model);
                if (!newData[measurement]) {
                    newData[measurement] = [];
                }
                newData[measurement].push(convertToPlotlyChartFormat(data, 'scatter'));
            }

            if (measurements.includes('weather_code') && is_day_data) {
                const weatherCodeData = extractCurrentWeatherForecastHourly(currentModelForecast, 'weather_code', model);
                const iconData = convertCodesAndIsDaysToAscii(weatherCodeData, is_day_data, y_icon_level);
                const iconTrace = convertToPlotlyChartFormat(iconData, 'weatherIcon');
                iconTrace.name = model;
                weatherIconTraces.push(iconTrace);
                y_icon_level++;
            }
        });

        setTemperatureForecast(newData);
        setWeatherIconsData(weatherIconTraces.length > 0 ? weatherIconTraces : null);
    }

    return (
        <Flex direction='column' width={{ lg: layoutConfig.pageWidth, base: 'calc(100vw - 20px)' }} gap={layoutConfig.gap} height={'calc(100vh - 100px)'} overflow='hidden' overflowY={'scroll'}>

            <Flex gap={layoutConfig.gap}>
                <SelectModels selectModels={weatherModel} setSelectModels={setWeatherModel}></SelectModels>
                <SelectParameter select={measurements} setSelect={setMeasurement} measurements={weatherDataOptions}></SelectParameter>
                <Button onClick={saveCurrentAsPreset} background={useColor('primary')} _hover={{ background: useColor('background') }}> + Save</Button>
            </Flex>

            <Flex gap="10px" wrap="wrap" alignItems="center">
                {[...defaultPresets, ...customPresets].map((preset, idx) => (
                    <Button key={idx}
                        onClick={() => {
                            setWeatherModel(preset.models);
                            setMeasurement(preset.measurements);
                        }}
                    >{preset.name}</Button>
                ))}
            </Flex>

            <Flex gap="10px" direction='column'>
                {isLoading ? <OrbitProgress size="medium" /> :
                    <>
                        {weatherIconsData && weatherIconsData.length > 0 && (
                            <PlotlyChart
                                key="weather_code_chart"
                                data={weatherIconsData}
                                title={weatherDataOptions.find(opt => opt.value === 'weather_code')?.label || 'Weather Icons'}
                                xAxis={t('data.time')}
                                customLayout={{
                                    annotations: weekdays,
                                    yaxis: {
                                        title: { text: t('Weather Model') },
                                        range: [-1, weatherIconsData.length],
                                        tickvals: weatherIconsData.map((_, i) => i),
                                        ticktext: weatherIconsData.map(trace => trace.name),
                                        zeroline: false,
                                        showgrid: true,
                                    },
                                    margin: { l: 100, r: 40, t: 60, b: 0 }, // Adjust margins
                                    showlegend: true
                                }}
                                isDay={isDay}
                            />
                        )}

                        {temperatureForecast && Object.keys(temperatureForecast).map(key => (
                            <PlotlyChart
                                key={key}
                                data={temperatureForecast[key]}
                                title={weatherDataOptions.find(opt => opt.value === key)?.label}
                                yAxis={weatherDataOptions.find(opt => opt.value === key)?.label}
                                xAxis={t('data.time')}
                                customLayout={{ annotations: weekdays, showlegend: true }}
                                isDay={isDay}
                            />
                        ))}
                    </>
                }
            </Flex>
        </Flex>
    )
}