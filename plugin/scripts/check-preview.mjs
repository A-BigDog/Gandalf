/**
 * Gandalf preview — computed-style + WCAG contrast audit (no visual model).
 * Connects to headless Chrome CDP, opens preview.html, and reports the
 * effective colors and contrast ratios of key surfaces.
 * Run: node scripts/check-preview.mjs
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

const W = 1440, H = 900, PORT = 9336
const sleep = ms => new Promise(r => setTimeout(r, ms))

function parseColor(input) {
  // Accepts '#rrggbb' and 'rgb(r, g, b)'
  const t = input.trim()
  const m = t.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])]
  const h = t.replace('#', '')
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16))
}
function lum(input) {
  const [r, g, b] = parseColor(input).map(v => v / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrast(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

;(async () => {
  const profile = path.join(os.tmpdir(), 'audit-' + Date.now())
  const child = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
    '--window-size=' + W + ',' + H, 'about:blank'], { stdio: 'ignore' })
  let page
  for (let i = 0; i < 60 && !page; i++) {
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/json/list'); page = (await r.json()).find(t => t.type === 'page') } catch { }
    if (!page) await sleep(250)
  }
  if (!page) { console.error('cdp connect fail'); child.kill(); process.exit(2) }

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0; const pending = {}
  const send = (m, p) => new Promise(res => { const mid = ++id; pending[mid] = res; ws.send(JSON.stringify({ id: mid, method: m, params: p || {} })) })
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m.result); delete pending[m.id] } }
  await new Promise(r => ws.onopen = r)

  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: 'file:///C:/Me/projects/Gandalf/plugin/preview.html' })
  await sleep(3000)

  const evalExpr = `(() => {
    const pick = (sel, prop) => { const el = document.querySelector(sel); return el ? getComputedStyle(el)[prop] : null }
    const body = getComputedStyle(document.body)
    return {
      bodyBg: body.backgroundColor,
      bodyFont: body.fontFamily.split(',')[0],
      sidebarBg: pick('#sidebar', 'backgroundColor'),
      brandColor: pick('.brand', 'color'),
      brandFont: pick('.brand', 'fontFamily').split(',')[0],
      navColor: pick('.nav-item', 'color'),
      navActiveBg: pick('.nav-item.active', 'backgroundColor'),
      userBubbleBg: pick('.msg.user', 'backgroundColor'),
      assistantBubbleBg: pick('.msg.assistant', 'backgroundColor'),
      textColor: pick('.msg.assistant', 'color'),
      codeBg: pick('pre.code', 'backgroundColor'),
      composerBg: pick('#composer .box', 'backgroundColor'),
      btnBg: pick('.btn:not(.ghost)', 'backgroundColor'),
      btnColor: pick('.btn:not(.ghost)', 'color'),
      detailsBg: pick('#details', 'backgroundColor'),
      border: pick('#sidebar', 'borderRightColor'),
      cinzelLoaded: document.fonts ? document.fonts.check('16px Cinzel') : 'n/a',
      gandalfVar: getComputedStyle(document.body).getPropertyValue('--dsw-alias-brand-primary').trim(),
    }
  })()`
  const r = await send('Runtime.evaluate', { expression: evalExpr, returnByValue: true })
  const s = r.result.value
  console.log(JSON.stringify(s, null, 2))

  // WCAG contrast report (normal text needs >= 4.5)
  const checks = [
    ['label-primary vs bg-base', s.textColor, s.bodyBg],
    ['brand (gold) vs sidebar', s.brandColor, s.sidebarBg],
    ['nav vs sidebar', s.navColor, s.sidebarBg],
    ['btn text vs btn bg', s.btnColor, s.btnBg],
    ['error (warm red) vs bg', '#e08a6a', s.bodyBg],
    ['warn (amber) vs bg', '#e0b45c', s.bodyBg],
    ['success (green) vs bg', '#a8c08a', s.bodyBg],
    ['secondary text vs panel', '#c8ae84', s.assistantBubbleBg],
    ['tertiary text vs panel', '#a89060', s.assistantBubbleBg],
    ['code text vs code bg', s.textColor, s.codeBg],
    ['composer hint vs input', '#c8ae84', s.composerBg],
  ]
  console.log('\n=== WCAG contrast ===')
  let allPass = true
  for (const [name, fg, bg] of checks) {
    const ratio = contrast(fg, bg)
    const pass = ratio >= 4.5
    if (!pass) allPass = false
    console.log(`${pass ? 'PASS' : 'FAIL'} ${name}: ${ratio.toFixed(2)}:1 (fg ${fg} on ${bg})`)
  }
  console.log(allPass ? '\nALL CONTRAST PASS (>=4.5)' : '\nCONTRAST ISSUES — see above')
  child.kill()
})().catch(e => { console.error('fail:', e.message); process.exit(1) })
