/**
 * Home page — React Server Component.
 * No 'use client' here means Next.js renders this on the server, producing
 * static HTML that browsers can paint immediately without waiting for JS.
 * All interactive/stateful logic lives in HomeClient.tsx.
 */
import HomeClient from './HomeClient';
import { GET as getSermons } from './api/latest-sermon/route';

export default async function Home() {
  // Fetch data on the server, avoiding client-side waterfall
  let latestSermon = null;
  try {
    const res = await getSermons();
    const data = await res.json();
    latestSermon = data?.latest ?? data;
  } catch (error) {
    console.error('Failed to get sermons during SSR', error);
  }

  return <HomeClient initialLatestSermon={latestSermon} />;
}

