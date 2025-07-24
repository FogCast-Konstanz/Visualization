import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OrbitProgress } from 'react-loading-indicators'
import PlotlyChart from '../../../components/plotly/DefaultChart'
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat } from '../../../components/plotly/PlotlyChartFormat'
import { fetchFogDaysHistoryDWD, highlightingAndAverage, parseActualRequestToPlotlyXYFormat, parseActualRequestToPlotlyXYFormatYearWise } from '../../../components/requests/actualBackend'
import { useColor, useGraphColors } from '../../../components/style'


export default function FogTab({ isActive }: { isActive: boolean }) {

    const [dataLoaded, setDataLoaded] = useState(false);

    const [fogHistory, setFogHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
    const [fogLastYear, setFogLastYear] = useState<PlotlyChartBasicFormat[] | null>(null)
    const [fogAllYears, setFogAllYears] = useState<PlotlyChartBasicFormat[] | null>(null)


    const graphcolors = useGraphColors()
    const loadingColor = useColor('primary');
    const { t } = useTranslation()

    useEffect(() => {
        if (isActive && !dataLoaded) {
            fetchData()
        }
    }, [isActive])


    async function fetchData() {
        setDataLoaded(true);

        /* Get Fog in alltime history */
        const fogHist = await fetchFogDaysHistoryDWD(new Date("1990-01-01 00:00:00"), new Date("2025-01-01 00:00:00"), "monthly")
        setFogHistory([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHist), 'bar', null, graphcolors[0])])

        const fogHistyearly = await fetchFogDaysHistoryDWD(new Date("1990-01-01 00:00:00"), new Date("2025-01-01 00:00:00"), "yearly")
        setFogLastYear([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHistyearly), 'bar', null, graphcolors[0])])

        setFogAllYears(highlightingAndAverage(parseActualRequestToPlotlyXYFormatYearWise(fogHist, ''), ['1990', '2000', '2017', '2001'], graphcolors))
    }

    return (
        <Flex gap={12} wrap='wrap'>
            {fogHistory ? <PlotlyChart data={fogHistory} title={t('dataPage.fogMonth')} yAxis={t('dataPage.fogMonth')} xAxis={t('data.time')} dateFormat='day' /> : <OrbitProgress color={loadingColor} size="medium" />}
            {fogLastYear ? <PlotlyChart data={fogLastYear} title={t('dataPage.fogYear')} yAxis={t('dataPage.fogYear')} xAxis={t('data.time')} dateFormat='year' /> : <OrbitProgress color={loadingColor} size="medium" />}
            {fogAllYears ? <PlotlyChart data={fogAllYears} title={t('dataPage.fogMonth')} yAxis={t('dataPage.fogYear')} xAxis={t('data.time')} dateFormat='monthOnly' customLayout={{ showlegend: true }} /> : <OrbitProgress color={loadingColor} size="medium" />}
        </Flex>
    )
}