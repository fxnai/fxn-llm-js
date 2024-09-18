"use client"

import { locally } from "fxn-llm"
import { OpenAI } from "openai"
import { useEffect, useMemo, useRef, useState } from "react"
import { findClosestEmbedding, splitDocument } from "@/lib/ai"
import type { Message } from "@/lib/chat"
import { Dropzone } from "@/components/dropzone"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatBox } from "@/components/chatBox"
import { ChatHistory } from "@/components/chatHistory"
import { HighlightedText } from "@/components/highlightedText"

const openai = locally(
  new OpenAI({ apiKey: "fxn", dangerouslyAllowBrowser: true }),
  { url: "/api" }
);

export default function Home () {
  // State
  const [document, setDocument] = useState<string>(null);
  const [chunks, setChunks] = useState<string[]>([]);
  const [vectorDatabase, setVectorDatabase] = useState<OpenAI.Embedding[]>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const documentRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const highlight = useMemo(
    () => messages.findLast(({ sender, loading }) => sender === "assistant" && !loading)?.content,
    [messages]
  );
  // Split uploaded document into chunks
  useEffect(() => {
    if (document) {
      const chunks = splitDocument({ document });
      setChunks(chunks);
    } else
      setChunks([]);
  }, [document]);
  // Message handler
  const onMessage = async (message: string) => {
    // Add message
    setMessages([
      ...messages,
      { sender: "user", content: message },
      { sender: "assistant", loading: true }
    ]);
    // Populate vector database if not populated
    let database = vectorDatabase;
    if (!database) {
      const documentEmbedding = await openai.embeddings.create({
        model: "@nomic/nomic-embed-text-v1.5-quant",
        input: chunks.map(chunk => `search_document: ${chunk}`)
      });
      setVectorDatabase(documentEmbedding.data);
      database = documentEmbedding.data;
    }
    // Embed the query
    const { data: [query] } = await openai.embeddings.create({
      model: "@nomic/nomic-embed-text-v1.5-quant",
      input: `search_query: ${message}`
    });
    // Query our vector database
    const result = findClosestEmbedding({ query, database });
    // Respond
    setMessages(prev => [
      ...prev.slice(0, -1),
      { sender: "assistant", content: chunks[result.index] }
    ]);
  }
  // Scroll to end on new message
  useEffect(() => {
    const scrollableDiv = messagesRef.current;
    if (scrollableDiv)
      scrollableDiv.scrollTo({ top: scrollableDiv.scrollHeight, behavior: "smooth" });
  }, [messages]);
  // Render
  return (
    <div className="h-screen flex flex-col bg-black font-[family-name:var(--font-jetbrains-mono)] divide-y divide-gray-200/20 divide-dashed">
      
      {/* Header */}
      <Header />

      {/* App */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 flex text-white divide-x divide-gray-200/20 divide-dashed">

          {/* Left side - File upload and display */}
          <div className="w-1/2 p-8">
            {
              !document &&
              <Dropzone
                onUpload={setDocument}
                className="h-full border border-dashed border-gray-200/20"
              />
            }
            {
              document &&
              <ScrollArea viewportRef={documentRef} className="h-full">
                <HighlightedText highlight={highlight} scrollRef={documentRef} className="text-lg">
                  {document}
                </HighlightedText>
              </ScrollArea>
            }
          </div>

          {/* Right side - Chat interface */}
          <div className="w-1/2 p-8 flex flex-col">

            {/* Chat history */}
            <ScrollArea viewportRef={messagesRef} className="flex-grow mb-4">
              <ChatHistory messages={messages} />
            </ScrollArea>
            
            {/* Chat box */}
            <ChatBox onMessage={onMessage} disabled={!document} />
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <Footer className="" />
    </div>
  );
}