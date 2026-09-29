"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PLATFORMS } from "@/lib/platforms";

/**
 * The one section that explains the product: four cards, each a one-line
 * pitch over a cropped visual. Replaces the old Problems / Showcase /
 * Features / How-it-works / India-first run, which took ~6,500px on a phone
 * to say the same thing. Copy describes shipped behaviour only.
 */

const INDIA = ["₹ INR-native", "GST & TDS ready", "UPI on invoices", "Share on WhatsApp"];

export default function Showcase() {
  return (
    <section id="features" className="relative px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="font-[family-name:var(--font-headline)] text-3xl font-extrabold tracking-tight sm:text-5xl">
            The business behind your content
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#c1c6d7] sm:text-lg">
            Deals, content, invoices and your media kit — built for Indian creators.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card
            label="Brand deals"
            accent="#adc6ff"
            title="Every deal, pitch to paid"
            desc="Track deliverables, deadlines and value in ₹. Turn a finished deal into a GST invoice in one tap."
          >
            <Shot src="/screenshots/app-deals.png" alt="Crezo deals screen" w={1170} h={2532} phone offset={28} />
          </Card>

          <Card
            label="Content calendar"
            accent="#ffbc7c"
            title="Plan every post"
            desc="Schedule reels, videos and stories, tag them to a deal, and get reminded before they're due."
          >
            <Shot src="/screenshots/app-calendar.png" alt="Crezo content calendar" w={1170} h={2532} phone offset={6} />
          </Card>

          <Card
            label="Media kit"
            accent="#e1477e"
            title="A media kit that stays current"
            desc="A shareable link with your platforms, reach and rates. Update it in the app — no more Canva PDFs."
          >
            <MediaKitGraphic />
          </Card>

          <Card
            label="Media vault"
            accent="#c6c6c7"
            title="Your camera roll, sorted by deal"
            desc="Group clips into folders per brand. Files never leave your phone — Crezo only keeps the order."
          >
            <VaultGraphic />
          </Card>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-2">
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

function Card({
  label,
  accent,
  title,
  desc,
  children,
}: {
  label: string;
  accent: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col overflow-hidden rounded-3xl bg-[#1c1b1b]"
    >
      <div className="p-5 pb-4 sm:p-8 sm:pb-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
          {label}
        </div>
        <h3 className="mt-2 font-[family-name:var(--font-headline)] text-xl font-bold sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#c1c6d7]">{desc}</p>
      </div>
      {/* Fixed-height window: the visual is a glimpse, not a full screenshot. */}
      <div className="relative mt-auto h-56 overflow-hidden sm:h-72">{children}</div>
    </motion.article>
  );
}

function Shot({
  src,
  alt,
  w,
  h,
  phone,
  offset = 0,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  phone?: boolean;
  /** Percent of the image's height to scroll past, to frame the useful part. */
  offset?: number;
}) {
  return (
    <>
      <div className={phone ? "flex justify-center px-6" : "pl-6 sm:pl-8"}>
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes="(min-width: 768px) 560px, 100vw"
          style={offset ? { transform: `translateY(-${offset}%)` } : undefined}
          className={
            phone
              ? "w-52 rounded-t-3xl border border-b-0 border-[#414755]/30 sm:w-60"
              : "w-[150%] max-w-none rounded-tl-2xl border border-b-0 border-r-0 border-[#414755]/30 sm:w-[125%]"
          }
        />
      </div>
      <Fade />
    </>
  );
}

function Fade() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1c1b1b] to-transparent" />
  );
}

/** Mirrors the public media kit page ([slug]/page.tsx) with sample data. */
function MediaKitGraphic() {
  const platforms = [
    { id: "instagram", handle: "ananya.creates", followers: "248K", views: "96K" },
    { id: "youtube", handle: "ananyarao", followers: "92K", views: "41K" },
  ];
  return (
    <>
      <div className="mx-6 rounded-t-3xl border border-b-0 border-[#414755]/30 bg-[#131313] p-5 sm:mx-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffbc7c] to-[#e1477e] text-lg font-extrabold text-[#131313]">
              A
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b90a0]">
                Beauty &amp; lifestyle
              </div>
              <div className="text-lg font-extrabold tracking-tight text-[#e5e2e1]">Ananya Rao</div>
            </div>
          </div>
          <span className="hidden rounded-full bg-[#1c1b1b] px-3 py-1.5 text-[11px] text-[#c1c6d7] sm:inline">
            crezo.studio/ananya
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {platforms.map((p) => {
            const spec = PLATFORMS[p.id];
            return (
              <div key={p.id} className="rounded-2xl bg-[#1c1b1b] p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ background: `${spec.color}1F` }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={spec.color} aria-hidden>
                      <path d={spec.path} />
                    </svg>
                  </span>
                  <span className="truncate text-[11px] text-[#8b90a0]">@{p.handle}</span>
                </div>
                <div className="mt-3 flex gap-3">
                  <Stat value={p.followers} label="Followers" />
                  <Stat value={p.views} label="Avg views" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 space-y-2">
          {[
            ["Instagram Reel", "₹45,000"],
            ["YouTube Integration", "₹80,000"],
          ].map(([label, price]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-[#1c1b1b] px-4 py-3">
              <span className="text-xs text-[#c1c6d7]">{label}</span>
              <span className="text-sm font-semibold text-[#e5e2e1]">{price}</span>
            </div>
          ))}
        </div>
      </div>
      <Fade />
    </>
  );
}

/**
 * Folders as the app shows them: a 2x2 peek of the clips inside, plus a count.
 * Product shots are AI images from the Stitch designs; brand names are
 * fictional so the mock never implies a real partnership.
 */
function VaultGraphic() {
  const folders = [
    { brand: "Sonic", campaign: "Earbuds launch", count: 12, shots: ["audio-1", "audio-2", "audio-3"] },
    { brand: "Glow", campaign: "Skincare reel", count: 8, shots: ["skin-1", "skin-2", "skin-3"] },
    { brand: "Horizon", campaign: "Watch campaign", count: 24, shots: ["watch-1", "watch-2"] },
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-3 px-6 sm:px-8">
        {folders.map((f) => (
          <div key={f.brand} className="min-w-0">
            <div className="grid aspect-square grid-cols-2 gap-0.5 overflow-hidden rounded-2xl bg-[#2a2a2a]">
              {f.shots.map((shot) => (
                <Image
                  key={shot}
                  src={`/images/vault/${shot}.jpg`}
                  alt=""
                  width={180}
                  height={180}
                  className="h-full w-full object-cover"
                />
              ))}
              <span
                className={`flex items-center justify-center bg-[#2a2a2a] text-sm font-bold text-[#e5e2e1] ${
                  f.shots.length === 2 ? "col-span-2" : ""
                }`}
              >
                +{f.count - f.shots.length}
              </span>
            </div>
            <div className="mt-2 truncate text-sm font-semibold text-[#e5e2e1]">{f.brand}</div>
            <div className="truncate text-[11px] text-[#8b90a0]">{f.campaign}</div>
          </div>
        ))}
      </div>
      <Fade />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-base font-extrabold text-[#e5e2e1]">{value}</div>
      <div className="whitespace-nowrap text-[10px] text-[#8b90a0]">{label}</div>
    </div>
  );
}
