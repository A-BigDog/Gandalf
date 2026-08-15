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
if (!styleEl.textContent.includes('Cinzel')) throw new Error('SMOKE FAIL: css missing font faces')
if (!styleEl.textContent.includes('--dsw-alias-bg-base')) throw new Error('SMOKE FAIL: css missing token overrides')
if (styleEl.dataset.plugin !== 'gandalf-theme') throw new Error(`SMOKE FAIL: data-plugin = ${styleEl.dataset.plugin}`)
const tokenLines = (styleEl.textContent.match(/--dsw-[a-z-]+/g) || []).length
if (tokenLines < 20) throw new Error(`SMOKE FAIL: only ${tokenLines} token references`)

console.log(`SMOKE OK: loader contract + ${tokenLines} token overrides + stylesheet injected`)
