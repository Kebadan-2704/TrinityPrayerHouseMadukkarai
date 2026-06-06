// Server Component — data is fetched at request time on the server.
// No client-side fetch delay; sermons are embedded in the HTML sent to the browser.
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import SermonsClient from './SermonsClient';

// Re-use the same cache window as the API route.
export const revalidate = 3600;

const CHANNEL_ID = 'UCSkJ9TGwrQNb0CJdP4lwItw';
const UPLOADS_PLAYLIST_ID = 'UUSkJ9TGwrQNb0CJdP4lwItw';
const ARCHIVE_SERMON_COUNT = 10;
const LIVE_REPLAY_BUFFER_HOURS = 4;

const FALLBACK_SERMON = {
  videoId: 'dngkoXyTIFU',
  title: 'Sunday Worship Service',
  date: '',
  displayTitle: 'Sunday Worship Service',
};

type Sermon = { videoId: string; title: string; date: string; displayTitle: string };

// ── helpers (shared with API route) ─────────────────────────────────────────

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(parseInt(d, 10)));
}

function parseDate(v?: string) { if (!v) return undefined; const d = new Date(v); return isNaN(d.getTime()) ? undefined : d; }

function cleanTitle(title: string) {
  return title
    .replace(/^[^|]*\|\|\s*/u, '').replace(/🔴\s*🅻🅸🆅🅴\s*\|\|\s*/gu, '')
    .replace(/LIVE\s*\|\|\s*/gi, '').replace(/\s*\|\|\s*Trinity Ministries\.?/gi, '')
    .replace(/\s+/g, ' ').trim();
}

function getEventDate(title: string) {
  const m = title.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i);
  return m ? new Date(`${m[2]} ${m[1]}, ${m[3]}`) : null;
}

type RawSermon = {
  videoId: string; title: string; publishedDate: Date; link?: string;
  actualStartTime?: Date; actualEndTime?: Date; scheduledStartTime?: Date;
  liveBroadcastContent?: string;
};

function shouldShow(s: RawSermon, now = new Date()) {
  const tl = s.title.toLowerCase();
  if ((s.link ?? '').toLowerCase().includes('/shorts/') || tl.includes('#short') || tl.includes('#reel')) return false;
  if ((s.title.match(/#\w/g) ?? []).length >= 2) return false;
  const twt = tl.replace(/#\S+/g, '').trim();
  const service = ['service','sermon','bible study','message','worship','promise','communion'].some(k => twt.includes(k));
  if (!service) return false;
  const isLive = s.liveBroadcastContent === 'upcoming' || s.liveBroadcastContent === 'live' ||
    !!(s.scheduledStartTime || s.actualStartTime || s.actualEndTime);
  if (isLive) {
    if (!s.actualEndTime) return false;
    return now >= new Date(s.actualEndTime.getTime() + LIVE_REPLAY_BUFFER_HOURS * 3600000);
  }
  const ed = getEventDate(s.title);
  if (ed) return now >= new Date(ed.getTime() + (tl.includes('sunday') ? 17 : 26) * 3600000);
  return s.publishedDate <= now && (now.getTime() - s.publishedDate.getTime()) / 3600000 >= 7;
}

function formatSermons(raw: RawSermon[]): Sermon[] {
  const seen = new Set<string>();
  return raw
    .filter(s => { if (!s.videoId || seen.has(s.videoId)) return false; seen.add(s.videoId); return shouldShow(s); })
    .map(s => {
      const d = cleanTitle(s.title);
      return { videoId: s.videoId, title: d, date: s.publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), displayTitle: d };
    });
}

// ── data fetching ────────────────────────────────────────────────────────────

async function fetchFromApi(apiKey: string): Promise<Sermon[]> {
  const sermons: RawSermon[] = [];
  let pageToken = '';
  for (let page = 0; page < 2; page++) {
    const params = new URLSearchParams({ part: 'snippet', maxResults: '50', playlistId: UPLOADS_PLAYLIST_ID, key: apiKey });
    if (pageToken) params.set('pageToken', pageToken);
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`playlistItems ${res.status}`);
    const data = await res.json();
    const items: { snippet?: { title?: string; publishedAt?: string; resourceId?: { videoId?: string } } }[] = data.items ?? [];
    const ids = items.map(i => i.snippet?.resourceId?.videoId ?? '').filter(Boolean);

    const vRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?${new URLSearchParams({ part: 'snippet,liveStreamingDetails', id: ids.join(','), key: apiKey })}`, { next: { revalidate: 3600 } });
    const vData = vRes.ok ? await vRes.json() : { items: [] };
    const vMap = new Map((vData.items ?? []).map((v: { id?: string }) => [v.id, v]));

    sermons.push(...items.map(item => {
      const ps = item.snippet ?? {};
      const vid = String(ps.resourceId?.videoId ?? '');
      const d = vMap.get(vid) as { snippet?: { title?: string; publishedAt?: string; liveBroadcastContent?: string }; liveStreamingDetails?: { actualStartTime?: string; actualEndTime?: string; scheduledStartTime?: string } } | undefined;
      const sn = d?.snippet ?? ps;
      const ls = d?.liveStreamingDetails ?? {};
      return { videoId: vid, title: String(sn.title ?? ''), publishedDate: new Date(sn.publishedAt ?? ''), actualStartTime: parseDate(ls.actualStartTime), actualEndTime: parseDate(ls.actualEndTime), scheduledStartTime: parseDate(ls.scheduledStartTime), liveBroadcastContent: d?.snippet?.liveBroadcastContent } satisfies RawSermon;
    }));

    pageToken = data.nextPageToken ?? '';
    if (!pageToken || formatSermons(sermons).length >= ARCHIVE_SERMON_COUNT) break;
  }
  return formatSermons(sermons).slice(0, ARCHIVE_SERMON_COUNT);
}

async function fetchFromFeed(): Promise<Sermon[]> {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`feed ${res.status}`);
  const xml = await res.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  const raw: RawSermon[] = entries.map(e => ({
    videoId: decodeXml(e.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/)?.[1] ?? ''),
    title: decodeXml(e.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''),
    publishedDate: new Date(decodeXml(e.match(/<published>([\s\S]*?)<\/published>/)?.[1] ?? '')),
    link: decodeXml(e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? ''),
  }));
  return formatSermons(raw).slice(0, ARCHIVE_SERMON_COUNT);
}

async function getSermons(): Promise<{ latest: Sermon; archive: Sermon[] }> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  try {
    if (apiKey) {
      const s = await fetchFromApi(apiKey);
      if (s.length > 0) return { latest: s[0], archive: s };
    }
  } catch (e) { console.error('YouTube API error:', e); }
  try {
    const s = await fetchFromFeed();
    return { latest: s[0] ?? FALLBACK_SERMON, archive: s };
  } catch (e) { console.error('YouTube feed error:', e); }
  return { latest: FALLBACK_SERMON, archive: [FALLBACK_SERMON] };
}

// ── page ─────────────────────────────────────────────────────────────────────

export default async function Sermons() {
  const { latest, archive } = await getSermons();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Trinity Prayer House Sermons',
    description: 'Latest sermons and messages from Trinity Prayer House Madukkarai.',
    itemListElement: archive.map((sermon, index) => {
      let isoDate = new Date().toISOString();
      try { isoDate = new Date(sermon.date).toISOString(); } catch (e) {}
      
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'VideoObject',
          name: sermon.displayTitle,
          description: `Watch ${sermon.displayTitle} by Trinity Prayer House.`,
          thumbnailUrl: `https://img.youtube.com/vi/${sermon.videoId}/maxresdefault.jpg`,
          uploadDate: isoDate,
          embedUrl: `https://www.youtube.com/embed/${sermon.videoId}`,
          contentUrl: `https://www.youtube.com/watch?v=${sermon.videoId}`
        }
      };
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.pageWrap}>
        {/* Hero header */}
        <section className={`${styles.headerSection} mesh-editorial-header`}>
          <div className={styles.headerBg}>
            <Image src="/slide-4.jpg" alt="Sermons and worship" fill style={{ objectFit: 'cover' }} priority />
            <div className={styles.headerOverlay} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <ScrollReveal delay={80} variant="blurIn">
              <div className={styles.secLabel}>The Word</div>
              <h1>
                <StaggeredText text="Sermons &" el="span" />{' '}
                <i><StaggeredText text="Messages" el="span" /></i>
              </h1>
              <p className={styles.headerP}>
                <StaggeredText text="Be transformed by the Word of God. Watch our latest messages and explore our library of sermons." el="span" />
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Interactive sections — modal, video grid etc. */}
        <SermonsClient latest={latest} archive={archive} />
      </div>
    </>
  );
}
