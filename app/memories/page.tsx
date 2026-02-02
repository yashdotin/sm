"use client";
import AuthGuard from "../../components/AuthGuard";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAccepted, setMemoriesComplete } from "../../components/flowState";
import MemoriesGrid from "../../components/MemoriesGrid";

const videoUrl = "https://www.youtube.com/embed/ScMzIvxBSi4"; // Replace with your own

export default function MemoriesPage() {
  const router = useRouter();
  useEffect(() => {
    if (!isAccepted()) {
      router.replace("/question");
    }
  }, [router]);

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center bg-gradient-to-br from-[#fff0f5] via-[#f7cad0] to-[#fbb1bd] px-2 py-6 overflow-x-hidden relative">
        {/* Subtle hearts/flowers, lighter vignette for calm memory mood */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {require('../../components/FloatingHearts').default()}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fff0f5cc] to-[#fbb1bd] opacity-60" />
        </div>
        <main className="w-full max-w-5xl flex flex-col items-center justify-center rounded-3xl border border-pink-100 bg-white/80 px-2 py-8 shadow-2xl backdrop-blur-lg relative z-10" style={{ boxShadow: '0 8px 40px 0 #fbb1bd33' }}>
          <motion.h2
            className="text-3xl font-bold text-pink-600 mb-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            photu <span role="img" aria-label="memories">🫶</span>
          </motion.h2>
          {/* All images in a responsive grid, no video */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-start justify-center mb-8">
            <MemoriesGrid imagesOnly />
          </div>
          {/* Video appears only once below all images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
            className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border-2 border-pink-200 bg-pink-50 flex flex-col items-center mb-8"
          >
            <video
              src="/video.mp4"
              controls
              autoPlay
              loop
              className="w-full h-auto max-h-[400px] object-cover rounded-xl"
              style={{ background: '#f9e2e7' }}
            />
          </motion.div>
          {/* Forever Us button separate below */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setMemoriesComplete();
              window.location.href = '/forever';
            }}
            className="rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 text-lg shadow-md transition mt-8 mb-2"
          >
            Forever us ❤️
          </motion.button>
        </main>
      </div>
    </AuthGuard>
  );
}

          {/* Right: Video and Forever Us button */}
          <section className="flex-1 flex flex-col items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
              className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border-2 border-pink-200 bg-pink-50 flex flex-col items-center"
            >
              <video
                src="/video.mp4"
                controls
                autoPlay
                loop
                className="w-full h-auto max-h-[400px] object-cover rounded-xl"
                style={{ background: '#f9e2e7' }}
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMemoriesComplete();
                window.location.href = '/forever';
              }}
              className="rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 text-lg shadow-md transition"
            >
              Forever us ❤️
            </motion.button>
          </section>
