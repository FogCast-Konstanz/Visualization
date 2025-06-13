import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { fetchFogDaysHistoryDWD, fetchTemperatureHistoryDWD, fetchWaterLevelHistory, formatActualDatetime, highlightingAndAverage, parseActualRequestToPlotlyXYFormat, parseActualRequestToPlotlyXYFormatYearWise } from '../../../components/requests/actualBackend'
import { layoutConfig, useColor, useGraphColors } from '../../../components/style'
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../../components/plotly/PlotlyChartFormat'
import { OrbitProgress } from 'react-loading-indicators'
import PlotlyChart from '../../../components/plotly/DefaultChart'
import { useTranslation } from 'react-i18next'

export default function TemperatureTab({ isActive }: { isActive: boolean }) {

  const [dataLoaded, setDataLoaded] = useState(false);

  const [temperatureLastYear, setTemperatureLastYear] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [temperatureHistory, setTemperatureHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [temperatureLastWeek, setTemperatureLastWeek] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [weekdaysTemp, setWeekdaysTemp] = useState<any | null>(null)

  const graphcolors = useGraphColors();
  const loadingColor = useColor('primary');
  const { i18n, t } = useTranslation()

  useEffect(() => {
    if (isActive && !dataLoaded) {
      fetchData()
    }
  }, [isActive])

  async function fetchData() {
    setDataLoaded(true);

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
    setWeekdaysTemp(weekdayAnnotations(dailyTemp.x, false, i18n.language))

    /* Get date of last year */
    const dateLastYear = new Date();
    dateLastYear.setFullYear(dateLastYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
    dateLastYear.setHours(0, 0, 0, 0); // Reset time to midnight
    dateLastYear.setFullYear(dateLastYear.getFullYear()); // Subtract 1 year

    const tempLastYearDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastYear), formatActualDatetime(), "daily")
    setTemperatureLastYear([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(tempLastYearDaily, 'Daily Temp'), 'scatter', null, graphcolors[0])])

    /* Get date of last year */
    const dateLastFewYear = new Date();
    dateLastFewYear.setFullYear(dateLastFewYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
    dateLastFewYear.setHours(0, 0, 0, 0); // Reset time to midnight
    dateLastFewYear.setFullYear(dateLastYear.getFullYear() - 50);

    const tempHistoryDaily = await fetchTemperatureHistoryDWD(formatActualDatetime(dateLastFewYear), formatActualDatetime(), "daily")
    setTemperatureHistory(highlightingAndAverage(parseActualRequestToPlotlyXYFormatYearWise(tempHistoryDaily, ''), ['2025', '2023', '1984'], graphcolors))
  }

  return (
    <Flex gap={layoutConfig.gap} wrap='wrap' pr={0}>
      {temperatureHistory && temperatureLastWeek && temperatureLastYear ? (
        <Flex gap={layoutConfig.gap} wrap='wrap' pr={0}>
          <PlotlyChart data={temperatureHistory} title={t('dataPage.tempYears')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='month' customLayout={{ showlegend: false }} />
          <PlotlyChart data={temperatureLastWeek} title={t('dataPage.tempLastWeek')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='day' customLayout={{ annotations: weekdaysTemp }} />
          <PlotlyChart data={temperatureLastYear} title={t('dataPage.tempLastYear')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='month' />
        </Flex>
      ) : <OrbitProgress color={loadingColor} size="medium" />}
    </Flex>
  );
}