# 📄 Gandalf — DSH 主题插件设计文档（最终版）

> 状态：已发布（2026-08-14）｜ 设计真源：`progress.js`（进度）+ `docs/ASSETS.md`（素材许可）

## 1. 一句话卖点

给 DeepSeek Harness Web GUI 换上**甘道夫朝阳背景 + 霞鹭文楷等宽字体 + 中土风控件定制**，界面配色保持 DSH 原生。

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
1. 甘道夫背景图（原图直出）+ 半透明面板透出
2. 全局字体（霞鹭文楷等宽）+ 控件定制（气泡/面板/图标/对齐）
3. 可读性保证（对比度 4.5:1）

### 不做
- ❌ 不改核心布局结构
- ❌ 不做多主题切换 UI
- ❌ 不改 DSH 功能/后端
- ❌ 不用版权素材

## 5. 视觉数值（改表不改代码）

- **配色**：DSH 默认 dark palette；仅覆盖表面 token 透明度（空白区 0.08–0.30、文字容器 0.76–0.94）
- **字体**：`--dsw-font-family` → `'LXGW WenKai Mono Light', 'KaiTi', sans-serif`（代码区保持默认等宽）
- **控件**：AI 消息气泡（0.85 深色 + 85% 宽）、设置面板 0.92、选择框背景 0.85、发送按钮五芒星（限定 composer）、新会话/回到底部透明

## 6. 可读性红线

- 对比度 ≥ 4.5:1（实测 11/11 全过）
- 文字容器不透明 ≥ 0.76；代码区不花哨字体

## 7. 风险与遗留

| 风险/遗留 | 状态 |
|---|---|
| 中文字体依赖本地安装（霞鹭文楷） | README 已说明；未装则回退楷体 |
| 明暗模式 | 文字 token 浅色覆盖，已验证可读 |

> 资产许可详见 docs/ASSETS.md；历史迭代教训见 docs/issues.md。

