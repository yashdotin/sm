"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AuthGuard from "../../components/AuthGuard";
import confetti from "canvas-confetti";

export default function QuestionPage() {
  const router = useRouter();
  const noBtnRef = useRef<HTMLButtonElement>(null);

  function handleYes() {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#ffb6c1", "#ff69b4", "#ff6f91", "#fbb1bd"]
    });
    setTimeout(() => router.push("/memories"), 1200);
  }

  function handleNo() {
    // Playful: move button to random position
    if (noBtnRef.current) {
      const btn = noBtnRef.current;
      const parent = btn.parentElement;
      if (parent) {
        const maxX = parent.clientWidth - btn.clientWidth;
        const maxY = parent.clientHeight - btn.clientHeight;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        btn.style.transition = "transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)";
      }
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300">
        <main className="flex flex-col items-center justify-center w-full max-w-md px-6 py-16 rounded-3xl shadow-xl bg-white/80 backdrop-blur-md border border-pink-200 relative">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-pink-600 text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Will you be my Valentine? <span role="img" aria-label="valentine">💖</span>
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-center mt-4 relative" style={{ minHeight: 80 }}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="w-40 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg shadow-md transition"
            >
              Yes <span role="img" aria-label="in love">😍</span>
            </motion.button>
            <motion.button
              ref={noBtnRef}
              whileHover={{ scale: 1.08, rotate: 6 }}
              whileTap={{ scale: 0.95, rotate: -6 }}
              onClick={handleNo}
              className="w-40 py-3 rounded-full bg-white border border-pink-300 text-pink-500 font-semibold text-lg shadow-md transition select-none"
              type="button"
            >
              No <span role="img" aria-label="no">🙃</span>
            </motion.button>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
