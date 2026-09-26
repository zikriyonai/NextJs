"use client";

import { useState } from "react";

export default function NewProjectModal({
  palette, onClose, onCreate,
}: { palette: string[]; onClose: () => void; onCreate: (name: string, color: string) => void }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(palette[0]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-[#14141f] border border-white/10 rounded-2xl p-6 w-80">
        <h2 className="font-bold mb-4">New project</h2>
        <input
          autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 mb-4 outline-none"
        />
        <div className="flex gap-2 mb-5">
          {palette.map((c) => (
            <button key={c} onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full ${color === c ? "ring-2 ring-white" : ""}`}
              style={{ background: c }} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-white/10 text-sm">Cancel</button>
          <button
            onClick={() => name.trim() && onCreate(name.trim(), color)}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#2A5CFF] to-[#7C3AED] text-sm font-semibold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
