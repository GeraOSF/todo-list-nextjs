"use client";
import { useEffect, useState } from "react";

import Todos from "@/components/todos";
import TodoInput from "@/components/todo-input";

export default function Home() {
  const mockTodos = [
    {
      id: "981791c5-25ca-4963-b9db-cf5df91effa5",
      content: "Dinner with family",
      done: false,
    },
    {
      id: "e7b432e4-963c-4d1b-86f4-1cf3b974a0bb",
      content: "Meeting with client",
      done: true,
    },
    {
      id: "cf85d7bc-8165-4863-afb0-daa52ae3f143",
      content: "Go to the gym",
      done: true,
    },
    {
      id: "2288a450-3c02-464d-99d4-b21937fd95be",
      content: "Buy groceries",
      done: false,
    },
    {
      id: "df7451d9-91cd-4126-a238-15a4489f5e7d",
      content: "Clean the house",
      done: true,
    },
    {
      id: "e57fea02-a7b2-46c0-923a-d45dc783b03e",
      content: "Read a book",
      done: false,
    },
    {
      id: "fc9adca9-831c-4b3a-9669-85afcf898ff7",
      content: "Write a blog post",
      done: false,
    },
    {
      id: "cab17689-3293-4256-bf4f-3bb72197520e",
      content: "Go for a walk",
      done: true,
    },
    {
      id: "2a6ba5a6-87f6-4d36-83dd-f06d4c44ad28",
      content: "Take a nap",
      done: false,
    },
  ];
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) setTodos(JSON.parse(localTodos));
  }, []);

  function addTodo(content: string) {
    const newTodo = { id: crypto.randomUUID(), content, done: false };
    setTodos([newTodo, ...todos]);
    localStorage.setItem("todos", JSON.stringify([newTodo, ...todos]));
    window.scroll({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="flex flex-col items-center gap-2 p-1 text-xl lg:container">
      <Todos todos={todos} setTodos={setTodos} />
      <TodoInput addTodo={addTodo} />
    </main>
  );
}
