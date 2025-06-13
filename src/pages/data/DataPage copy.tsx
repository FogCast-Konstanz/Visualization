import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrbitProgress } from 'react-loading-indicators';
import Introduction from '../../components/elements/Introduction';
import PlotlyChart from '../../components/plotly/DefaultChart';
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../components/plotly/PlotlyChartFormat';
import { fetchFogDaysHistoryDWD, fetchTemperatureHistoryDWD, fetchWaterLevelHistory, highlightingAndAverage, parseActualRequestToPlotlyXYFormat, parseActualRequestToPlotlyXYFormatYearWise } from '../../components/requests/actualBackend';
import { layoutConfig, useColor, useGraphColors } from '../../components/style';
import DataSource from '../impressum/DataSource';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const tabKeys = ['temperature', 'fog', 'waterLevel'];

export default function DataPage() {
  const [temperatureLastYear, setTemperatureLastYear] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [temperatureHistory, setTemperatureHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [temperatureLastWeek, setTemperatureLastWeek] = useState<PlotlyChartBasicFormat[] | null>(null)

  const [fogHistory, setFogHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [fogLastYear, setFogLastYear] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [waterLevelLastYear, setWaterLevelLastYear] = useState<PlotlyChartDataFormat[] | null>(null)
  const [waterLevelHistory, setWaterLevelHistory] = useState<PlotlyChartDataFormat[] | null>(null)

  const [weekdaysTemp, setWeekdaysTemp] = useState<any | null>(null)

  useEffect(() => {
    requestBackend()
  }, [])

  // Handle Navigation
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'temperature';
  const tabIndex = tabKeys.indexOf(tab);

  const handleTabChange = (index: number) => {
    setSearchParams({ tab: tabKeys[index] });
  };

  const { i18n, t } = useTranslation()


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

    const tempLastWeek = await fetchTemperatureHistoryDWD(dateLastWeek, new Date(), "hourly")
    const tempLastWeekDaily = await fetchTemperatureHistoryDWD(dateLastWeek, new Date(), "daily")

    const dailyTemp = parseActualRequestToPlotlyXYFormat(tempLastWeek, 'Hourly Temp')
    setTemperatureLastWeek(
      [
        convertToPlotlyChartFormat(dailyTemp, 'scatter', null, graphcolors[0]),
        convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(tempLastWeekDaily, 'Daily Temp'), "scatter", null, graphcolors[1])
      ])
    setWeekdaysTemp(weekdayAnnotations(dailyTemp.x, false, i18n.language))

    /* Get date of last year */
    const dateLastYear = new Date();
    dateLastYear.setFullYear(dateLastYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
    dateLastYear.setHours(0, 0, 0, 0); // Reset time to midnight
    dateLastYear.setFullYear(dateLastYear.getFullYear()); // Subtract 1 year

    const tempLastYearDaily = await fetchTemperatureHistoryDWD(dateLastYear, new Date(), "daily")
    setTemperatureLastYear([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(tempLastYearDaily, 'Daily Temp'), 'scatter', null, graphcolors[0])])

    /* Get date of last year */
    const dateLastFewYear = new Date();
    dateLastFewYear.setFullYear(dateLastFewYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
    dateLastFewYear.setHours(0, 0, 0, 0); // Reset time to midnight
    dateLastFewYear.setFullYear(dateLastYear.getFullYear() - 50);

    const tempHistoryDaily = await fetchTemperatureHistoryDWD(dateLastFewYear, new Date(), "daily")
    setTemperatureHistory(highlightingAndAverage(parseActualRequestToPlotlyXYFormatYearWise(tempHistoryDaily, ''), ['2025', '2023', '1984'], graphcolors))


    /* Get Fog of last year */
    // const fogLastYear = await fetchFogDaysHistoryDWD(dateLastYear, dateLastWeek, "monthly")
    // setFogLastYear([convertToPlotlyGraph(fogLastYear)])

    /* Get Fog in alltime history */

    const fogHist = await fetchFogDaysHistoryDWD(new Date("1990-01-01 00:00:00"), new Date("2025-01-01 00:00:00"), "monthly")
    setFogHistory([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHist), 'bar', null, graphcolors[0])])

    const fogHistyearly = await fetchFogDaysHistoryDWD(new Date("1990-01-01 00:00:00"), new Date("2025-01-01 00:00:00"), "yearly")
    setFogLastYear([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHistyearly), 'bar', null, graphcolors[0])])

    /* Get Water Level History */
    const waterLevel = await fetchWaterLevelHistory(dateLastYear, new Date())
    const waterLevelData = parseActualRequestToPlotlyXYFormat(waterLevel)
    setWaterLevelLastYear([(convertToPlotlyChartFormat(waterLevelData, 'line', null, graphcolors[0]))])

    const waterLevelHistory = await fetchWaterLevelHistory(new Date("2017-01-01 00:00:00"), new Date())

    // const waterLevelDataHistory = parseActualRequestToPlotlyXYFormat(waterLevelHistory)
    setWaterLevelHistory(highlightingAndAverage(parseActualRequestToPlotlyXYFormatYearWise(waterLevelHistory, ''), ['2025', '2023', '2000'], graphcolors))

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
      <Tabs variant="soft-rounded" colorScheme="teal" index={tabIndex} onChange={handleTabChange}>
        <TabList>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('dataPage.tempTab')}</Tab>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('dataPage.fogTab')}</Tab>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('dataPage.waterLevelTab')}</Tab>
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
            <Flex gap={layoutConfig.gap} wrap='wrap' pr={0}>
              {waterLevelLastYear ? <PlotlyChart data={waterLevelLastYear} title={t('dataPage.waterLevelLastYear')} yAxis={t('data.waterLevel')} xAxis={t('data.time')} dateFormat='day' /> : <OrbitProgress color={loadingColor} size='medium' />}
              {waterLevelHistory ? <PlotlyChart data={waterLevelHistory} title={t('dataPage.waterLevelLastYear')} yAxis={t('data.waterLevel')} xAxis={t('data.time')} dateFormat='day' /> : <OrbitProgress color={loadingColor} size='medium' />}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <DataSource></DataSource>
    </Flex>
  )
}
