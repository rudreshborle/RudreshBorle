"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleNavHover = () => setIsHovering(true);
    const handleNavLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleNavHover);
      el.addEventListener('mouseleave', handleNavLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleNavHover);
        el.removeEventListener('mouseleave', handleNavLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-blue rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          backgroundColor: 'rgba(0, 240, 255, 0)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 240, 255, 0)',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 25 }}
      />
    </>
  );
}
