import React from "react";
import styled from "styled-components";
import { NewTodo_T } from "./NewTodo";
import { IoMdTrash } from "react-icons/io";

//create a card component with a title and a checkbox using styled components
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  width: 600px;
  height: 70px;
  text-align: center;
`;

//create a style for the title
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//create a type for the completed todo checkbox
const Checkbox = styled.input`
  margin-right: 20px;
`;

const DeleteButton = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    color: #ff0000;
  }
`;

export type Todo_T = {
  title: string;
  completed: boolean;
  id: string;
};

type Props = {
  todo: Todo_T;
  setCompleted: (completed: boolean, id: string) => void;
  removeTodo: (id: string) => void;
};

function Todo({ todo, setCompleted, removeTodo }: Props) {
  const [completed, setCompletedState] = React.useState<boolean>(
    todo.completed
  );
  return (
    <Card>
      <Title>{todo.title}</Title>
      <Center>
        <Checkbox
          type="checkbox"
          checked={completed}
          onChange={() => {
            setCompleted(!completed, todo.id);
            setCompletedState(!completed);
          }}
        />
        <DeleteButton
          onClick={() => {
            removeTodo(todo.id);
          }}
        >
          <IoMdTrash size={24} />
        </DeleteButton>
      </Center>
    </Card>
  );
}

export default Todo;
