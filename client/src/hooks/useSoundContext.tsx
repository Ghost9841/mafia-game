// src/context/SoundContext.tsx
import { createContext, useContext, useState, useCallback, useRef } from "react";

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playBgMusic: (src: string | string[]) => void; // supports single or array of tracks
  stopBgMusic: () => void;
  playSfx: (src: string) => void; // one-shot sounds
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const bgRef = useRef<HTMLAudioElement | null>(null);
  const trackListRef = useRef<string[]>([]);
  const trackIndexRef = useRef(0);
  const isMutedRef = useRef(false); // ref for use inside callbacks

  const stopBgMusic = useCallback(() => {
    if (bgRef.current) {
      bgRef.current.pause();
      bgRef.current.onended = null;
      bgRef.current = null;
    }
  }, []);

  const playNextTrack = useCallback(() => {
    if (isMutedRef.current) return;
    const tracks = trackListRef.current;
    if (!tracks.length) return;

    trackIndexRef.current = (trackIndexRef.current + 1) % tracks.length;
    const audio = new Audio(tracks[trackIndexRef.current]);
    bgRef.current = audio;
    audio.onended = playNextTrack; // auto play next
    audio.play().catch(() => {});
  }, []);

  const playBgMusic = useCallback((src: string | string[]) => {
    stopBgMusic();
    if (isMutedRef.current) return;

    const tracks = Array.isArray(src) ? src : [src];
    trackListRef.current = tracks;
    trackIndexRef.current = 0;

    const audio = new Audio(tracks[0]);
    bgRef.current = audio;
    audio.onended = tracks.length > 1 ? playNextTrack : null;
    if (tracks.length === 1) audio.loop = true; // single track loops
    audio.play().catch(() => {});
  }, [stopBgMusic, playNextTrack]);

  const playSfx = useCallback((src: string) => {
    if (isMutedRef.current) return;
    const audio = new Audio(src);
    audio.play().catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      isMutedRef.current = newMuted;
      if (newMuted) {
        stopBgMusic();
      }
      return newMuted;
    });
  }, [stopBgMusic]);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playBgMusic, stopBgMusic, playSfx }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSoundContext must be used within SoundProvider");
  return ctx;
};