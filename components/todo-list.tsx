import { useState, useEffect, useRef } from "react";
import { Trash } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  todos: Todo[];
  changeTodos: (
    todoId: string,
    action: "add" | "toggle" | "delete" | "edit",
    content?: string,
  ) => void;
};

export default function TodoList({ todos, changeTodos }: Props) {
  const [editableTodoId, setEditableTodoId] = useState("");
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    if (editInputRef.current && editableTodoId !== "") {
      editInputRef.current.focus();
    }
  }, [editableTodoId]);

  return (
    <ul ref={animationParent} className="flex flex-col gap-1">
      {todos.map((todo) => (
        <li
          className="flex items-center gap-4 rounded bg-muted p-4 text-muted-foreground"
          key={todo.id}
        >
          <Checkbox
            className="rounded-full"
            onClick={() => changeTodos(todo.id, "toggle")}
            checked={todo.done}
          />
          {todo.id === editableTodoId ? (
            <Input
              ref={editInputRef}
              defaultValue={todo.content}
              onBlur={(e) => {
                setEditableTodoId("");
                changeTodos(todo.id, "edit", e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  changeTodos(todo.id, "edit", e.currentTarget.value);
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
            onClick={() => changeTodos(todo.id, "delete")}
            className="rounded-full bg-muted px-2 hover:bg-destructive"
          >
            <Trash />
          </Button>
        </li>
      ))}
    </ul>
  );
}
