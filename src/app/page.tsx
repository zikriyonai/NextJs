"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import SuggestionCard from "@/components/SuggestionCard";

type Message = { role: "user" | "assistant"; text: string };

export default function Home() {
  const { data: session, status } = useSession();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!activeConversationId) { setMessages([]); return; }
    fetch(`/api/conversations/${activeConversationId}`).then((r) => r.json()).then((d) => setMessages(d.messages || []));
  }, [activeConversationId]);

  async function startNewChat(projectId: string | null) {
    const res = await fetch("/api/conversations", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New chat", projectId }),
    });
    const data = await res.json();
    setActiveConversationId(data.id);
    setMessages([]);
    setRefreshKey((k) => k + 1);
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    let conversationId = activeConversationId;
    if (!conversationId) {
      const res = await fetch("/api/conversations", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: text.slice(0, 40), projectId: null }),
      });
      conversationId = (await res.json()).id;
      setActiveConversationId(conversationId);
    }

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    const res = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
    setRefreshKey((k) => k + 1);
  }

  if (status === "loading") return null;

  if (!session) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-2xl mx-auto w-full min-h-screen">
        <Image src="/logo-brand.png" alt="Zikriyon AI" width={96} height={96} className="mb-6" />
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#2A5CFF] via-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent mb-3">
          Zikriyon AI
        </h1>
        <p className="text-center text-white/60 mb-8 max-w-md">Your intelligent assistant — ask anything, in any language.</p>
        <button onClick={() => signIn()} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#7C3AED] font-semibold">
          Log In to Start
        </button>
      </main>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={startNewChat}
        refreshKey={refreshKey}
      />

      <main className="flex-1 flex flex-col items-center px-6 py-8 overflow-hidden">
        <div className="w-full max-w-2xl flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Image src="/logo-hex.png" alt="" width={72} height={72} className="mb-5" />
              <h2 className="text-2xl font-bold mb-6">What can I help with?</h2>
              <div className="grid gap-3 w-full">
                <SuggestionCard title="Explain a concept" subtitle="Quantum computing, simplified"
                  onClick={() => sendMessage("Explain quantum computing, simplified")} />
                <SuggestionCard title="Write some code" subtitle="Python sorting helper"
                  onClick={() => sendMessage("Write a Python sorting helper")} />
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((m, i) => (
                <div key={i} className={`px-4 py-3 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-[#2A5CFF] ml-auto" : "bg-white/10"}`}>
                  {m.text}
                </div>
              ))}
              {loading && <div className="px-4 py-3 rounded-xl bg-white/10 max-w-[85%]">Thinking...</div>}
            </div>
          )}

          <div className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask Zikriyon anything..." className="flex-1 bg-transparent outline-none placeholder:text-white/40" />
            <button onClick={() => sendMessage(input)}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#7C3AED] flex items-center justify-center">
              ↑
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
