import { Card, CardBody, CardHeader, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import DataSource from '../../components/DataSource';
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../components/plotly/PlotlyChartFormat';
import { convertToPlotlyGraph, fetchFogDaysHistoryDWD, fetchTemperatureHistoryDWD, fetchWaterLevelHistory } from '../../components/requests/actualBackend';
import { formatActualDatetime } from '../../components/requests/helpers';
import PlotlyChart from '../../components/ui/plotly/DefaultChart';
import ConfigurationForRequest from '../models/ConfigurationForRequest';
import { useTranslation } from 'react-i18next';

export default function DataPage() {
  const [temperatureHistory, setTemperatureHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [temperatureLastWeek, setTemperatureLastWeek] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [fogHistory, setFogHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [fogLastYear, setFogLastYear] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [waterLevel, setWaterLevel] = useState<PlotlyChartDataFormat[] | null>(null)

  const [weekdaysTemp, setWeekdaysTemp] = useState<any | null>(null)


  useEffect(() => {
    requestBackend()
  }, [])

  const { t } = useTranslation()

  const loadingColor = useColorModeValue('#4C8C8C', '#AFDBF5')
  const graphcolors = useColorModeValue(["#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"], ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"],);

  const bgColor = useColorModeValue('custom_light.background', 'custom_dark.background');
  const textColor = useColorModeValue('custom_light.text', 'custom_dark.text');
  const tabBg = useColorModeValue('custom_light.background', 'custom_dark.background'); 
  const tabSelectedBg = useColorModeValue('custom_light.primary_variant', 'custom_dark.primary_variant'); 

  async function requestBackend() {
    /* Get date of last week */
    const dateLastWeek = new Date();
    dateLastWeek.setDate(dateLastWeek.getDate() - 7)

    const tempLastWeek = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "hourly")
    const tempLastWeekDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "daily")

    const dailyTemp = convertToPlotlyGraph(tempLastWeek, 'Hourly Temp')
    setTemperatureLastWeek(
      [
        convertToPlotlyChartFormat(dailyTemp, 'scatter', null, graphcolors[0], 'year'),
        convertToPlotlyChartFormat(convertToPlotlyGraph(tempLastWeekDaily, 'Daily Temp'), "scatter", null, graphcolors[1], 'year')
      ])
      setWeekdaysTemp(weekdayAnnotations(dailyTemp.x, false))

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
    const waterLevelData = convertToPlotlyGraph(waterLevel)
    setWaterLevel([(convertToPlotlyChartFormat(waterLevelData, 'bar', null, graphcolors[0]))])
    
  }

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'} maxHeight={'calc(100vh - 20px)'} overflow='hidden' overflowY='auto' >
      <Card
        bg={bgColor} color={textColor} width={'100%'}>
        <CardHeader pb={'0px'}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Heading>{t('dataPage.title')}</Heading>
          </Flex>
        </CardHeader>
        <CardBody>{t('dataPage.introduction')}</CardBody>
      </Card>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList >
            <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius="md" px={4} py={2} mr={2}>Temperature</Tab>
            <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius="md" px={4} py={2} mr={2}>Fog</Tab>
            <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius="md" px={4} py={2} mr={2}>Water Level</Tab>
          </TabList>
        <TabPanels>
          {/* Temperature Graphs */}
          {/* <TabPanel pl={0}> */}
          <TabPanel>
            {temperatureHistory && temperatureLastWeek ? (
              <Flex gap='10px' wrap='wrap' pr={0}>
                <PlotlyChart data={temperatureHistory} title={t('dataPage.tempLastYear')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='month' />
                <PlotlyChart data={temperatureLastWeek} title={t('dataPage.tempLastWeek')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='day' customLayout={{ annotations: weekdaysTemp }} />
              </Flex>
            ) : <OrbitProgress color={loadingColor} size="medium" />}
          </TabPanel>

          {/* Fog Graphs */}
          <TabPanel>
            {fogHistory && fogLastYear ? (
              <Flex gap='10px' wrap='wrap'>
                <PlotlyChart data={fogHistory} title={t('dataPage.fogMonth')} yAxis={t('dataPage.fogMonth')} xAxis={t('data.time')} dateFormat='day' />
                <PlotlyChart data={fogLastYear} title={t('dataPage.fogYear')} yAxis={t('dataPage.fogYear')} xAxis={t('data.time')} dateFormat='year' />
              </Flex>
            ) : <OrbitProgress color={loadingColor} size="medium" />}
          </TabPanel>

          {/* Water Level Graph */}
          <TabPanel>
            {waterLevel ? <PlotlyChart data={waterLevel} title={t('dataPage.waterLevelLastMonth')} yAxis={t('data.waterLevel')} xAxis={t('data.time')} dateFormat='day' /> : <OrbitProgress color={loadingColor} size='medium' />}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <DataSource></DataSource>
    </Flex>
  )
}
