import React from "react";

type Props = {
    submitBehavior: (todoText: string) => void;
}

const TodoForm = ({submitBehavior}: Props) => {
    const refTodoText = React.useRef<HTMLInputElement>(null);

    function submitHandler(event: React.FormEvent) {
        event.preventDefault();

        // Add todo to the list
        const enteredText = refTodoText.current!.value;
        submitBehavior(enteredText);

        // Reset the inputs
        refTodoText.current!.value = '';
    }

    return <form onSubmit={submitHandler}>
        <input ref={refTodoText} type="text" id="todo-text" required autoFocus/>
        <button type="submit">Submit</button>
    </form>
}

export default TodoForm;