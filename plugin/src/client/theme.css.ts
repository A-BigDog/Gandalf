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
/* ---- Base fallback (keeps the page from showing the UA white when the
   body surface turns translucent so the sunrise scene shows through) ---- */
html {
  background-color: #1d120b;
}

/* ---- Dawn backdrop on the body itself (single-layer attenuation:
   translucent surfaces above reveal the sepia-warmed Gandalf sunrise scene).
   Golden star-sparkles keep the starry-dawn mood. ---- */
body {
  background:
    radial-gradient(1100px 640px at 72% -12%, rgba(232, 176, 76, 0.12), transparent 62%),
    radial-gradient(1.6px 1.6px at 18% 22%, rgba(255, 238, 205, 0.95), transparent 70%),
    radial-gradient(2.2px 2.2px at 62% 9%, rgba(255, 244, 215, 0.9), transparent 70%),
    radial-gradient(1.4px 1.4px at 84% 30%, rgba(255, 238, 205, 0.85), transparent 70%),
    radial-gradient(2px 2px at 38% 45%, rgba(255, 240, 210, 0.8), transparent 70%),
    radial-gradient(1.5px 1.5px at 72% 58%, rgba(255, 242, 215, 0.75), transparent 70%),
    radial-gradient(1.8px 1.8px at 12% 74%, rgba(255, 238, 205, 0.8), transparent 70%),
    radial-gradient(2.4px 2.4px at 48% 88%, rgba(255, 244, 215, 0.7), transparent 70%),
    radial-gradient(1.3px 1.3px at 92% 80%, rgba(255, 238, 205, 0.75), transparent 70%),
    radial-gradient(900px 600px at 6% 108%, rgba(70, 40, 20, 0.28), transparent 60%),
    linear-gradient(rgba(26, 15, 8, 0.14), rgba(26, 15, 8, 0.14)),
    url(${BG_IMAGE}) center/cover no-repeat fixed !important;
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
  outline-color: #e8b04c;
  outline-offset: 2px;
}

/* ---- Middle-earth message bubbles: gilded edge + soft star-glow ---- */
[class*='bubble'] {
  border: 1px solid rgba(232, 200, 119, 0.26) !important;
  box-shadow: 0 0 14px rgba(232, 200, 119, 0.07), 0 1px 4px rgba(0, 0, 0, 0.35);
}

/* ---- Composer / input: scroll-edge focus ring ---- */
[class*='composer'] textarea,
[class*='input'] textarea,
[class*='input'] input {
  border: 1px solid rgba(232, 200, 119, 0.28) !important;
  border-radius: 12px;
  transition: box-shadow 0.2s ease;
}
[class*='composer'] textarea:focus,
[class*='input'] textarea:focus,
[class*='input'] input:focus {
  box-shadow: 0 0 0 2px rgba(232, 200, 119, 0.22), 0 0 20px rgba(232, 200, 119, 0.10);
}

/* ---- Buttons: gold gradient + hover glow ---- */
[class*='button'] {
  transition: box-shadow 0.18s ease, transform 0.12s ease;
}
[class*='button']:hover {
  box-shadow: 0 0 16px rgba(232, 200, 119, 0.30);
}
[class*='button']:active {
  transform: translateY(0.5px);
}

/* ---- Sidebar nav hover: gilded wash ---- */
[class*='sidebar'] [class*='nav']:hover,
[class*='nav-item']:hover {
  box-shadow: inset 2px 0 0 #e8b04c;
}

/* ---- Scrollbar thumb: star-gold ---- */
*::-webkit-scrollbar-thumb {
  background: #7a6440;
  border-radius: 8px;
}
*::-webkit-scrollbar-thumb:hover {
  background: #947e50;
}

/* ---- Rune divider: hand-drawn SVG runes (self-made, zero copyright) ---- */
hr, [class*='separator'], [class*='divider'] {
  border-color: rgba(232, 200, 119, 0.22) !important;
}
[class*='brand']::after, [class*='logo']::after {
  content: '';
  display: block;
  height: 14px;
  margin-top: 8px;
  background: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='12' viewBox='0 0 120 12'%3E%3Cg fill='none' stroke='%23e8c877' stroke-width='1.3' opacity='0.55'%3E%3Cpath d='M10 1 L10 11 M10 11 L6 7 M10 11 L14 7'/%3E%3Ccircle cx='30' cy='6' r='4'/%3E%3Cpath d='M42 2 L42 10 M42 6 L48 6'/%3E%3Cpath d='M58 1 L54 7 L58 11 M58 1 L62 7 L58 11'/%3E%3Cpath d='M72 2 L72 10 M72 10 L68 7 M72 10 L76 7'/%3E%3Ccircle cx='92' cy='6' r='4'/%3E%3Cpath d='M104 1 L104 11 M104 6 L110 6'/%3E%3C/g%3E%3C/svg%3E") repeat-x left center/auto 12px;
  opacity: 0.9;
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

