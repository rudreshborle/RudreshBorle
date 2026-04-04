"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.28)]' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-shell py-3.5 sm:py-4 flex items-center justify-between">
          <MagneticButton>
            <a href="#" className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <span className="gradient-text-blue">R</span>UDRESH
            </a>
          </MagneticButton>

          <nav className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => (
              <MagneticButton key={link.name}>
                <a 
                  href={link.href} 
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue transition-all duration-300 group-hover:w-full" />
                </a>
              </MagneticButton>
            ))}
            <MagneticButton>
              <a 
                href="#contact" 
                className="btn-secondary px-5 py-2 text-blue text-sm hover:bg-blue/10 border-blue/40 rounded-full"
              >
                Contact
              </a>
            </MagneticButton>
          </nav>

          {/* Mobile menu toggle */}
          <button 
            aria-label="Toggle navigation menu"
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-6 h-px bg-white block" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 h-px bg-white block" />
            <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-6 h-px bg-white block" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="mt-4 px-8 py-3 rounded-full border border-blue/50 text-blue font-medium"
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
