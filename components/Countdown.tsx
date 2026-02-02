"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VALENTINE_MONTH = 1; // February (0-indexed)
const VALENTINE_DAY = 14;

function getNextValentine(): Date {
  const now = new Date();
  let year = now.getFullYear();
  const valentine = new Date(year, VALENTINE_MONTH, VALENTINE_DAY, 0, 0, 0, 0);
  if (now > valentine) {
    // If past, use next year
    return new Date(year + 1, VALENTINE_MONTH, VALENTINE_DAY, 0, 0, 0, 0);
  }
  return valentine;
}

function getTimeRemaining(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function getServerTime(): Promise<Date> {
  // For demo, just return local time. Replace with real server sync if needed.
  return Promise.resolve(new Date());
}

const Countdown = () => {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(getNextValentine()));
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let active = true;
    function update() {
      getServerTime().then(now => {
        const target = getNextValentine();
        const diff = target.getTime() - now.getTime();
        if (diff <= 0) {
          setDone(true);
          setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          setRemaining(getTimeRemaining(target));
        }
      });
    }
    intervalRef.current = setInterval(update, 1000);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        setPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setPaused(false);
        update();
        intervalRef.current = setInterval(update, 1000);
      }
    });
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-1">
      <span className="text-lg font-bold text-pink-100 drop-shadow-lg">Countdown to Valentine’s Day</span>
      {!done && (
        <div className="flex gap-3 text-3xl font-extrabold text-pink-50 bg-pink-900/80 rounded-xl px-4 py-3 shadow-lg border-2 border-pink-400 animate-pulse">
          {[['days', 'd'], ['hours', 'h'], ['minutes', 'm'], ['seconds', 's']].map(([unit, label], idx) => (
            <motion.span
              key={unit}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
              className="inline-block min-w-[2.5ch]"
            >
              {remaining[unit as keyof typeof remaining]}{label}
            </motion.span>
          ))}
        </div>
      )}
      {paused && <span className="text-xs text-pink-200 mt-1">Paused (tab inactive)</span>}
      {done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-pink-100 text-2xl font-bold drop-shadow-lg animate-pulse">
          Happy Valentine’s Day! <span role="img" aria-label="love">💝</span>
        </motion.div>
      )}
    </div>
  );
};

export default Countdown;
