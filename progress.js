/* ============================================================
 * 项目进度数据模板 — 复制本文件到项目根目录，改名为 progress.js
 * 导师（game-mentor skill）会自动维护这个文件。
 * 仪表盘（dashboard.html）每 5 秒自动读取它。
 *
 * 用法：
 *   1. 复制本文件到你的游戏项目根目录
 *   2. 把 dashboard.html 也复制过去（同目录）
 *   3. 双击 dashboard.html 查看
 * ============================================================ */

window.PROJECT_DATA = {
  project: "未命名项目",          // 项目名称
  updatedAt: "2026-08-14 00:00",  // 最后更新时间（导师每次更新）
  phase: {                        // 当前步骤（6 步流程）
    index: 1,                     // 1定范围 2拆解 3实现 4试玩 5发布 6复盘
    name: "定范围",
    total: 6
  },
  progressPct: null,              // 总进度 0-100。留 null = 仪表盘按工单自动计算；只有需要手动覆盖时才填数字

  tickets: [                      // 工单（MVP 拆解结果）
    { id: "T1", title: "示例工单：核心机制", status: "todo",
      owner: "both",              // 谁来做：user(你) | ai(AI) | both(一起)
      skills: ["tdd"] }           // 该任务需要哪些 skills
  ],

  budget: {                       // 预算记账（导师每轮更新）
    used: 0,
    cap: 100,
    currency: "¥",
    period: "本月",
    note: "待导师记账"
  },

  alerts: [],                     // 导师提醒（显示为红色横幅，解决后清空）

  milestones: [                   // 里程碑
    { date: "8/14", label: "MVP 可玩" }
  ],

  roadmap: [                      // 版本路线图（导师维护，仪表盘显示）
    { phase: "MVP",   target: "", status: "todo", note: "核心可玩" },
    { phase: "Alpha", target: "", status: "todo", note: "内容完成" },
    { phase: "Beta",  target: "", status: "todo", note: "测试打磨" },
    { phase: "发布",  target: "", status: "todo", note: "上线" },
    { phase: "更新",  target: "", status: "todo", note: "v1.1 迭代" }
  ],

  nextStep: "第 1 步·定范围：跟导师对话确定一句话卖点和 MVP 边界",  // 下一步

  issues: [],                     // 错误记录摘要（详见 docs/issues.md）
  issuesSummary: "",

  ideas: [],                      // backlog：第 3 步之后冒出的新想法先进这里，不进当前工单

  readiness: {                    // 发布就绪度（导师第 4 步评估，0-10，<7 禁止发布）
    score: 0,
    gaps: []                      // 差距清单
  },

  skills: {                       // skill 使用记录（导师每轮追加）
    used: [                       // [{ name, when, note }]
      { name: "game-mentor", when: "2026-08-14", note: "首次带路" }
    ]
  }
};
