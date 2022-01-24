import React from "react";
import { ITodoItem } from "./types/todo";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

const todosInit: ITodoItem[] = [
  // { id: 0, text: 'Add new todo', done: false },
];

function App() {
  const [todos, setTodos] = React.useState<ITodoItem[]>(todosInit);

  function removeTodo(id: number) {
    setTodos(existing => 
      existing.filter(todo => todo.id !== id)
    ); // setTodos
  }

  function addTodo(todoText: string) {
    const todo: ITodoItem = {
      id: todos.length + 1,
      text: todoText,
      done: false
    }

    setTodos(existing => [...existing, todo]);
  }

  return (
    <div className="App">
      <TodoForm submitBehavior={addTodo} />
      <TodoList todos={todos} removeBehavior={removeTodo} />
    </div>
  );
}

export default App;
