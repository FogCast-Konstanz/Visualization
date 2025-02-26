import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import LineGraph from "../.././components/plotly/LineGraph";
import DataSource from '../../components/DataSource';
import { PlotlyChartDataFormat } from '../../components/plotly/DataFormat';
import { convertToPlotlyGraph, fetchFogDaysHistoryDWD, fetchTemperatureHistoryDWD } from '../../components/requests/actualBackend';
import { formatActualDatetime } from '../../components/requests/helpers';

export default function DataPage() {
  const [temperatureHistory, setTemperatureHistory] = useState<PlotlyChartDataFormat[]>([])
  const [temperatureLastWeek, setTemperatureLastWeek] = useState<PlotlyChartDataFormat[]>([])
  const [fogHistory, setFogHistory] = useState<PlotlyChartDataFormat[]>([])
  const [fogLastYear, setFogLastYear] = useState<PlotlyChartDataFormat[]>([])

  useEffect(() => {
    requestBackend()
  }, [])


  async function requestBackend() {
    /* Get date of last week */
    const dateLastWeek = new Date();
    dateLastWeek.setDate(dateLastWeek.getDate() - 7)

    const tempLastWeek = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "hourly")
    const tempLastWeekDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "daily")
    setTemperatureLastWeek([convertToPlotlyGraph(tempLastWeek, 'Hourly Temp'), convertToPlotlyGraph(tempLastWeekDaily, 'Daily Temp')])

    /* Get date of last year */
    const dateLastYear = new Date();
    dateLastYear.setFullYear(dateLastYear.getFullYear() - 1); // Subtract 1 year

    const tempLastYearDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastYear), formatActualDatetime(), "daily")
    setTemperatureHistory([convertToPlotlyGraph(tempLastYearDaily, 'Daily Temp')])

    /* Get Fog of last year */
    // const fogLastYear = await fetchFogDaysHistoryDWD(formatActualDatetime(dateLastYear), formatActualDatetime(dateLastWeek), "monthly")
    // setFogLastYear([convertToPlotlyGraph(fogLastYear)])

    /* Get Fog in alltime history */
    const fogHist = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "monthly")
    setFogHistory([convertToPlotlyGraph(fogHist)])
    
    const fogHistyearly = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "yearly")
    setFogLastYear([convertToPlotlyGraph(fogHistyearly)])
  }

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'} maxHeight={'calc(100vh - 20px)'} overflow='hidden' overflowY='auto' >

      <Flex gap='10px' maxWidth='90%' wrap='wrap'>
        <LineGraph values={temperatureHistory} showNow={false} title={'Temperature of last year**'} xAxis='Time' yAxis='Temperature °C' />
        <LineGraph values={temperatureLastWeek} showNow={false} title={'Temperature in the last week**'} xAxis='Time' yAxis='Temperature °C' />
        <LineGraph values={fogHistory} showNow={false} title={'Historical Fog (days per month)**'} type='bar' xAxis='Time' yAxis='Fog days per month' />
        <LineGraph values={fogLastYear} showNow={false} title={'Historical Fog (days per year)**'} type='bar' xAxis='Time' yAxis='Fog days per year' />
      </Flex>

      <DataSource></DataSource>
    </Flex>
  )
}
