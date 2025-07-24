import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OrbitProgress } from 'react-loading-indicators'
import PlotlyChart from '../../../components/plotly/DefaultChart'
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, weekdayAnnotations } from '../../../components/plotly/PlotlyChartFormat'
import { fetchTemperatureHistoryDWD, highlightingAndAverage, parseActualRequestToPlotlyXYFormat, parseActualRequestToPlotlyXYFormatYearWise } from '../../../components/requests/actualBackend'
import { layoutConfig, useColor, useGraphColors } from '../../../components/style'

export default function TemperatureTab({ isActive }: { isActive: boolean }) {

  const [dataLoaded, setDataLoaded] = useState(false);

  const [temperatureHistory, setTemperatureHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [temperatureLastWeek, setTemperatureLastWeek] = useState<PlotlyChartBasicFormat[] | null>(null)
  const [weekdaysTemp, setWeekdaysTemp] = useState<any | null>(null)

  const graphcolors = useGraphColors();
  const loadingColor = useColor('primary');
  const { i18n, t } = useTranslation()

  useEffect(() => {
    if (isActive && !dataLoaded) {
      fetchData()
      setTimeout(() => window.dispatchEvent(new Event('resize')), 500)
    }
  }, [isActive])

  // Rerender page (put plotly graph to full size)
  useEffect(() => {
    if (isActive && dataLoaded) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100)
    }
  }, [dataLoaded])

  async function fetchData() {

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
    const dateLastFewYear = new Date();
    dateLastFewYear.setFullYear(dateLastFewYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
    dateLastFewYear.setHours(0, 0, 0, 0); // Reset time to midnight
    dateLastFewYear.setFullYear(dateLastFewYear.getFullYear() - 50);

    const tempHistoryDaily = await fetchTemperatureHistoryDWD(dateLastFewYear, new Date(), "daily")
    setTemperatureHistory(highlightingAndAverage(parseActualRequestToPlotlyXYFormatYearWise(tempHistoryDaily, ''), ['2025', '2023', '1984'], graphcolors))

    setDataLoaded(true);
  }

  return (
    <Flex gap={layoutConfig.gap} wrap='wrap' pr={0}>
      <Flex gap={layoutConfig.gap} wrap='wrap' pr={0}>
        {temperatureHistory ? <PlotlyChart data={temperatureHistory} title={t('dataPage.tempYears')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='monthOnly' customLayout={{ showlegend: true }} /> : <OrbitProgress color={loadingColor} size="medium" />}
        {temperatureLastWeek ? <PlotlyChart data={temperatureLastWeek} title={t('dataPage.tempLastWeek')} yAxis={t('data.temperature')} xAxis={t('data.time')} dateFormat='day' customLayout={{ annotations: weekdaysTemp }} /> : <OrbitProgress color={loadingColor} size="medium" />}
      </Flex>
    </Flex>
  );
}