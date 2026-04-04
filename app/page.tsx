"use client";
import LoadingScreen from '@/components/layout/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bg text-white selection:bg-purple/30 selection:text-white">
      <LoadingScreen />
      <Navbar />

      <div className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
