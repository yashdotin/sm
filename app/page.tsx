"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FloatingHearts from "../components/FloatingHearts";
import FloatingFlowers from "../components/FloatingFlowers";
import { AUTH_KEY } from "../components/AuthGuard";
import { setUnlocked } from "../components/flowState";

const API_URL = "/api/validate-password";

export default function LandingPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [shake, setShake] = useState(false);
  const [cardLift, setCardLift] = useState(false);
  const [pulseHeart, setPulseHeart] = useState(false);
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setUnlocked();
        sessionStorage.setItem(AUTH_KEY, "true");
        setPulseHeart(true);
        setCardLift(true);
        setTimeout(() => {
          setPulseHeart(false);
          setCardLift(false);
          router.push("/question");
        }, 900);
      } else {
        setError(data.error || "Wrong password! Try again.");
        setLoading(false);
        setShake(true);
        setTimeout(() => setShake(false), 600);
        // Log failed attempt
        const fails = Number(localStorage.getItem("pw-fails") || 0) + 1;
        localStorage.setItem("pw-fails", String(fails));
      }
    } catch (err) {
      setError("Server error. Try again later.");
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="fixed inset-0 min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 overflow-hidden">
      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-10" style={{background: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 60%, rgba(200,100,150,0.12) 100%)'}} />
      {/* Blurred hearts and flowers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingHearts />
        <FloatingFlowers />
      </div>
      <motion.main
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: cardLift ? 1.08 : 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className={
          `relative z-20 w-full max-w-xl flex flex-col items-center justify-center rounded-[2.5rem] border border-pink-200 bg-white/60 px-8 py-24 shadow-2xl backdrop-blur-2xl transition-transform duration-700 ${shake ? 'animate-shake' : ''} ${cardLift ? 'shadow-2xl border-pink-400' : 'scale-95 hover:scale-100'}`
        }
        style={{ minHeight: '540px', boxShadow: '0 8px 48px 0 rgba(255, 182, 193, 0.18), 0 1.5px 12px 0 rgba(255, 182, 193, 0.10)' }}
      >
        <div className="w-full flex flex-col items-center">
          <motion.h1
            className="mb-2 w-full text-center text-5xl font-extrabold leading-tight tracking-tight text-pink-600 drop-shadow-lg animate-bounce"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          >
            Hey Shraddha <motion.span animate={pulseHeart ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.6 }} role="img" aria-label="heart">❤️</motion.span>
          </motion.h1>
          <motion.p
            className="mb-8 w-full text-center text-xl leading-8 text-pink-500 font-medium animate-fadein"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
          >
            I made something special for you
          </motion.p>
        </div>
        <motion.form
          onSubmit={handleUnlock}
          className="flex w-full flex-col items-center gap-6 animate-fadein"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
        >
          <div className="w-full flex items-center justify-center">
            <input
              type="password"
              className={`w-full max-w-xs rounded-full border border-pink-200 bg-gradient-to-r from-pink-50 to-white px-4 py-3 text-base text-pink-700 placeholder-pink-300 shadow-md transition focus:outline-none focus:ring-2 focus:ring-pink-300 font-mono tracking-wide animate-fadein ${inputActive ? 'ring-4 ring-pink-300 bg-white/90' : ''}`}
              placeholder="Enter the secret password..."
              value={password}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              disabled={loading}
              autoComplete="off"
              style={{ fontSize: '1rem', letterSpacing: '0.04em', boxShadow: inputActive ? '0 0 0 4px #fbb1bd88' : '0 0 0 2px #fbb1bd55', background: inputActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)', transition: 'box-shadow 0.3s, background 0.3s' }}
            />
          </div>
          <motion.button
            type="submit"
            className={`flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 py-3 text-base font-bold text-white transition hover:scale-105 active:scale-95 shadow-md disabled:cursor-not-allowed disabled:opacity-60 animate-pulse ${pulseHeart ? 'ring-4 ring-pink-400' : ''}`}
            disabled={loading || !password}
            style={{ fontSize: '1rem' }}
            animate={pulseHeart ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            {loading ? "Unlocking..." : "Unlock "}
            <motion.span animate={pulseHeart ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.6 }} role="img" aria-label="heart">💌</motion.span>
          </motion.button>
          {error && <span className="mt-2 text-base text-pink-600 animate-shake">{error}</span>}
        </motion.form>
      </motion.main>
    </div>
  );
}
