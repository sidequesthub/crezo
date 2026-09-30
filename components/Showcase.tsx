"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { PLATFORMS, audienceLabel } from "@/lib/platforms";

/**
 * What Crezo does: four alternating sections, each a short pitch with three
 * points beside a tilted, floating phone showing the real app. Copy describes
 * shipped behaviour only; phone screens are real screenshots or rebuilt from
 * the real layouts, never invented UI.
 */

const INDIA = ["₹ INR-native", "GST & TDS ready", "Share on WhatsApp"];

export default function Showcase() {
  return (
    <section id="features" className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center sm:mb-8"
        >
          <h2 className="font-[family-name:var(--font-headline)] text-[min(1.875rem,7vw)] font-extrabold tracking-tight sm:text-4xl">
            Everything behind your content
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#c1c6d7] sm:text-lg">
            From the first pitch to the final payment.
          </p>
        </motion.div>

        <Feature
          label="Brand deals"
          accent="#adc6ff"
          title="Every brand deal, handled."
          desc="Track deliverables, deadlines and value in ₹ — from the first pitch to the final payment."
          points={[
            "Every deal from lead to paid, filterable by stage",
            "Earned vs pending for each financial year",
            "Turn a finished deal into a GST invoice in one tap",
          ]}
          screen={<DealsScreen />}
        />
        <Feature
          reverse
          label="Content calendar"
          accent="#ffbc7c"
          title="Plan every post."
          desc="Reels, videos and stories on one calendar, each tagged to the deal it's for."
          points={[
            "Month and week views of everything you're posting",
            "Reminders before a deliverable is due",
            "Subscribe from Google or Apple Calendar",
          ]}
          screen={<CalendarScreen />}
        />
        <Feature
          label="Media kit"
          accent="#e1477e"
          title="A media kit that stays current."
          desc="One link to send brands, with the platforms, reach and rates you choose to show."
          points={[
            "Your own page at crezo.studio/yourname",
            "Update it in the app — the link never changes",
            "No more exporting Canva PDFs",
          ]}
          screen={<MediaKitScreen />}
        />
        <Feature
          reverse
          label="Media vault"
          accent="#c6c6c7"
          title="Your camera roll, sorted by deal."
          desc="Group clips into folders per brand. Files never leave your phone — Crezo only keeps the order."
          points={[
            "A folder for every brand deal",
            "Pick clips straight from your camera roll",
            "Find any campaign's footage in seconds",
          ]}
          screen={<VaultScreen />}
        />

        <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-8">
          {INDIA.map((t) => (
            <li
              key={t}
              className="rounded-full bg-[#1c1b1b] px-4 py-2 text-xs font-semibold text-[#c1c6d7] sm:text-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Feature({
  label,
  accent,
  title,
  desc,
  points,
  screen,
  reverse = false,
}: {
  label: string;
  accent: string;
  title: string;
  desc: string;
  points: string[];
  screen: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 py-8 md:grid-cols-2 md:gap-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className={reverse ? "md:order-2" : ""}
      >
        <div className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
          {label}
        </div>
        <h3 className="mt-3 font-[family-name:var(--font-headline)] text-2xl font-extrabold tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-[#c1c6d7]">{desc}</p>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm text-[#e5e2e1]">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: `${accent}1F` }}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {p}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className={reverse ? "md:order-1" : ""}>
        {/* Tilt toward the text: phones on the right lean left, and vice versa. */}
        <FloatingPhone lean={reverse ? "right" : "left"}>{screen}</FloatingPhone>
      </div>
    </div>
  );
}

/**
 * A phone frame in 3D: tilted toward the copy, bobbing gently. The float
 * stops for visitors who ask for reduced motion.
 */
function FloatingPhone({ lean, children }: { lean: "left" | "right"; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const sign = lean === "left" ? -1 : 1;

  return (
    <div className="relative flex justify-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4b8eff]/20 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          // Framer owns `transform` while animating y, so the tilt goes through its
          // own rotate props; a raw transform string here would be overwritten.
          style={{ rotateY: sign * 18, rotateX: 8, rotateZ: sign * -3, transformPerspective: 1400 }}
          className="relative w-[200px] sm:w-[260px] lg:w-[290px]"
        >
          <div className="rounded-[44px] bg-[#0b0b0b] p-[9px] shadow-[0_60px_100px_-30px_rgba(0,0,0,0.9),0_30px_80px_-40px_rgba(75,142,255,0.45)] ring-1 ring-white/10">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[36px] bg-[#131313]">
              <div className="absolute left-1/2 top-2 z-10 h-[22px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Real Deals screenshot: the top (earnings, two deals) and the real tab bar. */
function DealsScreen() {
  return (
    <>
      <Image
        src="/screenshots/deals-top.png"
        alt="Crezo My Deals screen: earned and pending totals and brand deals"
        width={1170}
        height={1740}
        sizes="290px"
        className="absolute inset-x-0 top-9 w-full"
      />
      <Image
        src="/screenshots/deals-tabbar.png"
        alt=""
        width={1170}
        height={320}
        sizes="290px"
        className="absolute inset-x-0 bottom-0 w-full"
      />
    </>
  );
}

function CalendarScreen() {
  return (
    <Image
      src="/screenshots/calendar-v2.png"
      alt="Crezo content calendar"
      width={1170}
      height={2382}
      sizes="290px"
      className="absolute inset-x-0 top-9 w-full"
    />
  );
}

/** The public media kit page, as it looks opened from its link. */
function MediaKitScreen() {
  const platforms = [
    { id: "instagram", handle: "ananya.creates", followers: "248K", views: "96K" },
    { id: "youtube", handle: "ananyarao", followers: "92K", views: "41K" },
  ];
  return (
    <div className="absolute inset-0 px-4 pt-10">
      <div className="mx-auto w-fit rounded-full bg-[#1c1b1b] px-3 py-1 text-[10px] text-[#c1c6d7]">
        crezo.studio/ananya
      </div>

      <div className="mt-5 flex items-center gap-3">
        {/* The source is a circle on white; scale-110 crops the white rim. */}
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/ananya.jpg"
            alt="Ananya Rao"
            width={112}
            height={112}
            className="h-full w-full scale-110 object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8b90a0]">
            Beauty &amp; lifestyle
          </div>
          <div className="text-lg font-extrabold leading-tight tracking-tight text-[#e5e2e1]">Ananya Rao</div>
        </div>
      </div>

      <div className="mt-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8b90a0]">Platforms</div>
      <div className="mt-2 space-y-2">
        {platforms.map((p) => {
          const spec = PLATFORMS[p.id];
          return (
            <div key={p.id} className="rounded-2xl bg-[#1c1b1b] p-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-lg"
                  style={{ background: `${spec.color}1F` }}
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill={spec.color} aria-hidden>
                    <path d={spec.path} />
                  </svg>
                </span>
                <span className="truncate text-[10px] text-[#8b90a0]">@{p.handle}</span>
              </div>
              <div className="mt-2 flex gap-5">
                <Stat value={p.followers} label={audienceLabel(p.id)} />
                <Stat value={p.views} label="Avg views" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8b90a0]">Rates</div>
      <div className="mt-2 space-y-1.5">
        {[
          ["Instagram Reel", "₹45,000"],
          ["YouTube Integration", "₹80,000"],
        ].map(([label, price]) => (
          <div key={label} className="flex items-center justify-between rounded-xl bg-[#1c1b1b] px-3 py-2">
            <span className="text-[10px] text-[#c1c6d7]">{label}</span>
            <span className="text-xs font-semibold text-[#e5e2e1]">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Vault folders: a 2x2 peek of the clips inside, plus a count. Product shots
 * are AI images from the Stitch designs; brand names are fictional so the mock
 * never implies a real partnership.
 */
function VaultScreen() {
  const folders = [
    { brand: "Sonic", campaign: "Earbuds launch", count: 12, shots: ["audio-1", "audio-2", "audio-3"] },
    { brand: "Glow", campaign: "Skincare reel", count: 8, shots: ["skin-1", "skin-2", "skin-3"] },
    { brand: "Horizon", campaign: "Watch campaign", count: 24, shots: ["watch-1", "watch-2"] },
  ];
  return (
    <div className="absolute inset-0 px-4 pt-11">
      <div className="font-[family-name:var(--font-headline)] text-2xl font-extrabold tracking-tight text-[#e5e2e1]">
        Vault
      </div>
      {/* The app's three tabs, Folders selected. */}
      <div className="mt-3 flex rounded-full bg-[#1c1b1b] p-0.5 text-[10px] font-semibold">
        {["Folders", "All media", "Albums"].map((t, i) => (
          <span
            key={t}
            className={`flex-1 rounded-full py-1.5 text-center ${i === 0 ? "bg-[#353534] text-[#e5e2e1]" : "text-[#8b90a0]"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {folders.map((f) => (
          <div key={f.brand} className="min-w-0">
            <div className="grid aspect-square grid-cols-2 gap-0.5 overflow-hidden rounded-2xl bg-[#2a2a2a]">
              {f.shots.map((shot) => (
                <Image
                  key={shot}
                  src={`/images/vault/${shot}.jpg`}
                  alt=""
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              ))}
              <span
                className={`flex items-center justify-center bg-[#2a2a2a] text-xs font-bold text-[#e5e2e1] ${
                  f.shots.length === 2 ? "col-span-2" : ""
                }`}
              >
                +{f.count - f.shots.length}
              </span>
            </div>
            <div className="mt-1.5 truncate text-xs font-semibold text-[#e5e2e1]">{f.brand}</div>
            <div className="truncate text-[10px] text-[#8b90a0]">{f.campaign}</div>
          </div>
        ))}
        <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#414755] text-[#8b90a0]">
          <span className="text-lg leading-none">+</span>
          <span className="text-[10px] font-semibold">New folder</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-sm font-extrabold text-[#e5e2e1]">{value}</div>
      <div className="whitespace-nowrap text-[9px] text-[#8b90a0]">{label}</div>
    </div>
  );
}
