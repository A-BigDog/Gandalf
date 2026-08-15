/**
 * Live-GUI verification: open the running DSH web GUI in headless Chrome and
 * check that the Gandalf plugin's styles are actually applied.
 * Run: node scripts/verify-live.mjs
 */
import { spawn } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

const CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]
const CHROME = CANDIDATES.find(p => fs.existsSync(p))
if (!CHROME) { console.error('no chrome'); process.exit(2) }

const PORT = 9337
const sleep = ms => new Promise(r => setTimeout(r, ms))

;(async () => {
  const profile = path.join(os.tmpdir(), 'live-' + Date.now())
  const child = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
    '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' })
  let page
  for (let i = 0; i < 60 && !page; i++) {
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/json/list'); page = (await r.json()).find(t => t.type === 'page') } catch { }
    if (!page) await sleep(250)
  }
  if (!page) { console.error('cdp fail'); child.kill(); process.exit(2) }

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0; const pending = {}
  const send = (m, p) => new Promise(res => { const mid = ++id; pending[mid] = res; ws.send(JSON.stringify({ id: mid, method: m, params: p || {} })) })
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m.result); delete pending[m.id] } }
  await new Promise(r => ws.onopen = r)

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Log.enable')
  await send('Network.enable')
  const consoleLogs = []
  const netLogs = []
  ws.onmessage = e => {
    const m = JSON.parse(e.data)
    if (m.id && pending[m.id]) { pending[m.id](m.result); delete pending[m.id] }
    if (m.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(`[console.${m.params.type}] ` + m.params.args.map(a => a.value ?? a.description ?? '').join(' '))
    }
    if (m.method === 'Runtime.exceptionThrown') {
      consoleLogs.push('[exception] ' + (m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text))
    }
    if (m.method === 'Network.requestWillBeSent' && m.params.request.url.includes('gandalf')) {
      netLogs.push(`REQ ${m.params.request.method} ${m.params.request.url.slice(0, 90)}`)
    }
    if (m.method === 'Network.responseReceived' && m.params.response.url.includes('gandalf')) {
      netLogs.push(`RES ${m.params.response.status} ${m.params.response.url.slice(0, 90)}`)
    }
    if (m.method === 'Network.loadingFailed' && m.params.errorText) {
      netLogs.push(`FAIL ${m.params.errorText}`)
    }
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: 'http://127.0.0.1:3080/' })
  await sleep(8000) // let the app boot + plugin load

  const evalExpr = `(() => {
    const body = getComputedStyle(document.body)
    const boot = window.__DSH_BOOT__
    const g = boot ? boot.entries.find(e => e.id === 'gandalf-theme') : null
    return {
      gandalfEntry: g ? JSON.stringify(g) : 'not in graph',
      themeStylesInjected: !!document.querySelector('style[data-plugin="gandalf-theme"]'),
      hasGandalfBg: body.backgroundImage.includes('data:image/jpeg'),
    }
  })()`
  const r = await send('Runtime.evaluate', { expression: evalExpr, returnByValue: true })
  console.log(JSON.stringify(r.result.value, null, 2))
  console.log('\n--- network (gandalf) ---')
  console.log(netLogs.length ? netLogs.join('\n') : '(no gandalf network traffic)')
  console.log('\n--- console / errors ---')
  console.log(consoleLogs.length ? consoleLogs.slice(-20).join('\n') : '(no console output captured)')
  child.kill()
})().catch(e => { console.error('fail:', e.message); process.exit(1) })
