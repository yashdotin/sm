"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid admin token.");
        setLoading(false);
      }
    } catch {
      setError("Server error. Try again later.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300">
      <main className="flex flex-col items-center w-full max-w-sm px-6 py-12 rounded-3xl shadow-xl bg-white/80 backdrop-blur-md border border-pink-200">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col w-full gap-4">
          <input
            type="password"
            className="w-full rounded-full border border-pink-300 bg-white/90 px-5 py-3 text-lg text-pink-700 placeholder-pink-300 transition focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter admin token..."
            value={token}
            onChange={e => setToken(e.target.value)}
            autoFocus
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="rounded-full bg-pink-500 py-3 text-lg font-semibold text-white transition hover:bg-pink-600 active:scale-95 shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || !token}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <span className="text-sm text-pink-600">{error}</span>}
        </form>
      </main>
    </div>
  );
}
