# Issues 记录（Gandalf 插件开发）

> 现象 / 根因 / 发现方式 / 修复 / 防复发

## 2026-08-14

### 1. theme 服务路径在真机 HMR 下不稳定
- **现象**：v9 用 `ctx.theme.register` + `setTheme` + `inject:['theme']`——headless 冒烟正常，真机（用户浏览器）反复"没效果"；debug 版（无 theme 依赖、纯 style 注入）稳定生效。
- **根因**：cordis 服务注入/HMR 重载时序（fiber 卸载时 `ctx.effect` cleanup 立即移除注入的 style；register 重复/服务解析在真机与 headless 表现不一致）。
- **发现方式**：headless 隔离实验（hook `modules.import` 确认 apply 被调用但效果被移除）+ 真机对比。
- **修复**：v10 改为**纯 CSS 注入**——`inject: []`（零服务依赖）+ apply 注入一张 `<style data-plugin>`（loader 卸载自动清理）；token 覆盖用 body 级变量 `!important`（压过 presenter 内联变量）。稳定生效。
- **防复发**：client 插件优先纯 CSS 路径；确需 theme 服务时先在真机验证 HMR 重载。

### 2. `@import` 位置错误导致字体未加载
- **现象**：Noto Serif SC 加了但界面字体没变。
- **根因**：`@import` 放在样式表规则之后——CSS 规范要求 @import 必须在顶部，否则忽略。
- **发现方式**：headless 检查 `document.fonts` 无该字体。
- **修复**：@import 移到 GANDALF_CSS 首行（验证加载成功）。
- **防复发**：注入样式里的 @import 永远放最顶。

### 3. Google Fonts CDN 国内不可访问
- **现象**：Noto Serif SC（fonts.googleapis.com）在用户环境加载失败（headless 也确认分片未下载）。
- **根因**：Google Fonts 在国内网络不可达。
- **发现方式**：headless measureText 全字体宽度一致（fallback 系统字体）。
- **修复**：改为系统自带字体（用户已装"霞鹭文楷等宽 Light"，font-family 直接引用，零下载）。
- **防复发**：开源主题不依赖 Google Fonts CDN；中文字体用系统字体或自托管。

### 4. CSS Modules hash 类名定位方法
- **现象**：想改 DSH 组件样式但类名是 hash（`-g6s4G_flowItem` 等）。
- **根因**：DSH 用 CSS Modules，类名格式 `[hash]_[local]`。
- **发现方式**：headless DOM 检查。
- **修复**：用 `[class*='local名']` 模糊匹配（local 后缀稳定）；配合 aria-label（如"回到底部"）和 SVG path 特征（`path[d*='11.8486']`）精确定位。
- **防复发**：只依赖 local 后缀，不依赖 hash 前缀。

### 5. 布局 bug（重叠错位）
- **现象**：字体选择器加宽后元素重叠。
- **根因**：`[class*='title']`/`[class*='header']` 宽泛选择器命中正文容器，强制 Cinzel 改变元素尺寸。
- **发现方式**：用户反馈 + headless rect 检查。
- **修复**：收窄选择器（只留 brand/heading/Header 等精准标题类）；最终全局字体走 `--dsw-font-family` 变量覆盖（一处统一，布局自洽）。
- **防复发**：全局样式优先用变量（token）层，避免逐元素选择器；选择器宁精准勿宽泛。

### 6. 消息居中 vs 左对齐
- **现象**：消息内容居中（x≈482），用户要"靠左（贴侧边栏/页面边缘）"。
- **根因**：消息 column 用 `margin: auto` 居中（computed 显示 0）。
- **发现方式**：headless 父级链分析（scroll > column 的 margin auto）。
- **修复**：`[class*='scroll'] > [class*='column'] { margin-left: 0; margin-right: auto }`——相对可用区域左对齐（侧边栏展开贴侧边栏、收起贴页面左）。
- **防复发**：布局问题先查父级链（margin/padding/flex 设置），再定改哪层。

### 7. 需求确认流程教训
- **现象**：多次"瞎改"（composer 输入框区、flowItem margin 等）后被用户纠正。
- **根因**：需求含糊时未先问清（技能铁律"不清楚必须问，不猜着做"）就动手。
- **发现方式**：用户多次"回退/改错了"反馈。
- **修复**：后期改为"先问清楚 + headless 定位 + 小步验证"；用户确认需求（消息内容靠左、气泡区分、图标风格）后再改。
- **防复发**：任何涉及"哪个区域/什么效果"的需求，先确认目标元素和预期，再动代码。
