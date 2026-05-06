import { useRef, useCallback } from "react"

export default function useSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    // lazily create audio instance only when first used
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
    }

    const audio = audioRef.current
    audio.currentTime = 0
    return audio.play(); // 👈 return the promise!
  }, [src])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])

  return { play, stop }
}


