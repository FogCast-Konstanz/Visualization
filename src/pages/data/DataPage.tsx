import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrbitProgress } from 'react-loading-indicators';
import Introduction from '../../components/elements/Introduction';
import PlotlyChart from '../../components/plotly/DefaultChart';
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../components/plotly/PlotlyChartFormat';
import { fetchFogDaysHistoryDWD, fetchTemperatureHistoryDWD, fetchWaterLevelHistory, formatActualDatetime, highlightingAndAverage, parseActualRequestToPlotlyXYFormat, parseActualRequestToPlotlyXYFormatYearWise } from '../../components/requests/actualBackend';
import { layoutConfig, useColor, useGraphColors } from '../../components/style';
import DataSource from '../impressum/DataSource';

export default function DataPage() {
  const [temperatureLastYear, setTemperatureLastYear] = useState<PlotlyChartBasicFormat[] | null>(null)
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

  const loadingColor = useColor('primary');
  const graphcolors = useGraphColors();

  const bgColor = useColor('background');
  const textColor = useColor('text');
  const tabBg = useColor('background');
  const tabSelectedBg = useColor('primary');

  async function requestBackend() {
    /* Get date of last week */
    const dateLastWeek = new Date();
    dateLastWeek.setDate(dateLastWeek.getDate() - 7)

    const tempLastWeek = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "hourly")
    const tempLastWeekDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastWeek), formatActualDatetime(), "daily")

    const dailyTemp = parseActualRequestToPlotlyXYFormat(tempLastWeek, 'Hourly Temp')
    setTemperatureLastWeek(
      [
        convertToPlotlyChartFormat(dailyTemp, 'scatter', null, graphcolors[0]),
        convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(tempLastWeekDaily, 'Daily Temp'), "scatter", null, graphcolors[1])
      ])
    setWeekdaysTemp(weekdayAnnotations(dailyTemp.x, false))

    /* Get date of last year */
    const dateLastYear = new Date();
    dateLastYear.setFullYear(dateLastYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
    dateLastYear.setHours(0, 0, 0, 0); // Reset time to midnight
    dateLastYear.setFullYear(dateLastYear.getFullYear()); // Subtract 1 year

    const tempLastYearDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastYear), formatActualDatetime(), "daily")
    setTemperatureLastYear([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(tempLastYearDaily, 'Daily Temp'), 'scatter', null, graphcolors[0])])

    /* Get date of last year */
    const dateLastFewYear = new Date();
    dateLastFewYear.setFullYear(dateLastYear.getFullYear() - 50);

    const tempHistoryDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastFewYear), formatActualDatetime(), "daily")
    setTemperatureHistory(highlightingAndAverage(parseActualRequestToPlotlyXYFormatYearWise(tempHistoryDaily, ''), ['2025', '2023', '1984'], graphcolors))


    /* Get Fog of last year */
    // const fogLastYear = await fetchFogDaysHistoryDWD(formatActualDatetime(dateLastYear), formatActualDatetime(dateLastWeek), "monthly")
    // setFogLastYear([convertToPlotlyGraph(fogLastYear)])

    /* Get Fog in alltime history */
    const fogHist = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "monthly")
    setFogHistory([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHist), 'bar', null, graphcolors[0])])

    const fogHistyearly = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "yearly")
    setFogLastYear([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHistyearly), 'bar', null, graphcolors[0])])

    /* Get Water Level History */
    const waterLevel = await fetchWaterLevelHistory()
    const waterLevelData = parseActualRequestToPlotlyXYFormat(waterLevel)
    setWaterLevel([(convertToPlotlyChartFormat(waterLevelData, 'bar', null, graphcolors[0]))])

  }

  return (
    <Flex direction='column' width='100%' gap={layoutConfig.gap} margin={'10px'} maxHeight={'calc(100vh - 20px)'} overflow='hidden' overflowY='auto' >
      <Introduction header={t('dataPage.title')} text={t('dataPage.introduction')}></Introduction>

      {/* <Card
        bg={bgColor} color={textColor} width={'100%'}>
        <CardHeader pb={'0px'}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Heading></Heading>
          </Flex>
        </CardHeader>
        <CardBody></CardBody>
      </Card> */}
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList >
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>Temperature</Tab>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>Fog</Tab>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>Water Level</Tab>
        </TabList>
        <TabPanels>
          {/* Temperature Graphs */}
          {/* <TabPanel pl={0}> */}
          <TabPanel>
            {temperatureHistory && temperatureLastWeek && temperatureLastYear ? (
              <Flex gap={layoutConfig.gap} wrap='wrap' pr={0}>
                <PlotlyChart data={temperatureHistory} title={t('dataPage.tempYears')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='month' customLayout={{ showlegend: false }} />
                <PlotlyChart data={temperatureLastWeek} title={t('dataPage.tempLastWeek')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='day' customLayout={{ annotations: weekdaysTemp }} />
                <PlotlyChart data={temperatureLastYear} title={t('dataPage.tempLastYear')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='month' />
              </Flex>
            ) : <OrbitProgress color={loadingColor} size="medium" />}
          </TabPanel>

          {/* Fog Graphs */}
          <TabPanel>
            {fogHistory && fogLastYear ? (
              <Flex gap={layoutConfig.gap} wrap='wrap'>
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
