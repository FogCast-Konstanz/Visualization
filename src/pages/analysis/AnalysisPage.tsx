import { Flex } from '@chakra-ui/react';
import Introduction from '../../components/elements/Introduction';
import UnderConstruction from '../../components/elements/UnderConstruction';
import { layoutConfig } from '../../components/style';
import DataSource from '../impressum/DataSource';
import Leaderboard from './Leaderboard';
import { useTranslation } from 'react-i18next';

export default function AnalysisPage() {
    const { t } = useTranslation()

    const shortTerm = [
        { id: 1, name: "dmi_seamless", score: 1200 },
        { id: 2, name: "icon_seamless", score: 1100 },
        { id: 3, name: "bom_access_global", score: 1000 },
    ]

    const midTerm = [
        { id: 1, name: "dmi_seamless", score: 1200 },
        { id: 2, name: "icon_seamless", score: 1100 },
        { id: 3, name: "bom_access_global", score: 1000 },
    ]

    const longTerm = [
        { id: 1, name: "dmi_seamless", score: 1200 },
        { id: 2, name: "icon_seamless", score: 1100 },
        { id: 3, name: "bom_access_global", score: 1000 },
    ]


    return (
        <Flex direction='column' width='100%' gap={layoutConfig.gap} margin={layoutConfig.margin}>
            <Introduction header="Analysis Page" text='t.b.d'></Introduction>

            <UnderConstruction></UnderConstruction>

            <Leaderboard entries={shortTerm} name='shortTerm'></Leaderboard>
            <Leaderboard entries={midTerm} name='midTerm'></Leaderboard>
            <Leaderboard entries={longTerm} name='longTerm'></Leaderboard>

            <DataSource openMeteoText={t('sources.forecast')} dwdText={t('sources.currentWeather')}></DataSource>
        </Flex>
    )
}
