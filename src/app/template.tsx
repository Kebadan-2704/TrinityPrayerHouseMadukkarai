/**
 * Re-mounts on every navigation → drives entrance/exit transitions.
 * Pure CSS animation — no JS library needed. Same visual: fade + slide up.
 * This is a Server Component (no 'use client') which keeps framer-motion
 * out of the critical JS bundle entirely.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition-root">
      {children}
    </div>
  );
}
