"use client";

import { motion } from "framer-motion";
import JoinWaitlistButton from "./JoinWaitlistButton";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 sm:px-8 pt-24 pb-12" style={{
      background: 'radial-gradient(circle at 50% -20%, rgba(75, 142, 255, 0.15) 0%, rgba(19, 19, 19, 0) 60%)'
    }}>
      {/* Text only: the feature sections below carry the app screens. The hero
          owns the first screen; the features start below the fold. */}
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2a] border border-[#414755]/20 mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#ffbc7c] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#c1c6d7]">
              The Creator Operating System
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[min(2.25rem,9.2vw)] sm:text-5xl md:text-6xl lg:text-7xl text-balance font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.05]"
          >
            {/* Two fixed lines from sm up: a free wrap stranded "pro" on its own line. */}
            <span className="sm:block">Run your creator</span>{" "}
            <span className="sm:whitespace-nowrap">
              business{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffbc7c]">
                like a pro
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#c1c6d7] text-base sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
          >
            Plan content, track payments, send GST invoices and share your media
            kit, all in one app built for Indian creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <JoinWaitlistButton className="primary-gradient text-[#16140f] shadow-[0_8px_24px_rgba(0,0,0,0.45)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm sm:text-base" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
