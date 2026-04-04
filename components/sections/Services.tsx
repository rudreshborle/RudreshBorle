"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import GlareHover from '@/components/GlareHover';
import AnimatedContent from '@/components/AnimatedContent';

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
    transition: { duration: 0.5 }
  }
};

export default function Services() {
  return (
    <section id="services" className="section-space bg-bg w-full">
      <div className="section-shell">
        
        <div className="mb-10 sm:mb-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="section-kicker mb-3 sm:mb-4"
          >
            <p>What I Do</p>
          </motion.div>
          
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="section-heading text-3xl sm:text-4xl md:text-5xl"
          >
            Engineering Services
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {SERVICES.map((service) => {
            const iconName = service.icon as keyof typeof Icons;
            const IconComponent = (Icons[iconName] ?? Icons.Code) as React.ComponentType<{ className?: string }>;
            
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <GlareHover
                  width="100%"
                  height="100%"
                  background="rgba(255,255,255,0.03)"
                  borderRadius="1rem"
                  borderColor="rgba(255,255,255,0.08)"
                  glareColor="#FFFFFF"
                  glareOpacity={0.18}
                  className="card-hover p-6 sm:p-8 min-h-60 sm:min-h-64"
                >
                  <AnimatedContent distance={36} duration={0.7} className="h-full w-full">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-blue mb-5">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold mb-3 text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </AnimatedContent>
                </GlareHover>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
