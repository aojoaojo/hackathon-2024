import React from 'react';
import styles from './InputProf.module.css';

export function InputProf() {
    return (
        <div>
            <div>
                <h2>Adicionar tarefas</h2>
                <form>
                    <label>
                        Tarefa:
                        <input type="text" name="tarefa" />
                    </label>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    )
}