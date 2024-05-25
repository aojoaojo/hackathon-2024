import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FaceDetection from './pages/FaceDetection'; // Importe o componente FaceDetection aqui

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/face-detection" element={<FaceDetection />} /> {/* Adicione a rota para o FaceDetectionComponent */}
      </Routes>
    </Router>
  );
}

export default App;
