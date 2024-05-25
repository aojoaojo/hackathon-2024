import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FaceDetection from './pages/FaceDetection'; // Importe o componente FaceDetection aqui
import { VisaoUser } from './pages/VisaoUser';
import { VisaoAdm } from './pages/VisaoAdm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/face-detection" element={<FaceDetection />} /> {/* Adicione a rota para o FaceDetectionComponent */}
        <Route path="/user" element={<VisaoUser />} />
        <Route path="/adm" element={<VisaoAdm />} />
        <Route path="*" element={<div>404</div>} />

      </Routes>
    </Router>
  );
}

export default App;
