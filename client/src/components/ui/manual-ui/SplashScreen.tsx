// SplashScreen.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "@/assets/loadingscreen/pngwing.com.png";           // 👈 your mask logo
import reaper from "@/assets/loadingscreen/pngwing.com.png";  // 👈 your grim reaper

type SplashScreenProps = {
  onComplete: () => void;
};

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const reaperRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Reaper walks from left to right, bar fills simultaneously
    tl.fromTo(
      reaperRef.current,
      { x: "-10vw", opacity: 0 },
      { x: "90vw", opacity: 1, duration: 2.5, ease: "power1.inOut" }
    )
    .fromTo(
      barRef.current,
      { width: "0%" },
      { width: "100%", duration: 2.5, ease: "power1.inOut" },
      "<" // start at same time as reaper
    )

    // 2. Reaper fades out at the end
    .to(reaperRef.current, { opacity: 0, duration: 0.3 })

    // 3. Logo fades in
    .fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )

    // 4. Hold for a moment then fade entire screen out
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.8,
      onComplete: () => onComplete()
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#080808] z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
         backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Logo — centered, hidden initially */}
      <div ref={logoRef} className="relative z-10 opacity-0 flex flex-col items-center gap-4">
        <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
        <p className="text-[#c9a84c] tracking-[8px] text-xs font-bold uppercase">
          Mafia Game
        </p>
      </div>

      {/* Bottom bar area — reaper walks above this */}
      <div className="absolute bottom-0 left-0 right-0 z-10">

        {/* Reaper walks above the bar */}
        <img
          ref={reaperRef}
          src={reaper}
          alt="Reaper"
          className="absolute h-32 object-contain"
          style={{
            bottom:0, // sits just above the bar
            left: 0,
            opacity: 0,
          }}
        />

        {/* Bar track */}
        <div className="w-full h-[8px] bg-white/5 relative">
          {/* Bar fill */}
          <div
            ref={barRef}
            className="h-full bg-[#8b0000]"
            style={{ width: "0%" }}
          />
          {/* Gold shimmer on bar */}
          <div
            ref={barRef}
            className="absolute inset-0 h-full"
            style={{
              background: "linear-gradient(90deg, #8b0000, #c9a84c, #8b0000)",
              width: "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;