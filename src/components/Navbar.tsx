"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-zikriyon-gradient flex items-center justify-center font-bold">
          Z
        </div>
        <span className="font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
          Zikriyon AI
        </span>
      </div>

      {session ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/70">{session.user?.email}</span>
          <button
            onClick={() => signOut()}
            className="text-sm px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20"
          >
            Log Out
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="text-sm px-4 py-1.5 rounded-full bg-zikriyon-gradient font-semibold"
        >
          Log In
        </Link>
      )}
    </nav>
  );
}
