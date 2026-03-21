"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductShowcase() {
  return (
    <section id="showcase" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#adc6ff]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#ffbc7c]/6 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-headline)] mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-[#adc6ff] to-[#4b8eff] bg-clip-text text-transparent">
              Digital Atelier
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#c1c6d7] max-w-2xl mx-auto">
            Manage brand deals, track revenue, and organize your content — all
            in a premium workspace designed for Indian creators.
          </p>
        </motion.div>

        {/* Brand Deal Manager Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-3 py-1 rounded-full bg-[#1c1b1b] border border-[#414755]/30 text-xs text-[#adc6ff] font-medium mb-4">
                Brand Deals
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-headline)] mb-4">
                Track every deal, from pitch to payment
              </h3>
              <p className="text-[#c1c6d7] mb-6 leading-relaxed">
                Manage negotiations, deliverables, and payments in one place.
                Generate GST-compliant invoices instantly. Never miss a
                milestone or payment again.
              </p>
              <ul className="space-y-3">
                {[
                  "Pipeline view for all brand conversations",
                  "Automatic invoice generation with GST",
                  "Payment reminders and follow-ups",
                  "Contract templates for quick negotiations",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#adc6ff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#adc6ff]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-[#e5e2e1]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-xl overflow-hidden border border-[#414755]/20 shadow-2xl bg-[#1c1b1b]">
                <Image
                  src="/screenshots/brand-deal-manager.png"
                  alt="Brand Deal Manager Dashboard"
                  width={2560}
                  height={2048}
                  quality={95}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#adc6ff]/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Asset Vault Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="relative rounded-xl overflow-hidden border border-[#414755]/20 shadow-2xl bg-[#1c1b1b]">
                <Image
                  src="/screenshots/asset-vault.png"
                  alt="Asset Vault - Media Library"
                  width={2560}
                  height={2756}
                  quality={95}
                  className="w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ffbc7c]/20 rounded-full blur-2xl" />
              </div>
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#1c1b1b] border border-[#414755]/30 text-xs text-[#ffbc7c] font-medium mb-4">
                Media Vault
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-headline)] mb-4">
                Your personal content library
              </h3>
              <p className="text-[#c1c6d7] mb-6 leading-relaxed">
                Store, organize, and access all your content in one secure
                place. Smart tagging, easy search, and quick sharing make
                content management effortless.
              </p>
              <ul className="space-y-3">
                {[
                  "Unlimited cloud storage for all media",
                  "AI-powered tagging and search",
                  "Quick sharing with watermarks",
                  "Version history and backups",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ffbc7c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#ffbc7c]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-[#e5e2e1]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Mobile Dashboard Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <div className="glass-card max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e0e0e] border border-[#414755]/30 text-xs text-[#c1c6d7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-pulse" />
              Available on mobile & desktop
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-headline)] mb-4">
              Your creator dashboard, everywhere
            </h3>
            <p className="text-[#c1c6d7] mb-8 max-w-xl mx-auto">
              Access your entire creator business from any device. Desktop for
              deep work, mobile for on-the-go updates.
            </p>
            <div className="flex justify-center">
              <Image
                src="/screenshots/mobile-dashboard.png"
                alt="Mobile Dashboard"
                width={780}
                height={2502}
                quality={95}
                className="max-w-xs rounded-xl border border-[#414755]/20 shadow-xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
