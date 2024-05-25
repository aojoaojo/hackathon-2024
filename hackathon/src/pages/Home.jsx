import React from 'react';
import { Header } from '../components/Header';
import styles from './Home.module.css';

export function Home() {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <a href="/face-detection">
                    <p>
                        Presença
                    </p>
                </a>
                <a href="/user">
                    <p>
                        Aluno
                    </p>
                </a>
                <a href="/adm">
                    <p>
                        Administração
                    </p>
                </a>
            </div>
        </div>
    )
}

export default Home; // Exportação padrão do componente FaceDetection
