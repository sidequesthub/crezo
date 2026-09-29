"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TALLY_FORM_URL = "https://tally.so/r/q4PyD5";

export default function Hero() {
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
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 sm:px-8 pt-24 pb-12" style={{
      background: 'radial-gradient(circle at 50% -20%, rgba(75, 142, 255, 0.15) 0%, rgba(19, 19, 19, 0) 60%)'
    }}>
      {/* Wide screens (lg+): pitch left, the real app right, both in the first screen.
          Phones: pitch only — the feature cards below carry the screenshots. */}
      {/* The hero owns the first screen; the features start below the fold. */}
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="text-center lg:text-left">
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
            className="text-[min(2.25rem,9.2vw)] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-balance font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.05]"
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
            className="text-[#c1c6d7] text-base sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 px-4 lg:px-0"
          >
            Plan content, track payments, send GST invoices and share your media
            kit — one app built for Indian creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-start"
          >
            <button
              onClick={openTallyForm}
              className="primary-gradient text-[#16140f] shadow-[0_8px_24px_rgba(0,0,0,0.45)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              Join Waitlist
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden justify-center lg:flex"
        >
          <div className="absolute inset-10 rounded-full bg-[#4b8eff]/20 blur-3xl" />
          <div className="relative h-[450px] w-[300px] overflow-hidden rounded-t-[36px] border border-b-0 border-[#414755]/40 bg-[#131313] pt-6 shadow-2xl">
            <Image
              src="/screenshots/deals-v2.png"
              alt="Crezo on iPhone — My Deals"
              width={1170}
              height={2382}
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#131313] to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
