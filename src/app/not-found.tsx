import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '600px' }}>
        <div style={{ position: 'relative', width: '300px', height: '200px', margin: '0 auto 2rem' }}>
          <Image src="/prayer_gallery_2.webp" alt="" fill style={{ objectFit: 'cover', borderRadius: '16px' }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(20, 20, 40, 0.55)'
          }}>
            <span style={{ fontSize: '5rem', fontWeight: 800, color: '#d4b978' }}>404</span>
          </div>
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
          The page you are looking for doesn&apos;t exist or has been moved. Let us help you find your way back.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem',
            background: 'linear-gradient(135deg, #d4b978, #a68b52)', color: '#0a0a14',
            borderRadius: '100px', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            boxShadow: '0 4px 20px rgba(212, 185, 120, 0.25)', transition: 'all 0.3s ease'
          }}>
            ← Back to Home
          </Link>
          <Link href="/contact" className="btn-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem',
            background: 'rgba(255, 255, 255, 0.06)', color: '#fff',
            borderRadius: '100px', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            border: '1px solid rgba(255, 255, 255, 0.2)', transition: 'all 0.3s ease'
          }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}