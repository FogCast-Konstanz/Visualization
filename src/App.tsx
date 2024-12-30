import './App.scss'

import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/startingPage/StartingPage';
import { Box } from '@chakra-ui/react';
import Lexikon from './pages/lexikon/Lexikon';
import Phenomena from './pages/phenomena/Phenomena';

function App() {
  return (
    <Box bg={'custom.surface'} className='main'>
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
