import { getFeed, toICS } from '@/lib/calendarFeed';

export const dynamic = 'force-dynamic';

/**
 * GET /cal/<token>.ics — a creator's calendar subscription.
 * Anything that isn't a well-formed token gets the same 404 as an unknown
 * one, so the endpoint reveals nothing about which tokens exist.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const match = /^([a-f0-9]{64})\.ics$/.exec(file);
  if (!match) return new Response('Not found', { status: 404 });

  const feed = await getFeed(match[1]);
  if (!feed) return new Response('Not found', { status: 404 });

  return new Response(toICS(feed), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="crezo.ics"',
      // The URL is a secret: keep it out of shared caches.
      'Cache-Control': 'private, max-age=300',
      'X-Robots-Tag': 'noindex',
    },
  });
}
