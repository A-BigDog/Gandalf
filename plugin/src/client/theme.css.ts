/**
 * Gandalf theme — injected global style layer (最终版).
 *
 * 2026-08-14 用户最终拍板：界面配色回 DSH 默认，只保留定制：
 * ① 甘道夫朝阳背景图（原图直出、无遮罩无染色）
 * ② 全局字体（霞鹭文楷等宽本地 + Cinzel 英文，走 --dsw-font-family）
 * ③ 布局/控件微调（消息左对齐、气泡卡片、面板加深、图标替换）
 */
import { BG_IMAGE, CINZEL_A, CINZEL_B } from './assets.generated.ts'

export const GANDALF_CSS = `
/* ============ 1. 基础 ============ */

/* 兜底底色：面板半透明时防止 UA 白底透出 */
html {
  background-color: #0d0d0f;
}

/* 甘道夫朝阳背景：原图直出，无遮罩无染色 */
body {
  background: url(${BG_IMAGE}) center/cover no-repeat fixed !important;
}

/* ============ 2. 字体 ============ */

/* Cinzel 标题/英文（OFL 1.1，自托管 base64；中文走霞鹭文楷等宽，
   由 --dsw-font-family token 统一驱动——见 tokens.ts） */
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

/* ============ 3. 布局 ============ */

/* 品牌区：透明底（背景图透出）+ 黑色图标 */
[class*='brand'] {
  background: transparent !important;
  color: #000 !important;
}

/* 消息流靠左：column 原本 margin:auto 居中——打破它，
   贴侧边栏（展开时）/贴页面边缘（收起时） */
[class*='scroll'] > [class*='column'] {
  margin-left: 0 !important;
  margin-right: auto !important;
}

/* AI 消息气泡卡片（你的消息保持 DSH 默认无遮罩） */
[class*='flowItem'] {
  background: rgba(44, 44, 46, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 14px !important;
  padding: 10px 14px !important;
}
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

/* ============ 4. 控件 ============ */

/* "回到底部"按钮：透明背景 */
[class*='toBottom'] {
  background: transparent !important;
}

/* 新会话按钮：透明底 + 白字 + 细边框 */
[class*='newSession'] {
  background: transparent !important;
  color: #f9fafb !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
}

/* 设置面板：深色实底（原来是近透明） */
[class*='panel'] {
  background: rgba(44, 44, 46, 0.92) !important;
}

/* 发送按钮：五芒星图标（自制 SVG mask，居中）+ 深色底 */
[class*='primary'] {
  background: rgba(33, 33, 35, 0.92) !important;
  color: #f9fafb !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  position: relative !important;
}
[class*='primary'] svg {
  display: none !important;
}
[class*='primary']::after {
  content: '';
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
