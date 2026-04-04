"use client";
import React from 'react';
import { PERSONAL_INFO } from '@/lib/constants';
import MagneticButton from '../ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const links = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const socials = [
    { name: 'GitHub', url: PERSONAL_INFO.github },
    { name: 'LinkedIn', url: PERSONAL_INFO.linkedin },
    { name: 'Instagram', url: PERSONAL_INFO.instagram },
  ];

  return (
    <footer className="border-t border-white/10 bg-bg py-10 sm:py-12">
      <div className="section-shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 mb-8 sm:mb-10">
          <div className="md:col-span-5">
            <h3 className="section-heading text-xl sm:text-2xl mb-2.5 sm:mb-3">Rudresh Borle</h3>
            <p className="text-white/60 text-sm sm:text-base max-w-sm mb-4 sm:mb-5">
              AI Developer and Full Stack Engineer building production-ready systems.
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 text-base sm:text-lg text-white/85 hover:text-white transition-colors"
            >
              {PERSONAL_INFO.email}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white/50 text-xs uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white/50 text-xs uppercase tracking-wider mb-4">Social</h4>
            <ul className="space-y-2.5">
              {socials.map((social) => (
                <li key={social.name}>
                  <MagneticButton className="inline-block">
                    <a href={social.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors">
                      {social.name}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </MagneticButton>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Rudresh Borle. All rights reserved.</p>
          <a href="#hero" className="hover:text-white transition-colors">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
