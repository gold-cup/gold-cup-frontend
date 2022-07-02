import React from 'react';
import './App.css';
import {Teams} from './pages/teams'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/teams" element={<Teams />} />
      <Route path="/" element={<h1>Gold Cup</h1>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
