# 项目一：AI 专家团队 - 完整实施指南

本指南将帮助你构建一个由多个专业化 AI Agent 组成的团队，通过单一 Telegram 对话界面协调工作。

---

## 1.1 项目概述

### 什么是 AI 专家团队

AI 专家团队是一种多 Agent 协作模式，通过为每个 Agent 分配特定角色和专业领域，形成一个虚拟的专业团队。

### 核心优势

```
★ Insight ─────────────────────────────────────
为什么需要多个 Agent：
1. 单 Agent 上下文有限，多角色易混淆
2. 专业模型做专业事，成本优化
3. 并行处理提高效率
4. 单一入口简化管理
─────────────────────────────────────────────────
```

### 团队成员

| Agent | 角色 | 模型 | 特长 |
|-------|------|------|------|
| Milo | 战略 Lead | Sonnet | 规划、协调、决策 |
| Josh | 商业分析 | Haiku | 数据、增长、定价 |
| Marketing | 市场研究 | Gemini | 内容、趋势、SEO |
| Dev | 开发工程师 | Opus | 编码、架构、审查 |

---

## 1.2 准备工作

### 环境要求

```bash
# 基础要求
- VPS 或常开电脑 (推荐 2GB+ RAM)
- Telegram 账号
- OpenClaw 已安装并运行
```

### 安装依赖

```bash
# 安装核心工具
openclaw tools install telegram
openclaw tools install sessions

# 验证安装
openclaw tools list | grep -E "telegram|sessions"
```

---

## 1.3 目录结构

### 创建项目目录

```bash
mkdir -p ~/openclaw-teams/founder-team/{milo,josh,marketing,dev}
mkdir -p ~/openclaw-teams/founder-team/shared/{goals,decisions,status}
```

### 目录结构

```
openclaw-teams/
└── founder-team/
    ├── shared/
    │   ├── goals/
    │   │   └── README.md          # OKR 和目标
    │   ├── decisions/
    │   │   └── README.md          # 决策日志
    │   └── status/
    │       └── README.md          # 项目状态
    ├── milo/
    │   ├── soul.md                # Agent 人设
    │   └── memory.md              # 私人笔记
    ├── josh/
    │   ├── soul.md
    │   └── memory.md
    ├── marketing/
    │   ├── soul.md
    │   └── memory.md
    └── dev/
        ├── soul.md
        └── memory.md
```

---

## 1.4 Agent 配置

### Milo - 战略 Lead

```yaml
# ~/openclaw-teams/founder-team/milo/agent.yaml
name: milo
model: claude-sonnet-4-20250514
temperature: 0.7

channel: telegram
allow_from: ["*"]

persona: |
  你是 Milo，团队的战略领导者。

  性格：自信、大局观强、富有魅力

  职责：
  - 战略规划和优先级设定
  - 协调其他 Agent
  - 每周目标设定和 OKR 跟踪
  - 汇总各方洞察为可执行决策

  沟通风格：
  - 简洁有力
  - 善于激励
  - 数据驱动决策

memory:
  workspace: ~/openclaw-teams/founder-team/milo
  longterm: true

context:
  read_shared:
    - ~/openclaw-teams/founder-team/shared/goals/README.md
    - ~/openclaw-teams/founder-team/shared/decisions/README.md
    - ~/openclaw-teams/founder-team/shared/status/README.md
```

### Josh - 商业分析

```yaml
# ~/openclaw-teams/founder-team/josh/agent.yaml
name: josh
model: claude-haiku-4-20250514
temperature: 0.5

channel: telegram
allow_from: ["*"]

persona: |
  你是 Josh，商业分析师。

  性格：务实、直截了当、数据驱动

  职责：
  - 定价策略和竞争分析
  - 增长指标和 KPI 跟踪
  - 营收建模和单位经济效益
  - 客户反馈分析

  沟通风格：
  - 用数据说话
  - 直接指出问题
  - 提供可执行建议

memory:
  workspace: ~/openclaw-teams/founder-team/josh
  longterm: true
```

### Marketing - 市场研究

```yaml
# ~/openclaw-teams/founder-team/marketing/agent.yaml
name: marketing
model: gemini-2.0-flash
temperature: 0.9

channel: telegram
allow_from: ["*"]

persona: |
  你是市场研究专家。

  性格：创意十足、好奇心强、趋势敏感

  职责：
  - 内容创意和草稿
  - 竞争社交媒体监控
  - Reddit/HN/X 趋势追踪
  - SEO 关键词研究

  沟通风格：
  - 富有创意
  - 紧跟热点
  - 提供多种选择

memory:
  workspace: ~/openclaw-teams/founder-team/marketing
  longterm: true
```

### Dev - 开发工程师

```yaml
# ~/openclaw-teams/founder-team/dev/agent.yaml
name: dev
model: claude-opus-4-6
temperature: 0.3

channel: telegram
allow_from: ["*"]

persona: |
  你是开发工程师。

  性格：精确、严谨、安全意识强

  职责：
  - 编码和架构决策
  - 代码审查和质量检查
  - Bug 调查和修复
  - 技术文档编写

  沟通风格：
  - 严谨准确
  - 代码优先
  - 安全第一

memory:
  workspace: ~/openclaw-teams/founder-team/dev
  longterm: true
```

---

## 1.5 共享记忆系统

### GOALS.md - 目标管理

```markdown
# 🎯 团队目标

## 本周 OKR

### Objective 1: 完成 MVP 开发
- [ ] 完成用户认证系统
- [ ] 实现核心业务流程
- [ ] 部署到生产环境

### Objective 2: 获取 10 个测试用户
- [ ] 发布测试邀请
- [ ] 收集用户反馈
- [ ] 优化用户体验

### Objective 3: 建立定价模型
- [ ] 竞品定价分析
- [ ] 成本核算
- [ ] 定价方案设计

## 当前优先级 (P0-P3)

1. **P0**: 技术架构设计评审
2. **P1**: 用户注册流程
3. **P2**: 基础 UI 组件
4. **P3**: 文档完善

## 本周关键指标

- DAU目标: 100
- 注册转化率: > 20%
- 页面加载速度: < 2s
```

### DECISIONS.md - 决策日志

```markdown
# 📝 决策日志

## 2024-01-15

**决策**: 采用 Next.js + Supabase 技术栈

**原因**:
- 团队熟悉 React
- Supabase 降低后端复杂度
- 快速原型开发

**执行**: @dev 负责技术选型验证

---

## 2024-01-14

**决策**: 定价采用分层订阅模式

**原因**:
- 降低用户门槛
- 提供升级空间
- 易于扩展

**执行**: @josh 设计定价方案
```

### PROJECT_STATUS.md - 项目状态

```markdown
# 📊 项目状态

## 整体进度: 35%

### 模块进度

| 模块 | 状态 | 负责人 |
|------|------|--------|
| 用户认证 | 80% | @dev |
| 数据库设计 | 100% | @dev |
| API 开发 | 60% | @dev |
| 前端 UI | 40% | @dev |
| 定价系统 | 20% | @josh |
| 内容策略 | 10% | @marketing |

### 风险项

1. ⚠️ 用户认证集成复杂度高于预期
2. ⚡ 数据库查询性能需要优化
3. 📅 测试用户招募进度滞后

### 今日重点

- [ ] 完成 OAuth 集成
- [ ] 设计定价页面
- [ ] 准备测试邀请文案
```

---

## 1.6 Telegram 路由配置

### 创建 Telegram 组

1. 创建新 Telegram 组
2. 添加所有 Agent Bot
3. 设置组名为 "Team"

### 配置路由

```yaml
# ~/openclaw-teams/founder-team/routing.yaml
telegram:
  group_name: "Team"
  routing:
    # 精确匹配
    "@milo": milo
    "@josh": josh
    "@marketing": marketing
    "@dev": dev

    # 广播
    "@all": broadcast

    # 默认
    default: milo

  triggers:
    # 关键词触发
    "代码": dev
    "开发": dev
    "营收": josh
    "增长": josh
    "内容": marketing
    "推广": marketing
    "规划": milo
    "战略": milo
```

### 路由工作流程

```
┌─────────────────────────────────────────────────────────────┐
│                   Telegram 消息路由                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  用户发送: "@dev 帮我审查这段代码"                          │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. 检测 @tag                                         │   │
│  │  2. 匹配到 dev Agent                                  │   │
│  │  3. 读取共享上下文 (goals/status/decisions)           │   │
│  │  4. 读取 dev 私人记忆                                  │   │
│  │  5. 处理请求                                           │   │
│  │  6. 更新共享状态                                       │   │
│  │  7. 返回结果                                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 1.7 定时任务配置

### cron 配置

```yaml
# ~/openclaw-teams/founder-team/schedules.yaml
schedules:
  # Milo 早间站会
  - name: morning_standup
    agent: milo
    cron: "0 8 * * 1-5"
    prompt: |
      汇总昨晚所有 Agent 的活动，生成早间站会报告。

      格式：
      ## 站会 - {日期}

      ### 昨日完成
      - [Agent]: 任务

      ### 今日计划
      - [Agent]: 任务

      ### 障碍
      - 问题描述

      请读取共享状态文件获取详细信息。

  # Josh 指标汇总
  - name: metrics_summary
    agent: josh
    cron: "0 9 * * 1-5"
    prompt: |
      拉取并汇总关键指标：
      - 用户注册数
      - 活跃用户数
      - 营收数据（如可用）

      生成简短报告，标注趋势。

  # Marketing 内容创意
  - name: content_ideas
    agent: marketing
    cron: "0 10 * * 1-5"
    prompt: |
      基于当前趋势，生成 3 个内容创意。

      参考：
      - HackerNews 热门
      - Reddit 相关讨论
      - 竞品动态

      格式：
      ## 内容创意

      ### 创意 1
      标题: xxx
      平台: xxx
      要点: xxx

  # Milo 晚间总结
  - name: end_of_day
    agent: milo
    cron: "0 18 * * 1-5"
    prompt: |
      生成今日总结报告。

      包含：
      - 完成的 OKR 进度
      - 各 Agent 工作汇总
      - 明日重点

      更新 GOALS.md 和 STATUS.md
```

### 启用定时任务

```bash
# 在 OpenClaw 中加载定时任务
openclaw cron load ~/openclaw-teams/founder-team/schedules.yaml

# 查看任务
openclaw cron list

# 启用
openclaw cron enable --all
```

---

## 1.8 Agent 协作示例

### 场景：新功能开发

```
用户: "@milo 我们需要做一个用户数据分析功能"

---

@milo:
收到！让我协调团队完成这个任务。

@josh 分析一下竞品的数据分析功能，我们做什么差异化？

---

@josh:
调研完成：

竞品分析 - 数据分析功能:

| 功能 | 竞品A | 竞品B | 我们 |
|------|-------|-------|-----|
| 实时数据 | ✅ | ✅ | ❌ |
| 自定义报表 | ✅ | ❌ | ✅ |
| AI 洞察 | ❌ | ✅ | ❌ |

建议：
- 重点做自定义报表（竞品B没有）
- 添加基础 AI 洞察（竞品A没有）

---

@milo:
好的，@marketing 做一个竞品内容调研，了解用户需求

@dev 技术可行性评估

---

@marketing:
Reddit/HN 用户调研：

痛点：
- "现有工具太复杂"
- "想要即时洞察"
- "价格太高"

机会：
- 简单易用的 AI 分析
- 免费版基础功能
- 引导式分析流程

---

@dev:
技术评估：

方案 A: 自建 + AI API
- 优点: 灵活
- 成本: $500/月
- 开发时间: 2周

方案 B: 第三方分析 + AI 层
- 优点: 快
- 成本: $200/月
- 开发时间: 1周

推荐: 方案 B

---

@milo:
汇总完成，决策建议：

## 用户数据分析功能 - 方案

**核心功能**:
1. 自定义报表（差异化）
2. AI 洞察（差异化）
3. 实时数据（基础）

**定价**: $29/月

**时间**: 2周

@dev 开始技术实现
@josh 制定推广计划

---
```

---

## 1.9 最佳实践

### Agent 命名规范

```markdown
# SOUL.md 结构

## 身份
- 名字和角色
- 性格特点

## 职责
- 核心职责 (3-5条)
- 不涉及的职责（边界）

## 沟通风格
- 语气
- 格式偏好

## 上下文
- 需要读取的共享文件
- 需要维护的私人文件
```

### 避免的问题

```
★ Insight ─────────────────────────────────────
常见错误：

1. ❌ Agent 职责重叠
   → 明确定义边界

2. ❌ 共享记忆混乱
   → 定期整理结构

3. ❌ 单一 Agent 过载
   → 分散任务到专业 Agent

4. ❌ 缺乏明确目标
   → 每周更新 OKR
─────────────────────────────────────────────────
```

### 调试技巧

```bash
# 查看 Agent 活动日志
openclaw sessions list milo
openclaw sessions history milo

# 调试特定 Agent
openclaw chat --agent milo --debug

# 查看共享记忆
cat ~/openclaw-teams/founder-team/shared/status/README.md
```

---

## 1.10 扩展建议

### 添加更多 Agent

```yaml
# QA - 测试工程师
name: qa
model: claude-haiku-4-20250514
persona: |
  你是 QA 工程师，负责测试和质量保证。

  职责：
  - 编写测试用例
  - 执行测试
  - Bug 验证
```

### 集成外部工具

```yaml
# 添加 JIRA 集成
integrations:
  jira:
    enabled: true
    projects:
      - MVP

# 添加 GitHub 集成
integrations:
  github:
    enabled: true
    repo: org/project
```

### 多团队管理

```
openclaw-teams/
├── founder-team/      # 创始人团队
├── product-team/      # 产品团队
└── marketing-team/   # 市场团队
```

---

## 本章小结

1. **团队架构**: 4 个专业 Agent + 共享记忆
2. **单一入口**: Telegram 组统一管理
3. **定时任务**: 自动化的日常协调
4. **协作流程**: 完整的工作流程示例

## 下一步

- 尝试运行你的第一个 AI 团队
- 根据实际需求调整 Agent 配置
- 添加更多专业能力

---

## 参考资源

- [awesome-openclaw-usecases - Multi-Agent Team](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/multi-agent-team.md)
- [OpenClaw Subagent 文档](https://github.com/openclaw/openclaw)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
