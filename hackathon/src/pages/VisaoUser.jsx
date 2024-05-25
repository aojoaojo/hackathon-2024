import React from 'react';
import { Header } from '../components/Header';
import { AvatarUser } from '../components/AvatarUser';


export function VisaoUser() {

    const tarefas = ["Responder avaliação institucional",
        "Responder avaliação do professor",
        "Responder avaliação do curso",
        "Trabalho Jeremias",
        "Fazer atividade"]

    return (
        <div>
            <Header />
            <AvatarUser tarefas={tarefas} />
        </div>
    )
}