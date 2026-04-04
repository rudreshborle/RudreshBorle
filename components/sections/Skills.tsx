"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/constants';

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

export default function Skills() {
  return (
    <section id="skills" className="section-space bg-bg w-full relative overflow-hidden">
      <div className="section-shell">
        
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="section-kicker mb-3 sm:mb-4 justify-center"
          >
            <p>Tech Stack</p>
          </motion.div>
          
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="section-heading text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4"
          >
            Technical Arsenal
          </motion.h2>
          
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="text-white/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            A curated stack of technologies I use to turn complex problems into scalable solutions.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7"
        >
          {SKILLS.map((skillGroup) => (
            <motion.div
              key={skillGroup.category}
              variants={itemVariants}
              className="card-hover p-6 sm:p-7 rounded-2xl bg-bg-2/70 backdrop-blur-md border border-white/10 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: skillGroup.color }}
                />
                <h3 className="text-lg sm:text-xl font-display font-semibold">{skillGroup.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {skillGroup.items.map(item => (
                  <span 
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-sm text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
