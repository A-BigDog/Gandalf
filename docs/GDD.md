# 📄 Gandalf — DSH 主题插件设计文档（最终版）

> 状态：已发布（2026-08-16，v11 浅色/深色双主题适配）｜ 设计真源：`docs/ASSETS.md`（素材许可）

## 1. 一句话卖点

给 DeepSeek Harness Web GUI 换上**甘道夫朝阳背景 + 霞鹭文楷等宽字体 + 中土风控件定制**，浅色/深色双主题下界面配色保持 DSH 原生。

## 2. 目标用户 / 平台 / 发布形态

- 用户：DSH 用户（开发者），想要个性化界面的奇幻审美人群
- 平台：DSH Web GUI（走官方 client 插件机制）
- 形态：开源（MIT，GitHub: A-BigDog/Gandalf）

## 3. 技术方案（已落地）

- **纯 CSS 注入**（v10 修正）：`inject: []` 零服务依赖 + apply 注入一张 `<style data-plugin>`（loader 卸载自动清理）；token 覆盖用 body 级变量 `!important` 压过 presenter 内联变量
- **主题注册 API 已弃用**（v9 实验证明 register/setTheme 在 HMR 下不稳定）——只走 CSS 层
- 加载：用户级 `dsh web --patch` 或 profile patch（免改仓库）
- 热更：host stat-poll 检测 bundle 变化 → SSE → 浏览器无刷新重载

## 4. 范围（最终边界）

### 做
1. 甘道夫背景图（原图直出）+ 半透明面板透出（浅色）；深色下表面改用 DSH 深色调色板实色
2. 全局字体（霞鹭文楷等宽）+ 控件定制（气泡/面板/图标/对齐）
3. 可读性保证（对比度 ≥ 4.5:1，浅色/深色双主题审计）

### 不做
- ❌ 不改核心布局结构
- ❌ 不做多主题切换 UI（跟随 DSH 设置里的浅色/深色/系统）
- ❌ 不改 DSH 功能/后端
- ❌ 不用版权素材

## 5. 视觉数值（改表不改代码）

> 具体数值以 `tokens.ts`（浅色表面透明度/字体）和 `theme.css.ts`（背景/控件 + 深色块）为准，改完跑 `plugin/build.cmd` 一键构建。

- **配色**：浅色主题——白色面板（半透明/全透可调）+ 甘道夫背景图（cover，位置可调）；**深色主题**——`body[data-ds-dark-theme]` 块把表面切到 DSH 深色调色板实色（引用 `--dsw-static-neutral-bluish-*` 静态 token，背景图以半透明保留氛围）；**字色 DSH 默认**（不覆盖文字 token，两种主题自动跟随）
- **字体**：`--dsw-font-family` → 霞鹭文楷等宽（本地）；代码区保持默认等宽
- **控件**：发送按钮五芒星（限定 composer）、新会话/回到底部透明、设置面板/选择框白色可调（深色下自动切换深色底）

## 6. 可读性红线

- 对比度 ≥ 4.5:1（`node scripts/check-preview.mjs` 双主题审计）
- 文字容器可读优先；代码区不花哨字体
- 用户消息气泡（`userRow`）任何主题下保持 DSH 默认，不被覆盖

## 7. 风险与遗留

| 风险/遗留 | 状态 |
|---|---|
| 中文字体依赖本地安装（霞鹭文楷） | README 已说明；未装则回退楷体 |
| 深色块引用 DSH 静态 token（`--dsw-static-neutral-bluish-*`） | DSH 升级若改 token 名需同步；CI 冒烟校验深色块存在 |

> 资产许可详见 docs/ASSETS.md；历史迭代教训见 docs/issues.md。


