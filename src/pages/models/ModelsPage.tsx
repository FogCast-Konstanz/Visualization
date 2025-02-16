import { PlotlyChartDataFormat } from '@/components/plotly/DataFormat';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LineGraph from "../.././components/plotly/LineGraph";
import { extractTemperatureAndModelOutOfForcast, fetchForecast } from '../../components/requests/forcastBackend';
import ConfigurationForRequest from './ConfigurationForRequest';

export default function ModelsPage() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [forecastData, setForecastData] = useState<PlotlyChartDataFormat[]>([])

  const [selectedModels, setSelectedModels] = useState<string[]>(JSON.parse(searchParams.get('models') ?? '[]') ?? [])
  // const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [selectedDatetime, setSelectedDatetime] = useState<string>(searchParams.get('time') ?? '')


  useEffect(() => { setModels() }, [selectedModels])
  useEffect(() => { setModels() }, [selectedDatetime])

  async function setModels() {
    console.log(selectedModels)
    setSearchParams({ models: JSON.stringify(selectedModels), time: selectedDatetime });

    let copyModel: any = []
    if (selectedModels.length > 0 && selectedDatetime != '') {
      setForecastData([]);
      for (const model of selectedModels) {
        const newValue = await fetchData(model)
        copyModel = [...copyModel, newValue]
      }
    }

    setTimeout(() => setForecastData(copyModel), 0)
  }

  async function fetchData(model: string) {
    const time = new Date(selectedDatetime);
    time.setMinutes(0, 0, 0); // Round to last full hour
    const timeIsoString = time.toISOString().split('.')[0] + "Z"

    const forcastResponse = await fetchForecast(timeIsoString, model);

    return extractTemperatureAndModelOutOfForcast(forcastResponse)
  };

  return (
    <Flex direction='column' gap='10px' margin={'10px'} width={{lg: '100%'}}>
      <Flex alignItems='center' justifyContent='space-between'>
        <Heading>Forcasting</Heading>
        <ConfigurationForRequest selectedDateTime={selectedDatetime} selectedModels={selectedModels} onDateTimeChange={setSelectedDatetime} onModelChange={setSelectedModels}></ConfigurationForRequest>
      </Flex>

      <Flex gap='10px' flexDirection={{ lg: "row", base: 'column' }}>
        {forecastData.length > 0 ? <LineGraph values={forecastData} title={'Modelle für ' + selectedDatetime} /> : <Text>Select Values</Text>}
      </Flex>
    </Flex>
  )
}
