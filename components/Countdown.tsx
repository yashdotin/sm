"use client";
import { useEffect, useState } from "react";

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

const Countdown = () => {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(getNextValentine()));

  useEffect(() => {
    const target = getNextValentine();
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(target));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-1">
      <span className="text-lg font-medium text-pink-500">Countdown to Valentine’s Day</span>
      <div className="flex gap-2 text-2xl font-bold">
        <span>{remaining.days}d</span>
        <span>{remaining.hours}h</span>
        <span>{remaining.minutes}m</span>
        <span>{remaining.seconds}s</span>
      </div>
    </div>
  );
};

export default Countdown;
