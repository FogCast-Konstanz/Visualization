import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { fetchFogDaysHistoryDWD, parseActualRequestToPlotlyXYFormat } from '../../../components/requests/actualBackend'
import { useColor, useGraphColors } from '../../../components/style'
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat } from '../../../components/plotly/PlotlyChartFormat'
import { OrbitProgress } from 'react-loading-indicators'
import PlotlyChart from '../../../components/plotly/DefaultChart'
import { useTranslation } from 'react-i18next'


export default function FogTab({ isActive }: { isActive: boolean }) {
    
    const [dataLoaded, setDataLoaded] = useState(false);

    const [fogHistory, setFogHistory] = useState<PlotlyChartBasicFormat[] | null>(null)
    const [fogLastYear, setFogLastYear] = useState<PlotlyChartBasicFormat[] | null>(null)


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
        const fogHist = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "monthly")
        setFogHistory([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHist), 'bar', null, graphcolors[0])])

        const fogHistyearly = await fetchFogDaysHistoryDWD("1990-01-01 00:00:00", "2025-01-01 00:00:00", "yearly")
        setFogLastYear([convertToPlotlyChartFormat(parseActualRequestToPlotlyXYFormat(fogHistyearly), 'bar', null, graphcolors[0])])
    }

    return (
        <Flex gap={12} wrap='wrap'>
            {fogHistory ? <PlotlyChart data={fogHistory} title={t('dataPage.fogMonth')} yAxis={t('dataPage.fogMonth')} xAxis={t('data.time')} dateFormat='day' /> : <OrbitProgress color={loadingColor} size="medium" />}
            {fogLastYear ? <PlotlyChart data={fogLastYear} title={t('dataPage.fogYear')} yAxis={t('dataPage.fogYear')} xAxis={t('data.time')} dateFormat='year' /> : <OrbitProgress color={loadingColor} size="medium" />}
        </Flex>
    )
}