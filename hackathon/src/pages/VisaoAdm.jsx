import { Header } from '../components/Header';
import { InputProf } from '../components/InputProf';

export function VisaoAdm({ tarefas, setTarefas }) {
    return (
        <div>
            <Header />
            <InputProf tarefas={tarefas} setTarefas={setTarefas} />
        </div>
    )
}