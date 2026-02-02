"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FloatingHearts from "../components/FloatingHearts";
import { AUTH_KEY } from "../components/AuthGuard";

const CORRECT_PASSWORD = "shraddha"; // Change as needed

export default function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (password.trim().toLowerCase() === CORRECT_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, "true");
        router.push("/question");
      } else {
        setError("Wrong password! Try again.");
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300">
      <FloatingHearts />
      <main className="relative z-10 flex w-full max-w-md flex-col items-center justify-center rounded-3xl border border-pink-200 bg-white/80 px-6 py-16 shadow-xl backdrop-blur-md">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="mb-4 max-w-xs text-4xl font-bold leading-10 tracking-tight text-pink-600 sm:text-5xl">
            Hey Shraddha <span role="img" aria-label="heart">❤️</span>
          </h1>
          <p className="mb-8 max-w-md text-lg leading-8 text-pink-500">
            I made something special for you
          </p>
          <form onSubmit={handleUnlock} className="flex w-full flex-col items-center gap-4">
            <input
              type="password"
              className="w-full rounded-full border border-pink-300 bg-white/90 px-5 py-3 text-lg text-pink-700 placeholder-pink-300 transition focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter the secret password..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              disabled={loading}
              autoComplete="off"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 py-3 text-lg font-semibold text-white transition hover:bg-pink-600 active:scale-95 shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading || !password}
            >
              {loading ? "Unlocking..." : "Unlock 💌"}
            </button>
            {error && <span className="mt-1 text-sm text-pink-600">{error}</span>}
          </form>
        </div>
      </main>
    </div>
  );
}
