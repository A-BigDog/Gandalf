/**
 * Debug: hook __ModuleLoader__.load before the app boots, capture what the
 * gandalf-theme bundle hands to it, and manually invoke the factory to see
 * whether the module surface (name/inject/apply) is intact in the browser.
 */
import { spawn } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9339
const sleep = ms => new Promise(r => setTimeout(r, ms))

const HOOK = `
(() => {
  window.__CAPTURED__ = []
  let _ml = null
  Object.defineProperty(window, '__ModuleLoader__', {
    configurable: true,
    get: () => _ml,
    set: (v) => {
      _ml = v
      if (v && typeof v.load === 'function' && !v.load.__hooked) {
        const orig = v.load
        const hooked = function (def) {
          window.__CAPTURED__.push({ event: 'load', id: def.id, hasFactory: typeof def.factory })
          if (def.id === 'gandalf-theme') {
            try {
              const req = (mid) => { window.__CAPTURED__.push({ require: mid }); throw new Error('external require: ' + mid) }
              const mod = def.factory(req)
              window.__CAPTURED__.push({ factoryResult: { name: mod && mod.name, inject: mod && mod.inject, hasApply: !!(mod && typeof mod.apply === 'function') } })
            } catch (e) {
              window.__CAPTURED__.push({ factoryError: String(e) })
            }
          }
          return orig.call(this, def)
        }
        hooked.__hooked = true
        v.load = hooked
      }
    },
  })
})()
`

;(async () => {
  const profile = path.join(os.tmpdir(), 'hook-' + Date.now())
  const child = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
    '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' })
  let page
  for (let i = 0; i < 60 && !page; i++) {
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/json/list'); page = (await r.json()).find(t => t.type === 'page') } catch { }
    if (!page) await sleep(250)
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0; const pending = {}
  const send = (m, p) => new Promise(res => { const mid = ++id; pending[mid] = res; ws.send(JSON.stringify({ id: mid, method: m, params: p || {} })) })
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m.result); delete pending[m.id] } }
  await new Promise(r => ws.onopen = r)

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.addScriptToEvaluateOnNewDocument', { source: HOOK })
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: 'http://127.0.0.1:3080/' })
  await sleep(7000)

  const r = await send('Runtime.evaluate', {
    expression: 'JSON.stringify(window.__CAPTURED__ || "hook not applied")',
    returnByValue: true,
  })
  console.log(JSON.stringify(JSON.parse(r.result.value), null, 2))
  child.kill()
})().catch(e => { console.error('fail:', e.message); process.exit(1) })
