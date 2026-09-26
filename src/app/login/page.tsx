"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-zikriyon-gradient flex items-center justify-center text-2xl font-bold mb-3">
            Z
          </div>
          <h1 className="text-2xl font-bold">Log in to Zikriyon AI</h1>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-full py-2.5 font-semibold mb-5"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5 text-white/40 text-sm">
          <div className="flex-1 h-px bg-white/10" /> or <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button className="w-full bg-zikriyon-gradient rounded-full py-2.5 font-semibold">
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-5">
          No account?{" "}
          <Link href="/signup" className="text-indigo-400 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
