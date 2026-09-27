import { createClient } from '@supabase/supabase-js';

/**
 * Reads a published media kit. Only ever calls get_media_kit(), a
 * security-definer function that returns the published snapshot and nothing
 * else — this site has no table access, so a creator's private fields cannot
 * be reached from here even by mistake.
 */

export interface Platform {
  id: string; network: string; handle: string; followers: string; avgViews: string;
}

export interface MediaKitData {
  displayName: string;
  photoUrl?: string;
  tagline: string;
  bio: string;
  niche: string;
  contactEmail: string;
  platforms: Platform[];
  brandNames?: string[];
  rates: { label: string; price: string }[];
  show: { platforms: boolean; brands: boolean; rates: boolean; contact: boolean };
}

export async function getMediaKit(slug: string): Promise<MediaKitData | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc('get_media_kit', { p_slug: slug });
  if (error || !data) return null;
  return data as MediaKitData;
}
