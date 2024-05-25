import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FaceDetection from './pages/FaceDetection'; // Importe o componente FaceDetection aqui
import { VisaoUser } from './pages/VisaoUser';
import { VisaoAdm } from './pages/VisaoAdm';

function App() {


  const [tarefas, setTarefas] = useState(["Responder avaliação institucional",
    "Responder avaliação do professor",
    "Responder avaliação do curso",
    "Trabalho Jeremias",
    "Fazer atividade"]);

  console.log(tarefas);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/face-detection" element={<FaceDetection />} /> {/* Adicione a rota para o FaceDetectionComponent */}
        <Route path="/user" element={<VisaoUser tarefas={tarefas} />} />
        <Route path="/adm" element={<VisaoAdm tarefas={tarefas} setTarefas={setTarefas} />} />
        <Route path="*" element={<div>404</div>} />

      </Routes>
    </Router>
  );
}

export default App;
