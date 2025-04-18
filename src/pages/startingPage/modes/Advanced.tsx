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
import DataSource from '../../impressum/DataSource'


export default function AdvancedMode() {
    const { t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [weatherModel, setWeatherModel] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '["icon_d2"]'))
    const [measurements, setMeasurement] = useState(JSON.parse(searchParams.get('measurements') ?? '["apparent_temperature"]'))

    const [temperatureForecast, setTemperatureForecast] = useState<{ [key: string]: PlotlyChartDataFormat[]; } | null>(null)
    const [weekdays, setWeekdays] = useState<any | null>(null)

    useEffect(() => {

    }, [])

    useEffect(() => {
        fetchForecastsWeatherModels();

        setSearchParams({ models: JSON.stringify(weatherModel), measurements: JSON.stringify(measurements) });
    }, [weatherModel, measurements]);

    async function fetchForecastsWeatherModels() {
        console.log(weatherModel);


        let newData: { [key: string]: PlotlyChartDataFormat[] } = {};

        if (weatherModel.length > 0) {
            for (const model of weatherModel) {
                const currentModelForecast = await fetchCurrentForecast(model);

                for (const measurement of measurements) {
                    const data = extractCurrentWeatherForecastHourly(currentModelForecast, measurement, model);

                    if (!newData[measurement]) {
                        newData[measurement] = [];
                    }

                    newData[measurement].push(convertToPlotlyChartFormat(data, 'scatter'));
                }
            }

            const [_, randomElement] = Object.entries(newData)[0] || [];
            setWeekdays(weekdayAnnotations(randomElement[0].x))
        }

        console.log("New Data", newData)
        setTemperatureForecast(newData)
        
    }

    return (
        <Flex direction='column' width={{ lg: layoutConfig.pageWidth, base: 'calc(100vw - 20px)' }}gap={layoutConfig.gap} height={'calc(100vh - 100px)'} overflow='hidden' overflowY={'scroll'}>
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
                            title={key}
                            yAxis={key}
                            xAxis={t('data.time')}
                            showNow={true}
                            dateFormat={'day'}
                            customLayout={{ annotations: weekdays }}
                        />
                    )) :
                    <OrbitProgress size="medium" />
                }
            </Flex>

            <DataSource></DataSource>
        </Flex>
    )
}
