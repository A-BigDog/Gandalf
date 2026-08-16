/**
 * Gandalf theme — alias-token overrides (v11: 浅色/深色双主题适配).
 *
 * 2026-08-16 用户拍板：浅色主题用半透明面板让背景图透出；深色主题
 * 用 DSH 深色调色板实色表面（背景图半透明保留氛围）。文字 token 一律
 * 不覆盖，跟随 DSH 各主题默认色。
 *
 * 这里只覆盖浅色（默认）主题的表面透明度与字体；深色主题的覆盖在
 * theme.css.ts 的 `body[data-ds-dark-theme]` 块（颜色值引用 DSH 静态
 * token，避免硬编码）。颜色值取 DSH 默认 palette 的原色。
 */
import type { ThemeTokens } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Translucent-surface overrides only; colors mirror the DSH default palette. */
export const GANDALF_TOKENS: ThemeTokens = {
  // ---- Conversation area (most visible backdrop) ----
  '--dsw-alias-bg-base': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-layer-1': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-layer-2': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-layer-3': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-module-platform': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-multi-select': 'rgba(255, 255, 255, 0)',
  '--dsw-alias-bg-overlay': 'var(--dsw-static-neutral-bluish-00)',

  // ---- Message bubbles (text safety floor) ----
  '--dsw-specific-bubble': 'rgba(255, 255, 255, 0)',
  '--dsw-specific-bubble-highlight': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-specific-input-major': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-specific-login-input': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-specific-menu': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-specific-selector': 'var(--dsw-static-neutral-bluish-00)',

  // ---- Sidebar (nav readability) ----
  '--dsw-specific-sidebar-fill': 'rgba(255, 255, 255, 0)',
  '--dsw-specific-sidebar-nav-item-active': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-specific-sidebar-nav-item-hover': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-specific-tip': 'var(--dsw-static-neutral-bluish-00)',

  // ---- Global typeface (LXGW WenKai Mono — 霞鹭文楷等宽, OFL, local) ----
  '--dsw-font-family': "'LXGW WenKai Mono Light', 'LXGW WenKai Mono', '霞鹜文楷等宽 Light', '霞鹭文楷', 'KaiTi', sans-serif",

  '--dsw-alias-separator-primary': '#555555',
  // ---- Code / markdown (near-opaque: readability first) ----
  '--dsw-alias-markdown-code-block': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-alias-markdown-code-block-banner': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-alias-markdown-inline-code': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-alias-markdown-citation': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-alias-markdown-placeholder': 'var(--dsw-static-neutral-bluish-00)',
  '--dsw-alias-markdown-tag': 'var(--dsw-static-neutral-bluish-00)',
}
