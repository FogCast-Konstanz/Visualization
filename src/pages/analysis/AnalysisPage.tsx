import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";
import LineGraph from "../.././components/plotly/LineGraph";
import BarGraph from "../../components/plotly/BarGraph";
import Leaderboard from './Leaderboard';

export default function AnalysisPage() {

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'}>

      <Heading>Analysis Page</Heading>

      <Leaderboard></Leaderboard>

    </Flex>
  )
}
