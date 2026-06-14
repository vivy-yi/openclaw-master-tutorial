# Productivity 完全指南

> ClawHub 评分最高的效率类 Skill。完整的生产力操作系统。

## 概述

**评分**: ⭐⭐⭐⭐ (4.398)  
**作者**: Clawic  
**首页**: https://clawic.com/skills/productivity  
**位置**: `~/productivity/`

---

## 工作原理

```
用户请求 → 识别场景（学生/高管/自由职业/父母等）
         ↓
匹配对应的 productivity 系统
         ↓
目标 → 项目 → 任务 → 习惯 → 规划 → 复盘
         ↓
本地文件存储
```

---

## 核心架构

```
~/productivity/
├── memory.md              # 工作风格、约束、偏好
├── inbox/               # 收集箱
│   ├── capture.md       # 快速捕获
│   └── triage.md       # 分类规则
├── dashboard.md         # 仪表盘（方向+焦点）
├── goals/              # 目标
│   ├── active.md       # 活跃目标
│   └── someday.md     # 未来目标
├── projects/           # 项目
│   ├── active.md      # 进行中
│   └── waiting.md    # 等待中
├── tasks/             # 任务
│   ├── next-actions.md
│   ├── this-week.md
│   ├── waiting.md
│   └── done.md
├── habits/            # 习惯
│   ├── active.md
│   └── friction.md
├── planning/         # 规划
│   ├── daily.md
│   ├── weekly.md
│   └── focus-blocks.md
├── reviews/           # 复盘
│   ├── weekly.md
│   └── monthly.md
├── focus/            # 专注
│   ├── sessions.md
│   └── distractions.md
├── routines/         # 常规
│   ├── morning.md
│   └── shutdown.md
└── someday/          # 未来想法
```

---

## 12 种场景模板

| 场景 | 模板文件 |
|------|---------|
| 学生 | `situations/student.md` |
| 高管 | `situations/executive.md` |
| 自由职业 | `situations/freelancer.md` |
| 父母 | `situations/parent.md` |
| 创意工作者 | `situations/creative.md` |
| 倦怠恢复 | `situations/burnout.md` |
| 创业者 | `situations/entrepreneur.md` |
| ADHD | `situations/adhd.md` |
| 远程办公 | `situations/remote.md` |
| 管理者 | `situations/manager.md` |

---

## 安装

```bash
clawhub install productivity
```

**初始化**：
```bash
# 首次使用会提示创建 ~/productivity/
# 参考 setup.md 初始化
```

---

## 使用流程

### 1. 收集 → 分类

```
用户输入 → inbox/capture.md
         ↓
inbox/triage.md 分类
         ↓
分配到 goals/projects/tasks/habits
```

### 2. 规划 → 执行

```
daily.md     → 每日焦点
weekly.md   → 周计划
focus-blocks.md → 深度工作块
```

### 3. 复盘 → 优化

```
weekly review  → 周复盘
monthly review → 月复盘
→ 调整系统
```

---

## 与其他 Skills 组合

| 配合 Skill | 场景 |
|-----------|------|
| `self-improving` | 跨任务复盘 |
| `goals` | 深度目标设定 |
| `calendar-planner` | 日历规划 |
| `notes` | 结构化笔记 |

---

## 对比其他效率工具

| 维度 | Productivity | Todoist | Things | Notion |
|------|-------------|--------|--------|-------|
| **评分** | 4.398 | - | - | - |
| **本地存储** | ✅ | ❌ | ❌ | ❌ |
| **场景模板** | 12 种 | ❌ | ❌ | ❌ |
| **深度工作** | ✅ | ⚠️ | ⚠️ | ⚠️ |
| **免费** | ✅ | 付费 | 付费 | 付费 |

---

## 核心原则

### ✅ 做

- 明确目标 → 项目 → 任务层级
- 定期复盘
- 记录摩擦点

### ❌ 不做

- 不访问日历/邮件/联系人
- 不后台监控
- 不推断长期偏好
- 不写未经确认的文件

---

## 安全隐私

| 数据 | 处理 |
|------|------|
| 网络请求 | ❌ 无 |
| 本地存储 | ✅ `~/productivity/` |
| 第三方访问 | ❌ 无 |

---

## 相关链接

- [15.4 ClawHub热门Skills](./15.4_ClawHub热门Skills排行榜.md)
- [ClawHub](https://clawhub.ai)
- [GitHub](https://github.com/clawic/productivity)