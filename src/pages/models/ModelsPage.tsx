import { Card, CardBody, CardHeader, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import DataSource from '../../components/DataSource';
import { convertMultipleToPlotlyChartFormat, PlotlyChartBasicFormat } from '../../components/plotly/PlotlyChartFormat';
import { extractHumidityAndModelOutOfForecast, extractTemperatureAndModelOutOfForcast, fetchForecast } from '../../components/requests/forcastBackend';
import ConfigurationForRequest from './ConfigurationForRequest';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PlotlyChart from '../../components/ui/plotly/DefaultChart';

export default function ModelsPage() {
  const { t, i18n } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams();

  const [forecastData, setForecastData] = useState<PlotlyChartBasicFormat[]>([])
  const [forecastTemperatureData, setForecastTemperatureData] = useState<PlotlyChartBasicFormat[]>([])
  const [forecastHumidityData, setForecastHumidityData] = useState<PlotlyChartBasicFormat[]>([])

  const [selectedModels, setSelectedModels] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '["icon_d2"]'))
  const [selectedDatetime, setSelectedDatetime] = useState<string>(searchParams.get('time') ?? (new Date()).toISOString().split('.')[0] + "Z")

  useEffect(() => { setModels() }, [selectedModels])
  useEffect(() => { setModels() }, [selectedDatetime])

  async function setModels() {
    console.log(selectedModels)
    setSearchParams({ models: JSON.stringify(selectedModels), time: selectedDatetime });

    let copyTemp: any = []
    let copyHumidity: any = []
    if (selectedModels.length > 0 && selectedDatetime != '') {
      setForecastData([]);
      for (const model of selectedModels) {
        const newValues = await fetchData(model)
        copyTemp = [...copyTemp, newValues[0]]
        copyHumidity = [...copyHumidity, newValues[1]]
      }
    }

    setTimeout(() => setForecastTemperatureData(convertMultipleToPlotlyChartFormat(copyTemp, 'scatter')), 0)
    setTimeout(() => setForecastHumidityData(convertMultipleToPlotlyChartFormat(copyHumidity, 'scatter')), 0)
  }

  async function fetchData(model: string) {
    const time = new Date(selectedDatetime);
    time.setMinutes(0, 0, 0); // Round to last full hour
    const timeIsoString = time.toISOString().split('.')[0] + "Z"

    const forcastResponse = await fetchForecast(timeIsoString, model);

    return [extractTemperatureAndModelOutOfForcast(forcastResponse), extractHumidityAndModelOutOfForecast(forcastResponse)]
  };

  return (
    <Flex direction='column' gap='10px' margin={'10px'} width={{ lg: '100%' }} maxHeight={'calc(100dvh - 20px)'} overflowY={'auto'}>
      <Card
        bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
        color={useColorModeValue('custom_light.text', 'custom_dark.text')}
        width={'100%'}>
        <CardHeader pb={'0px'}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Heading>{t('models.title')}</Heading>
            <ConfigurationForRequest selectedDateTime={selectedDatetime} selectedModels={selectedModels} onDateTimeChange={setSelectedDatetime} onModelChange={setSelectedModels}></ConfigurationForRequest>
          </Flex>
        </CardHeader>
        <CardBody>
          <ReactMarkdown children={t('models.introduction')} remarkPlugins={[remarkGfm]} />
        </CardBody>
      </Card>

      <Flex direction={'column'} gap='10px' flexDirection={{ lg: "column", base: 'column' }} height={'100vh'}>
        {forecastTemperatureData.length > 0 ?
          <PlotlyChart data={forecastTemperatureData} title={t('models.forecastTemp', { date: selectedDatetime })} yAxis={t('data.temperature')} xAxis={t('data.time')} /> :
          <Text>{t('models.selectValues')}</Text>
        }
        {forecastHumidityData.length > 0 ?
          <PlotlyChart data={forecastHumidityData} title={t('models.forecastHumidity', { date: selectedDatetime })} yAxis={t('data.humidity')} xAxis={t('data.time')} /> :
          <Text>{t('models.selectValues')}</Text>
        }
      </Flex>

      <DataSource></DataSource>
    </Flex>
  )
}
