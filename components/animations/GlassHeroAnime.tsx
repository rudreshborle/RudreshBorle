"use client";

import React, { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";

export default function GlassHeroAnime() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const glassNodes = Array.from(container.querySelectorAll<HTMLElement>("[data-glass-orb]"));
    const shimmerNodes = Array.from(container.querySelectorAll<HTMLElement>("[data-shimmer]"));
    const pulseNode = container.querySelector<HTMLElement>("[data-ambient-pulse]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const effects: Array<{ pause?: () => void; revert?: () => void; play?: () => void }> = [];
    let isVisible = true;
    let pointerX = 0;
    let pointerY = 0;

    if (prefersReducedMotion) {
      glassNodes.forEach((node) => {
        node.style.transform = "translate3d(0,0,0)";
      });
      return;
    }

    glassNodes.forEach((node, index) => {
      const float = animate(node, {
        y: [0, -16 - index * 3, 0],
        x: [0, index % 2 === 0 ? 10 : -10, 0],
        scale: [1, 1.04, 1],
        duration: 4000 + index * 900,
        delay: index * 180,
        ease: "inOutSine",
        loop: true,
        alternate: false,
      });
      effects.push(float);
    });

    const shimmerTimeline = createTimeline({ loop: true, autoplay: true, defaults: { ease: "inOutSine" } });
    shimmerNodes.forEach((node, index) => {
      shimmerTimeline.add(
        node,
        {
          opacity: [0.16, 0.52, 0.16],
          scale: [1, 1.08, 1],
          rotate: [0, index % 2 === 0 ? 8 : -8, 0],
          duration: 3600 + index * 800,
        },
        index * 120
      );
    });
    effects.push(shimmerTimeline);

    if (pulseNode) {
      const pulse = animate(pulseNode, {
        opacity: [0.35, 0.65, 0.35],
        scale: [1, 1.07, 1],
        duration: 2800,
        ease: "inOutSine",
        loop: true,
      });
      effects.push(pulse);
    }

    const onPointerMove = (event: PointerEvent) => {
      if (isCoarsePointer || !isVisible) return;
      const rect = container.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      glassNodes.forEach((node, index) => {
        const depth = (index + 1) * 4;
        const nextX = pointerX * depth;
        const nextY = pointerY * depth * -1;
        node.style.transform = `translate3d(${nextX.toFixed(2)}px, ${nextY.toFixed(2)}px, 0)`;
      });
    };

    container.addEventListener("pointermove", onPointerMove);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        effects.forEach((effect) => {
          if (isVisible) effect.play?.();
          else effect.pause?.();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      effects.forEach((effect) => {
        effect.pause?.();
        effect.revert?.();
      });
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <div
        data-ambient-pulse
        className="absolute left-1/2 top-[24%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/10 blur-[110px]"
      />

      <div
        data-glass-orb
        className="absolute left-[8%] top-[18%] h-48 w-48 rounded-[40%] border border-white/25 bg-white/10 backdrop-blur-3xl shadow-[0_0_40px_rgba(255,255,255,0.18)]"
      />
      <div
        data-glass-orb
        className="absolute right-[10%] top-[26%] h-36 w-36 rounded-[35%] border border-white/20 bg-cyan-200/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(90,220,255,0.25)]"
      />
      <div
        data-glass-orb
        className="absolute bottom-[14%] left-[26%] h-56 w-56 rounded-[42%] border border-violet-200/20 bg-violet-300/10 backdrop-blur-3xl shadow-[0_0_40px_rgba(168,85,247,0.25)]"
      />

      <div
        data-shimmer
        className="absolute -left-[8%] top-[36%] h-[1px] w-[38%] rotate-[8deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
      <div
        data-shimmer
        className="absolute right-[2%] top-[56%] h-[1px] w-[30%] -rotate-[14deg] bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"
      />
      <div
        data-shimmer
        className="absolute left-[22%] top-[78%] h-[1px] w-[44%] rotate-[2deg] bg-gradient-to-r from-transparent via-violet-200/70 to-transparent"
      />
    </div>
  );
}
