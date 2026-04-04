"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';
import ScrollFloat from '@/components/ScrollFloat';
import PixelTransition from '@/components/PixelTransition';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7 }
  }
};

export default function Projects() {
  return (
    <section id="projects" className="section-space bg-bg-2 border-y border-white/5 w-full relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
      </div>
      <div className="section-shell">
        
        <div className="mb-10 sm:mb-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="section-kicker mb-3 sm:mb-4"
          >
            <p>Selected Work</p>
          </motion.div>
          
          <div className="section-heading text-3xl sm:text-4xl md:text-5xl">
            <ScrollFloat
              textClassName="font-display font-bold text-white leading-[1.1]"
              containerClassName="my-0"
              animationDuration={1.1}
              stagger={0.02}
            >
              Featured Projects
            </ScrollFloat>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="card-hover group flex flex-col lg:flex-row gap-5 sm:gap-7 lg:gap-8 bg-bg/85 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-6 lg:p-7"
            >
              {/* Visual Side */}
              <div className="w-full lg:w-5/12">
                <PixelTransition
                  className="w-full border border-white/10 rounded-xl overflow-hidden"
                  style={{ width: '100%' }}
                  aspectRatio="68%"
                  pixelColor={project.accentColor}
                  animationStepDuration={0.45}
                  firstContent={
                    <div className="h-full w-full flex items-center justify-center bg-bg-2 relative">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `radial-gradient(circle at center, ${project.accentColor}, transparent)` }}
                      />
                      <div className="text-4xl sm:text-6xl font-display font-bold text-white/10 uppercase tracking-tighter transition-transform duration-500">
                        {project.name.substring(0, 3)}
                      </div>
                    </div>
                  }
                  secondContent={
                    <div
                      className="h-full w-full flex items-center justify-center text-lg font-semibold"
                      style={{
                        background: `linear-gradient(135deg, ${project.accentColor}33, transparent 70%), #111`,
                      }}
                    >
                      <span className="text-white/90">Explore {project.name}</span>
                    </div>
                  }
                />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-xs uppercase text-white/40 tracking-wider">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2.5 sm:mb-3">
                  {project.name}
                </h3>
                
                <p 
                  className="text-sm sm:text-base font-medium mb-3 sm:mb-4"
                  style={{ color: project.accentColor }}
                >
                  {project.tagline}
                </p>
                
                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {project.tech.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-white/70 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary flex items-center gap-2 text-white/80 hover:text-white w-fit"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm font-medium">View Source</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
