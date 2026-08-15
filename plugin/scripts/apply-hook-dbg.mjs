/**
 * Focused debug: wrap gandalf-theme's apply with zero ctx probing —
 * just record whether the real apply throws and whether its marker appears.
 */
import { spawn } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9347
const sleep = ms => new Promise(r => setTimeout(r, ms))

const HOOK = `
(() => {
  let _m = null
  const d = window.__GANDALF_DEBUG__ = { state: 'installed' }
  Object.defineProperty(window, '__DSH_MODULES__', {
    configurable: true,
    get: () => _m,
    set: (v) => {
      _m = v
      d.modulesSet = true
      const origImport = v.import
      if (typeof origImport === 'function' && !v.import.__hooked) {
        v.import = async function (id) {
          const mod = await origImport.call(this, id)
          if (id === 'gandalf-theme') {
            d.imported = true
            d.moduleKeys = mod ? Object.keys(mod).join(',') : 'null'
            if (mod && typeof mod.apply === 'function') {
              const origApply = mod.apply
              // 1) probe that DOM injection works in this environment
              try {
                const probe = document.createElement('style')
                probe.id = 'probe-inject'
                document.head.appendChild(probe)
                d.probeInjected = !!document.querySelector('#probe-inject')
              } catch (e) { d.probeError = String(e) }
              // 2) manually invoke the real apply with a stub ctx
              try {
                const fakeCtx = {
                  theme: { register: () => () => {}, setTheme: () => {} },
                  effect: () => {},
                }
                mod.apply(fakeCtx)
                d.manualApplyStyle = !!document.querySelector('#gandalf-theme-styles')
              } catch (e) {
                d.manualApplyError = String(e)
                d.manualApplyStack = (e && e.stack || '').split('\\n').slice(0, 6).join(' | ')
              }
              // 3) then wrap for the cordis call
              mod.apply = function (ctx) {
                d.applyCalled = true
                try {
                  const ret = origApply.call(this, ctx)
                  d.applyReturned = true
                  d.styleRightAfter = !!document.querySelector('#gandalf-theme-styles')
                  d.bodyBgRightAfter = getComputedStyle(document.body).backgroundImage.slice(0, 30)
                  setTimeout(() => {
                    d.styleAfter2s = !!document.querySelector('#gandalf-theme-styles')
                    d.bodyBgAfter2s = getComputedStyle(document.body).backgroundImage.slice(0, 30)
                    d.darkAttrAfter2s = document.body.getAttribute('data-ds-dark-theme')
                  }, 2000)
                  return ret
                } catch (e) {
                  d.applyError = String(e)
                  d.applyStack = (e && e.stack || '').split('\\n').slice(0, 6).join(' | ')
                  throw e
                }
              }
            }
          }
          return mod
        }
        v.import.__hooked = true
      }
    },
  })
})()
`

async function runOnce(port) {
  const profile = path.join(os.tmpdir(), 'foc-' + Date.now())
  const child = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + port, '--user-data-dir=' + profile,
    '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' })
  let page
  for (let i = 0; i < 60 && !page; i++) {
    try { const r = await fetch('http://127.0.0.1:' + port + '/json/list'); page = (await r.json()).find(t => t.type === 'page') } catch { }
    if (!page) await sleep(250)
  }
  if (!page) { child.kill(); return 'no-cdp' }
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
  await sleep(9000)
  const r = await send('Runtime.evaluate', { expression: 'JSON.stringify(window.__GANDALF_DEBUG__ || "hook lost")', returnByValue: true })
  child.kill()
  return r.result.value
}

for (let attempt = 1; attempt <= 3; attempt++) {
  const result = await runOnce(9346 + attempt)
  console.log(`attempt ${attempt}: ${result}`)
  if (!result.includes('hook lost')) break
}
