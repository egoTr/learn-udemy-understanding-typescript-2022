import styles from './todo-item.module.css';
import { ITodoItem } from '../types/todo';

type Props = {
    todo: ITodoItem,
    removeBehavior: (id: number) => void;
}

function TodoItem({ todo, removeBehavior }: Props) {
    function removeHandler() {
        removeBehavior(todo.id)
    }

    return <div className={styles.item_container}>
        <p>{todo.text}</p>
        <button onClick={removeHandler}>❌</button>
    </div>
}

export default TodoItem;