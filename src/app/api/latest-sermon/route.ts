import { NextResponse } from 'next/server';

// Cache the route for 1 hour — Vercel/Next.js serves the cached response instantly
// and revalidates in the background so users never wait on YouTube API.
export const revalidate = 3600;

const CHANNEL_ID = 'UCSkJ9TGwrQNb0CJdP4lwItw';
const UPLOADS_PLAYLIST_ID = 'UUSkJ9TGwrQNb0CJdP4lwItw';
const FALLBACK_SERMON = {
  videoId: 'dngkoXyTIFU',
  title: 'Sunday Worship Service',
  date: '',
  displayTitle: 'Sunday Worship Service',
};
const ARCHIVE_SERMON_COUNT = 30;
const LIVE_REPLAY_BUFFER_HOURS = 4;

type RawSermon = {
  videoId: string;
  title: string;
  publishedDate: Date;
  link?: string;
  actualStartTime?: Date;
  actualEndTime?: Date;
  scheduledStartTime?: Date;
  liveBroadcastContent?: string;
};

type Sermon = {
  videoId: string;
  title: string;
  date: string;
  displayTitle: string;
};

type YouTubePlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: {
      videoId?: string;
    };
  };
};

type YouTubePlaylistResponse = {
  items?: YouTubePlaylistItem[];
  nextPageToken?: string;
};

type YouTubeVideoItem = {
  id?: string;
  snippet?: {
    title?: string;
    publishedAt?: string;
    liveBroadcastContent?: string;
  };
  liveStreamingDetails?: {
    actualStartTime?: string;
    actualEndTime?: string;
    scheduledStartTime?: string;
  };
};

type YouTubeVideoResponse = {
  items?: YouTubeVideoItem[];
};

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(parseInt(decimal, 10)));
}

function parseDate(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function cleanTitle(title: string) {
  return title
    .replace(/^[^|]*\|\|\s*/u, '')
    .replace(/🔴\s*🅻🅸🆅🅴\s*\|\|\s*/gu, '')
    .replace(/LIVE\s*\|\|\s*/gi, '')
    .replace(/\s*\|\|\s*Trinity Ministries\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getEventDate(title: string) {
  const match = title.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i);
  if (!match) return null;

  const [, day, month, year] = match;
  return new Date(`${month} ${day}, ${year}`);
}

function shouldShowSermon(sermon: RawSermon, now = new Date()) {
  const titleLower = sermon.title.toLowerCase();
  const linkLower = sermon.link?.toLowerCase() ?? '';

  if (linkLower.includes('/shorts/') || titleLower.includes('#short') || titleLower.includes('#reel')) {
    return false;
  }

  // Reject titles with 2+ hashtags — strong signal of a reel/promotional short
  const hashtagCount = (sermon.title.match(/#\w/g) ?? []).length;
  if (hashtagCount >= 2) return false;

  // Strip hashtag segments before keyword-checking so "#churchservice" doesn't
  // accidentally match the keyword "service"
  const titleWithoutTags = titleLower.replace(/#\S+/g, '').trim();

  const looksLikeService =
    titleWithoutTags.includes('service') ||
    titleWithoutTags.includes('sermon') ||
    titleWithoutTags.includes('bible study') ||
    titleWithoutTags.includes('message') ||
    titleWithoutTags.includes('worship') ||
    titleWithoutTags.includes('promise') ||
    titleWithoutTags.includes('communion');

  if (!looksLikeService) return false;

  const isLiveStream =
    sermon.liveBroadcastContent === 'upcoming' ||
    sermon.liveBroadcastContent === 'live' ||
    Boolean(sermon.scheduledStartTime || sermon.actualStartTime || sermon.actualEndTime);

  if (isLiveStream) {
    if (!sermon.actualEndTime) return false;

    const replayReadyTime = new Date(sermon.actualEndTime.getTime() + LIVE_REPLAY_BUFFER_HOURS * 60 * 60 * 1000);
    return now >= replayReadyTime;
  }

  const eventDate = getEventDate(sermon.title);
  if (eventDate) {
    const safeDisplayHours = titleLower.includes('sunday') ? 17 : 26;
    const safeDisplayTime = new Date(eventDate.getTime() + safeDisplayHours * 60 * 60 * 1000);
    return now >= safeDisplayTime;
  }

  const ageInHours = (now.getTime() - sermon.publishedDate.getTime()) / (1000 * 60 * 60);
  return sermon.publishedDate <= now && ageInHours >= 7;
}

function formatSermons(sermons: RawSermon[]) {
  const seen = new Set<string>();

  return sermons
    .filter((sermon) => {
      if (!sermon.videoId || seen.has(sermon.videoId)) return false;
      seen.add(sermon.videoId);
      return shouldShowSermon(sermon);
    })
    .map((sermon) => {
      const displayTitle = cleanTitle(sermon.title);

      return {
        videoId: sermon.videoId,
        title: displayTitle,
        date: sermon.publishedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        displayTitle,
      };
    });
}

async function getYouTubeVideoDetails(apiKey: string, videoIds: string[]) {
  if (videoIds.length === 0) return new Map<string, YouTubeVideoItem>();

  const params = new URLSearchParams({
    part: 'snippet,liveStreamingDetails',
    id: videoIds.join(','),
    key: apiKey,
  });

  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`YouTube videos API ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as YouTubeVideoResponse;
  const items = Array.isArray(data.items) ? data.items : [];

  return new Map(items.flatMap((item) => (item.id ? [[item.id, item]] : [])));
}

async function getSermonsFromYouTubeApi(apiKey: string) {
  const sermons: RawSermon[] = [];
  let pageToken = '';
  let pageCount = 0;

  while (pageCount < 5) {
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: '50',
      playlistId: UPLOADS_PLAYLIST_ID,
      key: apiKey,
    });

    if (pageToken) params.set('pageToken', pageToken);

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`YouTube API ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as YouTubePlaylistResponse;
    const items = Array.isArray(data.items) ? data.items : [];
    const videoIds = items.map((item) => String(item.snippet?.resourceId?.videoId ?? '')).filter(Boolean);
    const videoDetails = await getYouTubeVideoDetails(apiKey, videoIds);

    sermons.push(
      ...items.map((item): RawSermon => {
        const playlistSnippet = item.snippet ?? {};
        const videoId = String(playlistSnippet.resourceId?.videoId ?? '');
        const details = videoDetails.get(videoId);
        const snippet = details?.snippet ?? playlistSnippet;
        const liveStreamingDetails = details?.liveStreamingDetails ?? {};

        return {
          videoId,
          title: String(snippet.title ?? ''),
          publishedDate: new Date(snippet.publishedAt ?? ''),
          actualStartTime: parseDate(liveStreamingDetails.actualStartTime),
          actualEndTime: parseDate(liveStreamingDetails.actualEndTime),
          scheduledStartTime: parseDate(liveStreamingDetails.scheduledStartTime),
          liveBroadcastContent: details?.snippet?.liveBroadcastContent,
        };
      })
    );

    pageCount += 1;
    pageToken = data.nextPageToken ?? '';

    if (!pageToken || formatSermons(sermons).length >= ARCHIVE_SERMON_COUNT) {
      break;
    }
  }

  return sermons;
}

async function getSermonsFromPublicFeed() {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`YouTube feed ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries.map((entry): RawSermon => {
    const videoId = entry.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/)?.[1] ?? '';
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
    const published = entry.match(/<published>([\s\S]*?)<\/published>/)?.[1] ?? '';
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? '';

    return {
      videoId: decodeXml(videoId),
      title: decodeXml(title),
      publishedDate: new Date(decodeXml(published)),
      link: decodeXml(link),
    };
  });
}

function buildResponse(archive: Sermon[]) {
  return NextResponse.json({
    latest: archive[0] ?? FALLBACK_SERMON,
    archive: archive.slice(0, ARCHIVE_SERMON_COUNT),
  });
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    if (apiKey) {
      const apiSermons = formatSermons(await getSermonsFromYouTubeApi(apiKey));
      if (apiSermons.length > 0) return buildResponse(apiSermons.slice(0, ARCHIVE_SERMON_COUNT));
    }
  } catch (error) {
    console.error('Error fetching sermons from YouTube API:', error);
  }

  try {
    const feedSermons = formatSermons(await getSermonsFromPublicFeed());
    return buildResponse(feedSermons.slice(0, ARCHIVE_SERMON_COUNT));
  } catch (error) {
    console.error('Error fetching sermons from YouTube feed:', error);
    return buildResponse([FALLBACK_SERMON]);
  }
}
