// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Todo_T } from "@/components/Todo";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { title } from "process";
import { RequestError_T, RequestSuccess_T } from "../todos";
import { v4 as uuidv4 } from "uuid";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo_T | RequestError_T | RequestSuccess_T>
) {
  switch (req.method) {
    case "POST":
      if (req.query.id === "new") {
        addNewTodo(req, res);
      } else {
        res
          .status(500)
          .json({ error: "You can only add todos with this endpoint" });
      }
      break;
    case "PATCH":
      CompleteTodo(req, res);
      break;
    case "DELETE":
      deleteTodo(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}

async function addNewTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo_T | RequestError_T>
) {
  try {
    let newTodo = { title: req.body.newTodo, completed: false, id: uuidv4() };
    const firebaseRes = await addDoc(collection(db, "todo"), newTodo);
    newTodo.id = firebaseRes.id;
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function CompleteTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo_T | RequestError_T>
) {
  try {
    const todoRef = doc(db, "todo", req.query.id as string);
    await updateDoc(todoRef, {
      completed: req.body.completed,
    });
    const firebaseRes = await getDoc(todoRef);
    res.status(200).json(firebaseRes.data() as Todo_T);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function deleteTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo_T | RequestError_T | RequestSuccess_T>
) {
  try {
    const todoRef = doc(db, "todo", req.query.id as string);
    await deleteDoc(todoRef);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
