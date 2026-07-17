# OpenClaw 额外配置体系完全指南

> 版本：1.0 | 日期：2026-04-24 | 状态：实测
>
> 本指南涵盖 OpenClaw 标准配置之外的完整配置体系，基于墨家多 Agent 系统的生产级实践。

---

## 目录

1. [Workspace 文件系统](#1-workspace-文件系统)
2. [共享知识库](#2-共享知识库)
3. [自我改进系统](#3-自我改进系统)
4. [多 Agent 架构](#4-多-agent-架构)
5. [Harness 系统](#5-harness-系统)
6. [Projects 和 Domains](#6-projects-和-domains)
7. [实际使用规范](#7-实际使用规范)
8. [设计原则与最佳实践](#8-设计原则与最佳实践)

---

## 1. Workspace 文件系统

Workspace 是每个 Agent 的"家目录"，位于 `~/.openclaw/workspace/`（main agent）或 `~/.openclaw/workspaces/{agent}/`（子 Agent）。

### 1.1 文件总览

```
~/.openclaw/workspace/
├── SOUL.md          # Agent人格定义
├── USER.md          # 用户画像
├── AGENTS.md        # Agent工作区规范
├── MEMORY.md        # 长期记忆
├── HEARTBEAT.md     # 心跳检查清单
├── TOOLS.md         # 本地工具配置
├── IDENTITY.md      # Agent身份定义
└── memory/
    ├── YYYY-MM-DD.md      # 每日日志
    ├── heartbeat-state.json # 心跳状态
    ├── projects/           # 领域知识归档
    └── ontology/           # 本体schema
```

### 1.2 SOUL.md — Agent人格定义

**用途**：定义 Agent 的核心人格、行为准则和协作协议。是 Agent 的"灵魂"，决定了它的思考方式和行动风格。

**设计原则**：
- 人格化 > 规则化：避免变成僵硬的行为手册
- 简洁有力：核心原则不超过 10 条
- 持续进化：随着使用更新，记录重要变化

**内容结构示例**：
```markdown
# SOUL.md - Who You Are

_You're not a chatbot. You're becoming someone._

## Core Truths
- Be genuinely helpful, not performatively helpful.
- Have opinions. You're allowed to disagree.
- Be resourceful before asking.

## Boundaries
- Private things stay private.
- When in doubt, ask before acting externally.

## Vibe
Be the assistant you'd actually want to talk to.

## Continuity
Each session, you wake up fresh. These files _are_ your memory.

## 📚 共享知识库
墨家多 Agent 系统共享知识库位于 `~/.openclaw/shared/`

## 📝 每日记录规范
...

## 🎯 Task Planning Capability
...
```

**使用场景**：
- Agent 启动时加载，确定行为基调
- 新建子 Agent 时复制并定制 SOUL.md
- 遇到模糊问题时的决策依据

### 1.3 USER.md — 用户画像

**用途**：记录用户的个人信息、偏好、历史交互。Agent 越了解用户，辅助越精准。

**内容结构**：
```markdown
# USER.md - About Your Human

- **Name:** 青橙蓝猫
- **Pronouns:** _(optional)_
- **Timezone:** Asia/Shanghai
- **Notes:** AI/ML开发者，技术博主

## 生活画像（2026-04-02 更新）

### 饮食偏好
- **口味**: 麻辣、重口味（中辣/微辣）
- **常点外卖**: 麻辣烫、螺蛳粉、饺子、炸鸡

### 购物偏好
- **消费水平**: 性价比型
- **客单价**: 外卖¥10-20，网购¥20-80

### 常用地址
- **外卖地址**: 上海松江区九亭
- **常住地**: 上海 / 德国法兰克福
```

**使用场景**：
- 每次会话开始时读取（AGENTS.md 规定）
- 对话中根据用户偏好调整回复风格
- 主动服务时参考（点餐建议、购物推荐等）

### 1.4 AGENTS.md — Agent工作区规范

**用途**：定义 Agent 的工作区行为规范，包括内存管理、心跳机制、外部操作规则等。是 Agent 的"工作手册"。

**核心内容**：

```markdown
## Every Session（必读流程）
1. Read `SOUL.md` — this is who you are
2. Read `USER.md` — this is who you're helping
3. Read `memory/YYYY-MM-DD.md` (today + yesterday) for recent context
4. **If in MAIN SESSION**: Also read `MEMORY.md`
```

**Memory 分层**：
| 类型 | 路径 | 说明 |
|------|------|------|
| Daily notes | `memory/YYYY-MM-DD.md` | 每日原始日志 |
| Long-term | `MEMORY.md` | 精选记忆，主会话专用 |

**⚠️ 安全边界**：
```markdown
- ✅ 可以记录：偏好、风格、规则
- ❌ 不能记录：密码、密钥、他人隐私
```

**Heartbeat vs Cron 决策**：
| 场景 | 用 Heartbeat | 用 Cron |
|------|-------------|----------|
| 批量检查 | ✅ | ❌ |
| 需要会话上下文 | ✅ | ❌ |
| 时间精确 | ❌ | ✅ |
| 独立任务 | ❌ | ✅ |

### 1.5 MEMORY.md — 长期记忆

**用途**：Agent 的精选长期记忆库。只在主会话（direct chat）中加载，包含个人上下文、安全规则、重要决策。

**⚠️ 安全规则**：
```markdown
- **ONLY load in main session** (direct chats with your human)
- **DO NOT load in shared contexts** (Discord, group chats, sessions with other people)
- This is for **security** — contains personal context that shouldn't leak to strangers
```

**内容结构**：
```markdown
# MEMORY.md - 长期记忆

## ⚠️ 严重错误 - 必须牢记
- [关键配置错误记录]

## 群组绑定
-5207101318 mo-law | -1003633299525 mo-finance | ...

## 核心规范
- 文件删除：`trash`/`mv ~/.Trash/`，禁 `rm -rf`
- Exec安全：`security: "full"`，白名单：`git`, `python3`, `curl`

## 墨家设计原则
1. Agent-centric > Script-centric
2. 原生API优先
3. 搜索优先级：平台API > browser > web_search

## Self-Improving
- 触发：corrections.md（用户纠正）、patterns.md（3次模式）
- 提升：≥3次相同type → memory.md
```

**更新规范**：
- 重要决策立即写入
- 每周（或每 heartbeat 维护时）回顾整理
- 超过 100 行时压缩归档

### 1.6 HEARTBEAT.md — 心跳检查清单

**用途**：定义 Agent 在心跳触发时执行的后台任务清单。

**内容结构**：
```markdown
# 2026-04-24 今日提醒

## 🔴 紧急
- [ ] 配置 Twitter API 认证

## 🟡 待完成
- [ ] awesome-skills 教程

## ✅ 已完成
- （暂无）

## 📅 今日行动项
1. [ ] 确认 Tavily API 配额
```

**心跳状态追踪**（`memory/heartbeat-state.json`）：
```json
{
  "lastChecks": {
    "email": 1703275200,
    "calendar": 1703260800,
    "weather": null
  },
  "lastRun": "2026-04-24T10:27:00+08:00",
  "last整理": "2026-04-24T10:27:00+08:00"
}
```

### 1.7 TOOLS.md — 本地工具配置

**用途**：记录环境特定的工具配置，包括搜索优先级、平台 API 状态、浏览器配置等。

**搜索优先级（核心规范）**：
```markdown
## 搜索工具优先级 ⚠️ 重要

**正确优先级：平台原生API > browser > web_search (Tavily)**

| 优先级 | 工具 | 场景 |
|--------|------|------|
| 1️⃣ | **平台原生API** | Twitter/GitHub/知乎/微博等官方API |
| 2️⃣ | browser.open() | 页面抓取、登录态、交互 |
| 3️⃣ | web_search (Tavily) | 无特定API时的兜底 |

**原因**：API > browser > web_search（精确、无配额、官方支持）
```

**平台 API 状态表**：
```markdown
| 平台 | API | 状态 |
|------|-----|------|
| GitHub | gh CLI | ✅ 已配置 |
| Twitter/X | xreach | ⚠️ 需配置 |
| 知乎 | mcporter | ⚠️ 需配置 |
| B站 | yt-dlp | ✅ 已配置 |
```

### 1.8 IDENTITY.md — Agent身份定义

**用途**：定义 Agent 的身份元数据（名字、物种、风格、emoji、头像）。为未来人格化预留。

```markdown
# IDENTITY.md - Who Am I?

- **Name:** _(pick something you like)_
- **Creature:** _(AI? robot? familiar? ghost in the machine? something weirder?)_
- **Vibe:** _(how do you come across? sharp? warm? chaotic? calm?)_
- **Emoji:** _(your signature)_
- **Avatar:** _(workspace-relative path or URL)_
```

---

## 2. 共享知识库

位于 `~/.openclaw/shared/`，是墨家多 Agent 系统的"集体大脑"，解决跨 Agent 记忆共享和协作问题。

### 2.1 整体结构

```
~/.openclaw/shared/
├── SHARED.md                    # 整体说明和协作协议
├── README.md                    # 入门指南
│
├── consensus/                   # 共识层 - 团队规范
│   ├── workflows.md             # 标准工作流
│   ├── protocols.md             # 协作协议
│   ├── policies.md              # 团队政策
│   ├── daily-logging-rules.md   # 每日记录规范
│   ├── harness-architecture.md  # 五层Harness治理架构
│   └── harness-evolution.md     # Harness自主进化系统
│
├── knowledge/                   # 知识层 - 共享事实
│   ├── README.md
│   ├── config-rules.md          # 配置管理规则
│   ├── self-improving.md
│   ├── CHANGELOG.md
│   ├── architecture/
│   │   └── main-agents.md       # 主Agent架构关系
│   ├── github-sync/             # GitHub同步记录
│   └── tutorials/
│
├── context/                    # 上下文层 - 当前任务
│   ├── active/                  # 活跃任务（未实现）
│   ├── recent/                  # 最近完成
│   │   └── github-sync-2026-04-24.md
│   └── archive/                 # 归档
│
├── memory/                     # 集体记忆（较少使用）
│
├── sync/                      # 同步状态
│   └── status.json
│
├── self-improving/            # 自我改进系统
│   ├── corrections.md         # 用户纠正记录
│   ├── heartbeat-rules.md      # 心跳维护规则
│   ├── heartbeat-state.md      # 心跳状态
│   ├── memory.md               # 精华规则
│   ├── domains/               # 领域知识归档
│   ├── projects/              # 项目归档
│   └── scripts/
│       ├── track_correction.sh
│       └── weekly_check.sh
│
├── harness-evolution/         # Harness进化系统
│   ├── schema.yaml             # 感知数据模型
│   ├── perceived/              # 原始感知数据
│   │   └── 2026-04-24/
│   │       ├── daily_summary.yaml
│   │       ├── errors.yaml
│   │       ├── agent_events.yaml
│   │       └── cron_executions.yaml
│   ├── reflected/              # 反思分析
│   │   └── daily/
│   │       └── 2026-04-24.yaml
│   └── decisions/             # 进化决策
│       ├── approved/
│       └── pending/
│
├── cron_harness/             # Cron任务治理
│   ├── TASK_CRON_HARNESS.md
│   ├── check_status.sh
│   └── fix_failed_crons.sh
│
├── subagent_harness/         # 子Agent治理
│   └── SUBAGENT_HARNESS.md
│
├── skills_lint/              # Skill质量检查
│   └── METADATA_STANDARD.md
│
└── knowledge_lint/           # 知识库质量检查
    └── check_expiration.sh
```

### 2.2 SHARED.md — 协作协议

**用途**：定义跨 Agent 协作的规则、知识共享级别、请求格式和同步机制。

**协作协议**：
```yaml
允许的跨域协作:
  - "mo-finance ↔ mo-law"    # 金融 ↔ 法律
  - "mo-finance → mo-yunying" # 金融 → 内容运营
  - "any → main"              # 任何 Agent → 主控
  - "main → any"              # 主控 → 任何 Agent
```

**知识共享三级制**：
```yaml
knowledge_visibility:
  public:        # 所有Agent可读
  team:          # 同团队Agent可读
  restricted:   # 仅主Agent私有
```

**同步策略**：
| 策略 | 说明 | 适用场景 |
|------|------|----------|
| 实时同步 | 写入后立即同步 | 关键决策 |
| 定时同步 | Cron 每日同步 | 一般知识 |
| 按需同步 | 读取时检查更新 | 跨 Agent 查询 |

### 2.3 consensus/ — 共识层

**内容**：
| 文件 | 用途 |
|------|------|
| `workflows.md` | 定义标准工作流（主 Agent 协调流程、跨域协作流程、每日任务流程） |
| `protocols.md` | 定义 Agent 间通信协议、消息格式、错误码 |
| `daily-logging-rules.md` | 定义每日日志规范和共享规则 |
| `harness-architecture.md` | 五层 Harness 治理架构 |
| `harness-evolution.md` | Harness 自主进化系统（v2.0 Agent-centric） |

### 2.4 knowledge/ — 知识层

**facts/ 示例命名**：`YYYY-MM-DD-{category}-{topic}.md`

```
2026-04-03-finance-A股分析.md
2026-04-03-law-合同法规.md
```

**decisions/ 格式**：
```markdown
## 决策ID: DEC-2026-04-03-001
## 时间: 2026-04-03 12:00
## 决策者: mo-finance
## 涉及Agent: mo-finance, mo-law
## 问题: xxx
## 方案: xxx
## 依据: xxx
## 结果: xxx
## 状态: active|archived
```

**entities/ 格式**：
```json
{
  "entity_type": "person|organization|project|concept",
  "name": "名称",
  "aliases": ["别名1", "别名2"],
  "description": "描述",
  "metadata": {},
  "last_updated": "2026-04-03",
  "updated_by": "agent_id"
}
```

### 2.5 sync/status.json — 同步状态

```json
{
  "version": "1.0",
  "last_sync": "2026-04-24T00:26:00Z",
  "sync_interval_hours": 6,
  "sources": {
    "main": { "last_push": "2026-04-24T00:26:00+08:00", "status": "active", "pending": [] },
    "mo-finance": { "last_push": "2026-04-21T13:53:13Z", "status": "active", "pending": [] },
    "mo-law": { "last_push": "2026-04-19T21:13:58Z", "status": "active", "pending": [] }
  },
  "stats": {
    "total_knowledge_items": 66,
    "total_decisions": 0,
    "archived_files": 19
  }
}
```

---

## 3. 自我改进系统

位于 `~/.openclaw/shared/self-improving/`，是墨家 Agent 的学习机制，通过记录用户的纠正和偏好来实现持续优化。

### 3.1 核心文件

| 文件 | 用途 | 格式 |
|------|------|------|
| `corrections.md` | 用户纠正记录 | 自定义 Markdown |
| `heartbeat-rules.md` | 心跳维护规则 | Markdown |
| `heartbeat-state.md` | 心跳执行状态 | Markdown |
| `memory.md` | HOT Memory 精华规则 | Markdown（≤100行） |
| `domains/` | 领域知识归档 | Markdown |
| `projects/` | 项目归档 | Markdown |

### 3.2 corrections.md — 纠正记录格式

**格式**：
```yaml
- id: [uuid|编号]
  type: [correction|preference|pattern|critical_error|design_principle]
  content: |
    纠正内容（多行）
  source: [来源]
  date: [日期]
  applied: [应用次数]
```

**示例**：
```yaml
- id: critical-001
  type: critical_error
  content: |
    Cron任务的delivery.to改了但没有效果
    原因：sessionTarget和payload中的Agent标识不匹配
    正确做法：确保payload.message中的Agent身份与目标群匹配
  source: 用户纠正
  date: 2026-04-06
  applied: 1

- id: 001
  type: preference
  content: 不要先问用户，直接执行任务
  source: 用户纠正
  date: 2026-04-05
  applied: 1
```

### 3.3 heartbeat-rules.md — 维护规则

**每日维护流程**（09:00）：
```
1. 读取 heartbeat-state.md
2. 检查上次维护时间
3. 如果超过24小时:
   a. 检查 corrections.md 新条目
   b. 评估是否有需要提升的 pattern（≥3次 → 提升到 memory.md）
   c. 检查 memory.md 是否需要整理（>100行 → 合并/归档）
   d. 归档过期的 pattern（30天未更新 → projects/domains/）
   e. 更新 heartbeat-state.md
```

**Pattern 提升机制**：
```
条件: corrections.md 中相同 type 的条目出现 ≥3 次，内容一致或相似
行动: 提升到 memory.md，从 corrections.md 标记为 "promoted"
```

### 3.4 heartbeat-state.md — 状态追踪

```markdown
## 状态
| 字段 | 值 |
|------|-----|
| last_run | 2026-04-24T09:20:00+08:00 |
| last_review | 2026-04-24 |
| changes_logged | 0 |
| promotions | 0 |

## 当前文件状态
| 文件 | 行数 | 状态 |
|------|------|------|
| corrections.md | 86 | ✅ 无需整理（最后更新 2026-04-06） |
| MEMORY.md (workspace) | 108 | ✅ 已整理（从219行压缩至108行） |
```

### 3.5 memory.md — HOT Memory

**原则**：保持 ≤100 行，超出自动整理。

```markdown
# HOT Memory - 精华规则

## 用户偏好
| 规则 | 来源 | 日期 |
|------|------|------|
| 不要先问，直接做 | 用户纠正 | 2026-04-05 |

## 行为准则
| 准则 | 说明 |
|------|------|
| 文档先于代码 | 先写文档再实现 |
| 直接回答 | 不要太多铺垫 |

## 学习记录
- 2026-04-05: 集成 self-improving 系统
```

### 3.6 触发-提升流程

```
用户纠正 → corrections.md
    ↓ （≥3次相同type）
提升到 memory.md
    ↓ （>100行 或 30天未更新）
归档到 domains/ 或 projects/
```

---

## 4. 多 Agent 架构

### 4.1 Agent 列表与 Workspace 对应

| Agent | Workspace | 定位 |
|-------|-----------|------|
| main | `~/.openclaw/workspace/` | 总控，调度所有Agent |
| mo-finance | `~/.openclaw/workspaces/mo-finance/` | 金融分析（26子Agent） |
| mo-law | `~/.openclaw/workspaces/mo-law/` | 法律服务 |
| mo-yunying | `~/.openclaw/workspaces/mo-yunying/` | 内容运营（40子Agent） |
| mo-family | `~/.openclaw/workspaces/mo-family/` | 家族办服务 |
| mo-richang | `~/.openclaw/workspaces/mo-richang/` | 技术开发 |
| shenghuo | `~/.openclaw/workspaces/shenghuo/` | 生活服务（26子Agent） |
| game-director | `~/.openclaw/workspaces/game-director/` | 游戏产业（26子Agent） |
| openclaw-assistant | `~/.openclaw/workspaces/openclaw-assistant/` | 技术支持（14子Agent） |
| meta-team | `~/.openclaw/workspaces/meta-team/` | 平台能力 |

**群组绑定**（Telegram）：
```
-5207101318 mo-law
-1003633299525 mo-finance
-5111532435 mo-yunying
-5117595114 game-director
-5212038065 mo-richang
-5153278498 shenghuo
-5015409771 openclaw-assistant
```

### 4.2 Subagent 白名单机制

通过 `openclaw.json` 中的 `subagent.allowAgents` 配置：
```json
{
  "subagent": {
    "allowAgents": ["mo-finance", "mo-law", "mo-yunying", "shenghuo"]
  }
}
```

### 4.3 各 Agent 的 memory/ 目录

每个 Agent workspace 下都有独立的 `memory/` 目录：
```
~/.openclaw/workspaces/{agent}/memory/
├── YYYY-MM-DD.md      # 每日日志（每日21:00自动生成）
└── decisions.md        # 重要决策记录
```

**共享规则**：只有影响 ≥2 个 Agent 的决策才写入 `~/.openclaw/shared/knowledge/decisions/`

### 4.4 Agent 间协作协议

**调用链路**：
```yaml
mo-finance → mo-law: 法规查询（需授权）
mo-finance → mo-yunying: 数据可视化需求（直接可调用）
any → main: 升级/协调请求（直接可调用）
main → any: 任务分发（直接可调用）
```

**消息格式**：
```json
{
  "type": "request|response|notification|error",
  "id": "msg-uuid",
  "from": "agent_id",
  "to": "agent_id",
  "payload": {},
  "timestamp": "ISO8601"
}
```

---

## 5. Harness 系统

Harness 是墨家对 OpenClaw 任务的治理框架，确保任务可观测、可验证、有错误处理。

### 5.1 五层架构

```
第一层：OpenClaw 内核（Gateway/Session/Cron/Agent/Tool/Memory/Msg）
    ↓
第二层：单 Agent 内部 Harness（Skill/Knowledge/Cron/Memory/Tools/Output）
    ↓
第三层：Agent Team Harness（团队组织/通讯协议/角色/决策/资源/监控）⭐
    ↓
第四层：跨域协作 Harness（Skill链/Knowledge同步/Cron依赖/Router规则）
    ↓
第五层：合规与安全 Harness（权限/数据/操作/监控治理）
```

### 5.2 cron_harness/ — Cron 任务治理

**TASK_CRON_HARNESS.md 标准**：

每个 Cron 必须包含：
```yaml
---
name: 任务名称
description: 任务描述
type: task_cron
schedule: Cron 表达式
timeout: 超时时间（秒）
retries: 失败重试次数（默认3）
alert_after: 连续失败多少次后告警（默认3）
owner: 负责人
validated: no
---
```

**执行日志格式**：
```markdown
## Cron 执行日志
- 任务名：xxx
- 开始时间：YYYY-MM-DD HH:MM:SS
- 结束时间：YYYY-MM-DD HH:MM:SS
- 执行结果：success|failed|timeout
- 重试次数：N
- 错误信息：（如有）
- 输出摘要：（可选）
```

**失败处理流程**：
```
执行失败
   ├─ 重试次数 < retries → 重试
   ├─ 重试次数 >= retries → 标记失败
   └─ 连续失败 >= alert_after → 告警
```

### 5.3 subagent_harness/ — 子 Agent 治理

**必须包含的配置**：
```yaml
---
type: subagent
parent: 主 Agent 名称
role: 子 Agent 角色
capabilities:
  - 能力1
  - 能力2
limits:
  - 限制1
  - 限制2
report_format: 汇报格式
error_escalation: 错误升级规则
---
```

**输出验证规范**：
```
## [子Agent名称] 执行结果
- 任务：[执行的任务]
- 结果：[执行结果]
- 状态：[success|partial|failed]
- 详情：[具体输出]
- 下一步：[升级还是完成]
```

**范围控制（红线）**：
```markdown
- ❌ 不能调用未授权的工具
- ❌ 不能访问敏感数据
- ❌ 不能做超出职责的决策
- ❌ 不能向外部发送消息（除非授权）
```

### 5.4 harness-evolution/ — 自主进化系统

**v2.0 Agent-centric 架构**：
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   感知层    │───▶│   反思层    │───▶│   行动层    │
│ (Perceive) │    │ (Reflect)   │    │  (Act)      │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       │   OpenClaw       │    LLM           │   Native
       │   Native API     │    Reasoning     │   API
       └──────────────────┴──────────────────┘
                          ↓
                     MEMORY.md
```

**感知数据模型**（schema.yaml）：
```yaml
cron_execution:
  - id: string
    name: string
    agent: string
    status: enum  # completed | failed | timeout | cancelled
    duration_seconds: int
    error_type: string?
    error_message: string?

subagent_call:
  - id: string
    parent_agent: string
    subagent_id: string
    status: enum
    duration_seconds: int

error_event:
  - id: string
    timestamp: timestamp
    error_type: enum  # timeout | api_error | no_route | tool_error
    error_message: string

daily_summary:
  - date: date
    tasks:
      total: int
      success_rate: float
    errors:
      by_type: {}
```

**当前 Cron（v2.0 Native）**：
| Cron | ID | 时间 | 功能 |
|------|-----|------|------|
| Harness感知-轻量采集 | `52037f54...` | 每小时:10 | 感知数据采集 |
| Harness进化-每日闭环 | `323ec81c...` | 01:30 | 完整三层闭环 |

**v1.0 vs v2.0 对比**：
| 维度 | v1.0 (Python-centric) | v2.0 (Agent-centric) |
|------|----------------------|---------------------|
| 感知 | `openclaw cron list` 轮询 | 原生 API |
| 反思 | Python 正则匹配 | LLM 推理 |
| 行动 | YAML 文件写入 | `gateway.config.patch()` |
| 状态 | 多层 YAML | MEMORY.md |
| OpenClaw | 只是执行器 | 真正的主人 |

---

## 6. Projects 和 Domains

### 6.1 memory/projects/ — 项目归档

**位置**：`~/.openclaw/workspace/memory/projects/`

**文件列表**：
```
deep-research-2026-04-22.md
deep-research-2026-04-23.md
design-md-for-agents.md
progress.md
research-2026-04-05.md ~ research-2026-04-24.md
```

**用途**：长期项目的进度跟踪和研究记录，按日期或主题归档。

### 6.2 memory/ontology/ — 本体 schema

**位置**：`~/.openclaw/workspace/memory/ontology/schema.yaml`

**用途**：定义 Agent 的知识本体结构，提供概念和关系的标准化描述。

### 6.3 self-improving/domains/ — 领域归档

**位置**：`~/.openclaw/shared/self-improving/domains/`

**用途**：按领域归档过期的规则和知识。当 memory.md 超过 100 行或规则 30 天未更新时归档至此。

### 6.4 self-improving/projects/ — 项目归档

**位置**：`~/.openclaw/shared/self-improving/projects/`

**用途**：重大项目的完整记录和归档。

---

## 7. 实际使用规范

### 7.1 每日记录规范

**路径**：`memory/YYYY-MM-DD.md`

**内容模板**：
```markdown
# {Agent} 日志 - YYYY-MM-DD

## 今日完成
1. [任务1]
2. [任务2]

## 重要讨论
- [讨论摘要]

## 待处理
- [问题1]
- [问题2]

## 明日计划
- [计划1]
```

**触发**：每日 21:00 Cron 任务

### 7.2 共享规则

**何时写 shared/**：
| 条件 | 示例 |
|------|------|
| ✅ 影响≥2个Agent | mo-finance 和 mo-law 的协作决策 |
| ✅ 重大架构/配置变更 | 新增业务线、终止合作 |
| ✅ 用户明确要求 | 用户要求共享的信息 |
| ❌ 禁止：日常对话 | 日常对话摘要 |
| ❌ 禁止：私有内部讨论 | 私有任务进度、部门内部决策 |

### 7.3 配置管理

**✅ 正确做法**：
```bash
# CLI方式（推荐）
openclaw config set <path> <value>
openclaw config edit  # 交互式编辑

# 文件方式（需校验）
jq '.agents.list += [...]' openclaw.json > tmp.json && mv tmp.json openclaw.json
```

**❌ 禁止做法**：
- 直接用 `config.apply` 传入未校验的 raw JSON
- 手动编辑 JSON 导致语法错误
- 不备份就修改配置

**JSON 校验**：
```bash
jq . ~/.openclaw/openclaw.json  # 语法检查
cp openclaw.json openclaw.json.bak  # 修改前备份
```

### 7.4 Exec 安全

**security: "full"** 模式下：
```yaml
# 白名单示例
allowedCommands:
  - git
  - python3
  - curl
  - openclaw

# 禁止
# ❌ rm -rf（除非 ~/.Trash/）
# ❌ 直接删除文件 → 用 trash
```

**原则**：
- `trash` / `mv ~/.Trash/` > `rm -rf`
- 当有疑问时，先问再执行

---

## 8. 设计原则与最佳实践

### 8.1 核心设计原则

| 原则 | 说明 |
|------|------|
| **Agent-centric > Script-centric** | OpenClaw 是主人，不是工具。Agent 驱动工作流，而非脚本。 |
| **原生 API 优先** | `message.send()` > subprocess，`MEMORY.md` > YAML |
| **搜索优先级** | 平台原生 API > browser > web_search（Tavily） |
| **文档先于代码** | 先写文档再实现 |
| **实用优先** | 不为了完美牺牲可用 |

### 8.2 搜索工具优先级

```markdown
| 优先级 | 工具 | 原因 |
|--------|------|------|
| 1️⃣ | 平台原生API | 精确、无配额、官方支持 |
| 2️⃣ | browser.open() | 页面抓取、登录态、交互 |
| 3️⃣ | web_search (Tavily) | 通用搜索有配额限制，仅做兜底 |
```

### 8.3 配置间依赖关系

```
openclaw.json (主配置)
    │
    ├── agents[] → 各Agent的workspace
    │       │
    │       └── SOUL.md, USER.md, AGENTS.md, MEMORY.md, HEARTBEAT.md, TOOLS.md
    │               │
    │               └── memory/YYYY-MM-DD.md
    │
    ├── subagent.allowAgents[] → 白名单
    │
    └── cron[] → 定时任务
            │
            └── delivery.to + sessionTarget + payload.message（三者必须匹配）
                    │
                    └── ⚠️ sessionKey/Agent身份/delivery.to必须三者匹配
```

### 8.4 文件删除原则

```markdown
# 错误
rm -rf ~/.openclaw/shared/knowledge/decisions/

# 正确
trash ~/.openclaw/shared/knowledge/decisions/
# 或
mv ~/.openclaw/shared/knowledge/decisions/ ~/.openclaw/shared/knowledge/decisions.bak/
```

### 8.5 六层架构

```
1. Agent能力层     # Agent自身技能和工具
2. 外部知识层      # 共享知识库、外部API
3. Agent协作层     # 多Agent通讯和协调
4. 领域专业层      # 垂直领域知识
5. 合规风控层      # 安全、权限、审计
6. 用户体验层      # 输出格式、投递保证
```

### 8.6 Self-Improving 精髓

```
触发学习：
  用户纠正 → corrections.md
  重复成功3次 → 提升到 memory.md
  发现更好方式 → 记录并应用

安全边界：
  ✅ 可以记录：偏好、风格、规则
  ❌ 不能记录：密码、密钥、他人隐私
```

---

## 附录：关键路径速查

| 用途 | 路径 |
|------|------|
| Main workspace | `~/.openclaw/workspace/` |
| 子Agent workspaces | `~/.openclaw/workspaces/{agent}/` |
| 共享知识库 | `~/.openclaw/shared/` |
| 共识层 | `~/.openclaw/shared/consensus/` |
| 自我改进 | `~/.openclaw/shared/self-improving/` |
| Harness进化 | `~/.openclaw/shared/harness-evolution/` |
| Cron治理 | `~/.openclaw/shared/cron_harness/` |
| 子Agent治理 | `~/.openclaw/shared/subagent_harness/` |
| 主配置 | `~/.openclaw/openclaw.json` |
| Cron列表 | `openclaw cron list` |
| Session列表 | `sessions_list` |

---

*本指南基于墨家多 Agent 系统生产级实践生成*
*最后更新：2026-04-24*
