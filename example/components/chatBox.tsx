import clsx from "clsx"
import { useState } from "react"
import { ArrowUpIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface ChatBoxProps {
  onMessage?: (message: string) => any;
  className?: string;
}

export function ChatBox ({ onMessage, className }: ChatBoxProps) {
  const [input, setInput] = useState("");
  const handleMessage = () => {
    onMessage?.(input.trim());
    setInput("");
  };
  return (
    <div className={clsx("flex flex-row items-center", className)}>
      <Input
        type="text"
        placeholder="Enter your query..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!document}
        className={clsx(
          "flex-grow mr-2 text-white py-6 px-6 rounded-3xl text-base",
          "border border-gray-200/20 border-dashed font-[family-name:var(--font-geist-sans)]"
        )}
        onKeyPress={(e) => e.key === "Enter" && handleMessage()}
      />
      <Button
        disabled={!document || !input.trim()}
        onClick={handleMessage}
        className="h-full bg-blue-600 transition hover:bg-blue-700 rounded-full disabled:bg-neutral-700"
      >
        <ArrowUpIcon className="w-6 h-auto" />
      </Button>
    </div>
  );
}