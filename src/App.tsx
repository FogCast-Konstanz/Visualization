import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import AnalysisPage from './pages/analysis/AnalysisPage';
import DataPage from './pages/data/DataPage';
import Impressum from './pages/impressum/Impressum';
import CookieBanner from './pages/impressum/cookieBanner';
import Lexikon from './pages/lexikon/LexikonPage';
import ModelsPage from './pages/models/ModelsPage';
import PhenomenaSite from './pages/phenomena/PhenomenaDetails';
import Phenomena from './pages/phenomena/PhenomenaPage';
import { phenomena } from './pages/phenomena/data';
import StartingPage from './pages/startingPage/StartingPage';
import WeatherStationPage from './pages/station/WeatherStationPage';

function App() {
  // const color = 'custom_light'

  return (
    <Flex
      bg={useColorModeValue('custom_light.surface', 'custom_dark.surface')} 
      minHeight='100vh'
      width='100%'
      margin='0'
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
          <Route path='/analysis' element={<AnalysisPage />} />
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
