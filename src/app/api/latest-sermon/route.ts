import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const channelId = 'UCSkJ9TGwrQNb0CJdP4lwItw';
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 }
    });
    const text = await response.text();
    
    const entries = text.split('<entry>');
    entries.shift();

    const now = new Date();
    const MIN_AGE_HOURS = 4;

    const allSermons = entries.map(entry => {
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      
      const title = titleMatch ? titleMatch[1] : '';
      const videoId = videoIdMatch ? videoIdMatch[1] : '';
      const publishedDate = publishedMatch ? new Date(publishedMatch[1]) : new Date(0);
      
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

    // STRICT FILTER: Only Sunday Services/Worship. No Bible Study, No Reels.
    const sundayKeywords = ['Sunday Service', 'Sunday Worship'];
    
    const filteredSermons = allSermons.filter(s => {
      const isSunday = sundayKeywords.some(k => s.title.toLowerCase().includes(k.toLowerCase()));
      const isFinished = s.ageInHours > MIN_AGE_HOURS && s.publishedDate <= now;
      
      return isSunday && isFinished;
    });

    const formattedSermons = filteredSermons.map(s => ({
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
