import React from 'react';
import { Header } from '../components/Header';

export function Home() {
    return (
        <div>
            <Header />
            <a href="/face-detection">Presença</a>
        </div>
    )
}

export default Home; // Exportação padrão do componente FaceDetection
