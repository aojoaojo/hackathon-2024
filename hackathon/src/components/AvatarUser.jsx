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
                src="https://media.licdn.com/dms/image/D4D03AQHgildWODztTw/profile-displayphoto-shrink_800_800/0/1688097458161?e=1721865600&v=beta&t=AAskRelIsAV270nJNbuB140b09cLLPvGXC3yjTAoA_c"
                alt="Avatar do usuário"
            />

            <ProgressBar tarefas={tarefas} updateProgress={updateProgress} />

            
        </div>
    );

}