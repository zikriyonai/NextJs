"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import SuggestionCard from "@/components/SuggestionCard";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    if (!session) {
      router.push("/login");
      return;
    }

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    setMessages((m) => [...m, { role: "assistant", text: data.reply || data.error }]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-2xl mx-auto w-full">
        {messages.length === 0 && (
          <>
            <div className="w-20 h-20 rounded-full bg-zikriyon-gradient flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-500/30 mb-6">
              Z
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent mb-3">
              Zikriyon AI
            </h1>
            <p className="text-center text-white/60 mb-6 max-w-md">
              Your intelligent assistant — ask anything, in any language.
            </p>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400" /> Zikriyon Atom
            </span>

            <div className="grid gap-3 w-full mb-8">
              <SuggestionCard
                title="Explain a concept"
                subtitle="Quantum computing, simplified"
                onClick={() => sendMessage("Explain quantum computing, simplified")}
              />
              <SuggestionCard
                title="Write some code"
                subtitle="Python sorting helper"
                onClick={() => sendMessage("Write a Python sorting helper")}
              />
            </div>
          </>
        )}

        <div className="w-full flex-1 space-y-4 mb-4 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`px-4 py-3 rounded-xl max-w-[85%] ${
                m.role === "user" ? "bg-indigo-600 ml-auto" : "bg-white/10"
              }`}
            >
              {m.text}
            </div>
          ))}
          {loading && <div className="px-4 py-3 rounded-xl bg-white/10 max-w-[85%]">Thinking...</div>}
        </div>

        <div className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask Zikriyon anything..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-9 h-9 rounded-full bg-zikriyon-gradient flex items-center justify-center"
          >
            ↑
          </button>
        </div>
      </main>
    </div>
  );
}
