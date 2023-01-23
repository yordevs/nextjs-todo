import React from "react";

type Props = {
  addTodo: (todo: NewTodo_T) => void;
};

export type NewTodo_T = {
  newTodo: string;
};

function NewTodo({ addTodo }: Props) {
  const [todo, setTodo] = React.useState<string>("");
  return (
    <div>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button
        onClick={() => {
          addTodo({ newTodo: todo });
          setTodo("");
        }}
      >
        Add
      </button>
    </div>
  );
}

export default NewTodo;
