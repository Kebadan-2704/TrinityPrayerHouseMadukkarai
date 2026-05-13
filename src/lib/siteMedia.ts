/** Church intro — opens in Google Drive player (new tab). */
export const HERO_INTRO_VIDEO_URL =
  'https://drive.google.com/file/d/1FN8HWqdgCsXp0XAMAklhYtjk--iX__4f/view?usp=sharing';

/** Poster image while hero video loads (any JPG in /public). */
export const HERO_BG_POSTER = '/hero-bg.jpg';

/**
 * Hero background loop — direct file URLs only (not Drive “view” links).
 * Default: `public/videos/hero-bg.mov`. Optional: `.webm` / `.mp4` for broader browser support.
 */
export const HERO_BG_VIDEO_MOV =
  process.env.NEXT_PUBLIC_HERO_BG_VIDEO_MOV ?? '/videos/hero-bg.mov';

export const HERO_BG_VIDEO_MP4 =
  process.env.NEXT_PUBLIC_HERO_BG_VIDEO_MP4 ?? '/videos/hero-bg.mp4';

export const HERO_BG_VIDEO_WEBM =
  process.env.NEXT_PUBLIC_HERO_BG_VIDEO_WEBM ?? '/videos/hero-bg.webm';
