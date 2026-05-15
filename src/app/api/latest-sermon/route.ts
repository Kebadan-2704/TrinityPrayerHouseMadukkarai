import { NextResponse } from 'next/server';

// Force dynamic so the env is read fresh on every request
export const dynamic = 'force-dynamic';

export async function GET() {
  // Read from server-side env var — NEVER expose this client-side
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error('YOUTUBE_API_KEY is not set');
    return NextResponse.json({
      latest: { videoId: 'dngkoXyTIFU', title: 'Sunday Worship Service', date: '' },
      archive: [],
    });
  }

  const playlistId = 'UUSkJ9TGwrQNb0CJdP4lwItw'; // Uploads playlist for the channel

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`,
      {
        // Revalidate every hour — balances freshness with quota
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error('YouTube API error:', response.status, response.statusText);
      throw new Error(`YouTube API ${response.status}`);
    }

    const data = await response.json();
    const items = data.items || [];
    const now = new Date();

    // ── Live videos keep appearing for 7 hours after publish ──────────────────
    const MIN_AGE_HOURS = 7;

    const allSermons = items.map((item: { snippet: { title: string; resourceId: { videoId: string }; publishedAt: string } }) => {
      const snippet = item.snippet;
      const title = snippet.title;
      const videoId = snippet.resourceId.videoId;
      const publishedDate = new Date(snippet.publishedAt);
      const ageInHours = (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60);

      return { videoId, title, publishedDate, ageInHours };
    });

    const filteredSermons = allSermons.filter((s: { title: string; ageInHours: number; publishedDate: Date }) => {
      const titleLower = s.title.toLowerCase();

      // Treat videos with Live markers OR sunday/bible-study in title as live streams
      const isLive =
        s.title.includes('🔴') ||
        titleLower.includes('live') ||
        titleLower.includes('sunday service') ||
        titleLower.includes('bible study');

      // Explicitly exclude shorts/reels
      const isShort = titleLower.includes('#short') || titleLower.includes('#reel');

      // Detect future-dated livestream titles like "14th May 2026"
      let isFutureEvent = false;
      const dateMatch = s.title.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i);

      if (dateMatch) {
        const [, day, month, year] = dateMatch;
        const eventDate = new Date(`${month} ${day}, ${year}`);
        const hoursToAdd = titleLower.includes('sunday') ? 17 : 26;
        const safeDisplayTime = new Date(eventDate.getTime() + hoursToAdd * 60 * 60 * 1000);
        if (now < safeDisplayTime) isFutureEvent = true;
      } else {
        if (s.ageInHours < MIN_AGE_HOURS || s.publishedDate > now) {
          isFutureEvent = true;
        }
      }

      return isLive && !isShort && !isFutureEvent;
    });

    const formattedSermons = filteredSermons.map((s: { videoId: string; title: string; publishedDate: Date }) => {
      const displayTitle =
        s.title
          .replace('🔴🅻🅸🆅🅴 || ', '')
          .replace('🔴 LIVE || ', '')
          .replace(' || Trinity Ministries.', '')
          .replace(' || Trinity Ministries', '')
          .trim();

      return {
        videoId: s.videoId,
        title: displayTitle,
        date: s.publishedDate.toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        }),
        displayTitle,
      };
    });

    return NextResponse.json({
      latest: formattedSermons[0] || { videoId: 'dngkoXyTIFU', title: 'Sunday Worship Service', date: '' },
      archive: formattedSermons.slice(0, 12),
    });
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return NextResponse.json({
      latest: { videoId: 'dngkoXyTIFU', title: 'Sunday Worship Service', date: '' },
      archive: [],
    });
  }
}
