"use client";
import { useEffect, useState, useMemo } from "react";
import { Plus, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/todo-list";

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
  const [newTodoText, setNewTodoText] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) setTodos(JSON.parse(localTodos));
  }, []);

  function changeTodos(
    todoId: string,
    action: "add" | "toggle" | "delete" | "edit",
    content?: string,
  ) {
    let updatedTodos: Todo[];
    if (action === "add") {
      if (!content) return;
      const newTodo = { id: crypto.randomUUID(), content, done: false };
      updatedTodos = [newTodo, ...todos];
      setNewTodoText("");
    } else if (action === "toggle") {
      updatedTodos = todos.map((t) =>
        t.id === todoId ? { ...t, done: !t.done } : t,
      );
    } else if (action === "edit") {
      updatedTodos = todos.map((t) =>
        t.id === todoId && content ? { ...t, content } : t,
      );
    } else if (action === "delete") {
      updatedTodos = todos.filter((t) => t.id !== todoId);
    }

    setTodos(updatedTodos!);
    localStorage.setItem("todos", JSON.stringify(updatedTodos!));
  }

  const doneTodos = useMemo(() => todos.filter((t) => t.done), [todos]);
  const undoneTodos = useMemo(() => todos.filter((t) => !t.done), [todos]);

  return (
    <main className="flex flex-col items-center gap-2 p-1 text-xl lg:container">
      {/* Todos section */}
      <section className="w-full">
        {todos.length === 0 && (
          <p className="py-5 text-center font-black text-muted-foreground opacity-50">
            Add a to-do to get started!
          </p>
        )}
        <TodoList todos={undoneTodos} changeTodos={changeTodos} />
        <Button
          onClick={() => setShowCompleted(!showCompleted)}
          className="mb-2 mt-4 flex gap-2 bg-muted font-semibold hover:bg-muted"
        >
          <ChevronRight
            className={cn("duration-200", {
              "rotate-90": showCompleted,
            })}
          />
          Completed
          <span className="text-opacity-50">{doneTodos.length}</span>
        </Button>
        {showCompleted && (
          <TodoList todos={doneTodos} changeTodos={changeTodos} />
        )}
      </section>

      {/* Input section */}
      <section className="sticky bottom-1 w-full">
        <div className="relative">
          <Input
            className="px-4 py-8 pl-16 text-xl placeholder:text-muted-foreground placeholder:opacity-60"
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") changeTodos("", "add", newTodoText);
            }}
            value={newTodoText}
            placeholder="Add a to-do..."
          />
          <Button
            onClick={() => changeTodos("", "add", newTodoText)}
            className="absolute left-3 top-4 h-fit rounded-full bg-background p-0 hover:bg-muted"
          >
            <Plus className="h-9 w-9" />
          </Button>
        </div>
      </section>
    </main>
  );
}
