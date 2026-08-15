# 暗夜金褐 / 中土魔幻风主题 — 素材与字体调研报告

> 用途：DeepSeek Harness 开发工具 GUI 的换肤插件（开源发布），需要**免费可商用**的背景图与字体。
> 调研日期：本会话实时核实。所有许可均指向官方许可页；反爬站点以"搜索引擎索引 + 官方页面"双重确认，见文末「验证方法与可信度」。
> 结论速览：**背景图推荐 Unsplash 摄影图（暗调雾林/星空山脉）+ OGA CC0 星空背景兜底；正文/标题字体用 Cinzel (OFL) + Noto Sans SC (OFL)，许可全部干净、零署名要求。**

---

## 1. 背景图候选（3–5 张，深色、安静、≥1920×1080、免署名可商用）

### 首选：Unsplash 摄影图（Unsplash License：免费商用、无需署名）

| # | 图片（标题） | 作者 | 下载页 URL | 许可 | 为什么适合 |
|---|---|---|---|---|---|
| 1 | 山脊上空的星空夜穹 The night sky is filled with stars above a mountain range | Casey Horner | https://unsplash.com/photos/the-night-sky-is-filled-with-stars-above-a-mountain-range-W7F4zAdcpCw | Unsplash License（免费商用、免署名） | 大面积夜空 + 山脉剪影，天然深色，星星可被遮罩压成金褐细点；聊天背景首选，几乎不可能"闪瞎"用户 |
| 2 | 雾林中的剪影树 Silhouetted trees in misty forest | Jordan Cormack | https://unsplash.com/photos/silhouetted-trees-in-misty-forest-Gq-6245rnvw | Unsplash License | 灰雾深林，画面安静无主体人物，叠深色遮罩后非常出效果；中土"迷雾山脉"气质 |
| 3 | 暗色剪影树的雾景 Misty forest landscape with dark silhouetted trees | Annie Spratt | https://unsplash.com/photos/misty-forest-landscape-with-dark-silhouetted-trees-qwWhZMG-yAc | Unsplash License | 知名摄影师高口碑图，雾林层次丰富，暗部占大面积；与 #2 风格互补可做主题切换 |
| 4 | 雾中山坡上的常青林 Evergreen forest on misty mountain slope | ekaterina domracheva | https://unsplash.com/photos/evergreen-forest-on-misty-mountain-slope-PDlA3j1c5E4 | Unsplash License | 雾中山林，青灰冷调，经金褐遮罩可统一为暗夜金褐色；无文字无水印 |
| 5 | 暗色山脊后的低光 Low sun behind dark mountain ridge | Wolfgang Hasselmann | https://unsplash.com/photos/low-sun-behind-dark-mountain-ridge-h7S2ERuT4CY | Unsplash License | 黄昏低光、大面积暗部山脊，黄昏"魔戒远征"氛围；适合做登录页/启动页背景 |

> **大图直链**：将页面 URL 改为 `/download` 结尾（如 `https://unsplash.com/photos/W7F4zAdcpCw/download`）即跳转到该摄影师上传的原图（通常 3000–6000px 长边，远超 1920×1080）。下载时建议用该直链或页面右上 Download 按钮。
>
> 备选（同为深色星夜，可换入候选）：Marek Piwnicki《Starry night sky over snow-covered mountains》https://unsplash.com/photos/starry-night-sky-over-snow-covered-mountains-ktllNfb9cBs ；Fabrice Villard《Snow-capped mountain peak under a starry night sky》https://unsplash.com/photos/snow-capped-mountain-peak-under-a-starry-night-sky-5WuO0I4ryaI

### 备选：Pixabay 摄影图（Pixabay Content License：免费商用、无需署名）

| # | 图片（标题） | 下载页 URL | 许可 | 说明 |
|---|---|---|---|---|
| 6 | Forest Foggy Monochrome（单色雾林） | https://pixabay.com/photos/forest-foggy-monochrome-mountains-10240498/ | Pixabay Content License | 单色灰雾森林，天然暗调，页面提供免费高清下载（常见 1280–1920 档，部分图可到更高） |
| 7 | Moody Mountain Peaks Shrouded in Mist（阴郁雾峰，最贴题） | https://pixabay.com/photos/moody-mountain-peaks-shrouded-in-mist-9010590/ | Pixabay Content License | 标题即"阴郁山峰笼罩薄雾"，暗色山景，中土气质 |
| 8 | Foggy Mountains Nature Landscape（雾山风景） | https://pixabay.com/photos/foggy-mountains-nature-landscape-10423822/ | Pixabay Content License | 雾中山峦，安静无干扰 |

> Pixabay 页面有「免费下载」按钮，下载前可在页面查看可用尺寸档（≥1920 的档位普遍存在）。Pixabay 官方许可摘要：https://pixabay.com/service/license-summary/ （免费商用、无需署名；禁止转售原图、禁止用于 AI 训练等，见第 4 节）。

### 兜底：OpenGameArt（CC0，已实测分辨率）

| # | 素材 | 作者 | 页面 URL | 文件直链 | 许可 | 实测分辨率 |
|---|---|---|---|---|---|---|
| 9 | Perfectly Seamless Night Sky（无缝星空） | LuminousDragonGames | https://opengameart.org/content/perfectly-seamless-night-sky | https://opengameart.org/sites/default/files/Starbasesnow.png | **CC0**（页面字段实抓确认） | **3000×1500**（PNG 头解析实测） |

> 说明：这是"游戏风"星空背景（深色 + 星星，横纵无缝平铺），做全屏聊天背景建议配深色遮罩 + 微缩放；比例 2:1，16:9 屏幕需横向裁剪（裁后仍约 2667×1500）。OGA 站内其余候选注意：`Background Night`（Alekei）是 **CC-BY 3.0**（需署名，若坚持零署名则排除）；`Rocky Night` 文件仅 20–33KB，分辨率不足，已排除。OGA 检索入口（可加 `CC0` 集合筛选）：https://opengameart.org/art-search?keys=night+sky+background

---

## 2. 备选：羊皮纸 / 纸张纹理（面板、卡片背景）

> 设计建议：羊皮纸在暗色 UI 里**不必追求"天然深色"**——更稳的做法是「深色底 + 半透明羊皮纸纹理叠加（CSS `filter: brightness(0.4~0.6)` 或 `mix-blend-mode: multiply`）」，把亮羊皮纸压成暗金褐质感，可控性最高。以下为基线候选：

| 素材 | 站点/许可 | URL | 说明 |
|---|---|---|---|
| Paper Old Texture Parchment（古董羊皮纸） | Pixabay Content License | https://pixabay.com/photos/paper-old-texture-parchment-antique-5746244/ | 经典羊皮纸纹理，叠加变暗后做卡片底纹 |
| Old Paper Texture（旧纸张） | Pixabay Content License | https://pixabay.com/photos/old-old-paper-texture-vintage-8797102/ | 旧纸纤维质感，同上处理 |
| Dark Dark Color Dark Pattern（深色暗纹，天然深色） | Pixabay Content License | https://pixabay.com/zh/illustrations/dark-dark-color-dark-pattern-8493174/ | 本身就是深色底纹，省去压暗步骤 |
| Brown leather texture（棕色皮革，Karolina Grabowska） | Unsplash License | https://unsplash.com/photos/a-close-up-of-a-brown-leather-texture-background-BCR45lUXoMU | 天然深棕，可作"旧书皮/皮革面板"风格 |

---

## 3. Cinzel 字体确认 + 正文字体推荐

### Cinzel（标题 / 罗马体雕花风格，完美契合"中土 + 罗马碑刻"气质）

- **官方页面**：https://fonts.google.com/specimen/Cinzel
- **许可**：**SIL Open Font License 1.1**（免费商用、可修改再分发；只需保留 OFL 许可声明，**无需署名**）。已从 google/fonts 官方仓库实抓核实：
  - 元数据：https://raw.githubusercontent.com/google/fonts/main/ofl/cinzel/METADATA.pb → `license: "OFL"`
  - 许可文本：https://raw.githubusercontent.com/google/fonts/main/ofl/cinzel/OFL.txt → 首行 `This Font Software is licensed under the SIL Open Font License, Version 1.1`
- **字重覆盖**：**变量字体 400–900**（METADATA：`min_value 400 / max_value 900`），即 400（Regular）、700（Bold）、900（Black）**全部覆盖** ✓
- **CDN 引入**（实测 fonts.googleapis.com 返回了 400/700/900 三档 @font-face）：
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap" rel="stylesheet">
  ```

### 正文字体推荐（中文优先）

| 字体 | 角色 | 许可 | 官方页面 | CDN 示例 | 说明 |
|---|---|---|---|---|---|
| **Noto Sans SC**（思源黑体谷歌版） | 中文正文主字体 | OFL（已核实 `license: "OFL"`，变量 100–900） | https://fonts.google.com/noto/specimen/Noto+Sans+SC | `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap`（400/700 已实测返回） | 中文 UI 首选，覆盖简中，可读性稳定 |
| **Source Serif 4**（思源宋体西文版） | 英文衬线正文/次级标题 | OFL（已核实） | https://fonts.google.com/specimen/Source+Serif+4 | `https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&display=swap` | 配 Cinzel 的衬线正文，卡片引文/正文英文优雅 |
| Cormorant（备选衬线） | 英文装饰性标题 | OFL（已核实） | https://fonts.google.com/specimen/Cormorant | — | 更高瘦的衬线，若 Cinzel 视觉过重可换 |

> 组合建议：`Cinzel (400/700/900)` 做标题 + 数字；`Noto Sans SC (400/500/700)` 做中文正文；`Source Serif 4` 做英文正文/引文。三者均为 OFL，可放心打包进插件（`@fontsource` 或自托管 woff2 均可，推荐自托管以避免运行时依赖 Google CDN）。

---

## 4. 版权红线检查（这些素材不能用）

| # | 素材类型 | 为什么不能用 | 替代方案 |
|---|---|---|---|
| 1 | 《霍比特人》《指环王》电影官方剧照、幕后照、概念图 | 华纳兄弟 / New Line Cinema 版权资产，网络流传图几乎都无授权 | 用上文摄影图或 OGA CC0，靠"色调 + 遮罩"营造中土感，不碰 IP 素材 |
| 2 | **Unsplash+（付费订阅）素材**：搜索 URL 带 `?license=plus` 的图片 | 需订阅，非免费可商用 | 只选 `license=free` 档；下载前确认页面无水印标签 |
| 3 | pngtree 等"免费素材站"未明确许可的图 | 多为订阅/积分制，免费下载带水印且条款模糊（本次检索已见 zh.pngtree.com 命中，勿用） | 只用 Unsplash/Pixabay/OGA 三站官方许可 |
| 4 | Alamy、Shutterstock、Dreamstime、Adobe Stock 等商业图库缩略图 | 付费授权素材，抓图即侵权（本次检索已见 alamy/dreamstime 命中，勿用） | 同上 |
| 5 | **CC-BY 3.0（需署名）素材**，如 OGA《Background Night》 | 可用但必须按要求署名；若主题追求"零署名、README 干净"则排除 | OGA 里改搜 CC0（如第 1 节 #9）；若接受署名，需在 README 建"素材署名表"并保留许可文本 |
| 6 | StockCake 等新兴"免费站"素材 | 许可条款逐站不同、变动频繁，可信度低于三大站 | 不作主来源，只用三大站 |
| 7 | 含人脸特写 / 可识别人物、商标、建筑的照片 | 肖像权、商标权风险（即使用户同意，开源主题不宜兜底） | 本文候选均为无人风景，无此风险；换图时坚持"无人、无文字水印"筛选 |
| 8 | **Pixabay 素材的越界使用** | Pixabay 条款禁止：转售/再分发原图（不改动）、把图喂给 AI 训练、用于非法/色情内容；下载时留意页面 "AI-generated" 标注 | 主题内仅作为背景使用（属于"修改后使用"场景，合规）；README 注明来源与许可 |
| 9 | **Unsplash 素材的越界使用** | Unsplash 条款禁止：转售未修改原图、批量下载构建素材库、搭建与 Unsplash 竞争的图库服务 | 主题内作为背景（裁剪/叠遮罩=修改后使用）合规；README 注明来源 |
| 10 | 声称"无需署名"但实际没有许可页的野站图 | 无许可页 = 无法证明可商用 | 只信官方许可页链接（上文均已给出） |

**发布前 Checklist**：① 每张图都在其官方页面点开看过一遍（确认暗度、无水印文字）；② README 写入素材来源 + 许可链接（Unsplash/Pixabay 免署名，但注明来源是好习惯）；③ 若用到 OGA 素材，按页面要求保留许可声明（CC0 连声明都非必需，但保留更稳）。

---

## 附：验证方法与可信度说明

- ✅ **已实锤**（直接抓取一手来源）：
  - Cinzel / Noto Sans SC / Source Serif 4 / Cormorant 的 OFL 许可与字重范围 → google/fonts 官方仓库 `METADATA.pb` / `OFL.txt`（raw.githubusercontent.com，本次会话实测抓取）。
  - Google Fonts CDN `fonts.googleapis.com/css2` 实测返回 Cinzel 400/700/900、Noto Sans SC 400/700。
  - OGA《Perfectly Seamless Night Sky》CC0 标注（页面字段实测）+ `Starbasesnow.png` **3000×1500**（PNG 文件头实测解析）。
  - Unsplash 官方帮助中心两篇文章可达（商业用途、署名政策）：https://help.unsplash.com/en/articles/2612315 、https://help.unsplash.com/en/articles/2612337 。
- ⚠️ **受反爬限制、已尽力核实**：Unsplash 与 Pixabay 的页面直接抓取被 401/403（Cloudflare）拦截，改用以下方式交叉确认——页面 URL 与作者名来自搜索引擎索引的官方页面结果；`/download` 直链模式为 Unsplash 官方下载约定。**照片像素级分辨率未逐张实测**，但两站原图/高清档普遍 ≥1920px（Unsplash 常见 3000px+，Pixabay 提供 1920 档），下载时请以页面显示尺寸为准。
- ❌ 未使用任何"道听途说"的许可声明；每个许可均给出官方页面链接。
