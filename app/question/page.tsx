"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AuthGuard from "../../components/AuthGuard";
import confetti from "canvas-confetti";
import { setAccepted } from "../../components/flowState";


export default function QuestionPage() {
  const router = useRouter();
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sad, setSad] = useState(false);
  const [timeoutPrompt, setTimeoutPrompt] = useState(false);
  const [noHovering, setNoHovering] = useState(false);
  const [showAreYouSure, setShowAreYouSure] = useState(false);
  const noHoverTimeout = useRef<NodeJS.Timeout | null>(null);

  function handleNo() {
    setSad(true);
    if (audioRef.current) {
      audioRef.current.src = "/sad.mp3";
      audioRef.current.play().catch(() => {});
    }
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#bdbdbd", "#f7cad0"]
    });
    // Button no longer moves randomly, but fades/moves on hover
  }

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutPrompt(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  const [yesClicked, setYesClicked] = useState(false);
  function handleYes() {
    setYesClicked(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ffb6c1", "#ff69b4", "#f7cad0", "#fff0f5", "#ff6f91"]
    });
    setAccepted();
    setTimeout(() => router.push("/memories"), 1200);
  }

  // ...existing code...

  return (
    <AuthGuard>
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2d112b] via-[#3a1836] to-[#6d214f] relative overflow-hidden"
        animate={yesClicked ? { background: "linear-gradient(135deg, #fbb1bd 0%, #f7cad0 100%)" } : {}}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {/* Subtle vignette and blurred hearts/flowers for emotional depth */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {require('../../components/FloatingHearts').default()}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000033] to-[#2d112b] opacity-60" />
        </div>
        <motion.main
          className="flex flex-col items-center justify-center w-full max-w-md px-6 py-14 sm:py-20 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-lg border border-pink-200/60 relative z-10"
          style={{ boxShadow: '0 8px 40px 0 #2d112b33' }}
          animate={yesClicked ? { opacity: 0, scale: 1.08, y: 40 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <audio ref={audioRef} src="/music.mp3" autoPlay loop hidden />
          <motion.h2
            className={`text-4xl sm:text-5xl font-bold text-center mb-8 tracking-tight drop-shadow-lg ${sad ? "text-blue-500" : "text-pink-700"}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            {sad ? (
              <>
                Oh... <span role="img" aria-label="sad">😢</span><br />
                That made me sad.
              </>
            ) : (
              <>
                Will you be my Valentine?
                <br />
                <span className="text-2xl block mt-2 text-pink-400">(Please say yes...)</span>
              </>
            )}
          </motion.h2>
          {timeoutPrompt && !sad && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mb-4 text-pink-400 text-base">
              Still thinking? Take your time, but my heart is waiting... 💗
            </motion.div>
          )}
          <div className="flex flex-col sm:flex-row gap-7 w-full items-center justify-center mt-6 relative" style={{ minHeight: 90 }}>
            <motion.button
              whileHover={{ scale: 1.12, boxShadow: "0 0 32px 8px #ffb6c1" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleYes}
              className="w-48 py-4 rounded-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white font-bold text-2xl shadow-xl transition-all duration-200 focus:ring-4 focus:ring-pink-200/60 ring-offset-2 ring-offset-white animate-bounce"
              style={{ filter: 'drop-shadow(0 0 16px #ffb6c1)' }}
            >
              Yes <span role="img" aria-label="in love">😍</span>
            </motion.button>
            <motion.button
              ref={noBtnRef}
              whileHover={{ scale: 0.98, x: 40, opacity: 0.7 }}
              whileTap={{ scale: 0.95, x: -20, opacity: 0.5 }}
              onHoverStart={() => {
                setNoHovering(true);
                if (noHoverTimeout.current) clearTimeout(noHoverTimeout.current);
                noHoverTimeout.current = setTimeout(() => setShowAreYouSure(true), 1200);
              }}
              onHoverEnd={() => {
                setNoHovering(false);
                setShowAreYouSure(false);
                if (noHoverTimeout.current) clearTimeout(noHoverTimeout.current);
              }}
              onClick={handleNo}
              className="w-28 py-3 rounded-full bg-white/80 border border-pink-200 text-pink-400 font-semibold text-lg shadow-md transition-all duration-200 select-none"
              type="button"
              style={{ filter: 'blur(0.5px)' }}
            >
              No <span role="img" aria-label="no">🙃</span>
            </motion.button>
            {showAreYouSure && !sad && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-xs text-pink-300 bg-white/80 px-4 py-2 rounded-full shadow">
                Are you sure?
              </motion.div>
            )}
          </div>
        </motion.main>
      </motion.div>
    </AuthGuard>
  );
}
