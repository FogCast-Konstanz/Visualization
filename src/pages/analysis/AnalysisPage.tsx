import { Flex, Heading } from '@chakra-ui/react';
import DataSource from '../../components/DataSource';
import Leaderboard from './Leaderboard';
import Introduction from '../../components/introduction';

export default function AnalysisPage() {

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
    <Flex direction='column' width='100%' gap='10px' margin={'10px'}>
      <Introduction header="Analysis Page" text='t.b.d'></Introduction>

      <Leaderboard entries={shortTerm} name='shortTerm'></Leaderboard>
      <Leaderboard entries={midTerm} name='midTerm'></Leaderboard>
      <Leaderboard entries={longTerm} name='longTerm'></Leaderboard>

      <DataSource></DataSource>
    </Flex>
  )
}
