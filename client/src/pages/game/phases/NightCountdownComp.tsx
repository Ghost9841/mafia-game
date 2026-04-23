// NightCountdown.tsx
import React, { useState, useEffect } from 'react'

const NightCountdown = ({ seconds }: { seconds: number }) => {
  const [current, setCurrent] = useState(seconds);

  useEffect(() => {
    if (current <= 0) return;
    const timer = setTimeout(() => setCurrent(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 text-white flex-col gap-4">
      <p className="text-2xl text-gray-400">🌙 Night falls in</p>
      <p className="text-8xl font-bold">{current}</p>
      <p className="text-gray-500 text-sm">Prepare yourself...</p>
    </div>
  )
}

export default NightCountdown;