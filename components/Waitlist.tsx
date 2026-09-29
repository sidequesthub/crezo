"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TALLY_FORM_URL = "https://tally.so/r/q4PyD5";

export default function Waitlist() {
  const [count, setCount] = useState(127);
  const [tallyLoaded, setTallyLoaded] = useState(false);

  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => setTallyLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openTallyForm = () => {
    // @ts-ignore - Tally global object
    if (typeof window !== 'undefined' && window.Tally) {
      // @ts-ignore
      window.Tally.openPopup('q4PyD5', {
        width: 500,
        emoji: {
          text: '🚀',
          animation: 'wave'
        }
      });
    } else {
      // Fallback: open in new tab
      window.open(TALLY_FORM_URL, '_blank');
    }
  };

  return (
    <section id="waitlist" className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#adc6ff]/10 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-8 sm:px-12 py-12 sm:py-16 text-center bg-[#1c1b1b]/60 backdrop-blur-sm rounded-3xl border border-[#414755]/30 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-[family-name:var(--font-headline)]">
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
          <button
            onClick={openTallyForm}
            className="px-8 py-3.5 rounded-xl primary-gradient text-[#16140f] hover:opacity-90 font-semibold text-sm transition-all hover:shadow-[0_0_30px_rgba(243,239,231,0.18)] cursor-pointer whitespace-nowrap text-[#00285c]"
          >
            Join Waitlist
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[#131313] flex items-center justify-center text-[10px] font-bold"
                style={{
                  backgroundColor: ["#adc6ff", "#ffbc7c", "#22c55e", "#c6c6c7"][i] + "30",
                  color: ["#adc6ff", "#ffbc7c", "#22c55e", "#c6c6c7"][i],
                }}
              >
                {["A", "P", "S", "R"][i]}
              </div>
            ))}
          </div>
          <span className="text-sm text-[#c1c6d7]">
            <span className="text-[#e5e2e1] font-semibold">{count}+</span> creators
            already joined
          </span>
        </motion.div>
      </div>
    </section>
  );
}
