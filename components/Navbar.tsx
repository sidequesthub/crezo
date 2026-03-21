"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-zinc-900/60 backdrop-blur-xl shadow-2xl shadow-blue-500/5"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <div className="text-2xl font-bold tracking-tighter text-zinc-100 font-[family-name:var(--font-headline)]">
          Crezo
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm tracking-tight">
          <a
            href="#showcase"
            className="text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
          >
            Showcase
          </a>
          <a
            href="#features"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Atelier
          </a>
          <a
            href="#pricing"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#waitlist"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Waitlist
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
