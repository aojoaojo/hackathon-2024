import React from 'react';
import { Header } from '../components/Header';
import { AvatarUser } from '../components/AvatarUser';


export function VisaoUser({ tarefas }) {


    return (
        <div>
            <Header />
            <AvatarUser tarefas={tarefas} />
        </div>
    )
}