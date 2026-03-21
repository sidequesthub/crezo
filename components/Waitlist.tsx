"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(127);

  useEffect(() => {
    // Simulate a slowly increasing count
    const stored = localStorage.getItem("crezo_waitlist");
    if (stored) {
      const list = JSON.parse(stored);
      setCount(127 + list.length);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const existing = JSON.parse(localStorage.getItem("crezo_waitlist") || "[]");
    existing.push({ email, date: new Date().toISOString() });
    localStorage.setItem("crezo_waitlist", JSON.stringify(existing));
    setSubmitted(true);
    setCount((c) => c + 1);
    setEmail("");
  };

  return (
    <section id="waitlist" className="py-24 sm:py-32 relative">
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

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          {!submitted ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#1c1b1b] border border-[#414755]/20 text-[#e5e2e1] placeholder-[#8b90a0] focus:outline-none focus:border-[#adc6ff] transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl primary-gradient hover:opacity-90 font-semibold text-sm transition-all hover:shadow-[0_0_30px_rgba(173,198,255,0.3)] cursor-pointer whitespace-nowrap text-[#002e69]"
              >
                Join Waitlist
              </button>
            </>
          ) : (
            <div className="w-full text-center py-3.5 px-4 rounded-xl bg-[#1c1b1b] border border-[#22c55e]/30 text-[#22c55e] text-sm font-medium">
              Welcome aboard! We&apos;ll let you know when Crezo is ready.
            </div>
          )}
        </motion.form>

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
