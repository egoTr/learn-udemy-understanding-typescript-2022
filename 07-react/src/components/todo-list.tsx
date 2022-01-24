import { ITodoItem } from "../types/todo";
import TodoItem from './todo-item';

type Props = {
    todos: ITodoItem[],
    removeBehavior: (id: number) => void;
}

const TodoList = (props: Props) => {
    if (props.todos.length === 0)
    return <>Nothing to do.</>;

    return <>
        {props.todos.map(todo =>
            <TodoItem key={todo.id} todo={todo} removeBehavior={props.removeBehavior}  />
        )}
    </>
}

export default TodoList;