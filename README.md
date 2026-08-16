# Gandalf — DeepSeek Harness 甘道夫主题插件

> 甘道夫朝阳背景图 + 霞鹭文楷等宽字体 + 中土风控件定制，界面配色保持 DSH 原生。

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/A-BigDog/Gandalf?style=social)](https://github.com/A-BigDog/Gandalf)
[![DSH Plugin](https://img.shields.io/badge/DSH-Plugin%20%E2%9C%A8-8a6a3a)](https://github.com/deepseek-ai/deepseek-harness)

## 📸 效果预览

![Gandalf 主题效果](docs/screenshot.jpg)

## ✨ 功能

- **背景**：用户自制甘道夫图（cover 完整显示 + 位置可调）
- **字体**：全局统一——**霞鹭文楷等宽**（本地安装，OFL 开源，零网络依赖）；**字色用 DSH 默认**
- **消息流**：靠左对齐；AI 消息为**圆角气泡卡片**，你的消息保持 DSH 默认
- **控件定制**：「新会话」透明底、「回到底部」透明、发送按钮五芒星图标（自制 SVG）、设置面板/选择框背景可调
- **配色**：浅色/深色双主题适配——浅色为白色半透明面板 + 背景图透出；深色为 DSH 深色调色板实色表面（背景图以半透明保留氛围），文字沿用 DSH 各主题默认色
- **自动生效**：插件加载即套用，卸载恢复默认
- **可读性**：WCAG AA 对比度 11/11 全过、bundle ~406KB（预算 1MB 内）

## ⚠️ 中文字体（霞鹭文楷等宽）

中文标题/正文需要本机安装字体（否则回退系统楷体/黑体）：
- GitHub 开源：`lxgw/LxgwWenKai`（OFL 1.1，免费商用）
- 安装后无需任何配置，主题自动使用

## 📦 安装

前置：DSH 源码 checkout（`pnpm install` 完成）。

### 1. 构建插件

```sh
cd plugin
"<checkout>\node_modules\.bin\tsdown.cmd"        # 产出 lib/index.js + lib/client.js
node tests\smoke.test.mjs                         # 冒烟测试（可选但推荐）
```

### 2. 加载插件（二选一）

**A. 临时加载**（推荐先验证）：

```sh
cd <checkout根>
pnpm dsh web --patch <你的Gandalf仓库绝对路径>/plugin/cordis.yml
```

**B. 永久加载**：把以下 insert 行加入 `~/.dsh/profiles/web/cordis.patch.yml`（路径替换为你的仓库绝对路径）：

```yaml
- insert:
    - id: gandalf-theme
      name: '<你的Gandalf仓库绝对路径>/plugin/lib/index.js'
```

### 3. 生效

重启 `dsh web` → Gandalf 主题自动启用。之后修改插件源码并重新构建，GUI 会通过 stat-poll 热更（无需再重启）。

## 🗑️ 卸载

从 patch 文件移除 gandalf-theme 的 insert 行 → 重启 `dsh web` → 恢复默认外观。

## 🛠️ 开发

| 想改什么 | 改哪里 |
|---|---|
| 面板透明度（背景透出程度） | `src/client/tokens.ts`（29 个覆盖：表面透明度 + 文字 + 字体，改表不改代码） |
| 深色主题表面颜色/背景图透出度 | `src/client/theme.css.ts`（`body[data-ds-dark-theme]` 块，改数值即可） |
| 背景图/字体/样式 | `src/client/theme.css.ts`（注入 CSS 层） |
| 素材（换背景图/字体） | `assets/` → `node scripts/embed-assets.mjs` 重新内联 |
| 冒烟测试 | `node tests/smoke.test.mjs` |
| 对比度审计 | `node scripts/check-preview.mjs`（WCAG AA，审计运行中的 GUI） |
| 真机验证 | `node scripts/verify-live.mjs`（headless 检查插件是否生效） |

## 📄 素材与许可

| 素材 | 来源 | 许可 |
|---|---|---|
| 背景图（甘道夫） | 项目作者自制（AI 生成/自绘） | 自由使用 |
| 霞鹭文楷等宽 | 用户本地安装（GitHub lxgw/LxgwWenKai） | OFL 1.1 |
| 五芒星图标 | 自制 SVG | 原创 |

详见 [`docs/ASSETS.md`](docs/ASSETS.md)。

## ⚠️ 注意事项

- 只覆盖面板表面透明度（取 DSH 默认暗色值 + alpha），不覆盖任何主题颜色
- 深色主题（`body[data-ds-dark-theme]`）单独有一套表面覆盖：面板/气泡/输入框用 DSH 深色调色板实色，背景层半透明保留背景图氛围——改 `theme.css.ts` 深色块的数值即可
- 用户消息气泡（`:has([class*='userRow'])`）始终保持 DSH 默认，深色下同样不被覆盖
- 组件类名是 CSS Module hash——装饰选择器用 `[class*='local名']` 模糊匹配，真机验证为准
- 插件是纯 CSS 注入（零服务依赖），不调用 theme 服务——卸载自动恢复默认

