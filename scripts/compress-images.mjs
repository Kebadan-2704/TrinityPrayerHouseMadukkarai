/**
 * Image compression script — run once to shrink large source images.
 * Uses sharp which is already installed by Next.js.
 * Usage: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = 'public';
const QUALITY = 82; // good quality with significant size reduction

// Files to compress / convert — skip tiny files automatically
const TARGETS = [
  // Root public images that are large
  { src: 'public/prayer.png',            out: 'public/prayer.png',            maxWidth: 2400 },
  { src: 'public/slide-2.jpg',           out: 'public/slide-2.jpg',           maxWidth: 2400 },
  { src: 'public/slide-3.jpg',           out: 'public/slide-3.jpg',           maxWidth: 2400 },
  { src: 'public/slide-5.jpg',           out: 'public/slide-5.jpg',           maxWidth: 2400 },
  { src: 'public/sath.png',              out: 'public/sath.png',              maxWidth: 1600 },
  { src: 'public/womens_ministry.png',   out: 'public/womens_ministry.png',   maxWidth: 1600 },
  { src: 'public/youth.png',             out: 'public/youth.png',             maxWidth: 1600 },
  { src: 'public/youth_gallery_2.png',   out: 'public/youth_gallery_2.png',   maxWidth: 1600 },
  { src: 'public/kids_gallery_2.png',    out: 'public/kids_gallery_2.png',    maxWidth: 1600 },
  { src: 'public/womens_gallery_2.png',  out: 'public/womens_gallery_2.png',  maxWidth: 1600 },
  { src: 'public/prayer_gallery_2.png',  out: 'public/prayer_gallery_2.png',  maxWidth: 1600 },
  { src: 'public/prayer_ministry.png',   out: 'public/prayer_ministry.png',   maxWidth: 1600 },
  { src: 'public/kids_ministry.png',     out: 'public/kids_ministry.png',     maxWidth: 1600 },
  { src: 'public/youth_ministry.png',    out: 'public/youth_ministry.png',    maxWidth: 1600 },
  { src: 'public/sam-avatar-v3.png',     out: 'public/sam-avatar-v3.png',     maxWidth: 200  },
  { src: 'public/mens_ministry_new.jpg',  out: 'public/mens_ministry_new.jpg',  maxWidth: 1600 },
  { src: 'public/kids_ministry_new.jpg',  out: 'public/kids_ministry_new.jpg',  maxWidth: 1600 },
  // Ministry photos - large ones
  { src: 'public/mens-ministry/growing-1.jpg',   out: 'public/mens-ministry/growing-1.jpg',   maxWidth: 1800 },
  { src: 'public/mens-ministry/growing-3.jpg',   out: 'public/mens-ministry/growing-3.jpg',   maxWidth: 1800 },
  { src: 'public/womens-ministry/outreach-1.jpg', out: 'public/womens-ministry/outreach-1.jpg', maxWidth: 1800 },
  { src: 'public/womens-ministry/outreach-2.jpg', out: 'public/womens-ministry/outreach-2.jpg', maxWidth: 1800 },
  { src: 'public/womens-ministry/outreach-3.jpg', out: 'public/womens-ministry/outreach-3.jpg', maxWidth: 1800 },
  { src: 'public/hindi-ministry/worship-5.jpg',  out: 'public/hindi-ministry/worship-5.jpg',  maxWidth: 1800 },
  { src: 'public/hindi-ministry/worship-6.jpg',  out: 'public/hindi-ministry/worship-6.jpg',  maxWidth: 1800 },
  { src: 'public/hindi-ministry/worship-7.jpg',  out: 'public/hindi-ministry/worship-7.jpg',  maxWidth: 1800 },
  { src: 'public/hindi-ministry/worship-8.jpg',  out: 'public/hindi-ministry/worship-8.jpg',  maxWidth: 1800 },
  { src: 'public/youth-ministry/youth-media-2.jpg', out: 'public/youth-ministry/youth-media-2.jpg', maxWidth: 1800 },
  { src: 'public/youth-ministry/youth-fellowship-2.jpg', out: 'public/youth-ministry/youth-fellowship-2.jpg', maxWidth: 1800 },
];

function formatBytes(b) {
  if (b < 1024) return `${b}B`;
  if (b < 1024 * 1024) return `${(b/1024).toFixed(1)}KB`;
  return `${(b/1024/1024).toFixed(2)}MB`;
}

async function compress({ src, out, maxWidth }) {
  let beforeSize;
  try {
    beforeSize = (await stat(src)).size;
  } catch {
    console.log(`  ⚠️  Skipped (not found): ${src}`);
    return;
  }

  const tmp = out + '.tmp';
  const ext = extname(src).toLowerCase();

  try {
    let pipeline = sharp(src).resize({ width: maxWidth, withoutEnlargement: true });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    await pipeline.toFile(tmp);
    const afterSize = (await stat(tmp)).size;

    if (afterSize < beforeSize) {
      await rename(tmp, out);
      const saved = beforeSize - afterSize;
      const pct = ((saved / beforeSize) * 100).toFixed(1);
      console.log(`  ✓ ${src.padEnd(55)} ${formatBytes(beforeSize)} → ${formatBytes(afterSize)}  (saved ${pct}%)`);
    } else {
      // Original is already well-compressed, remove temp
      const { unlink } = await import('fs/promises');
      await unlink(tmp);
      console.log(`  – ${src.padEnd(55)} already optimal (${formatBytes(beforeSize)}), kept as-is`);
    }
  } catch (err) {
    console.error(`  ✗ Error compressing ${src}:`, err.message);
    try { const { unlink } = await import('fs/promises'); await unlink(tmp); } catch {}
  }
}

console.log('\n🗜️  Compressing large images...\n');
for (const target of TARGETS) {
  await compress(target);
}
console.log('\n✅  Done! Commit the changes to save space in the repo.\n');
