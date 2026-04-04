"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Lenis from '@studio-freight/lenis';

type ScrollProgressContextValue = {
  progress: number;
};

const ScrollProgressContext = createContext<ScrollProgressContextValue>({ progress: 0 });

export function useScrollProgress() {
  return useContext(ScrollProgressContext);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);

  const value = useMemo(() => ({ progress }), [progress]);

  useEffect(() => {
    const lenis = new Lenis({
      // Keep smooth scrolling, but make it feel snappier.
      duration: 0.65,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.2,
    });

    const updateProgress = (scroll: number, limit: number) => {
      if (limit <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(1, Math.max(0, scroll / limit));
      setProgress(nextProgress);
    };

    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      updateProgress(scroll, limit);
    });

    updateProgress(window.scrollY, Math.max(0, document.documentElement.scrollHeight - window.innerHeight));

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <ScrollProgressContext.Provider value={value}>{children}</ScrollProgressContext.Provider>;
}
