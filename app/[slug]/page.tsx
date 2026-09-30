import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMediaKit } from '@/lib/mediaKit';
import { PLATFORMS, profileUrlFor, normaliseHandle, audienceLabel } from '@/lib/platforms';

// A snapshot, not a live view: it only changes when the creator republishes.
// Revalidating hourly picks that up without a deploy.
export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const kit = await getMediaKit(slug);
  if (!kit) return { title: 'Not found' };

  const title = `${kit.displayName} | Media kit`;
  const description = kit.tagline || kit.bio?.slice(0, 150) || undefined;
  return {
    title,
    description,
    // Brands share these links in Slack and WhatsApp; the preview card is
    // the first impression more often than the page itself.
    openGraph: {
      title,
      description,
      images: kit.photoUrl ? [{ url: kit.photoUrl }] : undefined,
      type: 'profile',
    },
    twitter: { card: 'summary', title, description },
  };
}

/** "248K", "1.2M", "3.5 lakh", "45,000" → a number. null when it isn't one. */
function parseCount(raw: string | undefined): number | null {
  if (!raw) return null;
  const m = raw.trim().toLowerCase().replace(/,/g, '').match(/^(\d+(?:\.\d+)?)\s*(k|m|l|lakh|lac|cr|crore)?$/);
  if (!m) return null;
  const mult: Record<string, number> = { k: 1e3, m: 1e6, l: 1e5, lakh: 1e5, lac: 1e5, cr: 1e7, crore: 1e7 };
  return Number(m[1]) * (m[2] ? mult[m[2]] : 1);
}

function formatCount(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '')}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return String(n);
}

function Logo({ network, size = 'md' }: { network: string; size?: 'sm' | 'md' }) {
  const spec = PLATFORMS[network];
  const box = size === 'sm' ? 'h-4 w-4 rounded' : 'h-11 w-11 rounded-[14px]';
  const glyph = size === 'sm' ? 'h-2.5 w-2.5' : 'h-5 w-5';
  return (
    <span className={`flex shrink-0 items-center justify-center ${box}`} style={{ background: `${spec.color}1F` }}>
      <svg viewBox="0 0 24 24" className={glyph} fill={spec.color} aria-hidden>
        <path d={spec.path} />
      </svg>
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">{children}</h2>
  );
}

export default async function MediaKitPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const kit = await getMediaKit(slug);
  if (!kit) notFound();

  const initial = (kit.displayName || '?').charAt(0).toUpperCase();
  const firstName = kit.displayName.split(' ')[0] || 'me';
  const platforms = (kit.platforms ?? []).filter((p) => PLATFORMS[p.network]);

  // Total reach only when every listed audience is a readable number; a
  // guessed total would misstate the creator to a brand.
  const counts = platforms.map((p) => parseCount(p.followers));
  const totalReach =
    kit.show?.platforms && platforms.length > 1 && counts.every((c) => c !== null)
      ? (counts as number[]).reduce((a, b) => a + b, 0)
      : null;

  const contact = kit.show?.contact && kit.contactEmail && (
    <a
      href={`mailto:${kit.contactEmail}`}
      className="primary-gradient flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-bold text-[#16140F] transition-opacity hover:opacity-90"
    >
      Work with {firstName} <span aria-hidden>→</span>
    </a>
  );

  return (
    <main className="relative mx-auto min-h-screen max-w-md px-5 pb-16 pt-8 sm:max-w-lg md:max-w-5xl md:px-10 md:pt-16">
      {/* Ambient light, the one "shadow" this design system allows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-0 h-[420px] w-[420px] rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(75,142,255,.20) 0%, rgba(75,142,255,.05) 55%, transparent 75%)',
        }}
      />

      {/* Phones: a compact header so the first screen shows who this is and
          their reach, not just a photo. Desktop: a sticky profile column
          beside the numbers. */}
      <div className="relative md:grid md:grid-cols-[320px_1fr] md:gap-14">
        <aside className="md:sticky md:top-12 md:self-start">
          <div className="flex items-center gap-4 md:block">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[28px] bg-[#1C1B1B] md:h-auto md:w-full md:rounded-[32px]">
              {kit.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={kit.photoUrl}
                  alt={kit.displayName}
                  className="h-full w-full object-cover md:aspect-[4/5]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-extrabold text-[#ADC6FF] md:aspect-[4/5] md:text-7xl">
                  {initial}
                </div>
              )}
            </div>
            <div className="min-w-0 md:mt-7">
              {kit.niche && (
                <span className="inline-block rounded-full bg-[#1C1B1B] px-3 py-1 text-xs text-[#C1C6D7]">
                  {kit.niche}
                </span>
              )}
              <h1 className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#E5E2E1] md:mt-3 md:text-4xl">
                {kit.displayName}
              </h1>
            </div>
          </div>
          {kit.tagline && <p className="mt-5 text-lg font-semibold text-[#ADC6FF] md:mt-2">{kit.tagline}</p>}
          {kit.bio && <p className="mt-3 leading-relaxed text-[#C1C6D7]">{kit.bio}</p>}
          {contact && <div className="mt-8 hidden md:block">{contact}</div>}
        </aside>

        <div className="md:pt-1 md:[&>section:first-child]:mt-0">
          {totalReach !== null && (
            <section className="mt-8 rounded-3xl bg-[#1C1B1B] p-6 md:mt-0">
              <Label>Total reach</Label>
              <div className="mt-2 text-5xl font-extrabold tracking-[-0.03em] text-[#E5E2E1]">
                {formatCount(totalReach)}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#C1C6D7]">
                {platforms.map((p) => (
                  <span key={p.id} className="flex items-center gap-1.5">
                    <Logo network={p.network} size="sm" />
                    {PLATFORMS[p.network].label} {p.followers}
                  </span>
                ))}
              </div>
            </section>
          )}

          {kit.show?.platforms && platforms.length > 0 && (
            <section className="mt-10">
              <Label>Platforms</Label>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {platforms.map((p) => {
                  const spec = PLATFORMS[p.network];
                  const href = profileUrlFor(p.network, p.handle);
                  const handle = normaliseHandle(p.handle);
                  return (
                    <div key={p.id} className="rounded-3xl bg-[#1C1B1B] p-5">
                      <div className="flex items-center gap-3">
                        <Logo network={p.network} />
                        <div className="min-w-0">
                          <div className="font-semibold text-[#E5E2E1]">{spec.label}</div>
                          {handle &&
                            (href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer me"
                                className="block truncate text-sm text-[#8B90A0] underline-offset-4 hover:text-[#C1C6D7] hover:underline"
                              >
                                @{handle} ↗
                              </a>
                            ) : (
                              <div className="truncate text-sm text-[#8B90A0]">@{handle}</div>
                            ))}
                        </div>
                      </div>
                      {(p.followers || p.avgViews) && (
                        <div className="mt-5 grid grid-cols-2 gap-4">
                          {p.followers && <Stat value={p.followers} label={audienceLabel(p.network)} />}
                          {p.avgViews && <Stat value={p.avgViews} label="Avg views" />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {kit.show?.brands && (kit.brandNames?.length ?? 0) > 0 && (
            <section className="mt-10">
              <Label>Worked with</Label>
              <div className="mt-4 flex flex-wrap gap-2">
                {kit.brandNames!.map((name) => (
                  <span key={name} className="rounded-full bg-[#1C1B1B] px-4 py-2 text-sm font-semibold text-[#E5E2E1]">
                    {name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {kit.show?.rates && (kit.rates?.length ?? 0) > 0 && (
            <section className="mt-10">
              <Label>Rates</Label>
              <div className="mt-4 rounded-3xl bg-[#1C1B1B] px-5 py-2">
                {kit.rates.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-[#C1C6D7]">{r.label}</span>
                    <span className="text-lg font-extrabold text-[#E5E2E1]">{r.price}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {contact && <div className="mt-10 md:hidden">{contact}</div>}
        </div>
      </div>

      <footer className="mt-12 text-center text-xs text-[#8B90A0] md:mt-20">
        Media kit powered by{' '}
        <a href="https://crezo.studio" className="font-bold text-[#E5E2E1] hover:underline">
          Crezo
        </a>
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-extrabold tracking-tight text-[#E5E2E1]">{value}</div>
      <div className="mt-0.5 text-xs text-[#8B90A0]">{label}</div>
    </div>
  );
}
