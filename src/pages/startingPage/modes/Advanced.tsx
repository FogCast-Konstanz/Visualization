import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OrbitProgress } from 'react-loading-indicators'
import CloudGraph, { CloudDataType } from '../../../components/plotly/CloudGraph'
import { convertToPlotlyChartFormat, PlotlyChartDataFormat } from '../../../components/plotly/PlotlyChartFormat'
import { default as DWDForcast } from '../../../components/requests/dwdForcast'
import SelectModels from '../../../components/SelectModels'
import PlotlyChart from '../../../components/ui/plotly/DefaultChart'
import { useSearchParams } from 'react-router-dom'
import { extractCurrentWeatherForecastHourly, fetchCurrentForecast } from '../../../components/requests/currentForecacstBackend'

export default function AdvancedMode() {
    const { t } = useTranslation();

    const [forecast, setForecast] = useState<PlotlyChartDataFormat[] | null>(null);
    const [forecastSymbols, setForecastSymbols] = useState<PlotlyChartDataFormat | null>(null);

    // const [weatherModel, setWeatherModel] = useState<string[]>([]);
    const [cloudData, setCloudData] = useState<PlotlyChartDataFormat[] | null>(null)

    const [searchParams, setSearchParams] = useSearchParams();
    const [weatherModel, setWeatherModel] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '["icon_d2"]'))

    const [temperatureForecast, setTemperatureForecast] = useState<PlotlyChartDataFormat[] | null>(null)

    useEffect(() => {
        fetchForecastsWeatherModels();

        setSearchParams({ models: JSON.stringify(weatherModel) });
    }, [weatherModel]);

    async function fetchForecastsWeatherModels() {
        console.log(weatherModel);


        let newTemperature: PlotlyChartDataFormat[] = []
        if (weatherModel.length > 0) {
            for (const model of weatherModel) {
                const currentModelForecast = await fetchCurrentForecast(model);

                const temperature = extractCurrentWeatherForecastHourly(currentModelForecast, 'apparent_temperature', model)

                newTemperature = [...newTemperature, convertToPlotlyChartFormat(temperature, 'scatter', null, null, "year")]
            }
        }

        if (newTemperature.length > 0) {
            setTimeout(() => setTemperatureForecast(newTemperature))
        }

    }

    return (
        <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' height={'calc(100vh - 100px)'} overflow='hidden' overflowY={'scroll'}>
            <SelectModels selectModels={weatherModel} setSelectModels={setWeatherModel}></SelectModels>

            <Flex gap='10px'>
                {temperatureForecast ?
                    <PlotlyChart data={temperatureForecast} title={t('data.temperature')} yAxis={t('data.temperature') + ' °C'} xAxis={t('data.time')} showNow={true} dateFormat={'day'} />
                    : <OrbitProgress size="medium" />}
            </Flex>
        </Flex>
    )
}
