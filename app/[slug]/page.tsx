import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMediaKit } from '@/lib/mediaKit';
import { PLATFORMS, profileUrlFor, normaliseHandle } from '@/lib/platforms';

// A snapshot, not a live view: it only changes when the creator republishes.
// Revalidating hourly picks that up without a deploy.
export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const kit = await getMediaKit(slug);
  if (!kit) return { title: 'Not found' };

  const title = `${kit.displayName} — Media kit`;
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold tracking-tight text-[#E5E2E1]">{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[#8B90A0]">{label}</div>
    </div>
  );
}

export default async function MediaKitPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const kit = await getMediaKit(slug);
  if (!kit) notFound();

  const initial = (kit.displayName || '?').charAt(0).toUpperCase();
  const platforms = (kit.platforms ?? []).filter((p) => PLATFORMS[p.network]);

  return (
    <main className="relative mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-16 sm:pt-24">
      {/* Ambient light, the one "shadow" this design system allows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(75,142,255,.22) 0%, rgba(75,142,255,.05) 55%, transparent 75%)',
        }}
      />

      <header className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {kit.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={kit.photoUrl}
            alt={kit.displayName}
            className="h-24 w-24 shrink-0 rounded-[28px] object-cover sm:h-28 sm:w-28"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[28px] bg-[#2A2A2A] text-3xl font-extrabold text-[#ADC6FF] sm:h-28 sm:w-28">
            {initial}
          </div>
        )}
        <div className="min-w-0">
          {kit.niche && (
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">
              {kit.niche}
            </div>
          )}
          <h1 className="mt-1.5 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#E5E2E1] sm:text-5xl">
            {kit.displayName}
          </h1>
          {kit.tagline && (
            <p className="mt-2.5 text-[#C1C6D7]">{kit.tagline}</p>
          )}
        </div>
      </header>

      {kit.bio && (
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-[#C1C6D7]">{kit.bio}</p>
      )}

      {kit.show?.platforms && platforms.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">
            Platforms
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {platforms.map((p) => {
              const spec = PLATFORMS[p.network];
              const href = profileUrlFor(p.network, p.handle);
              const handle = normaliseHandle(p.handle);
              const Card = (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                      style={{ background: `${spec.color}1F` }}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill={spec.color} aria-hidden>
                        <path d={spec.path} />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#E5E2E1]">{spec.label}</div>
                      {handle && (
                        <div className="truncate text-sm text-[#8B90A0]">@{handle}</div>
                      )}
                    </div>
                  </div>
                  {(p.followers || p.avgViews) && (
                    <div className="mt-5 flex gap-7">
                      {p.followers && <Stat value={p.followers} label="Followers" />}
                      {p.avgViews && <Stat value={p.avgViews} label="Avg views" />}
                    </div>
                  )}
                </>
              );

              return href ? (
                <a
                  key={p.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="group rounded-2xl bg-[#1C1B1B] p-5 transition-colors hover:bg-[#232222]"
                >
                  {Card}
                </a>
              ) : (
                <div key={p.id} className="rounded-2xl bg-[#1C1B1B] p-5">{Card}</div>
              );
            })}
          </div>
        </section>
      )}

      {kit.show?.brands && (kit.brandNames?.length ?? 0) > 0 && (
        <section className="mt-12">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">
            Worked with
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {kit.brandNames!.map((name) => (
              <span key={name} className="rounded-full bg-[#1C1B1B] px-4 py-2 text-sm text-[#C1C6D7]">
                {name}
              </span>
            ))}
          </div>
        </section>
      )}

      {kit.show?.rates && (kit.rates?.length ?? 0) > 0 && (
        <section className="mt-12">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">Rates</h2>
          <div className="mt-4 space-y-2">
            {kit.rates.map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-2xl bg-[#1C1B1B] px-5 py-4">
                <span className="text-sm text-[#C1C6D7]">{r.label}</span>
                <span className="font-semibold text-[#E5E2E1]">{r.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {kit.show?.contact && kit.contactEmail && (
        <section className="mt-14">
          <a
            href={`mailto:${kit.contactEmail}`}
            className="inline-flex h-14 items-center rounded-2xl primary-gradient px-8 font-bold text-[#16140F] transition-opacity hover:opacity-90"
          >
            Work with {kit.displayName.split(' ')[0] || 'me'}
          </a>
        </section>
      )}

      <footer className="mt-20 border-t border-white/[.06] pt-6 text-xs text-[#8B90A0]">
        Media kit powered by{' '}
        <a href="https://crezo.studio" className="text-[#C1C6D7] hover:underline">Crezo</a>
      </footer>
    </main>
  );
}
