import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { convertMultipleToPlotlyChartFormat, convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../components/plotly/PlotlyChartFormat';
import { ExtractedForecastData, extractHistoricForecastHourly, fetchForecast, reformatDataofForecastBackend } from '../../components/requests/forcastBackend';
import { layoutConfig, useColor } from '../../components/style';
import DataSource from '../impressum/DataSource';
import ConfigurationForRequest from './ConfigurationForRequest';


import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PlotlyChart from '../../components/plotly/DefaultChart';
import { fetchArchiveWeather, formatActualDatetime } from '../../components/requests/actualBackend';
import { OrbitProgress } from 'react-loading-indicators';
import { toUtcIsoString } from '../../components/time';
import { extractCurrentWeatherForecastHourly, weatherDataOptions } from '../../components/requests/currentForecacstBackend';

export default function ModelsPage() {
  const { i18n, t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams();

  const [forecastData, setForecastData] = useState<{ [key: string]: PlotlyChartDataFormat[]; } | null>(null)
  const [forecastTemperatureData, setForecastTemperatureData] = useState<PlotlyChartBasicFormat[]>([])
  const [forecastHumidityData, setForecastHumidityData] = useState<PlotlyChartBasicFormat[]>([])
  // const [forecastData, setForecastData] = useState<PlotlyChartBasicFormat[]>([])


  const [selectedModels, setSelectedModels] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '["icon_d2"]'))
  const [selectedDatetime, setSelectedDatetime] = useState<string>(searchParams.get('time') ?? (toUtcIsoString(new Date())).split('.')[0] + "Z")
  const [selectedMeasurement, setSelectedMeasurement] = useState<string[]>(JSON.parse(searchParams.get('measurements') ?? '["apparent_temperature"]'))

  const [weekdaysTemp, setWeekdaysTemp] = useState<any | null>(null)
  const [weekdaysHum, setWeekdaysHum] = useState<any | null>(null)

  const loadingColor = useColor('primary');

  useEffect(() => { setModels() }, [selectedModels])
  useEffect(() => { setModels() }, [selectedDatetime])
  useEffect(() => { setModels() }, [selectedMeasurement])

  async function setModels() {
    setSearchParams({ models: JSON.stringify(selectedModels), time: selectedDatetime, measurements: JSON.stringify(selectedMeasurement) });

    let copyTemp: any = []
    let copyHumidity: any = []

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

          newData[measurement].push(convertToPlotlyChartFormat(data, 'scatter'));
          console.log('DataMiau', newData)

          // Untergliederung der einzelnen Werte in das folgende Format: {measurement: [{}]}

          // console.log('DataMiau', data)

          // newData = [...newData, data[measurement]];

          // newData[measurement].push(convertToPlotlyChartFormat(data, 'scatter'));
        }
        // console.log(newValues)

        // copyTemp = [...copyTemp, {
        //   x: newValues.time,
        //   y: newValues.temperature,
        //   name: newValues.name
        // }]

        // copyHumidity = [...copyHumidity, {
        //   x: newValues.time,
        //   y: newValues.humidity,
        //   name: newValues.name
        // }]
      }
    }
    setForecastData(newData)

    const actualValues = await fetchActualWeather('icon_d2')
    // if (copyTemp.length > 0 && copyHumidity.length > 0 && !actualValues) {
    //   // setTimeout(() => setForecastTemperatureData(convertMultipleToPlotlyChartFormat(copyTemp, 'scatter')), 0)
    //   // setTimeout(() => setForecastHumidityData(convertMultipleToPlotlyChartFormat(copyHumidity, 'scatter')), 0)

    //   // setWeekdaysTemp(weekdayAnnotations(copyTemp[0].x, false, i18n.language))
    //   // setWeekdaysHum(weekdayAnnotations(copyHumidity[0].x, false, i18n.language))
    // }
  }

  async function fetchHistoricForecastModel(model: string): Promise<any[]> {
    const time = new Date(selectedDatetime);
    time.setMinutes(0, 0, 0); // Round to last full hour
    const timeIsoString = toUtcIsoString(time).split('.')[0] + "Z"

    const forcastResponse = await fetchForecast(timeIsoString, model);
    console.log(forcastResponse)
    return forcastResponse
    // return reformatDataofForecastBackend(forcastResponse)
    // return [extractTemperatureAndModelOutOfForcast(forcastResponse), extractHumidityAndModelOutOfForecast(forcastResponse)]
  };


  async function fetchActualWeather(model: string) {
    const date = new Date(selectedDatetime);
    const weatherAtTime = await fetchArchiveWeather(formatActualDatetime(date), model);

    const format = (date: Date) => toUtcIsoString(date).slice(0, 16); // "YYYY-MM-DDTHH:MM"

    const match = weatherAtTime.find(item => {
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
        <CardBody>
          <ReactMarkdown children={t('models.introduction')} remarkPlugins={[remarkGfm]} />
        </CardBody>
      </Card>

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
            />
          )) :
          <OrbitProgress size="medium" />
        }
      </Flex>
      {/* {forecastTemperatureData.length > 0 && forecastHumidityData.length > 0 ?
        <Flex direction={'column'} gap={layoutConfig.gap} flexDirection={{ lg: "column", base: 'column' }} height={'100vh'}>
          <PlotlyChart data={forecastTemperatureData} title={t('models.forecastTemp', { date: selectedDatetime })} yAxis={t('data.temperature')} xAxis={t('data.time')} customLayout={{ annotations: weekdaysTemp }} />
          <PlotlyChart data={forecastHumidityData} title={t('models.forecastHumidity', { date: selectedDatetime })} yAxis={t('data.humidity')} xAxis={t('data.time')} customLayout={{ annotations: weekdaysHum }} />
        </Flex>
        : <OrbitProgress color={loadingColor} size="medium" />
      } */}

      <DataSource></DataSource>
    </Flex>
  )
}
