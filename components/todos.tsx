import { useEffect, useRef, useState } from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export default function Todos({ todos, setTodos }: Props) {
  const [editableTodoId, setEditableTodoId] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInputRef.current && editableTodoId !== "") {
      editInputRef.current.focus();
    }
  }, [editableTodoId]);

  function changeTodo(
    todoId: string,
    action: "toggle" | "delete" | "edit",
    content?: string,
  ) {
    let updatedTodos: Todo[];
    if (action === "toggle") {
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

  return (
    <section className="flex w-full flex-col gap-1">
      {todos.length === 0 && (
        <p className="py-5 text-center font-black text-muted-foreground opacity-50">
          Add a to-do to get started!
        </p>
      )}
      {todos.map((todo) => (
        <article
          className="flex items-center gap-4 rounded bg-muted p-4 text-muted-foreground"
          key={todo.id}
        >
          <Checkbox
            className="rounded-full"
            onClick={() => changeTodo(todo.id, "toggle")}
            checked={todo.done}
          />
          {todo.id === editableTodoId ? (
            <Input
              ref={editInputRef}
              defaultValue={todo.content}
              onBlur={(e) => {
                setEditableTodoId("");
                changeTodo(todo.id, "edit", e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  changeTodo(todo.id, "edit", e.currentTarget.value);
                  e.currentTarget.blur();
                }
              }}
              className="border-none bg-transparent text-xl"
            />
          ) : (
            <span
              onDoubleClick={() => setEditableTodoId(todo.id)}
              className={cn("flex-grow", {
                "line-through": todo.done,
              })}
            >
              {todo.content}
            </span>
          )}
          <Button
            onClick={() => changeTodo(todo.id, "delete")}
            className="rounded-full bg-muted px-2 hover:bg-destructive"
          >
            <Trash />
          </Button>
        </article>
      ))}
    </section>
  );
}
