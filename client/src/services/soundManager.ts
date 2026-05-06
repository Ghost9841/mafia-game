let currentAudio: HTMLAudioElement | null = null;

export const soundManager = {
  play: (src: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(src);
    return currentAudio.play().catch(() => {});
  },
  stop: () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  },
  isMuted: false,
  toggleMute: () => {
    soundManager.isMuted = !soundManager.isMuted;
    if (soundManager.isMuted) soundManager.stop();
  }
};