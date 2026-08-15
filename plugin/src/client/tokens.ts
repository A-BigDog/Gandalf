/**
 * Gandalf theme — alias-token overrides (晨曦金辉 palette).
 *
 * Source of truth: docs/GDD.md §5.1 (2026-08-14 第三次迭代 — 用户最终拍板
 * 「晨曦金辉」：朝阳甘道夫图的暖色主题。深暖褐底 + 日出金 + 晨光白文字，
 * 背景图为 sepia 暖化 + 72% 亮度，与主题浑然一体)。
 * Values here are literal CSS colors applied over the DSH dark base palette.
 */
import type { ThemeTokens } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Dawn-gold Gandalf palette, keyed by --dsw-alias-* names. */
export const GANDALF_TOKENS: ThemeTokens = {
  // ---- Surfaces (warm dusk-brown, translucent so the sunrise scene shows) ----
  '--dsw-alias-bg-base': 'rgba(36, 22, 16, 0.64)',
  '--dsw-alias-bg-layer-1': 'rgba(47, 32, 20, 0.66)',
  '--dsw-alias-bg-layer-2': 'rgba(59, 43, 28, 0.64)',
  '--dsw-alias-bg-layer-3': 'rgba(70, 52, 34, 0.62)',
  '--dsw-alias-bg-overlay': '#3b2b1c',
  '--dsw-alias-bg-module-platform': 'rgba(50, 35, 22, 0.66)',
  '--dsw-alias-bg-multi-select': 'rgba(64, 47, 30, 0.64)',
  '--dsw-alias-bg-skeleton': 'rgba(232, 176, 76, 0.08)',
  '--dsw-alias-bg-mask-1': 'rgba(20, 10, 4, 0.6)',
  '--dsw-alias-bg-mask-2': 'rgba(20, 10, 4, 0.3)',
  '--dsw-alias-bg-mask-3': 'rgba(20, 10, 4, 0.55)',

  // ---- Borders (sunrise gold) ----
  '--dsw-alias-border-l1': 'rgba(232, 176, 76, 0.16)',
  '--dsw-alias-border-l2': 'rgba(232, 176, 76, 0.26)',
  '--dsw-alias-border-l3': 'rgba(232, 176, 76, 0.34)',
  '--dsw-alias-border-l4': 'rgba(232, 176, 76, 0.44)',

  // ---- Brand (dawn gold) ----
  '--dsw-alias-brand-primary': '#e8b04c',
  '--dsw-alias-brand-primary-invert': '#201208',
  '--dsw-alias-brand-text': '#f0e4cc',

  // ---- Text (morning-light white / warm sand) ----
  '--dsw-alias-label-primary': '#f0e4cc',
  '--dsw-alias-label-primary-bluish': '#f0e4cc',
  '--dsw-alias-label-primary-dimmed': '#d8c298',
  '--dsw-alias-label-primary-foreground': '#201208',
  '--dsw-alias-label-primary-inverted': '#201208',
  '--dsw-alias-label-secondary': '#c8ae84',
  '--dsw-alias-label-tertiary': '#a89060',
  '--dsw-alias-label-caption': '#a89060',
  '--dsw-alias-label-dimmed': '#6e5838',

  // ---- Buttons ----
  '--dsw-alias-button-primary-fill': '#e8b04c',
  '--dsw-alias-button-primary-hover': '#f2c06a',
  '--dsw-alias-button-primary-dimmed': '#8a6a30',
  '--dsw-alias-button-contrast-fill': '#201208',
  '--dsw-alias-button-elevated-fill': '#38281a',
  '--dsw-alias-button-floating-fill': '#422f1e',
  '--dsw-alias-button-floating-hover': '#4e3824',
  '--dsw-alias-button-ghost-active-fill': '#4a3520',
  '--dsw-alias-button-ghost-active-hover': '#563e26',
  '--dsw-alias-button-ghost-active-border': '#e8b04c',
  '--dsw-alias-button-info-fill': '#e8b04c',
  '--dsw-alias-button-info-hover': '#f2c06a',

  // ---- Interactive ----
  '--dsw-alias-interactive-bg-hover': 'rgba(232, 176, 76, 0.14)',
  '--dsw-alias-interactive-bg-hover-solid': '#422f1e',
  '--dsw-alias-interactive-bg-hover-accent': 'rgba(232, 176, 76, 0.24)',
  '--dsw-alias-interactive-bg-active': 'rgba(232, 176, 76, 0.20)',

  // ---- Markdown / code (near-opaque: readability first) ----
  '--dsw-alias-markdown-code-block': 'rgba(24, 14, 8, 0.94)',
  '--dsw-alias-markdown-code-block-banner': 'rgba(36, 22, 12, 0.92)',
  '--dsw-alias-markdown-inline-code': 'rgba(64, 47, 30, 0.78)',
  '--dsw-alias-markdown-citation': 'rgba(36, 22, 12, 0.90)',
  '--dsw-alias-markdown-placeholder': 'rgba(36, 22, 12, 0.90)',
  '--dsw-alias-markdown-tag': 'rgba(70, 52, 34, 0.78)',

  // ---- Scrollbar ----
  '--dsw-alias-scrollbar-bg-l1': '#6e5838',
  '--dsw-alias-scrollbar-bg-l2': '#7a6440',
  '--dsw-alias-scrollbar-hover-l1': '#8a7448',
  '--dsw-alias-scrollbar-hover-l2': '#947e50',

  // ---- State (warm, still distinguishable) ----
  '--dsw-alias-state-error-primary': '#e08a6a',
  '--dsw-alias-state-error-secondary': '#e08a6a',
  '--dsw-alias-state-success-primary': '#a8c08a',
  '--dsw-alias-state-success-secondary': '#98b87a',
  '--dsw-alias-state-warn-label': '#e0b45c',
  '--dsw-alias-state-warn-primary': '#e0b45c',
  '--dsw-alias-state-warn-secondary': '#f2c06a',
  '--dsw-alias-toast-bg': '#422f1e',
  '--dsw-alias-tooltip-bg': '#4e3824',

  // ---- Specific surfaces ----
  '--dsw-specific-bubble': 'rgba(52, 36, 22, 0.82)',
  '--dsw-specific-bubble-highlight': 'rgba(78, 56, 34, 0.76)',
  '--dsw-specific-input-major': 'rgba(42, 28, 16, 0.86)',
  '--dsw-specific-login-input': 'rgba(47, 32, 20, 0.86)',
  '--dsw-specific-menu': '#3b2b1c',
  '--dsw-specific-selector': 'rgba(64, 47, 30, 0.76)',
  '--dsw-specific-sidebar-fill': 'rgba(26, 16, 10, 0.74)',
  '--dsw-specific-sidebar-nav-item-active': 'rgba(64, 47, 30, 0.72)',
  '--dsw-specific-sidebar-nav-item-active-accent': '#e8b04c',
  '--dsw-specific-sidebar-nav-item-hover': 'rgba(42, 28, 16, 0.76)',
  '--dsw-specific-tip': 'rgba(64, 47, 30, 0.78)',
}
