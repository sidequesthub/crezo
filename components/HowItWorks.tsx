"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Add your brand deal",
    desc: "Enter the brand, deal value, deliverables, and timeline. Everything in one place.",
    accent: "#adc6ff",
  },
  {
    step: "02",
    title: "Plan, create, organize",
    desc: "Schedule content, track deliverables, and organize your media by deal. Never lose a file again.",
    accent: "#ffbc7c",
  },
  {
    step: "03",
    title: "Invoice & get paid",
    desc: "Generate a GST invoice, share on WhatsApp, track payment. Money in your bank. Done.",
    accent: "#22c55e",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-headline)]">
            How it works
          </h2>
          <p className="mt-4 text-[#c1c6d7] text-base sm:text-lg">
            Three steps. That&apos;s it.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl font-extrabold relative z-10 bg-[#131313]"
                  style={{
                    boxShadow: `0 0 0 8px ${s.accent}15`,
                    color: s.accent,
                  }}
                >
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-[#c1c6d7] leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="sm:hidden flex justify-center my-4">
                    <svg
                      className="w-5 h-5 text-[#414755]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
