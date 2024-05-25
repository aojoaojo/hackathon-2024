import React, { useState } from 'react';
import './ProgressBar.module.css'; // Importe seu arquivo CSS com o estilo da barra de progresso
import styles from './ProgressBar.module.css';
import { Checkbox } from './Checkbox';

export function ProgressBar({ tarefas, updateProgress }) {
    const [progress, setProgress] = useState(0);
    const [lvl, setLvl] = useState(1);

    const handleButtonClick = (checked) => {
        let newProgress = checked ? progress - 30 : progress + 30; // Ajuste conforme o checkbox é marcado/desmarcado

        // Certifique-se de que o progresso está dentro do intervalo permitido
        if (newProgress < 0) newProgress = 0;
        if (newProgress > 100) newProgress = 0;

        setProgress(newProgress);
        updateProgress(newProgress); // Atualizar o progresso no componente pai

        // Incrementar ou decrementar o nível
        if (newProgress === 0) {
            setLvl(prevLvl => prevLvl + 1);
        }
    };

    return (
        <div>
            <div className={styles['progress-loader-container']}>
                <div className={styles['progress-loader']}>
                    <div className={styles.progress} style={{ width: `${progress}%` }}></div>
                </div>
                <span className={styles.level}>lvl {lvl}</span>
            </div>
            <h1>Tarefas</h1>
            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>
                        <Checkbox
                            tarefa={tarefa}
                            updateProgress={handleButtonClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
