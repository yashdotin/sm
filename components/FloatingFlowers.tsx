"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const FLOWERS_COUNT = 12;
const FLOWER_COLORS = [
  "#fbb1bd", "#f7cad0", "#ffb6c1", "#ff69b4", "#ff8fab", "#f9bec7"
];
const FLOWER_EMOJIS = [
  "🌸", "🌺", "💐", "🌷", "🌻", "🌼"
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingFlowers() {
  const flowers = useMemo(() =>
    Array.from({ length: FLOWERS_COUNT }, (_, i) => ({
      id: i,
      left: random(0, 100),
      size: random(32, 48),
      delay: random(0, 5),
      duration: random(7, 14),
      color: FLOWER_COLORS[i % FLOWER_COLORS.length],
      emoji: FLOWER_EMOJIS[i % FLOWER_EMOJIS.length],
      opacity: random(0.7, 1)
    })), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {flowers.map(f => (
        <motion.div
          key={f.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: ["100vh", `-${f.size * 2}px`], opacity: [0, f.opacity, 0] }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: f.duration, delay: f.delay, ease: "easeInOut" }}
          style={{ position: "absolute", left: `${f.left}%`, fontSize: f.size, zIndex: 0 }}
        >
          <span style={{ color: f.color }}>{f.emoji}</span>
        </motion.div>
      ))}
    </div>
  );
}
