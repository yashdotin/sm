"use client";
import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.loop = true;
    audio.play().catch(() => {});
    // Resume on user interaction if browser blocks autoplay
    const resume = () => {
      if (audio.paused) audio.play().catch(() => {});
    };
    window.addEventListener("click", resume);
    window.addEventListener("touchstart", resume);
    return () => {
      window.removeEventListener("click", resume);
      window.removeEventListener("touchstart", resume);
      audio.pause();
    };
  }, []);

  return (
    <audio ref={audioRef} src="/music.mp3" preload="auto" />
  );
}
