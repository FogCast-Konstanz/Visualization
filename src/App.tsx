import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages/startingPage/StartingPage';
import { Box } from '@chakra-ui/react';
import Lexikon from './pages/lexikon/Lexikon';

function App() {
  return (
    <Box bg={'custom.surface'} className='main'>
      <Router>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path='/lexikon' element={<Lexikon />} />
          <Route path='/phanomens' element={<StartingPage />} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
