/**
 * Gandalf theme — alias-token overrides (夜空星金 palette).
 *
 * Source of truth: docs/GDD.md §5.1 (updated 8/14 — palette switched from
 * 暗夜金褐 to 夜空星金 per user decision: night-sky blue-black base +
 * golden starlight + parchment-white text, matching the starry-ridge backdrop).
 * Values here are literal CSS colors applied over the DSH dark base palette.
 */
import type { ThemeTokens } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Night-sky star-gold Gandalf palette, keyed by --dsw-alias-* names. */
export const GANDALF_TOKENS: ThemeTokens = {
  // ---- Surfaces (night-sky blue-black, near-neutral for contrast) ----
  '--dsw-alias-bg-base': '#0e1320',
  '--dsw-alias-bg-layer-1': '#141b2c',
  '--dsw-alias-bg-layer-2': '#1a2338',
  '--dsw-alias-bg-layer-3': '#202c46',
  '--dsw-alias-bg-overlay': '#253149',
  '--dsw-alias-bg-module-platform': '#161e30',
  '--dsw-alias-bg-multi-select': '#1c2740',
  '--dsw-alias-bg-skeleton': 'rgba(232, 200, 119, 0.08)',
  '--dsw-alias-bg-mask-1': 'rgba(5, 8, 16, 0.6)',
  '--dsw-alias-bg-mask-2': 'rgba(5, 8, 16, 0.3)',
  '--dsw-alias-bg-mask-3': 'rgba(5, 8, 16, 0.55)',

  // ---- Borders (starlight gold) ----
  '--dsw-alias-border-l1': 'rgba(232, 200, 119, 0.14)',
  '--dsw-alias-border-l2': 'rgba(232, 200, 119, 0.24)',
  '--dsw-alias-border-l3': 'rgba(232, 200, 119, 0.32)',
  '--dsw-alias-border-l4': 'rgba(232, 200, 119, 0.42)',

  // ---- Brand (starlight gold) ----
  '--dsw-alias-brand-primary': '#e8c877',
  '--dsw-alias-brand-primary-invert': '#151017',
  '--dsw-alias-brand-text': '#e6dfce',

  // ---- Text (parchment white / blue-grey / amber) ----
  '--dsw-alias-label-primary': '#e6dfce',
  '--dsw-alias-label-primary-bluish': '#e6dfce',
  '--dsw-alias-label-primary-dimmed': '#cdbf9a',
  '--dsw-alias-label-primary-foreground': '#14101a',
  '--dsw-alias-label-primary-inverted': '#14101a',
  '--dsw-alias-label-secondary': '#a9b1c4',
  '--dsw-alias-label-tertiary': '#7c879e',
  '--dsw-alias-label-caption': '#7c879e',
  '--dsw-alias-label-dimmed': '#5a657c',

  // ---- Buttons ----
  '--dsw-alias-button-primary-fill': '#e8c877',
  '--dsw-alias-button-primary-hover': '#f2d992',
  '--dsw-alias-button-primary-dimmed': '#7a6530',
  '--dsw-alias-button-contrast-fill': '#14101a',
  '--dsw-alias-button-elevated-fill': '#161e30',
  '--dsw-alias-button-floating-fill': '#1a2338',
  '--dsw-alias-button-floating-hover': '#202c46',
  '--dsw-alias-button-ghost-active-fill': '#1c2740',
  '--dsw-alias-button-ghost-active-hover': '#202c46',
  '--dsw-alias-button-ghost-active-border': '#e8c877',
  '--dsw-alias-button-info-fill': '#e8c877',
  '--dsw-alias-button-info-hover': '#f2d992',

  // ---- Interactive ----
  '--dsw-alias-interactive-bg-hover': 'rgba(232, 200, 119, 0.12)',
  '--dsw-alias-interactive-bg-hover-solid': '#1a2338',
  '--dsw-alias-interactive-bg-hover-accent': 'rgba(232, 200, 119, 0.22)',
  '--dsw-alias-interactive-bg-active': 'rgba(232, 200, 119, 0.18)',

  // ---- Markdown / code ----
  '--dsw-alias-markdown-code-block': '#0c1018',
  '--dsw-alias-markdown-code-block-banner': '#121829',
  '--dsw-alias-markdown-inline-code': '#1a2338',
  '--dsw-alias-markdown-citation': '#121829',
  '--dsw-alias-markdown-placeholder': '#121829',
  '--dsw-alias-markdown-tag': '#1c2740',

  // ---- Scrollbar ----
  '--dsw-alias-scrollbar-bg-l1': '#3a4660',
  '--dsw-alias-scrollbar-bg-l2': '#46536f',
  '--dsw-alias-scrollbar-hover-l1': '#56637f',
  '--dsw-alias-scrollbar-hover-l2': '#667390',

  // ---- State (warmed, still distinguishable) ----
  '--dsw-alias-state-error-primary': '#e08a7a',
  '--dsw-alias-state-error-secondary': '#e08a7a',
  '--dsw-alias-state-success-primary': '#8fbfa8',
  '--dsw-alias-state-success-secondary': '#7fb89a',
  '--dsw-alias-state-warn-label': '#e0b45c',
  '--dsw-alias-state-warn-primary': '#e0b45c',
  '--dsw-alias-state-warn-secondary': '#f2d992',
  '--dsw-alias-toast-bg': '#202c46',
  '--dsw-alias-tooltip-bg': '#253149',

  // ---- Specific surfaces ----
  '--dsw-specific-bubble': '#1a2236',
  '--dsw-specific-bubble-highlight': '#243050',
  '--dsw-specific-input-major': '#141b2c',
  '--dsw-specific-login-input': '#161e30',
  '--dsw-specific-menu': '#1a2338',
  '--dsw-specific-selector': '#1c2740',
  '--dsw-specific-sidebar-fill': '#0b0f18',
  '--dsw-specific-sidebar-nav-item-active': '#1c2740',
  '--dsw-specific-sidebar-nav-item-active-accent': '#e8c877',
  '--dsw-specific-sidebar-nav-item-hover': '#141b2c',
  '--dsw-specific-tip': '#1c2740',
}
