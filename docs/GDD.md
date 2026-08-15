# 📄 Gandalf — DSH 主题插件设计文档（GDD）

> 状态：草案 v0.1 ｜ 第 1 步·定范围 ｜ 更新：2026-08-14
> 技术章节（§3、§8）待 DSH 机制调研报告回来后补全

## 1. 一句话卖点

**给 DeepSeek Harness Web GUI 换上一身中土世界（Middle-earth）魔幻皮**——甘道夫式的暗夜金褐、铭文标题字体、羊皮纸般的质感，让写代码/聊 AI 的界面像走进霍比特人的故事。

## 2. 目标用户 / 平台 / 发布形态

- 目标用户：DSH 用户（开发者/研究者），厌倦默认界面、喜欢奇幻审美的人；**第一版自己用，成型后开源**
- 平台：DSH Web GUI（http://127.0.0.1:3080），走 DSH 的主题/客户端插件机制（待调研确认）
- 发布形态：开源仓库（README + 安装/构建说明），远期可考虑提交 DSH 上游做官方主题
- 变现：无（个人项目，开源免费）

## 3. 技术方案（已调研核实 ✅）

> 来源：DSH 源码/文档一手核实（docs/web-styling.md、docs/subsystems/client-modules.md、docs/user/develop/basic/index.md、packages/client/ui-theme）

### 3.1 机制结论（已确认）
- DSH Web 有官方主题系统：`ui-theme` 包提供 `ctx.theme`（ThemeRuntime），`--dsw-*` token 体系（静态色板 `--dsw-static-*` + 语义别名 `--dsw-alias-*` + 排版 `--dsw-font-*`），明暗双 palette
- 第三方主题注册 API：`ctx.theme.register({ id, colorScheme, tokens })`（别名层覆盖，内联到 body）
- token 叠层 API：`ctx.theme.overrideTokens(source, {token: {light, dark}})`（必须成对给双模式值）
- 主题偏好：内置 light/dark/system 持久化到 settings；第三方 id 为进程内扩展（刷新后回退，可接受）
- 插件加载：`dsh.client` 声明 + `exports["./client"]` + tsdown 构建；用户级 `pnpm dsh web --patch ./cordis.yml` 免改仓库
- 开发热更：`pnpm run dev:web` watcher（HMR），生产 `dsh web` 重启生效

### 3.2 Gandalf 插件架构（三件套）
1. **主题注册**：`register({ id:'gandalf', colorScheme:'dark', tokens:{ '--dsw-alias-bg-base':'#1a1612', ... } })` —— 换肤主体
2. **样式注入层**：插件浏览器端注入 `<style>`：背景图（base64 内联 ≤300KB）+ Cinzel `@font-face` + 装饰细节（气泡边框/侧边栏质感/符文 SVG）
3. **生效**：加载时 `setTheme('gandalf')` 自动启用（自用 v1）；后续可扩展 overrideTokens 常驻

### 3.3 约束红线
- token 只覆盖 `--dsw-alias-*` 别名层，不写死静态色值
- overrideTokens 每 token 必须给 light+dark 成对值
- 不动 ui-theme 源码、不改布局结构；字体/背景走插件自己的 CSS 注入
- 插件 bundle 单文件（tsdown），图片 base64 内联保证离线可用

### 3.4 验证路径
- 开发：dev:web watcher 热更 → 截图验证
- 验收：视觉评审（Qwen-VL）+ 对比度检查（WCAG AA）+ 明暗双模式

## 4. 范围（MVP 边界）

### 做
1. 全局换肤：配色（暗夜金褐）、字体（Cinzel 标题 + 可读正文）、背景图（免费可商用，深色遮罩保可读）
2. 布局定制：侧边栏/顶部栏/聊天气泡/输入框的中土风样式（边框、装饰、质感）
3. 深色遮罩与对比度保证：可读性第一

### 不做（v1 不做清单，范围蔓延一律进 backlog）
- ❌ 不改核心布局结构（拖拽/响应式行为）
- ❌ 不做主题切换 UI（设置里多个主题互切）——v1 只做 Gandalf 一套
- ❌ 不改动 DSH 功能逻辑/后端
- ❌ 不用任何版权素材（电影剧照/未授权图）

## 5. 视觉数值表（改表不改代码）

### 5.1 配色（晨曦金辉 —— 2026-08-14 最终拍板：用户朝阳甘道夫图 → 暖色主题）
| token | 色值 | 用途 |
|---|---|---|
| --bg-base | #241610 | 全局底色（深暖褐） |
| --bg-panel | #2f2014 / #3b2b1c | 面板/卡片 |
| --accent-gold | #e8b04c | 强调色（日出金） |
| --accent-glow | #f2c06a | 高亮/悬浮（霞光橙 #e08a4c 点缀） |
| --text-primary | #f0e4cc | 正文（晨光白） |
| --text-secondary | #c8ae84 | 次要文字（暖沙） |
| --border | rgba(232,176,76,.26) | 边框（鎏金晨光） |
| --danger | #e08a6a | 错误/危险（暖红） |

### 5.2 字体
| 用途 | 字体 | 许可 |
|---|---|---|
| 标题/品牌 | Cinzel（400/700/900） | OFL 1.1 |
| 正文 | Noto Sans SC / 可读无衬线（待确认） | OFL |

### 5.3 质感
- 背景：**用户自制朝阳甘道夫图**（sepia 暖化 + 72% 亮度 + JPEG 269KB base64 内联）+ 暖棕遮罩 0.14 + 9 颗暖金星点
- 字体：Cinzel 标题（OFL 自托管 base64）+ Noto Sans SC 正文（OFL，后续接）
- 边框：鎏金描边、圆角柔和、金色分隔线/晨星、符文分隔 SVG（自制）
- 聊天气泡：暖褐面板（82% 不透明）+ 金褐描边

## 6. 可读性红线（开发工具铁律）
- 正文对比度 ≥ 4.5:1（WCAG AA）——实测 11/11 全过（正文 16.67:1、金色 9.57:1、按钮 9.33:1、最弱 tertiary 5.10:1）
- 文字容器（气泡/代码/输入）不透明度 ≥ 0.76 保可读；空白区透背景
- 背景图压暗至 avgLum ~33 档（图清晰可见但护眼）；代码/文字区域不花哨字体

## 7. UI 风格方向
- 参考意象：灰袍甘道夫、中土地图、霍比特洞府木门、羊皮纸卷轴
- 装饰元素：SVG 符文边框、星星点缀、法杖光晕高光
- 图标：沿用现有图标集，仅换色

## 8. 里程碑与风险

### 路线图
| 阶段 | 目标 | 验收 |
|---|---|---|
| MVP | 8/15 | 本机 GUI 可切换到 Gandalf 主题：配色/字体/背景生效 |
| Alpha | 8/17 | 布局定制完成，视觉评审通过 |
| Beta | 8/19 | 可读性/性能/QA 通过 |
| 发布 | 8/20 | 开源：README + 安装说明 |

### 风险
| 风险 | 等级 | 对策 |
|---|---|---|
| DSH 无官方主题机制，只能改源码 | 高 | 调研后定方案；最坏路径：独立 CSS 覆盖层 + 用户手动注入 |
| 素材许可不清 | 中 | 只用 Unsplash/Pixabay/OFL，逐张记录许可（资产清单） |
| 魔幻风过度影响可读性 | 中 | 对比度红线 + 视觉评审（Qwen-VL）把关 |
| 背景图体积拖慢 GUI | 低 | 图片 ≤300KB，必要时 WebP |

### 不做清单（防蔓延）
见 §4。

## 9. 资产清单（asset manifest）

| 资产 | 来源 | 许可/署名 | 状态 |
|---|---|---|---|
| 背景图（甘道夫） | 用户自制（AI 生成/自绘） | 自由使用 | ✅ 已用（233KB JPEG） |
| Cinzel 字体 ×2 | Google Fonts | OFL 1.1 自托管 | ✅ 已用 |
| 金色星点/符文 SVG | 程序化/自制 | 原创 | ✅ 已用 |
| 正文中文字体 | Google Fonts（Noto Sans SC） | OFL | 待接（v1.1） |

> 发布前对照 launch-checklist.md「素材许可」核对本表；详见 docs/ASSETS.md。
