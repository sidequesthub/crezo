"use client";

import { motion } from "framer-motion";
import JoinWaitlistButton from "./JoinWaitlistButton";

export default function Waitlist() {
  return (
    <section id="waitlist" className="py-16 sm:py-32 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#adc6ff]/10 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-8 sm:px-12 py-12 sm:py-16 text-center bg-[#1c1b1b]/60 backdrop-blur-sm rounded-3xl border border-[#414755]/30 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[min(1.875rem,7vw)] sm:text-4xl font-extrabold mb-4 font-[family-name:var(--font-headline)]">
            Be the first to try{" "}
            <span className="bg-gradient-to-r from-[#adc6ff] to-[#ffbc7c] bg-clip-text text-transparent">
              Crezo
            </span>
          </h2>
          <p className="text-[#c1c6d7] text-base sm:text-lg mb-10">
            Free for early creators. Launching soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center"
        >
          <JoinWaitlistButton className="px-8 py-3.5 rounded-xl primary-gradient text-[#16140f] hover:opacity-90 font-semibold text-sm transition-all hover:shadow-[0_0_30px_rgba(243,239,231,0.18)] cursor-pointer whitespace-nowrap" />
        </motion.div>
      </div>
    </section>
  );
}
