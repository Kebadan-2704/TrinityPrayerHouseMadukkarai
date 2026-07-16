/**
 * Home page — React Server Component.
 * No 'use client' here means Next.js renders this on the server, producing
 * static HTML that browsers can paint immediately without waiting for JS.
 * All interactive/stateful logic lives in HomeClient.tsx.
 */
import HomeClient from './HomeClient';

export default function Home() {
  return <HomeClient />;
}
