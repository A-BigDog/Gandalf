/**
 * Gandalf theme — injected global style layer (v9: 背景图 + 字体，其余原生).
 *
 * 2026-08-14 用户最终拍板：界面配色回 DSH 默认，只保留
 * ① 甘道夫朝阳背景图（原图直出、无遮罩无染色）
 * ② Cinzel 标题字体（OFL 自托管）。
 * 不含主题色覆盖、星点、符文、鎏金描边等任何主题装饰。
 */
import { BG_IMAGE, CINZEL_A, CINZEL_B } from './assets.generated.ts'

export const GANDALF_CSS = `
/* ---- Base fallback: keeps the UA white from showing through the
   translucent surfaces (default-dark colors + our translucency). ---- */
html {
  background-color: #0d0d0f;
}

/* ---- The Gandalf sunrise scene, original brightness, no veil ---- */
body {
  background: url(${BG_IMAGE}) center/cover no-repeat fixed !important;
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

/* ---- Global typeface handled via the --dsw-font-family token override
   (see tokens.ts): one consistent stack everywhere. No per-element selectors
   needed — the DSH base.css consumes the variable on body. ---- */

/* Brand row: transparent backdrop (photo shows through); black icon. */
[class*='brand'] {
  background: transparent !important;
  color: #000 !important;
}

/* Chat flow stays left-aligned to the available area: the message column is
   centered via margin auto — break that so it hugs the sidebar when expanded
   and the page edge when the sidebar is collapsed (user request). */
[class*='scroll'] > [class*='column'] {
  margin-left: 0 !important;
  margin-right: auto !important;
}

/* "Back to bottom" button (aria-label 回到底部, class …_toBottom):
   transparent background (user request). */
[class*='toBottom'] {
  background: transparent !important;
}

/* Message bubbles: each chat item becomes a rounded card (user request —
   the default flow has no bubble chrome). Deeper veil per user request. */
[class*='flowItem'] {
  background: rgba(44, 44, 46, 0.78) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 14px !important;
  padding: 10px 14px !important;
}

/* User messages keep the DSH default (no bubble veil — user request);
   assistant messages get the rounded card. */
[class*='flowItem']:has([class*='userRow']) {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  align-self: stretch !important;
}
[class*='flowItem']:not(:has([class*='userRow'])) {
  align-self: flex-start !important;
  max-width: 85% !important;
}

/* New-session button: match the dark backdrop instead of the default white
   primary (user request — the white block reads as a glitch over the photo). */
[class*='newSession'] {
  background: rgba(33, 33, 35, 0.88) !important;
  color: #f9fafb !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
}

/* Settings panel: deeper veil (user request — it was ~transparent). */
[class*='panel'] {
  background: rgba(44, 44, 46, 0.92) !important;
}

/* Send button: replace the plain arrow with a five-pointed star
   (self-made SVG mask, solid pentagram — user choice). */
[class*='primary'] svg {
  display: none !important;
}
[class*='primary']::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath d='M8 1 L9.8 6.2 L15.2 6.4 L10.9 9.7 L12.4 15 L8 11.6 L3.6 15 L5.1 9.7 L0.8 6.4 L6.2 6.2 Z'/%3E%3C/svg%3E") center/contain no-repeat;
  mask: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath d='M8 1 L9.8 6.2 L15.2 6.4 L10.9 9.7 L12.4 15 L8 11.6 L3.6 15 L5.1 9.7 L0.8 6.4 L6.2 6.2 Z'/%3E%3C/svg%3E") center/contain no-repeat;
}
/* Send button background: dark (no DSH blue — user request). */
[class*='primary'] {
  background: rgba(33, 33, 35, 0.92) !important;
  color: #f9fafb !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  position: relative !important;
}
[class*='primary']::after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath d='M8 1 L9.8 6.2 L15.2 6.4 L10.9 9.7 L12.4 15 L8 11.6 L3.6 15 L5.1 9.7 L0.8 6.4 L6.2 6.2 Z'/%3E%3C/svg%3E") center/contain no-repeat;
  mask: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath d='M8 1 L9.8 6.2 L15.2 6.4 L10.9 9.7 L12.4 15 L8 11.6 L3.6 15 L5.1 9.7 L0.8 6.4 L6.2 6.2 Z'/%3E%3C/svg%3E") center/contain no-repeat;
}
`
