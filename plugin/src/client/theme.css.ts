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

h1, h2, h3, h4,
[class*='title'], [class*='brand'], [class*='heading'], [class*='Header'] {
  font-family: 'Cinzel', var(--dsw-font-family, system-ui);
  letter-spacing: 0.03em;
}
`
