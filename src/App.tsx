import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { phenomenaType } from './i18n/dePhenomena';
import AnalysisPage from './pages/analysis/AnalysisPage';
import DataPage from './pages/data/DataPage';
import Impressum from './pages/impressum/Impressum';
import CookieBanner from './pages/impressum/cookieBanner';
import Lexikon from './pages/lexikon/LexikonPage';
import ModelsPage from './pages/models/ModelsPage';
import PhenomenaSite from './pages/phenomena/PhenomenaDetails';
import Phenomena from './pages/phenomena/PhenomenaPage';
import StartingPage from './pages/startingPage/StartingPage';
import WeatherStationPage from './pages/station/WeatherStationPage';

function App() {
  // const color = 'custom_light'
  const { i18n, t } = useTranslation()

  // const phenomenaData = (i18n.language == 'en' ? phenomenaEn : phenomena)

  const phenomenaData: phenomenaType[] = t('phenomena', { returnObjects: true, ns: 'phenomena' }) as phenomenaType[]

  useEffect(() => { }, [i18n])

  useEffect(() => { }, [])

  return (
    <Flex
      bg={useColorModeValue('custom_light.surface', 'custom_dark.surface')}
      minHeight='100vh'
      width='100%'
      margin='0'
      direction={{ base: 'column', lg: 'row' }}
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
          {phenomenaData.map((entry, index) => (
            <Route path={'/phenomena/' + entry.id} element={<PhenomenaSite {...entry} />} key={index + 'page'} />
          ))}
        </Routes>
      </Router>
      <CookieBanner></CookieBanner>
    </Flex>
  )
}

export default App
