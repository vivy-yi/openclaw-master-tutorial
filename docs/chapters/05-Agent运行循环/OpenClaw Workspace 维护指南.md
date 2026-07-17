# OpenClaw Workspace 维护指南

> 🦦 本文由 OpenClaw 助手自动生成 | 更新时间：2026-04-02
> 参考：[官方 Agent Workspace 文档](https://docs.openclaw.ai/concepts/agent-workspace) | [OpenClaw Best Practices](https://openclaw.com.au/best-practices) | [VelvetShark Memory Masterclass](https://velvetshark.com/openclaw-memory-masterclass) | [24/7 自主 Agent 架构 (Reddit)](https://www.reddit.com/r/AI_Agents/comments/1rdkngw/)

---

## Workspace 是什么？

Workspace 是 OpenClaw Agent 的**持久化存储空间**，通过文件系统让 Agent 在每次会话重启后依然保持记忆和连续性。

### 默认位置

```
~/.openclaw/workspaces/<workspace-name>/
```

### 核心文件结构

```
~/.openclaw/workspaces/openclaw-assistant/
├── AGENTS.md        # 操作规则和行为指南
├── SOUL.md          # 人格、性格、对话风格
├── IDENTITY.md      # AI 身份定义（名称、定位、Emoji）
├── USER.md          # 用户信息（谁在使用这个 Agent）
├── TOOLS.md         # 工具说明（环境特有配置）
├── MEMORY.md        # 长期记忆（核心决策、偏好、重要事实）
├── HEARTBEAT.md     # 心跳任务配置（定期自动检查）
├── BOOTSTRAP.md     # 首次启动引导（初始化后删除）
└── memory/          # 每日日志文件夹
    ├── 2026-04-01.md
    ├── 2026-04-02.md
    └── ...
```

---

## 核心文件详解

### 加载顺序（固定不变）

OpenClaw 在每次会话启动时，按此顺序加载 bootstrap files：

```
1. AGENTS.md   → 操作规则（第一个加载）
2. SOUL.md     → 性格灵魂
3. IDENTITY.md → 身份定义
4. USER.md     → 用户信息
5. TOOLS.md    → 工具配置
6. MEMORY.md   → 长期记忆
7. HEARTBEAT.md → 心跳任务（仅当配置了 cron 时）
```

> ⚠️ **注意**：只有这 8 个精确文件名的文件才会被自动注入。任何拼写错误（如 `memory.md` 或 `Agents.md`）都不会被加载。

### 各文件职责

#### AGENTS.md — 操作规则

定义 Agent 的工作流程和行为准则。相当于 Agent 的「**使用手册**」。

```markdown
# AGENTS.md - OpenClaw 助手

## First Run
1. Read `SOUL.md` — this is who you are
2. Read `USER.md` — this is who you're helping
3. Read `memory/YYYY-MM-DD.md` (today + yesterday)

## Memory
- 每日日志：memory/YYYY-MM-DD.md
- 长期记忆：MEMORY.md

## Red Lines
- 不要外泄私人数据
- 破坏性命令执行前必须询问
```

#### SOUL.md — 性格灵魂

定义 Agent 的**人格特质、语气、对话风格**。这是让 Agent 独一无二的核心文件。

```markdown
# SOUL.md - OpenClaw 助手

## 角色
- 名称: OpenClaw 助手
- 定位: OpenClaw 产品专家与布道者
- Emoji: 🦦

## 核心职责
1. 解答 OpenClaw 使用问题
2. 追踪版本更新和 Release Notes
3. 分析商业模式和盈利机会

## 回答风格
- 专业但友好
- 提供具体示例
- 引用官方资源
```

#### MEMORY.md — 长期记忆（最重要）

存放**跨会话持久化**的核心信息。只在**主会话**中加载，不在群聊等共享上下文中加载。

```markdown
# MEMORY.md - OpenClaw助手长期记忆

## 重要规则
- 教程路径：/Volumes/waku/github-维护/openclaw-master-tutorial/

## 学习记录
### 2026-04-02
- 完成 memory-lancedb-pro、lossless-claw、manifest 三个教程编写
- 学习了不同内存系统的定位差异
```

**MEMORY.md 写入规则**：
- 用户告知的重要信息 → **立即写入**
- 发现错误/学到教训 → **立即写入**
- 每次会话结束后 → **自动更新**

#### HEARTBEAT.md — 心跳任务

配置**定期自动执行的任务**，让 Agent 主动检查邮件、日历、新闻等，无需用户触发。

```markdown
# HEARTBEAT.md

## 每周内存整理（周日）
- [ ] 回顾过去 7 天的 memory/*.md 文件
- [ ] 将重要内容提炼到 MEMORY.md
- [ ] 清理过期信息

## 每日早间简报（工作日 9:00）
- [ ] 检查日历
- [ ] 检查邮件
- [ ] 推送今日待办
```

#### IDENTITY.md / USER.md / TOOLS.md

| 文件 | 内容 | 变更频率 |
|------|------|---------|
| `IDENTITY.md` | AI 身份（名称、Emoji、定位） | 低 |
| `USER.md` | 用户信息（姓名、时区、偏好） | 中 |
| `TOOLS.md` | 环境特有工具配置（相机名、SSH 配置等） | 低 |

---

## 四层记忆体系

OpenClaw 的记忆不是单一层次，而是**四层架构**：

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Bootstrap Files（永久）                       │
│  SOUL.md / AGENTS.md / IDENTITY.md / USER.md /          │
│  TOOLS.md / MEMORY.md / HEARTBEAT.md                    │
│  → 每次会话启动时注入，不因会话结束而丢失                 │
├─────────────────────────────────────────────────────────┤
│  Layer 2: Session Transcript（半永久）                  │
│  会话历史记录（经 compaction 压缩后保留在 session 文件）  │
├─────────────────────────────────────────────────────────┤
│  Layer 3: LLM Context Window（临时）                    │
│  当前会话的上下文窗口，session 结束后丢失               │
├─────────────────────────────────────────────────────────┤
│  Layer 4: Memory Index（永久）                          │
│  memory/YYYY-MM-DD.md 每日日志 + memory_search 索引     │
└─────────────────────────────────────────────────────────┘
```

> 💡 **关键认知**：Layer 3（上下文窗口）是临时的，session 结束后就消失。真正的持久化靠 Layer 1 和 Layer 4。

---

## 每日日志管理（memory/ 文件夹）

### 命名规范

```
memory/YYYY-MM-DD.md   # 当日日志
memory/YYYY-MM-DD.md   # 前一天日志（每次启动时读取）
```

### 日志内容规范

```markdown
# 2026-04-02 日志

## 完成的任务
- 编写了 memory-lancedb-pro 教程
- 完成了三个记忆系统的横向对比

## 重要决策
- 确定教程存放路径为 /Volumes/waku/github-维护/openclaw-master-tutorial/

## 待跟进
- [ ] lossless-claw enhanced 版本的 CJK 修复验证
```

### 日志写入时机

| 时机 | 操作 |
|------|------|
| 完成重要任务 | 立即写入 memory/YYYY-MM-DD.md |
| 发现重要规则/教训 | 立即写入 MEMORY.md |
| 会话即将结束/上下文较大 | 总结到 memory/YYYY-MM-DD.md |
| 每次会话开始 | 读取 today + yesterday 的日志 |

---

## 内存协议（Memory Protocol）

在 AGENTS.md 中添加以下协议，让 Agent 养成良好的记忆习惯：

```markdown
## Memory Protocol

- 回答关于过去工作的问题前：**先搜索 memory**
- 开始新任务前：**先查看 memory/today's date**
- 学到重要信息时：**立即写入对应文件**
- 被纠正错误时：**将纠正内容作为规则写入 MEMORY.md**
- 会话结束或上下文较大时：**总结到 memory/YYYY-MM-DD.md**
```

---

## Heartbeat vs Cron 任务

### Heartbeat（心跳）

- **触发时机**：Agent 空闲时（约每 30 分钟一次）
- **用途**：批量检查邮件、日历、新闻等被动任务
- **特点**：Agent 主动巡逻，不占用固定时间槽
- **状态追踪**：用 `heartbeat-state.json` 避免重复检查

```markdown
# HEARTBEAT.md
## 邮件检查（每心跳）
- 检查是否有新邮件
- 重要邮件通知用户
```

### Cron（定时任务）

- **触发时机**：精确时间（如每天 22:00）
- **用途**：定时执行特定任务（发日报、备份等）
- **特点**：精准定时，适合明确时间点的任务
- **推荐模式**：isolated agentTurn + announce delivery

### 选择指南

| 场景 | 推荐方式 |
|------|---------|
| 邮件/日历批量检查 | Heartbeat |
| 每天固定时间推送新闻 | Cron |
| 定期整理 memory 文件 | Cron（isolated）+ announce |
| 不确定时机，定期巡逻 | Heartbeat |

---

## Git 版本控制（强烈推荐）

将 Workspace 文件纳入 Git 管理，防止丢失、便于追溯。

### 初始化

```bash
cd ~/.openclaw/workspaces/openclaw-assistant
git init
git add AGENTS.md SOUL.md TOOLS.md IDENTITY.md USER.md HEARTBEAT.md memory/
git commit -m "Add agent workspace"
```

### 添加私有远程

```bash
# GitHub
gh repo create openclaw-workspace --private --source .
git push -u origin main

# 后续更新
git add -u
git commit -m "Update memory"
git push
```

### 不提交的内容（.gitignore）

```
MEMORY.md        # 包含个人信息，不要提交
*.session*      # 会话文件
*.sqlite        # 数据库文件
```

### 从另一台机器恢复

```bash
git clone <your-repo-url> ~/.openclaw/workspaces/openclaw-assistant
```

---

## 常见错误与解决方案

### 错误一：文件完全不被加载

**症状**：Agent 报告"找不到 SOUL.md / MEMORY.md"

**原因**：文件名拼写错误。OpenClaw **只认这 8 个精确文件名**：
```
SOUL.md | AGENTS.md | USER.md | TOOLS.md | IDENTITY.md | MEMORY.md | HEARTBEAT.md | BOOTSTRAP.md
```

错误示例：`memory.md`、`Agents.md`、`Soul.md`、`Memory.md`

### 错误二：MEMORY.md 被覆盖为空

**症状**：Agent 说"记忆完全空白"，但文件明明有内容

**原因**：Agent 用 `write` 工具**重写**了文件，而不是 `edit` 工具追加内容

**解决**：在 MEMORY.md 第一行加上自我保护规则：

```markdown
<!-- ⚠️ 注意：此文件只能通过 edit 工具追加内容，禁止使用 write 工具重写 -->
# MEMORY.md
...
```

### 错误三：所有请求都写入 MEMORY.md

**症状**：MEMORY.md 越来越大，Agent 行为规则却没有更新

**原因**：Agent 把所有"记住"请求都当作长期事实，而没有区分**行为改变**和**知识记忆**

**正确分类**：

| 用户说 | 应写入位置 |
|--------|----------|
| "我叫张三" | MEMORY.md |
| "以后消息要简短" | SOUL.md 或 AGENTS.md |
| "上次讨论的技术选型" | MEMORY.md + 相关 memory/ 日志 |
| "这个 bug 修复方法" | 项目文档或 memory/ 日志 |

---

## 24/7 自主 Agent 的记忆架构

Running a 24/7 autonomous agent requires strict discipline in memory management:

### 架构示例（来自 @Will Powers 的生产实践）

```
每次启动读取：
1. SOUL.md（我是谁）
2. USER.md（我在帮谁）
3. AGENTS.md（操作规则）
4. memory/YYYY-MM-DD.md（今日 + 昨日日志）
5. MEMORY.md（长期记忆精选）

定期执行（Heartbeat ~30min）：
- 批量检查邮件、日历
- 用 heartbeat-state.json 追踪状态，避免重复检查

定时执行（Cron）：
- 精确时间点的独立任务
- 使用 isolated agentTurn + announce 推送结果
```

### 核心原则

1. **如果没写在文件里，会话重启后就等于不存在**
2. **Heartbeat > 持续轮询**（节省 tokens）
3. **身份与记忆分离**：Identity 稳定不变，Memory 持续更新
4. **使用 heartbeat-state.json 追踪状态**，避免重复操作

---

## HEARTBEAT.md 模板

```markdown
# HEARTBEAT.md

## 每周内存整理（周日 20:00）
- [ ] 回顾过去 7 天的 memory/*.md 文件
- [ ] 将重要内容提炼到 MEMORY.md
- [ ] 清理过期信息
- [ ] 归档已完成项目的 memory 文件

## 每日健康检查（每日 09:00）
- [ ] 检查日历今日安排
- [ ] 检查重要邮件
- [ ] 推送今日待办到主聊天频道

## 每周备份（周日 21:00）
- [ ] git add -u && git commit -m "Weekly memory update"
- [ ] git push 到远程仓库
```

---

## 完整文件模板

### SOUL.md 最小模板

```markdown
# SOUL.md

## 角色
- 名称：
- 定位：
- Emoji：

## 核心职责

## 回答风格
- 
- 

## 个性特质
- 
```

### AGENTS.md 最小模板

```markdown
# AGENTS.md

## 启动流程
1. Read `SOUL.md`
2. Read `USER.md`
3. Read `memory/YYYY-MM-DD.md` (today + yesterday)
4. **If in MAIN SESSION**: Also read `MEMORY.md`

## Memory Protocol
- Before answering about past work: search memory first
- Before starting new task: check memory/today's date
- Learn something important: write to appropriate file immediately
- Corrected on a mistake: add correction as rule to MEMORY.md
- Session ending or context large: summarize to memory/YYYY-MM-DD.md

## Red Lines
- 
```

### HEARTBEAT.md 最小模板

```markdown
# HEARTBEAT.md

## 每周内存整理（周日）
- [ ] Review past 7 days of memory/*.md
- [ ] Update MEMORY.md with significant learnings
- [ ] Archive stale information
```

---

## 相关资源

- [官方 Agent Workspace 文档](https://docs.openclaw.ai/concepts/agent-workspace)
- [OpenClaw Best Practices](https://openclaw.com.au/best-practices)
- [VelvetShark Memory Masterclass](https://velvetshark.com/openclaw-memory-masterclass)
- [Stack Junkie Workspace 指南](https://www.stack-junkie.com/blog/openclaw-workspace-architecture)
- [OpenClaw Backup Guide](https://lumadock.com/tutorials/openclaw-backup-export-settings-memory)
- [Cron vs Heartbeat 官方文档](https://github.com/openclaw/openclaw/blob/main/docs/automation/cron-vs-heartbeat.md)
- [win4r/openclaw-workspace](https://github.com/win4r/openclaw-workspace) — Workspace 一键生成 Skill

---

*🦦 由 OpenClaw 助手生成*
