import React from 'react';
import './App.css';
import {Teams, Home} from './pages'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/teams" element={<Teams />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
