import { NewTodo_T } from "@/components/NewTodo";

//send a post fetch request to the API with the provided json body and return the response as a json object
export async function addNewTodoWithResponse(body: NewTodo_T) {
  const response = await fetch("/api/todo/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status !== 404) {
    return await response.json();
  } else;
  {
    return { error: "Something went wrong" };
  }
}

//send a get fetch request to the api and return the response as a json object
export async function getTodosWithResponse() {
  const response = await fetch("/api/todos");
  if (response.status !== 404) {
    return await response.json();
  } else;
  {
    return { error: "Something went wrong" };
  }
}

export async function deleteTodoWithResponse(id: string) {
  const response = await fetch("/api/todo/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 404) {
    return await response.json();
  } else;
  {
    return { error: "Something went wrong" };
  }
}

export async function updateTodoWithResponse(id: string, body: NewTodo_T) {
  const response = await fetch("/api/todo/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status !== 404) {
    return await response.json();
  } else;
  {
    return { error: "Something went wrong" };
  }
}

export async function setCompleted(completed: boolean, id: string) {
  const response = await fetch("/api/todo/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  if (response.status !== 404) {
    return await response.json();
  } else;
  {
    return { error: "Something went wrong" };
  }
}
