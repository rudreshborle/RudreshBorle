"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function CursorRobot() {
  const robotRef = useRef<HTMLDivElement | null>(null);
  const pupilRef = useRef<HTMLDivElement | null>(null);
  const eyeRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const robot = robotRef.current;
    const pupil = pupilRef.current;
    const eye = eyeRef.current;
    const bubble = bubbleRef.current;
    if (!robot || !pupil || !eye || !bubble) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const homeX = window.innerWidth * 0.78;
    const homeY = Math.min(window.innerHeight * 0.62, 620);
    let currentX = homeX;
    let currentY = homeY;
    let targetX = homeX;
    let targetY = homeY;
    let headTilt = 0;
    let frameId = 0;

    if (prefersReducedMotion) {
      robot.style.left = `${targetX}px`;
      robot.style.top = `${targetY}px`;
      return;
    }

    const blink = animate(eye, {
      scaleY: [{ to: 0.16, duration: 100 }, { to: 1, duration: 140 }],
      delay: 2500,
      loop: true,
      ease: "inOutQuad",
    });

    const float = animate(robot, {
      translateY: [0, -8, 0],
      duration: 2800,
      loop: true,
      ease: "inOutSine",
    });

    const bubblePulse = animate(bubble, {
      scale: [1, 1.06, 1],
      opacity: [0.9, 1, 0.9],
      duration: 1800,
      loop: true,
      ease: "inOutSine",
    });

    const onMove = (event: PointerEvent) => {
      const offsetX = (event.clientX - window.innerWidth * 0.5) * 0.18;
      const offsetY = (event.clientY - window.innerHeight * 0.55) * 0.12;
      targetX = homeX + Math.max(-120, Math.min(120, offsetX));
      targetY = homeY + Math.max(-80, Math.min(80, offsetY));
      headTilt = Math.max(-8, Math.min(8, (event.clientX / window.innerWidth - 0.5) * 14));

      const pupilOffsetX = Math.max(-2, Math.min(2, (event.clientX / window.innerWidth - 0.5) * 4.5));
      const pupilOffsetY = Math.max(-2, Math.min(2, (event.clientY / window.innerHeight - 0.5) * 4.5));

      animate(pupil, {
        translateX: pupilOffsetX,
        translateY: pupilOffsetY,
        duration: 220,
        ease: "outQuad",
      });
    };

    const onLeave = () => {
      targetX = homeX;
      targetY = homeY;
      headTilt = 0;
      animate(pupil, {
        translateX: 0,
        translateY: 0,
        duration: 220,
        ease: "outQuad",
      });
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      robot.style.left = `${currentX}px`;
      robot.style.top = `${currentY}px`;
      robot.style.rotate = `${headTilt.toFixed(2)}deg`;
      frameId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    tick();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frameId);
      blink.pause?.();
      blink.revert?.();
      float.pause?.();
      float.revert?.();
      bubblePulse.pause?.();
      bubblePulse.revert?.();
    };
  }, []);

  return (
    <div
      ref={robotRef}
      aria-hidden
      className="pointer-events-none absolute left-[74vw] top-[63vh] z-20 hidden h-56 w-64 -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div className="absolute bottom-[-58px] left-1/2 h-24 w-[30rem] -translate-x-1/2 bg-gradient-to-t from-white/30 via-white/10 to-transparent blur-sm" />
      <div className="absolute bottom-[-2px] left-1/2 h-10 w-44 -translate-x-1/2 rounded-[999px] bg-black/25 blur-md" />

      <div className="absolute bottom-[8px] left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border border-white/30 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.98),rgba(236,236,236,0.96)_45%,rgba(220,220,220,0.9)_78%,rgba(205,205,205,0.95)_100%)] shadow-[0_16px_30px_rgba(0,0,0,0.15)]" />
      <div className="absolute bottom-[22px] left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.13)_1.2px,transparent_1.3px)] bg-[length:12px_12px] opacity-25" />

      <div className="absolute bottom-[103px] left-1/2 h-3.5 w-16 -translate-x-1/2 rounded-full border border-white/60 bg-white/55" />
      <div className="absolute bottom-[108px] left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border border-white/50 bg-[radial-gradient(circle_at_26%_18%,rgba(255,255,255,0.92),rgba(255,116,165,0.8)_28%,rgba(120,241,196,0.78)_55%,rgba(244,255,91,0.8)_82%)] shadow-[0_0_24px_rgba(255,255,255,0.45)]" />

      <div className="absolute bottom-[146px] left-[44%] h-10 w-[1px] bg-white/70" />
      <div className="absolute bottom-[154px] left-[43%] h-4 w-4 rounded-full border border-white/60 bg-white/70" />

      <div ref={eyeRef} className="absolute bottom-[123px] left-[59%] h-4 w-4 rounded-full border border-white/80 bg-white/35">
        <div ref={pupilRef} className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-white" />
      </div>

      <div ref={bubbleRef} className="absolute bottom-[156px] left-[60%] rounded-2xl border border-white/70 bg-white/85 px-2 py-1 shadow-[0_10px_24px_rgba(255,255,255,0.35)]">
        <span className="block text-[11px] leading-none text-pink-500">❤</span>
      </div>

      <div className="absolute bottom-[140px] left-[57%] h-3 w-3 rotate-45 border-r border-b border-white/70 bg-white/85" />
    </div>
  );
}
