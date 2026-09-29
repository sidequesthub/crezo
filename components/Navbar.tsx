"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  // The section in view, highlighted in the nav.
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = ["features", "pricing", "waitlist"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "waitlist", label: "Waitlist" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-zinc-900/60 backdrop-blur-xl shadow-2xl shadow-blue-500/5"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <a href="#" className="text-2xl font-bold tracking-tighter text-zinc-100 font-[family-name:var(--font-headline)]">
          Crezo
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm tracking-tight">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-colors pb-1 ${
                activeSection === item.id
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
