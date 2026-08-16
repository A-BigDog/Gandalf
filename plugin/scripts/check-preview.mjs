/**
 * Gandalf live-GUI — computed-style + WCAG contrast audit (no visual model).
 * Connects to headless Chrome CDP, opens the running DSH GUI, and reports the
 * effective colors and contrast ratios of key surfaces in BOTH light and dark
 * theme modes.
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
  // Accepts '#rrggbb', 'rgb(r, g, b)', 'rgba(r, g, b, a)' (alpha composited
  // over white for contrast purposes).
  const t = (input || '').trim()
  const m = t.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?/)
  if (m) {
    const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])]
    const a = m[4] === undefined ? 1 : Number(m[4])
    if (a < 1) {
      // Composite over white — surfaces over the Gandalf backdrop are audited
      // against their own computed color, so this is a conservative floor.
      return [r * a + 255 * (1 - a), g * a + 255 * (1 - a), b * a + 255 * (1 - a)]
    }
    return [r, g, b]
  }
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

/** Evaluate a JS snippet and return its value. */
async function evaluate(ws, send, expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  return r.result.value
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
  await send('Page.navigate', { url: 'http://127.0.0.1:3080/' })
  await sleep(3000)

  // Sample strategy: read CSS variables off body for the base surfaces, and
  // probe real elements where the class is known; everything falls back to
  // body tokens when the element is not present (e.g. empty chat).
  const sampleExpr = `(() => {
    const body = getComputedStyle(document.body)
    const varOf = (name) => body.getPropertyValue(name).trim() || null
    const pick = (sel) => { const el = document.querySelector(sel); return el ? getComputedStyle(el) : null }
    const sidebar = pick('[class*="sidebarCol"]')
    const flow = pick('[class*="flowItem"]')
    const composer = pick('[class*="composer"]')
    const brand = pick('[class*="brand"]')
    return {
      varBgBase: varOf('--dsw-alias-bg-base'),
      varLayer1: varOf('--dsw-alias-bg-layer-1'),
      varLayer2: varOf('--dsw-alias-bg-layer-2'),
      varLabelPrimary: varOf('--dsw-alias-label-primary'),
      varLabelSecondary: varOf('--dsw-alias-label-secondary'),
      varSidebarFill: varOf('--dsw-specific-sidebar-fill'),
      varBubble: varOf('--dsw-specific-bubble'),
      varMarkdownCode: varOf('--dsw-alias-markdown-code-block'),
      sidebarBg: sidebar ? sidebar.backgroundColor : null,
      flowBg: flow ? flow.backgroundColor : null,
      flowColor: flow ? flow.color : null,
      composerBg: composer ? composer.backgroundColor : null,
      brandColor: brand ? brand.color : null,
    }
  })()`

  const report = async (label) => {
    const s = await evaluate(ws, send, sampleExpr)
    const v = s.varBgBase || s.sidebarBg || '#ffffff'
    const text = s.flowColor || s.varLabelPrimary || '#000000'
    const secondary = s.varLabelSecondary || '#61666b'
    const codeBg = s.varMarkdownCode || s.varLayer2 || v
    const bubbleBg = s.varBubble || s.flowBg || s.varLayer2 || v
    const sidebarBg = s.varSidebarFill || s.sidebarBg || v

    console.log(`\n======== ${label} ========`)
    console.log(JSON.stringify(s, null, 2))

    const checks = [
      ['primary text vs base', text, v],
      ['primary text vs bubble', s.flowColor || text, bubbleBg],
      ['secondary text vs base', secondary, v],
      ['code text vs code bg', text, codeBg],
      ['brand vs sidebar', s.brandColor || text, sidebarBg],
    ]
    console.log('\n=== WCAG contrast (normal text needs >= 4.5) ===')
    let allPass = true
    for (const [name, fg, bg] of checks) {
      if (!fg || !bg) { console.log(`SKIP ${name} (missing color fg=${fg} bg=${bg})`); continue }
      const ratio = contrast(fg, bg)
      const pass = ratio >= 4.5
      if (!pass) allPass = false
      console.log(`${pass ? 'PASS' : 'FAIL'} ${name}: ${ratio.toFixed(2)}:1 (fg ${fg} on ${bg})`)
    }
    console.log(allPass ? 'ALL CONTRAST PASS (>=4.5)' : 'CONTRAST ISSUES — see above')
    return allPass
  }

  let ok = true
  // Light theme first.
  await evaluate(ws, send, `document.body.removeAttribute('data-ds-dark-theme'); 'ok'`)
  ok = (await report('LIGHT theme')) && ok
  // Then dark theme.
  await evaluate(ws, send, `document.body.setAttribute('data-ds-dark-theme', ''); 'ok'`)
  ok = (await report('DARK theme')) && ok
  // Restore the app's actual theme (boot prefers durable light unless the
  // running GUI resolved dark — re-read from settings via the presenter attr).
  await evaluate(ws, send, `document.body.removeAttribute('data-ds-dark-theme'); 'ok'`)

  child.kill()
  process.exit(ok ? 0 : 1)
})().catch(e => { console.error('fail:', e.message); process.exit(1) })
