"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <section className="relative overflow-hidden px-8 pt-44 pb-32" style={{
      background: 'radial-gradient(circle at 50% -20%, rgba(75, 142, 255, 0.15) 0%, rgba(19, 19, 19, 0) 60%)'
    }}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2a] border border-[#414755]/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#ffbc7c] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#c1c6d7]">
            The Creator Operating System
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-8 leading-[1.1]"
        >
          Run your creator business{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffbc7c]">
            like a pro
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#c1c6d7] text-xl max-w-2xl mx-auto mb-12"
        >
          Automate invoices, manage brand deals, and track every ₹ without
          leaving your creative flow. Designed for the modern Indian atelier.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-20"
        >
          <button
            onClick={openTallyForm}
            className="bg-gradient-to-br from-[#adc6ff] to-[#4b8eff] text-[#00285c] px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Join Waitlist
          </button>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative group max-w-6xl mx-auto"
        >
          <div className="absolute -inset-4 bg-[#adc6ff]/10 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-[#201f1f] rounded-2xl p-4 shadow-2xl border border-[#414755]/10">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="grid grid-cols-12 gap-4 min-h-[400px] p-4">
              {/* Sidebar */}
              <div className="col-span-3 space-y-4">
                <div className="h-10 w-full bg-[#2a2a2a] rounded-lg flex items-center px-3">
                  <span className="text-xs font-semibold text-[#e5e2e1]">Dashboard</span>
                </div>
                <div className="bg-[#2a2a2a] rounded-lg p-4 space-y-3">
                  <div className="text-xs text-[#8b90a0] font-medium">Upcoming Call</div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#adc6ff] to-[#4b8eff] flex items-center justify-center text-[10px] font-bold text-[#002e69]">BT</div>
                    <div>
                      <div className="text-xs font-semibold text-[#e5e2e1]">Boat Branding</div>
                      <div className="text-[10px] text-[#8b90a0]">Tomorrow, 3 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main */}
              <div className="col-span-9 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#2a2a2a] rounded-xl p-4">
                    <div className="text-xs text-[#8b90a0] mb-2">Total Revenue</div>
                    <div className="text-xl font-bold text-[#e5e2e1]">₹14,20,000</div>
                    <div className="text-[10px] text-[#22c55e] mt-1">+18% this month</div>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4">
                    <div className="text-xs text-[#8b90a0] mb-2">Active Deals</div>
                    <div className="text-xl font-bold text-[#e5e2e1]">12</div>
                    <div className="text-[10px] text-[#adc6ff] mt-1">3 closing soon</div>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4">
                    <div className="text-xs text-[#8b90a0] mb-2">Pending GST</div>
                    <div className="text-xl font-bold text-[#e5e2e1]">₹1,84,000</div>
                    <div className="text-[10px] text-[#ffbc7c] mt-1">Due in 5 days</div>
                  </div>
                </div>
                <div className="bg-[#2a2a2a] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-[#e5e2e1]">Recent Campaigns</div>
                    <div className="text-xs text-[#adc6ff] cursor-pointer">View all</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#1c1b1b] rounded-lg">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-[#adc6ff] to-[#4b8eff] flex items-center justify-center text-xs font-bold text-[#002e69]">BT</div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#e5e2e1]">Boat Nirvana Launch</div>
                        <div className="text-[10px] text-[#8b90a0]">YouTube Integrated</div>
                      </div>
                      <div className="px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-semibold rounded">Paid</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#1c1b1b] rounded-lg">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-[#ffbc7c] to-[#ff9f4a] flex items-center justify-center text-xs font-bold text-[#4a2800]">ME</div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#e5e2e1]">Mamaearth Face Wash</div>
                        <div className="text-[10px] text-[#8b90a0]">Instagram Reel</div>
                      </div>
                      <div className="px-2 py-1 bg-[#ffbc7c]/20 text-[#ffbc7c] text-[10px] font-semibold rounded">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
