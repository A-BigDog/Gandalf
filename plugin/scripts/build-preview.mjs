/**
 * Build the Gandalf preview page (plugin/preview.html) from the single source
 * of truth (src/client/tokens.ts + src/client/theme.css.ts) so the design
 * never forks between the plugin and the preview.
 *
 * Run: node scripts/build-preview.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import * as assets from '../src/client/assets.generated.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokensSrc = readFileSync(join(root, 'src', 'client', 'tokens.ts'), 'utf8')
const cssSrc = readFileSync(join(root, 'src', 'client', 'theme.css.ts'), 'utf8')

// Extract " '--name': 'value', " pairs from the tokens object.
const pairs = [...tokensSrc.matchAll(/\s+'([^']+)': '([^']+)'/g)]
  .map(([, name, value]) => ({ name, value }))
if (pairs.length < 20) throw new Error(`preview: only ${pairs.length} tokens extracted`)

const tokenCss = pairs.map(p => `  ${p.name}: ${p.value};`).join('\n')

// DSH default dark-palette values the preview needs that Gandalf does NOT
// override (in the real GUI these come from ui-theme; the preview must supply
// them so colors resolve like the shipped app).
const DEFAULT_TOKENS = {
  '--dsw-alias-label-primary': '#f9fafb',
  '--dsw-alias-label-secondary': '#cfd3d6',
  '--dsw-alias-label-tertiary': '#adb2b8',
  '--dsw-alias-label-caption': '#adb2b8',
  '--dsw-alias-brand-primary': '#f9fafb',
  '--dsw-alias-brand-text': '#f9fafb',
  '--dsw-alias-border-l1': 'rgba(255,255,255,0.06)',
  '--dsw-alias-border-l2': 'rgba(255,255,255,0.12)',
  '--dsw-alias-button-primary-fill': '#f9fafb',
  '--dsw-alias-button-primary-hover': '#ebedf2',
  '--dsw-alias-button-contrast-fill': '#0f1115',
  '--dsw-alias-state-error-primary': '#f25a5a',
  '--dsw-alias-state-success-primary': '#22c55e',
  '--dsw-alias-state-warn-primary': '#f59e0b',
  '--dsw-specific-sidebar-nav-item-active-accent': 'rgba(255,255,255,0.6)',
  '--dsw-specific-bubble-highlight': 'rgba(67,69,74,0.78)',
}
const defaultCss = Object.entries(DEFAULT_TOKENS).map(([k, v]) => `  ${k}: ${v};`).join('\n')

// Extract the template-literal CSS body from theme.css.ts, expanding the
// ${ASSET} interpolation placeholders from assets.generated.ts.
const cssMatch = cssSrc.match(/`([\s\S]*?)`/)
if (!cssMatch) throw new Error('preview: css template literal not found')
const expandedCss = cssMatch[1].replace(/\$\{([A-Z0-9_]+)\}/g, (m, name) => assets[name] ?? m)

const layout = `/* Simulated DSH layout (preview only) */
* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
html { background-color: #0a0e18; }
body { display: flex; font-family: var(--dsw-font-family, system-ui); color: var(--dsw-alias-label-primary); background: transparent; }
#app { display: grid; grid-template-columns: 240px 1fr 320px; width: 100%; height: 100%; }
/* Sidebar */
#sidebar { background: var(--dsw-specific-sidebar-fill); border-right: 1px solid var(--dsw-alias-border-l1); display: flex; flex-direction: column; padding: 14px; gap: 8px; }
#sidebar .brand { font-family: 'Cinzel', serif; font-weight: 700; font-size: 20px; letter-spacing: 0.06em; color: var(--dsw-alias-brand-primary); padding: 6px 8px 14px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
#sidebar .nav-item { padding: 8px 10px; border-radius: 8px; color: var(--dsw-alias-label-secondary); font-size: 13px; }
#sidebar .nav-item.active { background: var(--dsw-specific-sidebar-nav-item-active); color: var(--dsw-alias-label-primary); box-shadow: inset 2px 0 0 var(--dsw-specific-sidebar-nav-item-active-accent); }
#sidebar .nav-item:hover { background: var(--dsw-specific-sidebar-nav-item-hover); }
#sidebar .grow { flex: 1; }
/* Conversation */
#conversation { display: flex; flex-direction: column; background: var(--dsw-alias-bg-base); min-width: 0; }
#messages { flex: 1; overflow: auto; padding: 22px 28px; display: flex; flex-direction: column; gap: 16px; }
.msg { max-width: 78%; padding: 12px 16px; border-radius: 14px; font-size: 14px; line-height: 1.6; border: 1px solid var(--dsw-alias-border-l1); }
.msg.user { align-self: flex-end; background: var(--dsw-specific-bubble); border-color: var(--dsw-alias-border-l2); }
.msg.assistant { align-self: flex-start; background: var(--dsw-alias-bg-layer-1); }
.msg h3 { font-family: 'Cinzel', serif; margin: 0 0 6px; font-size: 15px; color: var(--dsw-alias-brand-primary); letter-spacing: 0.04em; }
pre.code { background: var(--dsw-alias-markdown-code-block); border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; padding: 12px; font-size: 12.5px; line-height: 1.5; overflow: auto; color: var(--dsw-alias-label-primary); font-family: 'SF Mono', 'JetBrains Mono', Consolas, monospace; }
pre.code .kw { color: #d4a24c; } pre.code .str { color: #8fbd8f; } pre.code .cmt { color: var(--dsw-alias-label-tertiary); }
.toolcard { background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; padding: 10px 12px; font-size: 12.5px; color: var(--dsw-alias-label-secondary); }
.toolcard .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--dsw-alias-state-success-primary); margin-right: 8px; }
#composer { border-top: 1px solid var(--dsw-alias-border-l1); padding: 14px 28px 20px; background: var(--dsw-alias-bg-layer-1); }
#composer .box { background: var(--dsw-specific-input-major); border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px; padding: 12px 14px; min-height: 44px; color: var(--dsw-alias-label-secondary); font-size: 14px; }
#composer .actions { display: flex; justify-content: flex-end; margin-top: 8px; gap: 8px; }
.btn { background: var(--dsw-alias-button-primary-fill); color: var(--dsw-alias-button-contrast-fill); border: none; border-radius: 8px; padding: 7px 18px; font-size: 13px; font-weight: 600; cursor: pointer; }
.btn:hover { background: var(--dsw-alias-button-primary-hover); }
.btn.ghost { background: transparent; color: var(--dsw-alias-label-secondary); border: 1px solid var(--dsw-alias-border-l2); }
/* Details */
#details { background: var(--dsw-alias-bg-layer-1); border-left: 1px solid var(--dsw-alias-border-l1); padding: 16px; display: flex; flex-direction: column; gap: 10px; overflow: auto; }
#details .sec { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.08em; color: var(--dsw-alias-brand-primary); text-transform: uppercase; margin-bottom: 2px; }
#details .field { background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 8px 10px; font-size: 12.5px; color: var(--dsw-alias-label-secondary); }
#details .field .k { color: var(--dsw-alias-label-tertiary); }
`

const page = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>Gandalf theme — preview</title>
<style>
${layout}
${expandedCss}
body[data-ds-dark-theme] {
${defaultCss}
${tokenCss}
}
</style>
</head>
<body data-ds-dark-theme>
<div id="app">
  <aside id="sidebar">
    <div class="brand">✦ GANDALF</div>
    <div class="nav-item active">新对话</div>
    <div class="nav-item">魔戒远征队</div>
    <div class="nav-item">瑞文戴尔会议</div>
    <div class="nav-item">刚铎保卫战</div>
    <div class="nav-item">夏尔旧事</div>
    <div class="grow"></div>
    <div class="nav-item">设置</div>
  </aside>
  <main id="conversation">
    <div id="messages">
      <div class="msg bubble user">甘道夫，你曾说“凡黑暗处，皆有一线光明”。帮我写一段法术施展的代码？</div>
      <div class="msg bubble assistant">
        <h3>Light of the Wizard</h3>
        <p>“你无法通过黑暗战胜黑暗，唯有光明方可破之。”下面是一个护盾咒术的实现：</p>
        <pre class="code"><span class="cmt">// 圣光护盾 · Istari</span>
<span class="kw">function</span> castShield(magicka, allies) {
  <span class="kw">const</span> radiance = magicka * <span class="str">0.618</span>; <span class="cmt">// 黄金比例</span>
  <span class="kw">return</span> allies.map(a => ({ ...a, ward: radiance }));
}
<span class="kw">console.log</span>(<span class="str">"You shall not pass!"</span>);</pre>
        <div class="toolcard"><span class="dot"></span>pwsh · 施展法术 castShield —— 完成，用时 1.2s</div>
      </div>
      <hr>
      <div class="msg bubble assistant">
        <h3>中土地图已载入</h3>
        <p>迷雾山脉之东，刚铎与魔多的边境已在视野之内。需要我规划一条从瑞文戴尔出发的路线吗？</p>
      </div>
    </div>
    <div id="composer" class="composer">
      <div class="box input">向甘道夫询问中土之事……</div>
      <div class="actions">
        <button class="btn button ghost">撤回</button>
        <button class="btn button">✦ 施法</button>
      </div>
    </div>
  </main>
  <aside id="details">
    <div class="sec">Session</div>
    <div class="field"><span class="k">会话</span> · 魔戒远征队</div>
    <div class="field"><span class="k">模型</span> · deepseek-v4-flash</div>
    <div class="field"><span class="k">上下文</span> · 6.2k / 128k</div>
    <div class="sec">Arcana</div>
    <div class="field"><span class="k">法力</span> · 蓝条 78%</div>
    <div class="field"><span class="k">护符</span> · 火之戒 Narya</div>
  </aside>
</div>
</body>
</html>
`

const out = join(root, 'preview.html')
writeFileSync(out, page)
console.log(`preview written: ${out} (${pairs.length} tokens, ${page.length} bytes)`)
