// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Todo_T } from "@/components/Todo";
import { db } from "@/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export type RequestError_T = {
  error: any;
};

export type RequestSuccess_T = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo_T[] | RequestError_T>
) {
  switch (req.method) {
    case "GET":
      getTodos(res);
      break;
    default:
      res.status(405).end();
      break;
  }
}

async function getTodos(res: NextApiResponse<Todo_T[] | RequestError_T>) {
  try {
    const firebaseRes = await getDocs(collection(db, "todo"));
    const todos = firebaseRes.docs.map((doc) => {
      const tempTodo = doc.data() as Todo_T;
      tempTodo.id = doc.id;
      return tempTodo;
    });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
