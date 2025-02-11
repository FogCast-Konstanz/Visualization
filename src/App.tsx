import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/startingPage/StartingPage';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Lexikon from './pages/lexikon/Lexikon';
import Phenomena from './pages/phenomena/Phenomena';
import PhenomenaSite from './pages/phenomena/PhenomenaDetails';
import { phenomena } from './pages/phenomena/data';
import Impressum from './pages/impressum/Impressum';
import DataPage from './pages/data/DataPage';
import ModelsPage from './pages/models/ModelsPage';
import WeatherStationPage from './pages/station/WeatherStationPage';
import CookieBanner from './pages/impressum/cookieBanner';

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
          <Route path='/data' element={<DataPage />} />
          <Route path='/station' element={<WeatherStationPage />} />
          <Route path='/models' element={<ModelsPage />} />
          {phenomena.map((entry, index) => (
              <Route path={'/phenomena/'+entry.id} element={<PhenomenaSite {...entry} />} key={index} />
          ))}
        </Routes>
      </Router>
      <CookieBanner></CookieBanner>
    </Flex>
  )
}

export default App
