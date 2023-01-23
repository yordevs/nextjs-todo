import NewTodo, { NewTodo_T } from "@/components/NewTodo";
import Todo, { Todo_T } from "@/components/Todo";
import {
  addNewTodoWithResponse,
  deleteTodoWithResponse,
  getTodosWithResponse,
  setCompleted,
} from "@/utils/APIs";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [todos, setTodos] = useState<Todo_T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodosWithResponse();
      if (data.error === undefined) {
        setTodos(data);
      } else {
        console.log(data.error);
      }
    };

    fetchData();
  }, []);

  //create a container for the todos using styled components
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  `;

  return (
    <Container>
      {todos.map((todo, i) => (
        <Todo
          key={i}
          todo={todo}
          setCompleted={async (completed, id) => {
            const res = await setCompleted(completed, id);
            if (res.error === undefined) {
              setTodos(
                todos.map((todo) =>
                  todo.id === id ? { ...todo, completed: completed } : todo
                )
              );
            }
          }}
          removeTodo={async (id) => {
            const res = await deleteTodoWithResponse(id);
            if (res.error === undefined) {
              setTodos(todos.filter((todo) => todo.id !== id));
            }
          }}
        />
      ))}
      add new todo:
      <NewTodo
        addTodo={async (todo) => {
          const res = await addNewTodoWithResponse(todo);
          console.log(res);
          if (res.error === undefined) {
            setTodos([...todos, res]);
          }
        }}
      />
    </Container>
  );
}
