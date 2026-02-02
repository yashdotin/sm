"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin") !== "true") {
      router.replace("/admin");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300">
      <main className="flex flex-col items-center w-full max-w-lg px-6 py-12 rounded-3xl shadow-xl bg-white/80 backdrop-blur-md border border-pink-200">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">Admin Dashboard</h1>
        <p className="mb-4 text-pink-500">Welcome, admin! (UI for managing memories will go here.)</p>
        {/* TODO: Add memory management UI here */}
      </main>
    </div>
  );
}
