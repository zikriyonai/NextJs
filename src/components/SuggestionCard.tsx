"use client";

export default function SuggestionCard({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-4 transition"
    >
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-white/50">{subtitle}</p>
    </button>
  );
}
