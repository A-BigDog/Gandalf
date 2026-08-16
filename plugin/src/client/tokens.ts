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
  '--dsw-alias-bg-base': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-layer-1': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-layer-2': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-layer-3': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-module-platform': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-multi-select': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-overlay': '#ffffff',

  // ---- Message bubbles (text safety floor) ----
  '--dsw-specific-bubble': 'rgba(255, 255, 255, 0)',
  '--dsw-specific-bubble-highlight': 'rgb(255, 255, 255)',
  '--dsw-specific-input-major': 'rgb(255, 255, 255)',
  '--dsw-specific-login-input': 'rgb(255, 255, 255)',
  '--dsw-specific-menu': 'rgb(255, 255, 255)',
  '--dsw-specific-selector': 'rgb(255, 255, 255)',

  // ---- Sidebar (nav readability) ----
  '--dsw-specific-sidebar-fill': 'rgba(255, 255, 255, 0)',
  '--dsw-specific-sidebar-nav-item-active': 'rgb(255, 255, 255)',
  '--dsw-specific-sidebar-nav-item-hover': 'rgb(255, 255, 255)',
  '--dsw-specific-tip': 'rgb(255, 255, 255)',

  // ---- Text (light-on-dark safety for any color-scheme mode) ----

  // ---- Global typeface (LXGW WenKai Mono — 霞鹭文楷等宽, OFL, local; Cinzel removed per user) ----
  '--dsw-font-family': "'LXGW WenKai Mono Light', 'LXGW WenKai Mono', '霞鹜文楷等宽 Light', '霞鹭文楷', 'KaiTi', sans-serif",

  '--dsw-alias-separator-primary': '#555555',
  // ---- Code / markdown (near-opaque: readability first) ----
  '--dsw-alias-markdown-code-block': 'rgb(255, 255, 255)',
  '--dsw-alias-markdown-code-block-banner': 'rgb(255, 255, 255)',
  '--dsw-alias-markdown-inline-code': 'rgb(255, 255, 255)',
  '--dsw-alias-markdown-citation': 'rgb(255, 255, 255)',
  '--dsw-alias-markdown-placeholder': 'rgb(255, 255, 255)',
  '--dsw-alias-markdown-tag': 'rgb(255, 255, 255)',
}





















