import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OrbitProgress } from 'react-loading-indicators'
import { useSearchParams } from 'react-router-dom'
import SelectParameter from '../../../components/elements/muiltiSelect/SelectMeasurements'
import SelectModels from '../../../components/elements/muiltiSelect/SelectModels'
import PlotlyChart from '../../../components/plotly/DefaultChart'
import { convertToPlotlyChartFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../../components/plotly/PlotlyChartFormat'
import { extractCurrentWeatherForecastHourly, fetchCurrentForecast, weatherDataOptions } from '../../../components/requests/currentForecacstBackend'
import { layoutConfig } from '../../../components/style'
import { toUtcPlotlyIsoString } from '../../../components/time'
import DataSource from '../../impressum/DataSource'


export default function AdvancedMode() {
    const { i18n, t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [weatherModel, setWeatherModel] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '["icon_d2"]'))
    const [measurements, setMeasurement] = useState(JSON.parse(searchParams.get('measurements') ?? '["apparent_temperature"]'))

    const [temperatureForecast, setTemperatureForecast] = useState<{ [key: string]: PlotlyChartDataFormat[]; } | null>(null)
    const [weekdays, setWeekdays] = useState<any | null>(null)
    const [isDay, setIsDay] = useState<{ x: string[], y: number[] }>({ x: [], y: [] });

    useEffect(() => {

    }, [])

    useEffect(() => {
        fetchForecastsWeatherModels();

        const paramUserMode = searchParams.get('userMode');
        setSearchParams({ models: JSON.stringify(weatherModel), measurements: JSON.stringify(measurements), userMode: '2' });
    }, [weatherModel, measurements]);

    async function fetchForecastsWeatherModels() {

        let newData: { [key: string]: PlotlyChartDataFormat[] } = {};
        let is_day = null;

        if (weatherModel.length > 0) {
            for (const model of weatherModel) {
                const currentModelForecast = await fetchCurrentForecast(model);

                for (const measurement of measurements) {
                    const data = extractCurrentWeatherForecastHourly(currentModelForecast, measurement, model);

                    if (!newData[measurement]) {
                        newData[measurement] = [];
                    }

                    if (!is_day) {
                        is_day = extractCurrentWeatherForecastHourly(currentModelForecast, 'is_day', t('data.isDay'))
                        setIsDay({ x: is_day.x.map(time => (toUtcPlotlyIsoString(time))), y: is_day.y })
                    }

                    newData[measurement].push(convertToPlotlyChartFormat(data, 'scatter'));
                }
            }

            const [_, randomElement] = Object.entries(newData)[0] || [];
            console.log(randomElement)
            setWeekdays(weekdayAnnotations(randomElement[0].x, true, i18n.language))
        }
        setTemperatureForecast(newData)

    }

    return (
        <Flex direction='column' width={{ lg: layoutConfig.pageWidth, base: 'calc(100vw - 20px)' }} gap={layoutConfig.gap} height={'calc(100vh - 100px)'} overflow='hidden' overflowY={'scroll'}>
            <Flex gap={layoutConfig.gap}>
                <SelectModels selectModels={weatherModel} setSelectModels={setWeatherModel}></SelectModels>
                <SelectParameter select={measurements} setSelect={setMeasurement} measurements={weatherDataOptions}></SelectParameter>
            </Flex>

            <Flex gap="10px" direction='column'>
                {temperatureForecast ?
                    Object.keys(temperatureForecast).map(key => (
                        <PlotlyChart
                            key={key}
                            data={temperatureForecast[key]}
                            title={weatherDataOptions.find(opt => opt.value === key)?.label}
                            yAxis={weatherDataOptions.find(opt => opt.value === key)?.label}
                            xAxis={t('data.time')}
                            // showNow={true}
                            dateFormat={'day'}
                            customLayout={{ annotations: weekdays }}
                            isDay={isDay}
                        />
                    )) :
                    <OrbitProgress size="medium" />
                }
            </Flex>

            <DataSource></DataSource>
        </Flex>
    )
}
