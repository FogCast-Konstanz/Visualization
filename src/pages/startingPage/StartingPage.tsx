import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Heading } from '@chakra-ui/react'

export default function StartingPage() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Heading size='3xl'>Starting Page</Heading>

    </>
  )
}
