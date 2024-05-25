import React, { useState } from 'react';
import styles from './Checkbox.module.css';

export function Checkbox({ tarefa, updateProgress }) {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
        updateProgress(checked);
    };

    return (
        <label className={styles.container}>
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
            <div className={styles.checkmark}></div>
            <span>{tarefa}</span>
        </label>
    );
}
