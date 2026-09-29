"use client";

import { useState } from "react";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "₹0",
    period: "/month",
    subtitle: "Perfect for getting started",
    badge: null,
    featured: false,
    dimmed: false,
    features: [
      "Up to 3 active brand deals",
      "Content calendar",
      "Basic media vault (1 deal album)",
      "Media kit page (crezo.studio/yourname)",
      "Community support",
    ],
    cta: "Start Free",
    ctaStyle: "border border-[#414755] hover:border-[#adc6ff] text-white",
    note: "No credit card required",
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    subtitle: "For serious creators",
    badge: "Most Popular",
    featured: true,
    dimmed: false,
    features: [
      "Unlimited brand deals",
      "Full content calendar with reminders",
      "Unlimited media vault albums",
      "GST invoicing with PDF export",
      "Payment tracking & reminders",
      "Usage rights & contract storage",
      "Priority support",
    ],
    cta: "Join Waitlist — Pro",
    ctaStyle: "primary-gradient hover:opacity-90 text-[#16140f]",
    note: null,
  },
  {
    name: "Business",
    price: "₹799",
    period: "/month",
    subtitle: "For creators with managers & teams",
    badge: "Coming Soon",
    featured: false,
    dimmed: true,
    features: [
      "Everything in Pro",
      "Manager dashboard (multiple creators)",
      "Team collaboration",
      "Bulk invoicing",
      "Commission tracking",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Notify Me",
    ctaStyle: "border border-[#414755] hover:border-[#ffbc7c] text-white",
    note: null,
  },
];

export default function Pricing() {
  // Phones show one plan at a time behind a switch; desktop shows all three.
  const [selected, setSelected] = useState("Pro");

  return (
    <section id="pricing" className="pt-8 pb-16 sm:pt-16 sm:pb-32 relative">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#adc6ff]/8 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-headline)]">
            Simple pricing.{" "}
            <span className="text-[#c1c6d7]">No surprises.</span>
          </h2>
          <p className="mt-4 text-[#c1c6d7] text-base sm:text-lg">
            Start free. Upgrade when you grow.
          </p>
        </motion.div>

        <div className="mx-auto mb-6 flex w-fit rounded-full bg-[#1c1b1b] p-1 md:hidden" role="tablist">
          {tiers.map((t) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={selected === t.name}
              onClick={() => setSelected(t.name)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selected === t.name ? "bg-[#353534] text-[#e5e2e1]" : "text-[#8b90a0]"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* One fade for the block: per-card fades stall when a hidden plan is switched in. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="md:grid md:grid-cols-3 md:items-start md:gap-6"
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 sm:p-8 border transition-all ${
                tier.name === selected ? "block" : "hidden"
              } md:block ${
                tier.featured
                  ? "bg-[#1c1b1b] border-[#adc6ff]/40 glow-blue md:scale-[1.02]"
                  : "bg-[#1c1b1b] border-[#353534]"
              } ${tier.dimmed ? "opacity-70" : ""}`}
            >
              {tier.badge && (
                <div
                  className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold ${
                    tier.featured
                      ? "primary-gradient text-[#16140f]"
                      : "bg-[#353534] text-[#c1c6d7]"
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
              <p className="text-sm text-[#c1c6d7] mb-5">{tier.subtitle}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold">{tier.price}</span>
                <span className="text-[#c1c6d7] text-sm">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-[#e5e2e1]"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="none"
                      stroke={tier.featured ? "#adc6ff" : "#c1c6d7"}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all ${tier.ctaStyle}`}
              >
                {tier.cta}
              </a>

              {tier.note && (
                <p className="mt-3 text-center text-xs text-[#8b90a0]">
                  {tier.note}
                </p>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6 sm:mt-10 space-y-2"
        >
          <p className="text-sm text-[#c1c6d7]">
            All prices in ₹ INR. Cancel anytime. No hidden fees.
          </p>
          <p className="text-sm text-[#ffbc7c] font-medium">
            Early adopters get Pro free for 3 months
          </p>
        </motion.div>
      </div>
    </section>
  );
}
