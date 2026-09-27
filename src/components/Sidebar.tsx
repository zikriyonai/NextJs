"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import NewProjectModal from "./NewProjectModal";

type Project = { id: string; name: string; color: string };
type Conversation = { id: string; title: string; projectId: string | null };

const PALETTE = ["#2A5CFF", "#4F46E5", "#7C3AED", "#06B6D4", "#0B0B12"];

export default function Sidebar({
  activeConversationId, onSelectConversation, onNewChat, refreshKey, collapsed, onToggleCollapse,
}: {
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: (projectId: string | null) => void;
  refreshKey: number;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  async function loadAll() {
    const [pRes, cRes] = await Promise.all([fetch("/api/projects"), fetch("/api/conversations")]);
    setProjects((await pRes.json()).projects || []);
    setConversations((await cRes.json()).conversations || []);
  }

  useEffect(() => { if (session) loadAll(); }, [session, refreshKey]);

  async function createProject(name: string, color: string) {
    await fetch("/api/projects", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color }),
    });
    setShowNewProject(false);
    loadAll();
  }

  const visibleConversations = activeProjectId
    ? conversations.filter((c) => c.projectId === activeProjectId)
    : conversations;

  if (!session) return null;

  // ---- COLLAPSED: thin icon rail (ChatGPT/Claude-style) ----
  if (collapsed) {
    return (
      <aside className="w-16 shrink-0 h-screen flex flex-col items-center bg-[#0b0b14] border-r border-white/10 py-4 transition-all duration-300">
        <button onClick={onToggleCollapse} className="mb-6 p-2 rounded-lg hover:bg-white/10" title="Expand sidebar">
          <Image src="/logo-hex.png" alt="Zikriyon AI" width={28} height={28} className="rounded-md" />
        </button>
        <button
          onClick={() => onNewChat(null)}
          className="mb-4 w-10 h-10 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#7C3AED] flex items-center justify-center text-lg font-bold"
          title="New chat"
        >
          +
        </button>
        <button onClick={onToggleCollapse} className="mt-auto p-2 rounded-lg hover:bg-white/10 text-white/50" title="Expand">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </aside>
    );
  }

  // ---- EXPANDED: full sidebar ----
  return (
    <aside className="w-72 shrink-0 h-screen flex flex-col bg-[#0b0b14] border-r border-white/10 transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 min-w-0">
          <Image src="/logo-hex.png" alt="Zikriyon AI" width={32} height={32} className="rounded-lg shrink-0" />
          <span className="font-bold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent truncate">
            Zikriyon AI
          </span>
        </div>
        <button onClick={onToggleCollapse} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 shrink-0" title="Collapse sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <button onClick={() => onNewChat(activeProjectId)}
        className="mx-4 mb-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2A5CFF] to-[#7C3AED] font-semibold text-sm hover:opacity-90 transition">
        + New chat
      </button>

      <div className="px-4 mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-white/40">
        <span>Projects</span>
        <button onClick={() => setShowNewProject(true)} className="text-white/60 hover:text-white transition">+</button>
      </div>
      <div className="px-2 mb-4 space-y-1 max-h-40 overflow-y-auto">
        <button onClick={() => setActiveProjectId(null)}
          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${activeProjectId === null ? "bg-white/10" : "hover:bg-white/5"}`}>
          All chats
        </button>
        {projects.map((p) => (
          <button key={p.id} onClick={() => setActiveProjectId(p.id)}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition ${activeProjectId === p.id ? "bg-white/10" : "hover:bg-white/5"}`}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
            <span className="truncate">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="px-4 mb-2 text-xs uppercase tracking-wide text-white/40">Chats</div>
      <div className="flex-1 px-2 space-y-1 overflow-y-auto">
        {visibleConversations.length === 0 && (
          <p className="px-3 py-2 text-sm text-white/30">No chats yet</p>
        )}
        {visibleConversations.map((c) => (
          <button key={c.id} onClick={() => onSelectConversation(c.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition ${activeConversationId === c.id ? "bg-white/10" : "hover:bg-white/5"}`}>
            {c.title}
          </button>
        ))}
      </div>

      <div className="relative border-t border-white/10 p-4">
        <button onClick={() => setProfileOpen((v) => !v)} className="w-full flex items-center gap-3">
          {session.user?.image ? (
            <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2A5CFF] to-[#7C3AED] flex items-center justify-center text-sm font-bold shrink-0">
              {session.user?.name?.[0] || session.user?.email?.[0] || "Z"}
            </div>
          )}
          <span className="text-sm truncate">{session.user?.name || session.user?.email}</span>
        </button>

        {profileOpen && (
          <div className="absolute bottom-16 left-4 right-4 bg-[#14141f] border border-white/10 rounded-lg overflow-hidden shadow-xl">
            <button onClick={() => signOut()} className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition">
              Log out
            </button>
          </div>
        )}
      </div>

      {showNewProject && (
        <NewProjectModal palette={PALETTE} onClose={() => setShowNewProject(false)} onCreate={createProject} />
      )}
    </aside>
  );
}
