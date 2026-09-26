"use client";

import { useState } from "react";

type Message = { id?: string; role: "user" | "assistant"; text: string; editedAt?: unknown };

export default function MessageBubble({
  message, onEdit,
}: { message: Message; onEdit?: (newText: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(message.text);
  const isUser = message.role === "user";

  if (editing) {
    return (
      <div className="max-w-[85%] ml-auto">
        <textarea
          value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none resize-none"
          rows={3}
        />
        <div className="flex gap-2 justify-end mt-2">
          <button onClick={() => setEditing(false)} className="text-sm px-3 py-1 rounded-lg bg-white/10">
            Cancel
          </button>
          <button
            onClick={() => { onEdit?.(draft); setEditing(false); }}
            className="text-sm px-3 py-1 rounded-lg bg-gradient-to-r from-[#2A5CFF] to-[#7C3AED] font-semibold">
            Save & regenerate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group flex items-end gap-2 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}>
      <div className={`px-4 py-3 rounded-xl ${isUser ? "bg-[#2A5CFF]" : "bg-white/10"}`}>
        {message.text}
        {!!message.editedAt && <span className="block text-[10px] text-white/50 mt-1">(edited)</span>}
      </div>
      {onEdit && (
        <button
          onClick={() => setEditing(true)}
          className="opacity-0 group-hover:opacity-100 text-xs text-white/40 hover:text-white/80 transition"
          title="Edit message">
          ✎
        </button>
      )}
    </div>
  );
}
