import React from 'react';
import styles from './InputProf.module.css';

export function InputProf({ tarefas, setTarefas }) {

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const tarefa = formData.get('tarefa');
        setTarefas([...tarefas, tarefa]);
        form.reset();
    }

    return (
        <div className={styles.wrapper}>
            <h2>Adicionar tarefas</h2>
            <form onSubmit={handleSubmit}>
                <label className={styles.tarefaLabel}>
                    Tarefa:
                </label>
                <input type="text" name="tarefa" />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    )
}