import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OrbitProgress } from 'react-loading-indicators'
import PlotlyChart from '../../../components/plotly/DefaultChart'
import { convertToPlotlyChartFormat, PlotlyChartDataFormat } from '../../../components/plotly/PlotlyChartFormat'
import { fetchWaterLevelHistory, highlightingAndAverage, parseActualRequestToPlotlyXYFormat, parseActualRequestToPlotlyXYFormatYearWise } from '../../../components/requests/actualBackend'
import { layoutConfig, useColor, useGraphColors } from '../../../components/style'

export default function WaterLevelTab({ isActive }: { isActive: boolean }) {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [waterLevelLastYear, setWaterLevelLastYear] = useState<PlotlyChartDataFormat[] | null>(null)
    const [waterLevelHistory, setWaterLevelHistory] = useState<PlotlyChartDataFormat[] | null>(null)

    const graphcolors = useGraphColors();
    const loadingColor = useColor('primary');
    const { t } = useTranslation()

    useEffect(() => {
        if (isActive && !dataLoaded) {
            fetchData()
        }
    }, [isActive])

    async function fetchData() {
        setDataLoaded(true);
        /* Get date of last year */
        const dateLastYear = new Date();
        dateLastYear.setFullYear(dateLastYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
        dateLastYear.setHours(0, 0, 0, 0); // Reset time to midnight
        dateLastYear.setFullYear(dateLastYear.getFullYear()); // Subtract 1 year

        /* Get Water Level History */
        const waterLevel = await fetchWaterLevelHistory(dateLastYear, new Date(), 'd')
        const waterLevelData = parseActualRequestToPlotlyXYFormat(waterLevel)
        setWaterLevelLastYear([(convertToPlotlyChartFormat(waterLevelData, 'line', null, graphcolors[0]))])

        /* Get date of last year */
        // const dateLastFewYear = new Date();
        // dateLastFewYear.setFullYear(dateLastFewYear.getFullYear() - 1, 0, 1); // Set to Jan 1st
        // dateLastFewYear.setHours(0, 0, 0, 0); // Reset time to midnight
        // dateLastFewYear.setFullYear(dateLastYear.getFullYear() - 50);        

        const waterLevelHistory = await fetchWaterLevelHistory(new Date("2017-01-01 00:00:00"), new Date(), 'd')
        // const waterLevelDataHistory = parseActualRequestToPlotlyXYFormat(waterLevelHistory)
        setWaterLevelHistory(highlightingAndAverage(parseActualRequestToPlotlyXYFormatYearWise(waterLevelHistory, ''), ['2025', '2023', '2000'], graphcolors))
    }

    return (
        <Flex gap={layoutConfig.gap} wrap='wrap' pr={0}>
            {waterLevelHistory ? <PlotlyChart data={waterLevelHistory} title={t('dataPage.waterLevelYears')} yAxis={t('data.waterLevel')} xAxis={t('data.time')} dateFormat='monthOnly' /> : <OrbitProgress color={loadingColor} size='medium' />}
            {waterLevelLastYear ? <PlotlyChart data={waterLevelLastYear} title={t('dataPage.waterLevelLastYear')} yAxis={t('data.waterLevel')} xAxis={t('data.time')} dateFormat='day' /> : <OrbitProgress color={loadingColor} size='medium' />}
        </Flex>
    );
}