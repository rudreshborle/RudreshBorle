"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { ArrowDown } from 'lucide-react';
import AnimatedContent from '@/components/AnimatedContent';
import ShinyText from '@/components/ShinyText';
import Aurora from '@/components/Aurora';
import BlurText from '@/components/BlurText';
import ClickSpark from '@/components/ClickSpark';
import GlassHeroAnime from '@/components/animations/GlassHeroAnime';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GlassHeroAnime />
        <div className="absolute inset-0 opacity-55">
          <Aurora
            colorStops={['#1a2bff', '#8a5cff', '#3ad8ff']}
            amplitude={0.9}
            blend={0.35}
            speed={1}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,240,255,0.18),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(123,47,247,0.2),transparent_45%),linear-gradient(180deg,rgba(10,10,10,0.45),rgba(10,10,10,0.85))]" />
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-16 right-10 h-48 w-48 rounded-full bg-purple/20 blur-3xl animate-float" />
        <motion.div
          className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-blue/20 blur-3xl"
          animate={{ x: [0, 26, 0], y: [0, -16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 section-shell pt-14 md:pt-18 lg:pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 w-fit rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur-xl"
          >
            Open to AI + Full Stack roles
          </motion.div>

          <AnimatedContent distance={48} duration={0.9} ease="power3.out" className="section-kicker mb-5">
            <p className="text-xs sm:text-sm">{PERSONAL_INFO.name}</p>
          </AnimatedContent>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-5 sm:mb-6 md:mb-7"
          >
            I craft <ShinyText text="intelligent" speed={3} className="gradient-text-blue" /><br />
            digital products.
          </motion.h1>

          <div className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed mb-7 sm:mb-8 md:mb-9">
            <BlurText
              text={PERSONAL_INFO.tagline}
              animateBy="words"
              direction="bottom"
              delay={120}
              className="text-left"
            />
          </div>

          <ClickSpark sparkColor="#8a5cff" sparkCount={10} sparkRadius={24} sparkSize={11}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center"
          >
            <a
              href="#projects"
              className="btn-primary bg-white text-bg w-full sm:w-auto text-center flex justify-center items-center gap-2 hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_30px_rgba(255,255,255,0.15)]"
            >
              View Projects
              <ArrowDown className="w-4 h-4 -rotate-90" />
            </a>
            <a
              href="#contact"
              className="btn-secondary text-white w-full sm:w-auto text-center"
            >
              Let&apos;s Talk
            </a>
          </motion.div>
          </ClickSpark>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs tracking-widest font-mono uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
