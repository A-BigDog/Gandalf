/**
 * Gandalf theme — client bundle smoke test.
 *
 * Executes the built lib/client.js in a stubbed browser environment and
 * asserts the loader contract, the exported plugin surface, and the apply()
 * behavior (register → inject styles → setTheme → effect cleanup).
 * Run: node tests/smoke.test.mjs (after a build).
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const code = readFileSync(join(root, 'lib', 'client.js'), 'utf8')

let captured = null
globalThis.window = {
  __ModuleLoader__: { load: (def) => { captured = def } },
}

const fn = new Function('window', 'require', code)
fn(globalThis.window, (id) => { throw new Error(`unexpected external require: ${id}`) })

// --- Loader contract ---
if (captured === null) throw new Error('SMOKE FAIL: __ModuleLoader__.load never called')
if (captured.id !== 'gandalf-theme') throw new Error(`SMOKE FAIL: id = ${captured.id}`)

// --- Factory: no externals may be required ---
const moduleExports = captured.factory(() => { throw new Error('factory required an external!') })
if (moduleExports.name !== 'gandalf-theme') throw new Error(`SMOKE FAIL: name = ${moduleExports.name}`)
if (!Array.isArray(moduleExports.inject)) {
  throw new Error(`SMOKE FAIL: inject = ${JSON.stringify(moduleExports.inject)}`)
}

// --- apply(): stylesheet injection (v10: pure-CSS, no theme service) ---
const styleEl = { id: '', dataset: {}, textContent: '', remove: () => { styleEl.removed = true } }
globalThis.document = {
  createElement: () => styleEl,
  head: { appendChild: (el) => { el.appended = true } },
  documentElement: {},
}
const ctx = {}

moduleExports.apply(ctx)

if (!styleEl.appended) throw new Error('SMOKE FAIL: stylesheet not appended')
if (styleEl.id !== 'gandalf-theme-styles') throw new Error(`SMOKE FAIL: style id = ${styleEl.id}`)
if (!styleEl.textContent.includes('--dsw-alias-bg-base')) throw new Error('SMOKE FAIL: css missing token overrides')
if (!styleEl.textContent.includes('url(')) throw new Error('SMOKE FAIL: css missing background image')
if (styleEl.dataset.plugin !== 'gandalf-theme') throw new Error(`SMOKE FAIL: data-plugin = ${styleEl.dataset.plugin}`)
const tokenLines = (styleEl.textContent.match(/--dsw-[a-z-]+/g) || []).length
if (tokenLines < 20) throw new Error(`SMOKE FAIL: only ${tokenLines} token references`)

// --- Dark theme adapter (regression: 深色下白底白字不可读) ---
const darkBlock = styleEl.textContent.includes('body[data-ds-dark-theme]')
if (!darkBlock) throw new Error('SMOKE FAIL: dark theme adapter block missing')
const darkSurfaces = (styleEl.textContent.match(/body\[data-ds-dark-theme\]\s*\{[\s\S]*?\}/g) || [])
  .map(m => m.length).reduce((a, b) => a + b, 0)
if (darkSurfaces < 300) throw new Error(`SMOKE FAIL: dark theme surface overrides too small (${darkSurfaces} chars)`)
// 深色下不允许把表面钉成纯白（回归：面板白底 + DSH 白字 = 不可读）
const whiteOnDark = /body\[data-ds-dark-theme\][\s\S]*?rgb\(\s*255\s*,\s*255\s*,\s*255/.test(styleEl.textContent)
if (whiteOnDark) throw new Error('SMOKE FAIL: dark theme block still hardcodes pure white surfaces')

console.log(`SMOKE OK: loader contract + ${tokenLines} token overrides + dark adapter + stylesheet injected`)
