import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyB1WiXQG_5Gafr3Wc9gdzKoVyIKcSO6sSs';
  const playlistId = 'UUSkJ9TGwrQNb0CJdP4lwItw'; // Uploads playlist for the channel
  
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`, {
      next: { revalidate: 3600 }
    });
    
    const data = await response.json();
    const items = data.items || [];
    
    const now = new Date();
    // Buffer time: Assuming stream lasts ~2 hours + 5 hours buffer = 7 hours
    const MIN_AGE_HOURS = 7;

    const allSermons = items.map((item: { snippet: { title: string, resourceId: { videoId: string }, publishedAt: string } }) => {
      const snippet = item.snippet;
      const title = snippet.title;
      const videoId = snippet.resourceId.videoId;
      const publishedDate = new Date(snippet.publishedAt);
      
      const ageInHours = (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60);

      return { 
        videoId, 
        title, 
        publishedDate,
        ageInHours,
        date: publishedDate.toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        }) 
      };
    });

    const filteredSermons = allSermons.filter((s: { title: string; ageInHours: number; publishedDate: Date }) => {
      const titleLower = s.title.toLowerCase();
      
      // Check if it's a livestream (🔴, LIVE, or Sunday Service/Bible Study)
      const isLive = s.title.includes('🔴') || 
                     titleLower.includes('live') || 
                     titleLower.includes('sunday service') ||
                     titleLower.includes('bible study');
      
      // Explicitly exclude shorts/reels
      const isShort = titleLower.includes('#short') || titleLower.includes('#reel');
      
      let isFutureEvent = false;
      // Look for dates like "14th May 2026" or "3rd May 2026"
      const dateMatch = s.title.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i);
      
      if (dateMatch) {
        const day = dateMatch[1];
        const month = dateMatch[2];
        const year = dateMatch[3];
        // eventDate represents 00:00:00 on the day of the event
        const eventDate = new Date(`${month} ${day}, ${year}`);
        
        // Sunday services usually end around 12:00 PM. 5-hour buffer -> 5:00 PM (17 hours)
        // Mid-week events (Bible study) end around 9:00 PM. 5-hour buffer -> 2:00 AM next day (26 hours)
        const hoursToAdd = titleLower.includes('sunday') ? 17 : 26;
        const safeDisplayTime = new Date(eventDate.getTime() + (hoursToAdd * 60 * 60 * 1000));
        
        if (now < safeDisplayTime) {
          isFutureEvent = true; // It hasn't happened yet, or hasn't passed the 5 hour buffer!
        }
      } else {
        // Fallback if no date in title: use the published date + 7 hours buffer
        if (s.ageInHours < MIN_AGE_HOURS || s.publishedDate > now) {
          isFutureEvent = true;
        }
      }
      
      return isLive && !isShort && !isFutureEvent;
    });

    const formattedSermons = filteredSermons.map((s: { videoId: string; title: string; date: string }) => ({
      videoId: s.videoId,
      title: s.title,
      date: s.date,
      displayTitle: s.title
        .replace('🔴🅻🅸🆅🅴 || ', '')
        .replace('🔴 LIVE || ', '')
        .replace(' || Trinity Ministries.', '')
        .replace(' || Trinity Ministries', '')
        .trim()
    }));

    return NextResponse.json({
      latest: formattedSermons[0] || { videoId: 'dngkoXyTIFU', title: 'Sunday Worship Service', date: 'May 10, 2026' },
      archive: formattedSermons.slice(0, 12)
    });

  } catch (error) {
    console.error('Error fetching sermons:', error);
    return NextResponse.json({ 
      latest: { videoId: 'dngkoXyTIFU', title: 'Sunday Worship Service', date: 'May 10, 2026' },
      archive: []
    });
  }
}
