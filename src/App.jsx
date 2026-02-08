import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Series from './pages/Series';
import Film from './pages/Film';
import DaftarSaya from './pages/DaftarSaya';
import DetailMovie from './pages/DetailMovie'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/film" element={<Film />} />
        <Route path="/daftar-saya" element={<DaftarSaya />} />
        
        <Route path="/movie/:id" element={<DetailMovie />} /> 
      </Routes>
    </Router>
  );
};

export default App;