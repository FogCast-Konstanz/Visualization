import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/startingPage/StartingPage';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Lexikon from './pages/lexikon/Lexikon';
import Phenomena from './pages/phenomena/Phenomena';
import PhenomenaSite from './pages/phenomena/PhenomenaDetails';

function App() {
  // const color = 'custom_light'

  const phenomena = [
    {
        header: 'Lorem ipsum dolor sit amed Lorem ipsum dolor sit amed',
        id: 'miau',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
        img: ''
    },
    { header: 'wuff', id: 'wuff', text: 'wuff', img: '' },
    { header: 'wuff', id: 'wuff2', text: 'wuff', img: '' }]

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
          {phenomena.map((entry, index) => (
              <Route path={'/phenomena/'+entry.id} element={<PhenomenaSite {...entry} />} key={index} />
          ))}
        </Routes>
      </Router>
    </Flex>
  )
}

export default App
