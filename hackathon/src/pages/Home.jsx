import React from 'react';
import { Header } from '../components/Header';

export function Home() {
    return (
        <div>
            <Header />
            <p>
                <a href="/face-detection">Presença</a>
            </p>
            <p>
                <a href="/user">User</a>
            </p>
        </div>
    )
}

export default Home; // Exportação padrão do componente FaceDetection
