import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/startingPage/StartingPage';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Lexikon from './pages/lexikon/Lexikon';
import Phenomena from './pages/phenomena/Phenomena';
import PhenomenaSite from './pages/phenomena/PhenomenaDetails';
import { phenomena } from './pages/phenomena/data';
import Impressum from './pages/impressum/impressum';

function App() {
  // const color = 'custom_light'

  return (
    <Flex
      bg={useColorModeValue('custom_light.surface', 'custom_dark.surface')} 
      minHeight='100vh'
      width='100%'
      margin='0'
      gap={'10px'}
      direction={{base: 'column', lg: 'row'}}
    >
      <Router>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path='/lexikon' element={<Lexikon />} />
          <Route path='/phenomena' element={<Phenomena />} />
          <Route path='/impressum' element={<Impressum />} />
          {phenomena.map((entry, index) => (
              <Route path={'/phenomena/'+entry.id} element={<PhenomenaSite {...entry} />} key={index} />
          ))}
        </Routes>
      </Router>
    </Flex>
  )
}

export default App
