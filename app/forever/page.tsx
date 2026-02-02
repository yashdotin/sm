"use client";
import AuthGuard from "../../components/AuthGuard";
import Countdown from "../../components/Countdown";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isMemoriesComplete } from "../../components/flowState";

const MUSIC_URL = "/music.mp3"; // Replace with your own

export default function ForeverPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (!isMemoriesComplete()) {
      router.replace("/memories");
    }
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {});
    }
  }, [router]);

  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3a1836] via-[#6d214f] to-[#fbb1bd] relative overflow-hidden">
        {/* Deep vignette, hearts, and flowers for emotional warmth */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {require('../../components/FloatingHearts').default()}
          {require('../../components/FloatingFlowers').default()}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2d112b99] to-[#3a1836] opacity-70" />
        </div>
        <main className="flex flex-col items-center justify-center w-full max-w-xl px-6 sm:px-10 py-16 sm:py-20 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-xl border-2 border-pink-400 relative z-10 animate-fadein" style={{ minHeight: '520px', boxShadow: '0 12px 64px 0 #2d112b66' }}>
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold text-pink-700 text-center mb-8 drop-shadow-xl animate-bounce"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Forever us <span role="img" aria-label="forever">❤️</span>
          </motion.h1>
          <div className="flex items-center justify-center mb-6">
            <span className="inline-block rounded-full bg-gradient-to-br from-pink-400 via-pink-600 to-pink-900 shadow-xl border-4 border-pink-200 p-4 animate-bounce" style={{ fontSize: '3rem', position: 'relative' }}>
              💍<span style={{ position: 'absolute', right: '-1.2rem', top: '0.2rem', fontSize: '2rem' }}>❤️</span>
            </span>
          </div>
          <div className="w-full flex flex-col items-center justify-center mb-6">
            <div className="w-full max-w-xs mx-auto rounded-2xl bg-gradient-to-r from-pink-900 via-pink-700 to-pink-500 p-6 shadow-xl border-2 border-pink-400 animate-fadein">
              <Countdown />
            </div>
          </div>
          {/* Poem reveal section */}
          <PoemReveal />
          <audio ref={audioRef} src={MUSIC_URL} autoPlay loop hidden />
        </main>
      </div>
    </AuthGuard>
  );
}

function PoemReveal() {
  const poemLines = [
    "from dawn to dusk my years have slipped away",
    "and age alone now counts what i have earned",
    "i ask what i have gained , what i have lost",
    "i feel i could do all , for naught i've tried",
    "this is the hour no breath remains to spare",
    "the morn has come , i rise i choose to act",
    "no more i write of life , i live it now for you"
  ];
  const [poemIndex, setPoemIndex] = useState(0);
  const [poemDone, setPoemDone] = useState(false);
  function revealNextLine() {
    if (poemIndex < poemLines.length - 1) {
      setPoemIndex(poemIndex + 1);
    } else {
      setPoemDone(true);
    }
  }
  return (
    <div className="mt-8 flex flex-col items-center gap-6 animate-fadein w-full">
      <p className="text-xl text-pink-100 text-center max-w-lg font-semibold">
        Thank you for being my Valentine.<br />Here’s to us, always.<br />
        <span className="text-3xl">💖🌸🌺💐🌷🌻🌼</span>
      </p>
      <div className="w-full max-w-lg bg-pink-900/60 rounded-2xl p-6 shadow-lg border-2 border-pink-400 cursor-pointer select-none transition hover:shadow-2xl" onClick={() => { if (!poemDone) revealNextLine(); }} onKeyDown={e => { if (!poemDone && (e.key === ' ' || e.key === 'Enter')) revealNextLine(); }} tabIndex={0} role="button" aria-label="Reveal next poem line">
        <div className="text-pink-100 text-lg font-medium whitespace-pre-line text-center" style={{lineHeight: '2'}}>
          {poemLines.slice(0, poemIndex + 1).map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.2 }}>
              {line}
            </motion.div>
          ))}
          {poemDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-2xl font-bold text-pink-200 drop-shadow-xl animate-pulse">
              This is us. Always.
            </motion.div>
          )}
        </div>
        {!poemDone && <div className="mt-4 text-xs text-pink-200">Click or press space/enter for next line</div>}
      </div>
    </div>
  );
}
