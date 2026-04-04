"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
  reverse?: boolean;
}

export default function Marquee({
  items,
  speed = 30,
  separator = "•",
  className = "",
  reverse = false,
}: MarqueeProps) {
  // Duplicate items for seamless loop
  const content = items.join(` ${separator} `) + ` ${separator} `;
  const doubled = content + content;

  return (
    <div className={`overflow-hidden whitespace-nowrap py-4 sm:py-6 ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="text-sm sm:text-base md:text-lg font-mono tracking-widest uppercase text-white/20">
          {doubled}
        </span>
      </motion.div>
    </div>
  );
}
