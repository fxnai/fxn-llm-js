import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

export interface HeaderProps {
  className?: string;
}

export function Header ({ className }: HeaderProps) {
  return (
    <header className={clsx("relative flex flex-row justify-center text-4xl py-8", className)}>
      <Link href="https://fxn.ai" target="_blank" className="w-14 h-14 absolute top-0 left-0 ml-8 mt-6">
        <Image
          src="https://www.fxn.ai/icon.png"
          fill
          alt="Function logo"
          className=""
        />
      </Link>
      <p>
        OpenAI Embeddings in the Browser with Function LLM
      </p>
    </header>
  );
}