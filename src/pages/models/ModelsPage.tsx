import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";
import LineGraph from "../.././components/plotly/LineGraph";
import BarGraph from "../../components/plotly/BarGraph";
import { extractTemperatureAndModelOutOfForcast, fetchForecast } from '../../components/requests/forcastBackend';
import { PlotlyChartDataFormat } from '@/components/plotly/DataFormat';
import { OrbitProgress } from 'react-loading-indicators';
import ConfigurationForRequest from './ConfigurationForRequest';

export default function ModelsPage() {

  const [forecastData, setForecastData] = useState<PlotlyChartDataFormat[]>([])

  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [selectedDatetime, setSelectedDatetime] = useState<string>('')

  // useEffect(() => {
  //   fetchData()
  // }, [])

  useEffect(() => {
    console.log(selectedModels)

    if (selectedModels.length > 0 && selectedDatetime != '') {
      selectedModels.forEach((model) => {
        fetchData(model, selectedDatetime)
        console.log(forecastData)
      })
      setForecastData(prevData => prevData.filter(item => selectedModels.includes(item.name)));
    }
  }, [selectedModels, selectedDatetime])

  async function fetchData(model: string, datetime: string) {
    console.log(model, datetime)
    const forcastResponse = await fetchForecast('2025-01-10T10:00:00Z', model);
    setForecastData([...forecastData, extractTemperatureAndModelOutOfForcast(forcastResponse)])
  };

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'}>

      <Heading>Forcasting</Heading>
      <ConfigurationForRequest selectedDateTime={selectedDatetime} selectedModels={selectedModels} onDateTimeChange={setSelectedDatetime} onModelChange={setSelectedModels}></ConfigurationForRequest>

      {
      }
      <Flex gap='10px' flexDirection={{ lg: "row", base: 'column' }}>
        {forecastData.length > 0 ? <LineGraph values={forecastData} title={'Modelle VS Real'} /> : <OrbitProgress color={useColorModeValue('custom_light.primary', 'custom_dark.primary')} size="medium" />}
        {forecastData.length > 0 ? <BarGraph values={forecastData} title={'Modelle VS Real'} /> : <OrbitProgress color={useColorModeValue('custom_light.primary', 'custom_dark.primary')} size="medium" />}
      </Flex>

    </Flex>
  )
}
