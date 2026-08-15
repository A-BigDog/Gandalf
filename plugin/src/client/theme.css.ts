/**
 * Gandalf theme — injected global style layer (夜空星金).
 *
 * Covers what alias tokens cannot: the starry-night backdrop (OGA CC0 night
 * sky, base64-inlined), the Cinzel titling faces (OFL, self-hosted), and
 * decorative details (gilded rules, star-sparkle accents).
 * Injected by src/client/index.ts, removed on unload.
 */
import { BG_IMAGE, CINZEL_A, CINZEL_B } from './assets.generated.ts'

export const GANDALF_CSS = `
/* ---- Starry-night backdrop (OGA CC0 night sky, base64) ---- */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(1100px 640px at 72% -12%, rgba(232, 200, 119, 0.07), transparent 62%),
    radial-gradient(900px 600px at 8% 112%, rgba(20, 27, 44, 0.5), transparent 60%),
    linear-gradient(rgba(9, 12, 22, 0.88), rgba(9, 12, 22, 0.88)),
    url(${BG_IMAGE}) center/cover no-repeat fixed;
  opacity: 0.96;
}

/* ---- Titling faces: Cinzel (OFL 1.1), self-hosted base64 ---- */
@font-face {
  font-family: 'Cinzel';
  src: url(${CINZEL_A}) format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Cinzel';
  src: url(${CINZEL_B}) format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

h1, h2, h3, h4,
[class*='title'], [class*='brand'], [class*='heading'], [class*='Header'] {
  font-family: 'Cinzel', var(--dsw-font-family, system-ui);
  letter-spacing: 0.03em;
}

/* ---- Gilded focus ring (accessibility: keep visible, warm it up) ---- */
:focus-visible {
  outline-color: #e8c877;
  outline-offset: 2px;
}

/* ---- Scrollbar thumb: star-gold ---- */
*::-webkit-scrollbar-thumb {
  background: #46536f;
  border-radius: 8px;
}
*::-webkit-scrollbar-thumb:hover {
  background: #667390;
}

/* ---- Star-sparkle separators & accents ---- */
hr, [class*='separator'], [class*='divider'] {
  border-color: rgba(232, 200, 119, 0.22) !important;
}

/* Subtle golden top-light on raised surfaces (parchment-to-night) */
@media (prefers-reduced-motion: no-preference) {
  [class*='panel'], [class*='card'] {
    background-image: linear-gradient(180deg, rgba(232, 200, 119, 0.035), rgba(232, 200, 119, 0));
  }
}

/* Brand / logo gold glow */
[class*='brand'], [class*='logo'] {
  text-shadow: 0 0 18px rgba(232, 200, 119, 0.35);
}
`
