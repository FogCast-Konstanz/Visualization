import { Button, Card, CardBody, CardHeader, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrbitProgress } from 'react-loading-indicators';
import ReactMarkdown from 'react-markdown';
import { useSearchParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import PlotlyChart from '../../components/plotly/DefaultChart';
import { convertToPlotlyChartFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../components/plotly/PlotlyChartFormat';
import { fetchArchiveWeather } from '../../components/requests/actualBackend';
import { extractCurrentWeatherForecastHourly, weatherDataOptions } from '../../components/requests/currentForecacstBackend';
import { extractHistoricForecastHourly, fetchForecast } from '../../components/requests/forcastBackend';
import { layoutConfig, useColor } from '../../components/style';
import { toUtcIsoString, toUtcPlotlyIsoString } from '../../components/time';
import DataSource from '../impressum/DataSource';
import ConfigurationForRequest from './ConfigurationForRequest';

type ModelPreset = {
    name: string,
    models: string[],
    measurements: string[]
};

const DEFAULT_PRESETS: ModelPreset[] = [
    {
        name: 'Temp ICON D2',
        models: ['icon_d2'],
        measurements: ['apparent_temperature', 'temperature_2m']
    },
    {
        name: 'Wind Overview',
        models: ['icon_d2'],
        measurements: ['wind_speed_10m', 'wind_gusts_10m', 'wind_direction_10m'],
    }
];

const STORAGE_KEY = 'modelPagePresets';

export default function ModelsPage() {
    const { i18n, t } = useTranslation()

    const [searchParams, setSearchParams] = useSearchParams();

    const [forecastData, setForecastData] = useState<{ [key: string]: PlotlyChartDataFormat[]; } | null>(null)
    const [isDay, setIsDay] = useState<{ x: string[], y: number[] }>({ x: [], y: [] });

    const [selectedModels, setSelectedModels] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '["icon_d2"]'))
    const [selectedMeasurement, setSelectedMeasurement] = useState<string[]>(JSON.parse(searchParams.get('measurements') ?? '["apparent_temperature"]'))
    const [selectedDatetime, setSelectedDatetime] = useState<string>((searchParams.get('time') ?? toUtcIsoString(new Date())).slice(0, 16))

    const [weekdays, setWeekdays] = useState<any | null>(null)

    const loadingColor = useColor('primary');

    const [customPresets, setCustomPresets] = useState<ModelPreset[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setCustomPresets(JSON.parse(stored));
            } catch { }
        }
    }, []);


    function saveCurrentPreset() {
        const name = prompt('Preset name:');
        if (!name) return;

        const newPreset: ModelPreset = {
            name,
            models: selectedModels,
            measurements: selectedMeasurement
        };

        const updated = [...customPresets, newPreset];
        setCustomPresets(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    useEffect(() => { setModels() }, [selectedModels])
    useEffect(() => { setModels() }, [selectedDatetime])
    useEffect(() => { setModels() }, [selectedMeasurement])

    async function setModels() {
        setSearchParams({ models: JSON.stringify(selectedModels), time: selectedDatetime, measurements: JSON.stringify(selectedMeasurement) });
        let newData: { [key: string]: PlotlyChartDataFormat[] } = {};
        let is_day = null;

        if (selectedModels.length > 0 && selectedDatetime != '') {
            setForecastData(null);

            for (const model of selectedModels) {
                const nextModelForecast = await fetchHistoricForecastModel(model)

                console.log(selectedMeasurement)
                for (const measurement of selectedMeasurement) {
                    const data = extractHistoricForecastHourly(nextModelForecast, measurement, model);

                    if (!newData[measurement]) {
                        newData[measurement] = [];
                    }

                    if (!is_day) {
                        is_day = extractCurrentWeatherForecastHourly(nextModelForecast, 'is_day', t('data.isDay'))
                        setIsDay({ x: is_day.x.map(time => (toUtcPlotlyIsoString(time))), y: is_day.y })
                    }

                    newData[measurement].push(convertToPlotlyChartFormat(data, 'linear'));
                    console.log('DataMiau', newData)
                }

            }
            const [_, randomElement] = Object.entries(newData)[0] || [];
            console.log('RandomElement', randomElement)
            setWeekdays(weekdayAnnotations(randomElement[0].x, false, i18n.language))

            // Request actual value
            const actualValues = await fetchActualWeather('icon_d2')

            if (actualValues) {
                for (const measurement of selectedMeasurement) {
                    const actualData: PlotlyChartDataFormat = {
                        x: [randomElement[0].x[0], randomElement[0].x[randomElement[0].x.length - 1]],
                        y: [actualValues[measurement], actualValues[measurement]],
                        type: 'scatter',
                        mode: 'lines',
                        name: 'Actual',
                        line: { color: 'red', width: 2 }
                    }

                    newData[measurement].push(actualData);
                    console.log('DataMiau', newData)
                }
            }

            console.log('Actual', actualValues)
        }
        setForecastData(newData)


    }

    async function fetchHistoricForecastModel(model: string): Promise<any[]> {
        const time = new Date(selectedDatetime);
        time.setMinutes(0, 0, 0); // Round to last full hour
        const timeIsoString = toUtcIsoString(time).split('.')[0] + "Z"

        const forcastResponse = await fetchForecast(timeIsoString, model);
        console.log(forcastResponse)
        return forcastResponse
    };


    async function fetchActualWeather(model: string) {
        const date = new Date(selectedDatetime);
        const weatherAtTime = await fetchArchiveWeather(date, model);

        const format = (date: Date) => {
            const rounded = new Date(date)
            rounded.setMinutes(0, 0, 0)
            return toUtcIsoString(rounded).slice(0, 16)
        }

        const match = weatherAtTime.find((item: any) => {
            console.log(format(date), format(new Date(item.date)))
            return format(new Date(item.date)) == format(date)
        });

        return match
    }

    return (
        <Flex direction='column' gap={layoutConfig.gap} margin={layoutConfig.margin} width={{ lg: '100%' }} maxHeight={'calc(100dvh - 20px)'} overflowY={'auto'}>
            <Card
                bg={useColor('background')}
                color={useColor('text')}
                width={'100%'}>
                <CardHeader pb={'0px'}>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Heading>{t('models.title')}</Heading>
                        <ConfigurationForRequest
                            selectedDateTime={selectedDatetime}
                            selectedModels={selectedModels}
                            selectedMeasurements={selectedMeasurement}
                            onDateTimeChange={setSelectedDatetime}
                            onModelChange={setSelectedModels}
                            onMeasurementChange={setSelectedMeasurement}>
                        </ConfigurationForRequest>
                    </Flex>
                </CardHeader>
                <CardBody className='markdown'>
                    <ReactMarkdown children={t('models.introduction')} remarkPlugins={[remarkGfm]} />
                </CardBody>
            </Card>

            <Flex gap="10px" wrap="wrap" alignItems="center">
                {[...DEFAULT_PRESETS, ...customPresets].map((preset, idx) => (
                    <Button
                        key={idx}
                        onClick={() => {
                            const now = new Date();
                            now.setMinutes(0, 0, 0);
                            const nowUtc = toUtcIsoString(now).slice(0, 16);

                            setSelectedModels(preset.models);
                            setSelectedMeasurement(preset.measurements);
                            setSelectedDatetime(nowUtc);
                        }} > {preset.name} </Button>
                ))}
                <Button onClick={saveCurrentPreset}> + Save </Button>
            </Flex>

            <Flex gap="10px" direction='column'>
                {forecastData ?
                    Object.keys(forecastData).map(key => (
                        <PlotlyChart
                            key={key}
                            data={forecastData[key]}
                            title={weatherDataOptions.find(opt => opt.value === key)?.label}
                            yAxis={weatherDataOptions.find(opt => opt.value === key)?.label}
                            xAxis={t('data.time')}
                            // showNow={true}
                            dateFormat={'day'}
                            isDay={isDay}
                            customLayout={{ annotations: weekdays }}
                        />
                    )) :
                    <OrbitProgress size="medium" color={loadingColor} />
                }
            </Flex>
            <DataSource></DataSource>
        </Flex>
    )
}
