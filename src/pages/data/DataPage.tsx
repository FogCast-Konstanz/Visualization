import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import DataSource from '../../components/DataSource';
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat } from '../../components/plotly/PlotlyChartFormat';
import { convertToPlotlyGraph, fetchFogDaysHistoryDWD, fetchTemperatureHistoryDWD, fetchWaterLevelHistory } from '../../components/requests/actualBackend';
import { formatActualDatetime } from '../../components/requests/helpers';
import PlotlyChart from '../../components/ui/plotly/DefaultChart';

export default function DataPage() {
  const [temperatureHistory, setTemperatureHistory] = useState<PlotlyChartBasicFormat[]>([])
  const [temperatureLastWeek, setTemperatureLastWeek] = useState<PlotlyChartBasicFormat[]>([])
  const [fogHistory, setFogHistory] = useState<PlotlyChartBasicFormat[]>([])
  const [fogLastYear, setFogLastYear] = useState<PlotlyChartBasicFormat[]>([])
  const [waterLevel, setWaterLevel] = useState<PlotlyChartDataFormat[] | null>(null)

  useEffect(() => {
    requestBackend()
  }, [])

  const loadingColor = useColorModeValue('#4C8C8C', '#AFDBF5')
  const graphcolors = useColorModeValue(["#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"], ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"],);

  async function requestBackend() {
    /* Get date of last week */
    const dateLastWeek = new Date();
    dateLastWeek.setDate(dateLastWeek.getDate() - 7)

    const tempLastWeek = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "hourly")
    const tempLastWeekDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "daily")
    setTemperatureLastWeek(
      [convertToPlotlyChartFormat(convertToPlotlyGraph(tempLastWeek, 'Hourly Temp'), 'scatter', null, graphcolors[0]), 
        convertToPlotlyChartFormat(convertToPlotlyGraph(tempLastWeekDaily, 'Daily Temp'), "scatter", null, graphcolors[1])
    ])

    /* Get date of last year */
    const dateLastYear = new Date();
    dateLastYear.setFullYear(dateLastYear.getFullYear() - 1); // Subtract 1 year

    const tempLastYearDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastYear), formatActualDatetime(), "daily")
    setTemperatureHistory([convertToPlotlyChartFormat(convertToPlotlyGraph(tempLastYearDaily, 'Daily Temp'), 'scatter', null, graphcolors[0])])

    /* Get Fog of last year */
    // const fogLastYear = await fetchFogDaysHistoryDWD(formatActualDatetime(dateLastYear), formatActualDatetime(dateLastWeek), "monthly")
    // setFogLastYear([convertToPlotlyGraph(fogLastYear)])

    /* Get Fog in alltime history */
    const fogHist = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "monthly")
    setFogHistory([convertToPlotlyChartFormat(convertToPlotlyGraph(fogHist), 'bar', null, graphcolors[0])])

    const fogHistyearly = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "yearly")
    setFogLastYear([convertToPlotlyChartFormat(convertToPlotlyGraph(fogHistyearly), 'bar', null, graphcolors[0])])

    /* Get Water Level History */
    const waterLevel = await fetchWaterLevelHistory()
    setWaterLevel([(convertToPlotlyChartFormat(convertToPlotlyGraph(waterLevel), 'bar', null, graphcolors[0]))])
  }

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'} maxHeight={'calc(100vh - 20px)'} overflow='hidden' overflowY='auto' >

      {waterLevel ?
        <Flex gap='10px' maxWidth='90%' wrap='wrap'>
          <PlotlyChart data={temperatureHistory} title={'Temperature of last year**'} yAxis='Temperature °C' xAxis='Time' />
          <PlotlyChart data={temperatureLastWeek} title={'Temperature in the last week**'} yAxis='Temperature °C' xAxis='Time' />
          <PlotlyChart data={fogHistory} title={'Historical Fog (days per month)**'} yAxis='Fog days per month' xAxis='Time' />
          <PlotlyChart data={fogLastYear} title={'Historical Fog (days per year)**'} yAxis='Fog days per year' xAxis='Time' />
          <PlotlyChart data={waterLevel} title='WaterLevel' yAxis='WaterLevel cm' xAxis='Time' />
        </Flex> : <OrbitProgress color={loadingColor} size="medium" />}

      <DataSource></DataSource>
    </Flex>
  )
}
