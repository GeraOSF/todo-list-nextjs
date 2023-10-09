import { useRef, useState } from "react";
import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  addTodo: (textInput: string) => void;
}
export default function TodoInput({ addTodo }: Props) {
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef(null);

  function add() {
    const newTodoText = textInput.trim();
    if (newTodoText === "") return;
    addTodo(newTodoText);
    setTextInput("");
  }

  return (
    <section className="sticky bottom-1 w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          className="px-4 py-8 pl-16 text-xl placeholder:text-muted-foreground placeholder:opacity-60"
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
          value={textInput}
          placeholder="Add a to-do..."
        />
        <Button
          onClick={add}
          className="absolute left-3 top-4 h-fit rounded-full bg-background p-0 hover:bg-muted"
        >
          <Plus className="h-9 w-9" />
        </Button>
      </div>
    </section>
  );
}
