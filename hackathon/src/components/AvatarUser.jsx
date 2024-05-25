import React from 'react';
import styles from './AvatarUser.module.css';
import { ProgressBar } from './ProgressBar';
import { useState } from 'react';

export function AvatarUser({ tarefas }) {
    const [progress, setProgress] = useState(0);

    const updateProgress = (newProgress) => {
        setProgress(newProgress);
    };

    return (
        <div className={styles.wrapperUser}>
            <img className={styles.avatar}
                src="https://github.com/aojoaojo.png"
                alt="Avatar do usuário"
            />

            <ProgressBar tarefas={tarefas} updateProgress={updateProgress} />

            
        </div>
    );

}