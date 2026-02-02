"use client";
import { useState, useEffect } from "react";
import { Memory, memories } from "./memoriesData";
import { motion, AnimatePresence } from "framer-motion";

type MemoriesGridProps = {
  showCount?: number;
  imagesOnly?: boolean;
};

export default function MemoriesGrid({ showCount, imagesOnly }: MemoriesGridProps) {
  const [selected, setSelected] = useState<Memory | null>(null);
  // Only show photos in the main stack
  let photos = memories.filter(m => m.type !== "video");
  if (showCount !== undefined) {
    photos = photos.slice(0, showCount);
  }
  // Only include video if not imagesOnly
  const video = !imagesOnly ? memories.find(m => m.type === "video") : undefined;

  return (
    <div className="w-full flex flex-row gap-6 items-center justify-center">
      {/* Photos stack with staggered fade-up, hover tilt/shadow */}
      {photos.map((m, i) => (
        <motion.div
          key={m.id}
          whileHover={{ scale: 1.04, rotate: 2, boxShadow: "0 8px 32px #fbb1bd88" }}
          whileTap={{ scale: 0.97, rotate: -2 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: i * 0.22 }}
          className="w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer border border-pink-200 group hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all"
          onClick={() => setSelected(m)}
          tabIndex={0}
          role="button"
          aria-label={`Open memory photo ${m.id}`}
        >
          <img
            src={m.image}
            alt={`Memory photo ${m.id}`}
            className="w-full object-cover transition duration-300 group-hover:scale-110 group-hover:shadow-2xl rounded-2xl"
            style={{ maxHeight: '350px', display: 'block' }}
            loading="lazy"
          />
        </motion.div>
      ))}
      {/* Video card at the end, with special animation (removed if imagesOnly) */}
      {!imagesOnly && video && (
        <motion.div
          key={video.id}
          whileHover={{ scale: 1.08, rotate: 1, boxShadow: "0 8px 32px #fbb1bd88" }}
          whileTap={{ scale: 0.95, rotate: -1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: "easeInOut", delay: photos.length * 0.22 }}
          className="w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-200 via-white to-pink-100 cursor-pointer border border-pink-300 group flex flex-col items-center justify-center p-2 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all"
          onClick={() => setSelected(video)}
          tabIndex={0}
          role="button"
          aria-label="Open memory video"
        >
          <div className="w-full flex flex-col items-center justify-center">
            <video
              src={video.image}
              className="w-full object-cover rounded-2xl border-2 border-pink-300 shadow-lg"
              style={{ maxHeight: '350px', display: 'block' }}
              controls
              preload="metadata"
              poster="/video-poster.jpg"
            />
            <span className="mt-2 text-pink-600 font-semibold text-lg animate-pulse">Our Special Video</span>
          </div>
        </motion.div>
      )}
      {/* Modal for selected memory */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center border border-pink-200 max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            {selected.type === 'photo' ? (
              <img
                src={selected.image}
                alt={`Memory photo ${selected.id}`}
                className="rounded-xl mb-3 max-w-full max-h-[80vh]"
                style={{ display: 'block' }}
              />
            ) : (
              <video
                src={selected.image}
                className="rounded-xl mb-3 max-w-full max-h-[80vh] border-2 border-pink-300 shadow-lg"
                style={{ display: 'block' }}
                controls
                autoPlay
                loop
                poster="/video-poster.jpg"
              />
            )}
            <button onClick={() => setSelected(null)} className="mt-2 px-4 py-2 rounded-full bg-pink-500 text-white font-semibold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
