/**
 * Gandalf theme — injected global style layer (最终版).
 *
 * 2026-08-14 用户最终拍板：界面配色回 DSH 默认，只保留定制：
 * ① 甘道夫朝阳背景图（原图直出、无遮罩无染色）
 * ② 全局字体（霞鹭文楷等宽本地 + Cinzel 英文，走 --dsw-font-family）
 * ③ 布局/控件微调（消息左对齐、气泡卡片、面板加深、图标替换）
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
   文楷等宽（本地），代码区保持 DSH 默认等宽。Cinzel 已按用户要求移除。 */

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
  background: rgb(255, 255, 255) !important;
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
  background: rgb(255, 255, 255) !important;
}

/* 新会话按钮：透明底 + 白字 + 细边框 */
[class*='newSession'] {
  background: transparent !important;
  color: #111111 !important;
  border: 1px solid rgba(0, 0, 0, 0.18) !important;
}

/* 设置面板：深色实底（原来是近透明） */
[class*='panel'] {
  background: rgb(255, 255, 255) !important;
}

/* 发送按钮（输入区内）：五芒星图标（自制 SVG mask，居中）+ 深色底。
   限定 composer 容器——选择框等其它 primary 按钮保持 DSH 默认。 */
[class*='composer'] [class*='primary'] {
  background: rgb(255, 255, 255) !important;
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

`






