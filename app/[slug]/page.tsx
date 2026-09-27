import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMediaKit } from '@/lib/mediaKit';

// The page is a snapshot, not a live view: it only changes when the creator
// presses Update in the app. Revalidating hourly keeps it cheap while still
// picking up a republish without a deploy.
export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const kit = await getMediaKit(slug);
  if (!kit) return { title: 'Not found' };
  return {
    title: `${kit.displayName} — Media kit`,
    description: kit.tagline || kit.bio?.slice(0, 150),
    openGraph: {
      title: `${kit.displayName} — Media kit`,
      description: kit.tagline || undefined,
    },
  };
}

export default async function MediaKitPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const kit = await getMediaKit(slug);
  if (!kit) notFound();

  const initial = (kit.displayName || '?').charAt(0).toUpperCase();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <header className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#2A2A2A] text-2xl font-extrabold text-[#ADC6FF]">
          {initial}
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#E5E2E1] sm:text-4xl">
            {kit.displayName}
          </h1>
          {kit.tagline && <p className="mt-1 text-[#C1C6D7]">{kit.tagline}</p>}
        </div>
      </header>

      {kit.bio && (
        <p className="mt-10 text-lg leading-relaxed text-[#C1C6D7]">{kit.bio}</p>
      )}

      {kit.show?.platforms && kit.platforms?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">
            Platforms
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {kit.platforms.map((p) => (
              <div key={p.id} className="rounded-2xl bg-[#1C1B1B] p-5">
                <div className="text-sm font-semibold text-[#E5E2E1]">{p.network}</div>
                {p.handle && <div className="mt-0.5 text-sm text-[#8B90A0]">{p.handle}</div>}
                <div className="mt-4 flex gap-6">
                  {p.followers && (
                    <div>
                      <div className="text-2xl font-extrabold tracking-tight text-[#ADC6FF]">{p.followers}</div>
                      <div className="text-[11px] uppercase tracking-wider text-[#8B90A0]">Followers</div>
                    </div>
                  )}
                  {p.avgViews && (
                    <div>
                      <div className="text-2xl font-extrabold tracking-tight text-[#E5E2E1]">{p.avgViews}</div>
                      <div className="text-[11px] uppercase tracking-wider text-[#8B90A0]">Avg views</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {kit.show?.brands && (kit.brandNames?.length ?? 0) > 0 && (
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">
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

      {kit.show?.rates && kit.rates?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B90A0]">Rates</h2>
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
        <section className="mt-12">
          <a href={`mailto:${kit.contactEmail}`}
             className="inline-flex h-14 items-center rounded-2xl bg-gradient-to-br from-[#ADC6FF] to-[#4B8EFF] px-7 font-bold text-[#00285C]">
            Get in touch
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
