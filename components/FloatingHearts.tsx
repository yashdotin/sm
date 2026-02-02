"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const HEARTS_COUNT = 18;
const HEART_COLORS = [
  "#ffb6c1",
  "#ff69b4",
  "#ff6f91",
  "#ff8fab",
  "#fbb1bd",
  "#f9bec7",
  "#f7cad0",
  "#fbb1bd",
  "#f9bec7",
  "#f7cad0"
];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const FloatingHearts = () => {
  // SSR-safe: only runs on client
  const hearts = Array.from({ length: HEARTS_COUNT }, (_, i) => ({
    id: i,
    left: random(0, 100),
    size: random(18, 36),
    delay: random(0, 6),
    duration: random(7, 14),
    color: HEART_COLORS[i % HEART_COLORS.length],
    opacity: random(0.5, 0.9)
  }));

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{
            y: "100vh",
            opacity: 0
          }}
          animate={{
            y: ["100vh", `-${h.size * 2}px`],
            opacity: [0, h.opacity, 0]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: h.duration,
            delay: h.delay,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            zIndex: 0
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 32 29.6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,7.1,10.7,14.2,15.2,18.1c0.6,0.5,1.5,0.5,2.1,0C21.3,24.6,32,17.5,32,10.4C32,4.7,27.3,0,23.6,0z"
              fill={h.color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
