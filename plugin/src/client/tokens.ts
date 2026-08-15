/**
 * Gandalf theme — alias-token overrides (v9: 回默认 + 背景透出).
 *
 * 2026-08-14 用户最终拍板：界面配色回到 DSH 默认深色主题，只保留
 * 「甘道夫朝阳背景图（原图直出，无遮罩无染色）」+「Cinzel 标题字体」。
 * 因此这里只覆盖让背景图透出的面板透明度（颜色值取 DSH 默认 dark
 * palette 的原色），其余 token 一律不覆盖，保持原生观感。
 */
import type { ThemeTokens } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Translucent-surface overrides only; colors mirror the DSH default dark palette. */
export const GANDALF_TOKENS: ThemeTokens = {
  // ---- Conversation area (most visible backdrop) ----
  '--dsw-alias-bg-base': 'rgba(21, 21, 23, 0.08)',
  '--dsw-alias-bg-layer-1': 'rgba(35, 35, 36, 0.10)',
  '--dsw-alias-bg-layer-2': 'rgba(44, 44, 46, 0.10)',
  '--dsw-alias-bg-layer-3': 'rgba(53, 54, 56, 0.10)',
  '--dsw-alias-bg-module-platform': 'rgba(53, 54, 56, 0.12)',
  '--dsw-alias-bg-multi-select': 'rgba(33, 33, 35, 0.10)',
  '--dsw-alias-bg-overlay': '#2c2c2e',

  // ---- Message bubbles (text safety floor) ----
  '--dsw-specific-bubble': 'rgba(44, 44, 46, 0.50)',
  '--dsw-specific-bubble-highlight': 'rgba(67, 69, 74, 0.66)',
  '--dsw-specific-input-major': 'rgba(44, 44, 46, 0.92)',
  '--dsw-specific-login-input': 'rgba(44, 44, 46, 0.92)',
  '--dsw-specific-menu': 'rgba(67, 69, 74, 0.92)',
  '--dsw-specific-selector': 'rgba(44, 44, 46, 0.55)',

  // ---- Sidebar (nav readability) ----
  '--dsw-specific-sidebar-fill': 'rgba(27, 27, 28, 0.30)',
  '--dsw-specific-sidebar-nav-item-active': 'rgba(67, 69, 74, 0.55)',
  '--dsw-specific-sidebar-nav-item-hover': 'rgba(44, 44, 46, 0.50)',
  '--dsw-specific-tip': 'rgba(44, 44, 46, 0.55)',

  // ---- Text (light-on-dark safety for any color-scheme mode) ----
  '--dsw-alias-label-primary': '#f9fafb',
  '--dsw-alias-label-secondary': '#cfd3d6',
  '--dsw-alias-label-tertiary': '#adb2b8',
  '--dsw-alias-label-caption': '#adb2b8',

  // ---- Global typeface (LXGW WenKai Mono — 霞鹭文楷等宽, OFL, local; Cinzel removed per user) ----
  '--dsw-font-family': "'LXGW WenKai Mono Light', 'LXGW WenKai Mono', '霞鹜文楷等宽 Light', '霞鹭文楷', 'KaiTi', sans-serif",

  // ---- Code / markdown (near-opaque: readability first) ----
  '--dsw-alias-markdown-code-block': 'rgba(27, 27, 28, 0.94)',
  '--dsw-alias-markdown-code-block-banner': 'rgba(44, 44, 46, 0.82)',
  '--dsw-alias-markdown-inline-code': 'rgba(44, 44, 46, 0.55)',
  '--dsw-alias-markdown-citation': 'rgba(35, 35, 36, 0.90)',
  '--dsw-alias-markdown-placeholder': 'rgba(35, 35, 36, 0.90)',
  '--dsw-alias-markdown-tag': 'rgba(44, 44, 46, 0.55)',
}



