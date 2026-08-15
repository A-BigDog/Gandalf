/**
 * Gandalf theme — browser client half.
 *
 * Registers the 'gandalf' theme with the DSH ThemeRuntime (alias-token
 * overrides over the dark base palette), injects the global style layer
 * (backdrop, Cinzel titling, decorations), and auto-activates on load.
 * Unload removes both, restoring the built-in appearance.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { GANDALF_TOKENS } from './tokens.ts'
import { GANDALF_CSS } from './theme.css.ts'

export const name = 'gandalf-theme'

/** Required services: the theme registry provided by dsh-client-ui-theme. */
export const inject = ['theme']

const STYLE_TAG_ID = 'gandalf-theme-styles'

/**
 * Client plugin body.
 * @param ctx - client cordis context (ctx.theme ready after inject).
 */
export function apply(ctx: ClientContext): void {
  // 1. Register the theme (alias-layer overrides over the dark base palette).
  const disposeTheme = ctx.theme.register({
    id: 'gandalf',
    colorScheme: 'dark',
    tokens: GANDALF_TOKENS,
  })

  // 2. Inject the global style layer (backdrop / fonts / decorations).
  const style = document.createElement('style')
  style.id = STYLE_TAG_ID
  style.dataset.plugin = name
  style.textContent = GANDALF_CSS
  ;(document.head ?? document.documentElement).appendChild(style)

  // 3. Auto-activate. Preference writes are restricted to built-in ids, so
  // the selection stays in-process; apply() re-asserts it on every load.
  try {
    ctx.theme.setTheme('gandalf')
  } catch {
    // Theme service rejected the id — nothing to force; built-ins remain.
  }

  // Unload: restore the default appearance and drop the injected stylesheet.
  ctx.effect(() => {
    disposeTheme()
    style.remove()
  }, 'gandalf-theme: cleanup')
}
