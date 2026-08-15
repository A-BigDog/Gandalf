# 素材与许可清单（Asset Manifest）

> 发布前核对（对照 launch-checklist 的"素材许可"项）。
> 原则：免费可商用 / 原创 / 零署名要求；任何版权素材不入库。

## 背景图

| 文件 | 内容 | 来源 | 许可 | 状态 |
|---|---|---|---|---|
| `plugin/assets/bg-gandalf.png` | 甘道夫主题图（原始，4.1MB） | 项目作者自制（AI 生成/自绘） | 自由使用，无版权争议 | ✅ 已入库 |
| `plugin/assets/bg-gandalf.jpg` | 压暗 58% + 2560 宽压缩版（233KB） | 上述图的衍生（亮度调整=合理修改） | 同源 | ✅ 构建用 |

> 处理管线：`System.Drawing` 亮度矩阵 ×0.58 → 缩放 2560 宽 → JPEG q74。
> 原始文件 `C:\Users\Gaoqiyuan\Desktop\新建文件夹\Gandalf.png` 为源（不入库大图，避免仓库膨胀）。

## 字体

| 文件 | 字体 | 来源 | 许可 | 状态 |
|---|---|---|---|---|
| `plugin/assets/cinzel-a.woff2` | Cinzel（拉丁分片） | Google Fonts CDN | SIL OFL 1.1（免署名） | ✅ 已入库 |
| `plugin/assets/cinzel-b.woff2` | Cinzel（扩展分片） | Google Fonts CDN | SIL OFL 1.1 | ✅ 已入库 |
| `plugin/assets/cinzel.css` | 分片映射（开发参考） | Google Fonts CSS | — | ✅ |

> OFL 要求：保留许可声明。已内联进 `src/client/assets.generated.ts`（base64）。

## 原创元素

| 元素 | 说明 | 许可 |
|---|---|---|
| 金色星点（9 颗） | `theme.css.ts` 程序化 radial-gradient | 原创 |
| 符文分隔 SVG | `theme.css.ts` 内联 SVG（甘道夫风格线条） | 原创 |
| 预览文案 | preview.html 中土风示例对话 | 原创 |

## 红线记录（不用什么）

- ❌ 《霍比特人》《指环王》电影剧照/官方艺术图（版权资产）
- ❌ 需署名素材（CC-BY）与商业图库缩略图
- ❌ 未声明许可的"免费素材站"图

## 打包体积

| 产物 | 大小 | 预算 |
|---|---|---|
| `lib/client.js`（含图含字体） | ~285KB（gzip 更小） | ≤1MB ✅ |
| 背景图 base64 | 233KB | ≤300KB ✅ |
