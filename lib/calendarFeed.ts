import { createClient } from '@supabase/supabase-js';

/**
 * A creator's content plan as an iCalendar (.ics) feed, for subscribing from
 * Google, Apple or Outlook Calendar.
 *
 * Like the media kit, this only calls one security-definer function,
 * calendar_feed_events(token), which returns what a calendar entry needs and
 * nothing else — no amounts, no notes. The token in the URL is the only key.
 */

interface Slot {
  id: string; title: string | null; platform: string | null; status: string | null;
  date: string; time: string | null; brand: string | null; updated_at: string | null;
}
interface Deliverable {
  id: string; title: string | null; platform: string | null; status: string | null;
  date: string; deal: string | null; brand: string | null; updated_at: string | null;
}
interface Feed { slots: Slot[]; deliverables: Deliverable[] }

const PLATFORM: Record<string, string> = {
  ig_reel: 'Reel', yt_video: 'YouTube video', yt_short: 'YouTube Short',
  story: 'Story', post: 'Post', other: 'Content',
};

export async function getFeed(token: string): Promise<Feed | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc('calendar_feed_events', { p_token: token });
  if (error || !data) return null;
  return data as Feed;
}

// ---------------------------------------------------------------- iCalendar

/** RFC 5545 text escaping. */
function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Lines longer than 75 octets are folded; a continuation starts with a space. */
function fold(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let current = '';
  let size = 0;
  for (const ch of line) {                       // iterate by code point, never split a character
    const n = new TextEncoder().encode(ch).length;
    const limit = out.length === 0 ? 75 : 74;    // continuation lines lose one octet to the space
    if (size + n > limit) { out.push(current); current = ''; size = 0; }
    current += ch; size += n;
  }
  out.push(current);
  return out.join('\r\n ');
}

const ymd = (d: string) => d.replace(/-/g, '');
function nextDay(d: string): string {
  const t = new Date(`${d}T00:00:00Z`);
  t.setUTCDate(t.getUTCDate() + 1);
  return t.toISOString().slice(0, 10).replace(/-/g, '');
}
function stamp(iso: string | null | undefined): string {
  const t = iso ? new Date(iso) : new Date();
  return t.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function event(lines: string[]): string[] {
  return ['BEGIN:VEVENT', ...lines, 'END:VEVENT'];
}

export function toICS(feed: Feed): string {
  const now = stamp(null);
  const out: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Crezo//Content calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Crezo',
    'X-WR-CALDESC:Your content plan and deadlines from Crezo',
    'X-WR-TIMEZONE:Asia/Kolkata',
    // Hints only — Google in particular refreshes on its own schedule.
    'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
    'X-PUBLISHED-TTL:PT1H',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'END:STANDARD',
    'END:VTIMEZONE',
  ];

  // Planned content. A slot with a time is a 30-minute event at that time;
  // without one it is an all-day entry.
  for (const s of feed.slots) {
    const kind = PLATFORM[s.platform ?? 'other'] ?? 'Content';
    const posted = s.status === 'posted';
    const summary = `${posted ? '✓ ' : ''}${kind}: ${s.title || 'Untitled'}${s.brand ? ` · ${s.brand}` : ''}`;
    const when = s.time
      ? [`DTSTART;TZID=Asia/Kolkata:${ymd(s.date)}T${s.time.slice(0, 5).replace(':', '')}00`, 'DURATION:PT30M']
      : [`DTSTART;VALUE=DATE:${ymd(s.date)}`, `DTEND;VALUE=DATE:${nextDay(s.date)}`];
    out.push(...event([
      `UID:slot-${s.id}@crezo.studio`,
      `DTSTAMP:${now}`,
      `LAST-MODIFIED:${stamp(s.updated_at)}`,
      ...when,
      `SUMMARY:${esc(summary)}`,
      `DESCRIPTION:${esc(`${kind}${s.brand ? ` for ${s.brand}` : ''}. Edit it in the Crezo app.`)}`,
      'TRANSP:TRANSPARENT',                        // a plan, not a meeting: don't show as busy
    ]));
  }

  // Deliverable deadlines, all-day.
  for (const d of feed.deliverables) {
    const done = d.status === 'done';
    const what = d.title || PLATFORM[d.platform ?? 'other'] || 'Deliverable';
    const summary = `${done ? '✓ ' : 'Due: '}${what}${d.brand ? ` · ${d.brand}` : ''}`;
    out.push(...event([
      `UID:due-${d.id}@crezo.studio`,
      `DTSTAMP:${now}`,
      `LAST-MODIFIED:${stamp(d.updated_at)}`,
      `DTSTART;VALUE=DATE:${ymd(d.date)}`,
      `DTEND;VALUE=DATE:${nextDay(d.date)}`,
      `SUMMARY:${esc(summary)}`,
      `DESCRIPTION:${esc(`Deliverable${d.deal ? ` for "${d.deal}"` : ''}${d.brand ? ` (${d.brand})` : ''}. Edit it in the Crezo app.`)}`,
      'TRANSP:TRANSPARENT',
    ]));
  }

  out.push('END:VCALENDAR');
  return out.map(fold).join('\r\n') + '\r\n';
}
