"use client";

import { motion } from "framer-motion";

const points = [
  { emoji: "₹", label: "INR native" },
  { emoji: "🧾", label: "GST invoicing built-in" },
  { emoji: "📱", label: "UPI details on invoices" },
  { emoji: "💬", label: "WhatsApp-first sharing" },
  { emoji: "🏷️", label: "Pricing in ₹ — affordable for all" },
];

export default function IndiaFirst() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffbc7c]/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block text-5xl mb-6">🇮🇳</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-[family-name:var(--font-headline)]">
            Built for how Indian
            <br />
            creators{" "}
            <span className="bg-gradient-to-r from-[#ffbc7c] to-[#adc6ff] bg-clip-text text-transparent">
              actually work
            </span>
          </h2>
          <p className="text-[#c1c6d7] text-base sm:text-lg max-w-xl mx-auto mb-12">
            Not a US tool with ₹ slapped on. Crezo is designed from day one for
            the Indian creator ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {points.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#1c1b1b] border border-[#353534] text-sm hover:border-[#414755] transition-colors"
            >
              <span className="text-lg">{p.emoji}</span>
              <span className="text-[#e5e2e1]">{p.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
