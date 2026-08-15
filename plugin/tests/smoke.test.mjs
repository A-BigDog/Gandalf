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
if (!Array.isArray(moduleExports.inject) || !moduleExports.inject.includes('theme')) {
  throw new Error(`SMOKE FAIL: inject = ${JSON.stringify(moduleExports.inject)}`)
}

// --- apply(): register → stylesheet → setTheme → effect cleanup ---
let registered = null
let setThemeCalled = null
const effects = []
const styleEl = { id: '', dataset: {}, textContent: '', remove: () => { styleEl.removed = true } }
globalThis.document = {
  createElement: () => styleEl,
  head: { appendChild: (el) => { el.appended = true } },
  documentElement: {},
}
const ctx = {
  theme: {
    register: (def) => { registered = def; return () => { registered.disposed = true } },
    setTheme: (id) => { setThemeCalled = id },
  },
  effect: (fn, label) => { effects.push({ fn, label }) },
}

moduleExports.apply(ctx)

if (registered === null) throw new Error('SMOKE FAIL: theme.register not called')
if (registered.id !== 'gandalf' || registered.colorScheme !== 'dark') {
  throw new Error(`SMOKE FAIL: registered = ${JSON.stringify(registered)}`)
}
const tokenCount = Object.keys(registered.tokens).length
if (tokenCount < 20) throw new Error(`SMOKE FAIL: only ${tokenCount} tokens`)
if (setThemeCalled !== 'gandalf') throw new Error(`SMOKE FAIL: setTheme = ${setThemeCalled}`)
if (!styleEl.appended) throw new Error('SMOKE FAIL: stylesheet not appended')
if (!styleEl.textContent.includes('Cinzel')) throw new Error('SMOKE FAIL: css missing font faces')
if (styleEl.dataset.plugin !== 'gandalf-theme') throw new Error(`SMOKE FAIL: data-plugin = ${styleEl.dataset.plugin}`)
if (effects.length === 0) throw new Error('SMOKE FAIL: no effect registered')

// --- Unload cleanup ---
effects[0].fn()
if (!registered.disposed) throw new Error('SMOKE FAIL: theme not disposed on unload')
if (!styleEl.removed) throw new Error('SMOKE FAIL: stylesheet not removed on unload')

console.log(`SMOKE OK: loader contract + ${tokenCount} tokens + register/setTheme/cleanup all verified`)
