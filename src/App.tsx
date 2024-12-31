import './App.scss'

import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/startingPage/StartingPage';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Lexikon from './pages/lexikon/Lexikon';
import Phenomena from './pages/phenomena/Phenomena';

function App() {
  // const color = 'custom_light'

  return (
    <Box bg={useColorModeValue('custom_light.surface', 'custom_dark.surface')} className='main'>
      <Router>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path='/lexikon' element={<Lexikon />} />
          <Route path='/phenomena' element={<Phenomena />} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
