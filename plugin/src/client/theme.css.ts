/**
 * Gandalf theme — injected global style layer (v11: 浅色/深色双主题适配).
 *
 * 2026-08-16 用户拍板：背景图 + 霞鹭文楷等宽字体 + 中土风控件定制。
 * 浅色主题：面板半透明让背景图透出；深色主题：表面用 DSH 深色调色板
 * 实色（背景图半透明保留氛围），文字沿用 DSH 深色主题默认色。
 */
import { BG_IMAGE } from './assets.generated.ts'

export const GANDALF_CSS = `
/* ============ 1. 基础 ============ */

/* 兜底底色：面板半透明时防止 UA 白底透出 */
html {
  background-color: #0d0d0f;
}

/* 甘道夫朝阳背景：cover + 垂直 80% 位置（用户调整） */
body {
  background: url(${BG_IMAGE}) center 80%/cover no-repeat fixed !important;
}

/* ============ 2. 字体 ============ */

/* 全局字体由 --dsw-font-family token 驱动（见 tokens.ts）：中文走霞鹭
   文楷等宽（本地），代码区保持 DSH 默认等宽。 */

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

/* AI 消息气泡卡片（白色遮罩） */
[class*='flowItem'] {
  background: var(--dsw-static-neutral-bluish-00) !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  border-radius: 14px !important;
  padding: 10px 14px !important;
}
/* 用户消息：DSH 默认（无遮罩） */
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

/* "回到底部"按钮：白色背景（浅色主题） */
[class*='toBottom'] {
  background: var(--dsw-static-neutral-bluish-00) !important;
}

/* 新会话按钮：透明底 + 白字 + 细边框 */
[class*='newSession'] {
  background: transparent !important;
  color: #111111 !important;
  border: 1px solid rgba(0, 0, 0, 0.18) !important;
}

/* 设置面板：深色实底（原来是近透明） */
[class*='panel'] {
  background: var(--dsw-static-neutral-bluish-00) !important;
}

/* 发送按钮（输入区内）：五芒星图标（自制 SVG mask，居中）+ 深色底。
   限定 composer 容器——选择框等其它 primary 按钮保持 DSH 默认。 */
[class*='composer'] [class*='primary'] {
  background: var(--dsw-static-neutral-bluish-00) !important;
  color: #111111 !important;
  border: 1px solid rgba(0, 0, 0, 0.18) !important;
  position: relative !important;
}
[class*='composer'] [class*='primary'] svg {
  display: none !important;
}
[class*='composer'] [class*='primary']::after {
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

/* ============ 5. 深色主题适配（body[data-ds-dark-theme]） ============ */
/* 浅色设计把面板钉成白色、背景设为透明；切到 DSH 深色主题时文字自动变白，
   会落到白色面板上不可读。这里在深色主题下把表面改为 DSH 深色调色板实色，
   文字沿用深色主题的浅色文字，保证对比度；背景图在深色下以半透明保留氛围。
   颜色引用 DSH 静态 token（--dsw-static-neutral-bluish-*），DSH 升级调色板
   时自动跟随。 */
body[data-ds-dark-theme] {
  --dsw-alias-bg-base: color-mix(in srgb, var(--dsw-static-neutral-bluish-950) 50%, transparent) !important;
  --dsw-alias-bg-layer-1: color-mix(in srgb, var(--dsw-static-neutral-bluish-875) 55%, transparent) !important;
  --dsw-alias-bg-layer-2: var(--dsw-static-neutral-bluish-850) !important;
  --dsw-alias-bg-layer-3: var(--dsw-static-neutral-bluish-800) !important;
  --dsw-alias-bg-module-platform: var(--dsw-static-neutral-bluish-800) !important;
  --dsw-alias-bg-multi-select: var(--dsw-static-neutral-850) !important;
  --dsw-alias-bg-overlay: var(--dsw-static-neutral-bluish-750) !important;
  --dsw-alias-separator-primary: var(--dsw-static-neutral-bluish-600) !important;
  --dsw-specific-bubble: var(--dsw-static-neutral-bluish-850) !important;
  --dsw-specific-bubble-highlight: var(--dsw-static-neutral-bluish-800) !important;
  --dsw-specific-input-major: var(--dsw-static-neutral-bluish-875) !important;
  --dsw-specific-login-input: var(--dsw-static-neutral-bluish-900) !important;
  --dsw-specific-menu: var(--dsw-static-neutral-bluish-800) !important;
  --dsw-specific-selector: var(--dsw-static-neutral-bluish-800) !important;
  --dsw-specific-sidebar-fill: color-mix(in srgb, var(--dsw-static-neutral-bluish-900) 55%, transparent) !important;
  --dsw-specific-sidebar-nav-item-active: var(--dsw-static-neutral-bluish-850) !important;
  --dsw-specific-sidebar-nav-item-hover: var(--dsw-static-neutral-bluish-875) !important;
  --dsw-specific-tip: var(--dsw-static-neutral-bluish-800) !important;
  --dsw-alias-markdown-code-block: var(--dsw-static-neutral-bluish-900) !important;
  --dsw-alias-markdown-code-block-banner: var(--dsw-static-neutral-bluish-875) !important;
  --dsw-alias-markdown-inline-code: var(--dsw-static-neutral-bluish-800) !important;
  --dsw-alias-markdown-citation: var(--dsw-static-neutral-bluish-850) !important;
  --dsw-alias-markdown-placeholder: var(--dsw-static-neutral-bluish-875) !important;
  --dsw-alias-markdown-tag: var(--dsw-static-neutral-bluish-850) !important;
}

/* 硬编码白色表面在深色下改深色底（仅 AI 消息气泡；用户消息保持 DSH 默认） */
body[data-ds-dark-theme] [class*='panel'] {
  background: var(--dsw-static-neutral-bluish-875) !important;
}
body[data-ds-dark-theme] [class*='flowItem']:not(:has([class*='userRow'])) {
  background: var(--dsw-static-neutral-bluish-850) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}
/* 用户消息气泡：深色下保持 DSH 默认（透明、无遮罩），与浅色一致 */
body[data-ds-dark-theme] [class*='flowItem']:has([class*='userRow']) {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  align-self: stretch !important;
}
body[data-ds-dark-theme] [class*='toBottom'] {
  background: var(--dsw-static-neutral-bluish-850) !important;
}
body[data-ds-dark-theme] [class*='newSession'] {
  color: var(--dsw-static-neutral-bluish-50) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
body[data-ds-dark-theme] [class*='brand'] {
  color: var(--dsw-static-neutral-bluish-50) !important;
}
body[data-ds-dark-theme] [class*='composer'] [class*='primary'] {
  background: var(--dsw-static-neutral-bluish-850) !important;
  color: var(--dsw-static-neutral-bluish-50) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
`
