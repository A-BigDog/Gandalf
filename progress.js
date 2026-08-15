/* ============================================================
 * Gandalf 主题插件 — 项目进度
 * 项目：DeepSeek Harness (DSH) Web GUI 的中土魔幻风主题插件
 * 导师（game-mentor skill）自动维护此文件；仪表盘每 5 秒读取
 * ============================================================ */

window.PROJECT_DATA = {
  project: "Gandalf（DSH 主题插件）",
  updatedAt: "2026-08-14 12:00",  // 最后更新时间（导师每次更新）
  phase: {                        // 当前步骤（6 步流程）
    index: 1,                     // 1定范围 2拆解 3实现 4试玩 5发布 6复盘
    name: "定范围",
    total: 6
  },
  progressPct: null,              // 留 null = 仪表盘按工单自动计算

  tickets: [                      // 工单（第 2 步拆解后填充）
    { id: "T1", title: "（待拆解）DSH 主题机制调研落地", status: "todo",
      owner: "both",
      skills: ["research"] }
  ],

  budget: {                       // 预算记账（导师每轮更新）
    used: 0,
    cap: 0,
    currency: "¥",
    period: "本月",
    note: "纯软件项目，暂以时间计（小时）"
  },

  alerts: [                       // 导师提醒
    "版权红线：背景图禁用《霍比特人》电影剧照（开源会侵权），已定免费可商用素材路线"
  ],

  milestones: [
    { date: "8/15", label: "换肤切片可看（主题在本机 GUI 生效）" },
    { date: "8/17", label: "布局定制完成，视觉评审通过" },
    { date: "8/20", label: "开源发布（README + 打包说明）" }
  ],

  roadmap: [                      // 版本路线图
    { phase: "MVP",   target: "8/15", status: "todo", note: "换肤可生效：配色+字体+背景" },
    { phase: "Alpha", target: "8/17", status: "todo", note: "布局定制+细节打磨" },
    { phase: "Beta",  target: "8/19", status: "todo", note: "可读性/性能/QA 验收" },
    { phase: "发布",  target: "8/20", status: "todo", note: "打包说明+README 开源" },
    { phase: "更新",  target: "",     status: "todo", note: "v1.1 社区反馈迭代" }
  ],

  nextStep: "第 1 步·定范围：等 DSH 机制调研 + 素材调研完成 → 写 GDD 规格文档（卖点/范围/视觉数值表/不做清单）",

  issues: [],                     // 错误记录摘要（详见 docs/issues.md）
  issuesSummary: "",

  ideas: [                        // backlog
    "开源后进 DSH 上游：作为官方主题插件 PR 提交",
    "可选变体：白袍甘道夫银蓝配色（切换开关）"
  ],

  readiness: {                    // 发布就绪度（第 4 步评估，<7 禁止发布）
    score: 0,
    gaps: []
  },

  skills: {                       // skill 使用记录
    used: [
      { name: "game-mentor", when: "2026-08-14", note: "首次带路（方向：DSH 主题插件）" },
      { name: "research", when: "2026-08-14", note: "DSH 主题/插件机制调研（子代理）" },
      { name: "research", when: "2026-08-14", note: "免费中土风背景素材+字体调研（子代理）" }
    ]
  }
};
