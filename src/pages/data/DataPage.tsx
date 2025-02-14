import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";
import LineGraph from "../.././components/plotly/LineGraph";
import BarGraph from "../../components/plotly/BarGraph";

export default function DataPage() {
  const dataValues = [
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17, 10, 23],
      name: 'Model 1'
    },
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [11, 14, 12, 16, 11, 14, 12, 16, 11, 14, 12, 16, 11, 24],
      name: 'Model 2'
    },
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [12, 13, 11, 15, 12, 13, 11, 15, 12, 13, 11, 15, 12, 25],
      name: 'Model 3'
    },
    {
      x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025"],
      y: [13, 12, 10, 14, 13, 12, 10, 14, 13, 12, 10, 14, 13, 26],
      name: 'Real'
    },
  ];

  return (
    <Flex direction='column' width='100%' gap='10px' margin={'10px'}>

      <Flex gap='10px'>
        <LineGraph values={dataValues} title={'Modelle VS Real'} />
        <BarGraph values={dataValues} title={'Bar Graph'} />
      </Flex>

    </Flex>
  )
}
