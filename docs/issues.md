# Issues 记录（Gandalf 插件开发）

> 现象 / 根因 / 发现方式 / 修复 / 防复发

## 2026-08-16

### 10. 深色主题下白底白字不可读（面板硬编码白色）
- **现象**：设置切到 DSH 深色主题后，整个界面文字看不清（对比度极低）；背景/侧边栏仍是浅色，只有设置页遮罩变深。
- **根因**：插件按浅色主题设计——`theme.css.ts` 把 `[class*='panel']`/`[class*='flowItem']` 等硬编码成 `rgb(255,255,255)` 白色，背景 token 设成全透明。DSH 深色主题下文字 token 自动变浅色（`--dsw-alias-label-primary` → 接近白），落到白色面板上 = 白底白字。遮罩用的 `--dsw-alias-bg-mask-1` 没被覆盖，所以深色下正常变深——"只有遮罩变深"。
- **发现方式**：用户真机反馈 + 读 DSH ui-theme `design-platform.css`（确认深色文字 token 值）+ 对照插件 tokens/theme.css 硬编码。
- **修复**：v11 新增 `body[data-ds-dark-theme]` 适配块——深色下所有表面 token 改用 DSH 深色调色板（引用 `--dsw-static-neutral-bluish-*` 静态 token），面板/气泡/输入框深色实底、背景层半透明保留背景图氛围；用户消息气泡（`userRow`）任何主题下保持 DSH 默认。
- **防复发**：smoke 测试断言深色块存在且深色块内无纯白硬编码；verify-live 加深色 spot check；check-preview 双主题对比度审计；CI 构建后校验 bundle 无 `rgb(255,255,255)`。

### 11. 深色下背景图过暗
- **现象**：深色适配后背景图几乎看不见（太暗）。
- **根因**：背景层 alpha 设到 0.92/0.95，基本不透。
- **发现方式**：用户反馈。
- **修复**：`--dsw-alias-bg-base` → 0.5、`bg-layer-1` → 0.55、`sidebar-fill` → 0.55（半透明透出背景图），承载文字的表面保持深色实底。
- **防复发**：背景透出度集中在深色块顶部三个 alpha 值，改数值即可；审计脚本会量对比度兜底。

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

### 8. 选择框背景 token 用错（bg-overlay vs input-major）
- **现象**：用户反馈选择框（AskUserQuestion 弹窗）太透，改了 bg-overlay 却无效果。
- **根因**：QuestionComposer 的弹窗卡片背景用的是 `--dsw-specific-input-major`（不是 bg-overlay；bg-overlay 是更外层/其他元素）。
- **发现方式**：读 ui-user-questions 源码（QuestionComposer.module.css L24）。
- **修复**：加深 `--dsw-specific-input-major`（0.76 → 0.92，同设置面板）。
- **防复发**：定位组件背景先读源码确认用的哪个 token，别猜。

### 9. 宽泛 `[class*='primary']` 误伤选择框提交按钮
- **现象**：五芒星替换（`[class*='primary'] svg` + `::after`）作用到选择框提交按钮——文字被五芒星盖住（看不清+重叠）。
- **根因**：提交按钮也是 `variant="primary"`（ui-primitives Button），类名含 `_primary_xxx`——宽泛属性选择器命中。
- **发现方式**：用户反馈提交按钮看不清/重叠 + DevTools 拿到按钮类名（`_primary_kz6gm_38`）。
- **修复**：五芒星规则限定 `[class*='composer'] [class*='primary']`（只作用于发送按钮）；选择框提交按钮恢复 DSH 默认。
- **防复发**：组件级样式覆盖必须限定容器；同类 variant 组件（primary/outline）在不同界面复用，选择器宁精准勿宽泛。
