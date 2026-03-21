"use client";

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
    ctaStyle: "primary-gradient hover:opacity-90 text-[#002e69]",
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
  return (
    <section id="pricing" className="pt-16 pb-24 sm:pt-20 sm:pb-32 relative">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#adc6ff]/8 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-headline)]">
            Simple pricing.{" "}
            <span className="text-[#c1c6d7]">No surprises.</span>
          </h2>
          <p className="mt-4 text-[#c1c6d7] text-base sm:text-lg">
            Start free. Upgrade when you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 sm:p-8 border transition-all ${
                tier.featured
                  ? "bg-[#1c1b1b] border-[#adc6ff]/40 glow-blue scale-[1.02]"
                  : "bg-[#1c1b1b] border-[#353534]"
              } ${tier.dimmed ? "opacity-70" : ""}`}
            >
              {tier.badge && (
                <div
                  className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold ${
                    tier.featured
                      ? "primary-gradient text-[#002e69]"
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 space-y-2"
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
