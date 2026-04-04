"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function About() {
  return (
    <section id="about" className="section-space bg-bg-2/90 border-y border-white/5 relative z-10 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-purple/12 blur-3xl" />
      </div>
      <div className="section-shell">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center"
        >
          {/* Left: Text Content */}
          <div className="flex flex-col">
            <motion.div variants={itemVariants} className="section-kicker mb-5">
              <p>About Me</p>
            </motion.div>

            <motion.h2 variants={itemVariants} className="section-heading text-3xl sm:text-4xl md:text-5xl mb-5 sm:mb-6">
              Engineering solutions for complex problems.
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 text-white/60 text-base sm:text-lg leading-relaxed">
              <p>
                I&apos;m a Full Stack Engineer specialized in building robust AI pipelines and production-ready applications. My expertise bridges the gap between complex machine learning models and intuitive user experiences.
              </p>
              <p>
                From developing computer vision systems for agriculture to optimizing 3D spatial algorithms for space logistics, I thrive on solving hard engineering challenges that require both deep algorithmic thinking and high-performance system architecture.
              </p>
            </motion.div>
          </div>

          {/* Right: Clean Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 sm:gap-5">
            {STATS.map((stat, i) => (
              <div 
                key={i}
                className="card-hover p-5 sm:p-6 rounded-xl bg-bg/80 backdrop-blur-xl border border-white/10 flex flex-col gap-2"
              >
                <div className="text-4xl sm:text-5xl font-display font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs sm:text-sm uppercase tracking-wider font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
