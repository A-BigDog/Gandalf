/* ============================================================
 * Gandalf 主题插件 — 项目进度
 * 项目：DeepSeek Harness (DSH) Web GUI 的甘道夫主题插件
 * 导师（game-mentor skill）自动维护此文件；仪表盘每 5 秒读取
 * ============================================================ */

window.PROJECT_DATA = {
  project: "Gandalf（DSH 主题插件）",
  updatedAt: "2026-08-14 18:30",  // 最后更新时间（导师每次更新）
  phase: {                        // 当前步骤（6 步流程）
    index: 5,                     // 1定范围 2拆解 3实现 4试玩 5发布 6复盘
    name: "发布（已开源）",
    total: 6
  },
  progressPct: null,              // 留 null = 仪表盘按工单自动计算

  tickets: [
    { id: "T1", title: "插件骨架 + 构建 + 冒烟测试（__ModuleLoader__ 闭包）", status: "done",
      owner: "ai", skills: ["research", "tdd"] },
    { id: "T2", title: "背景（用户自制甘道夫图原图直出）+ 字体（霞鹭文楷等宽本地）", status: "done",
      owner: "both", skills: ["ui-ux-pro-max", "design-taste-frontend"] },
    { id: "T3", title: "布局定制：消息左对齐/气泡卡片/设置面板加深/发送五芒星", status: "done",
      owner: "ai", skills: ["design-taste-frontend"] },
    { id: "T4", title: "可读性验收：WCAG AA 对比度 11/11 + 性能（bundle <500KB）", status: "done",
      owner: "ai", skills: ["tdd"] },
    { id: "T5", title: "真机验证：接线 profile patch + 用户验收（反复迭代 30+ 轮至满意）", status: "done",
      owner: "both", skills: ["ui-ux-pro-max"] },
    { id: "T6", title: "开源发布：LICENSE(MIT) + 脱敏 + 推送 GitHub (A-BigDog/Gandalf)", status: "done",
      owner: "both", skills: ["research"] }
  ],

  budget: {
    used: 0, cap: 0, currency: "¥", period: "本月",
    note: "纯软件项目，以时间计（大量真机调试轮次）"
  },

  alerts: [
    "v1.1 方向待定：看社区反馈/仓库数据再定"
  ],

  milestones: [
    { date: "8/14", label: "真机接线成功：甘道夫背景/字体/布局生效（用户验收通过）" },
    { date: "8/20", label: "开源发布（README + 打包说明）" }
  ],

  roadmap: [
    { phase: "MVP",   target: "8/14", status: "done", note: "插件加载 + 背景/字体/布局生效（用户确认）" },
    { phase: "Alpha", target: "8/15", status: "done", note: "细节打磨（气泡/图标/设置面板/字体等按用户反馈迭代）" },
    { phase: "Beta",  target: "8/18", status: "done", note: "对比度/性能/明暗验证" },
    { phase: "发布",  target: "8/20", status: "done", note: "已推送 GitHub：github.com/A-BigDog/Gandalf" },
    { phase: "更新",  target: "",     status: "todo", note: "v1.1 社区反馈迭代" }
  ],

  nextStep: "第 6 步·复盘：24h 分析（README 点击/社区反馈）→ 更新 roadmap 定 v1.1",

  issues: [
    "theme 服务路径（register/setTheme/inject）在真机 HMR 下不稳定 → 改用纯 CSS 注入（v10），稳定生效",
    "@import 必须位于样式表顶部，否则浏览器忽略 → 已规避（改用系统字体/内联）",
    "Google Fonts CDN 国内不可访问 → 全部字体改为系统自带/自托管",
    "CSS Modules 类名是 hash——定位组件靠 [class*=local名] 模糊匹配 + aria-label/图标特征",
    "组件 hash 类名跨构建不稳定——只依赖 local 后缀（如 toBottom/userRow/flowItem）"
  ],
  issuesSummary: "v9→v10 架构修正（纯 CSS）+ 多轮真机调试沉淀的定位方法",

  ideas: [
    "开源后进 DSH 上游：作为官方主题插件 PR 提交",
    "可选变体：白袍甘道夫银蓝配色（切换开关）",
    "霞鹭文楷自托管（bundle 增大，权衡后定）"
  ],

  readiness: {
    score: 9,
    gaps: [
      "v1.1 方向待定：24h 后看社区反馈/仓库数据再定"
    ]
  },

  skills: {
    used: [
      { name: "game-mentor", when: "2026-08-14", note: "全程带路（方向多次迭代：夜空星金→晨曦金辉→回默认+定制）" },
      { name: "research", when: "2026-08-14", note: "DSH 主题/插件机制调研（子代理×2）" },
      { name: "research", when: "2026-08-14", note: "素材/字体调研 + 许可红线" },
      { name: "tdd", when: "2026-08-14", note: "冒烟测试 + WCAG 对比度审计脚本" },
      { name: "ui-ux-pro-max", when: "2026-08-14", note: "视觉降级（像素统计）+ 用户实机验收" },
      { name: "design-taste-frontend", when: "2026-08-14", note: "布局/气泡/图标定制" }
    ]
  }
};
