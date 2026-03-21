"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "calendar_month",
    title: "Messy Calendars",
    desc: "No more double-booked shoots or missed deadlines. One source of truth for your content flow.",
  },
  {
    icon: "payments",
    title: "Pending Payments",
    desc: 'Automated follow-ups for brand payments so you never have to send awkward "Just checking" emails again.',
  },
  {
    icon: "description",
    title: "Tax Confusion",
    desc: "Proper GST-compliant invoicing tailored for Indian creators. Stay compliant without the headache.",
  },
  {
    icon: "folder_shared",
    title: "Scattered Assets",
    desc: "Stop hunting for logos and RAW files across WhatsApp and Google Drive. Everything in one vault.",
  },
];

export default function Problems() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-[family-name:var(--font-headline)] font-extrabold mb-4">
            Stop the <span className="text-[#ffbc7c]">Administrative Chaos</span>
          </h2>
          <p className="text-[#c1c6d7] max-w-xl">
            Focus on creating while Crezo handles the friction of running a business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 bg-[#1c1b1b] rounded-xl border-t border-[#414755]/10"
            >
              <span className="material-symbols-outlined text-[#ffbc7c] mb-6 text-3xl block">
                {problem.icon}
              </span>
              <h3 className="font-[family-name:var(--font-headline)] font-bold text-lg mb-3">
                {problem.title}
              </h3>
              <p className="text-sm text-[#c1c6d7] leading-relaxed">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
