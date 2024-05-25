import React, { useState } from 'react';
import './ProgressBar.module.css'; // Importe seu arquivo CSS com o estilo da barra de progresso
import styles from './ProgressBar.module.css';
import { Checkbox } from './Checkbox';

export function ProgressBar({ tarefas, updateProgress }) {
    const [progress, setProgress] = useState(0);

    const handleButtonClick = (checked) => {
        const newProgress = progress + 10; // Avançar 50% a cada clique
        const newProgressLoss = progress - 10; // Avançar 50% a cada clique
        console.log(checked);
        if (!checked && newProgress <= 100) {
            setProgress(newProgress);
            updateProgress(newProgress); // Atualizar o progresso no componente pai
        }
        else if (checked && newProgress >= 0) {
            setProgress(newProgressLoss);
            updateProgress(newProgressLoss); // Atualizar o progresso no componente pai
        }
        if (newProgress >= 100) {
            setProgress(0);
            updateProgress(0);
        }
    };

    return (
        <div>
            <div className={styles['progress-loader']}>
                <div className={styles.progress} style={{ width: `${progress}%` }}></div>
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
