# OpenClaw 内部提示词全解析

> 🦦 本文由 OpenClaw 助手自动生成 | 更新时间：2026-04-03
> 源码文件：`src/agents/system-prompt.ts` | 官方文档：[docs.openclaw.ai/concepts/system-prompt](https://docs.openclaw.ai/concepts/system-prompt)
> 相关：[Workspace 维护指南](./OpenClaw%20Workspace%20维护指南.md)

---

## 一、概述：OpenClaw 的提示词架构

OpenClaw 的提示词分为**两大类**：

1. **系统内置提示词**（OpenClaw 源码注入，User 不可见）
2. **Workspace 文件提示词**（用户在 `~/.openclaw/workspaces/` 下编辑的 .md 文件）

```
┌─────────────────────────────────────────────────────────────┐
│                   System Prompt（系统内置）                   │
│  由 OpenClaw 源码组装，注入每个 Agent Run                    │
├─────────────────────────────────────────────────────────────┤
│  Tools（工具说明）                                           │
│  Skills（可用技能列表）                                      │
│  Memory Recall（记忆搜索指令）                               │
│  OpenClaw Self-Update（自我更新说明）                        │
│  Model Aliases（模型别名）                                   │
│  User Identity（用户身份）                                   │
│  Reply Tags（回复标签规范）                                  │
│  Messaging（消息发送规范）                                   │
│  Silent Replies（静默回复规范）                              │
│  Heartbeats（心跳任务说明）                                  │
│  Safety（安全准则）                                          │
│  Workspace Files（工作区文件，AGENTS.md 等）                 │
│  Sandbox（沙箱环境信息）                                    │
│  Documentation（文档路径）                                    │
│  Current Date & Time（当前时间）                             │
│  Runtime（运行时信息）                                       │
├─────────────────────────────────────────────────────────────┤
│                   Workspace Files（用户配置）                 │
│  SOUL.md / AGENTS.md / IDENTITY.md / USER.md / TOOLS.md    │
│  MEMORY.md / HEARTBEAT.md / BOOTSTRAP.md                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、系统提示词各节详解

### 2.1 两种模式：full vs minimal

OpenClaw 系统提示词有两种组装模式：

| 模式 | 用途 | 包含内容 |
|------|------|---------|
| `full` | 主 Agent（main session） | 全部节（Tools/Skills/Memory/Self-Update/Alias/Identity/Reply/Messaging/Silent/Heartbeats 等全部） |
| `minimal` | 子 Agent（sub-agent） | 仅 Tools / Safety / Workspace / Sandbox / Date & Time / Runtime，**省略** Skills / Memory Recall / Self-Update / Model Aliases / User Identity / Reply Tags / Messaging / Silent Replies / Heartbeats |

> **关键设计**：sub-agent 只注入 `AGENTS.md` 和 `TOOLS.md`（其他 bootstrap 文件被过滤），以保持 sub-agent 上下文精简。

---

### 2.2 各节内容详解

#### 📌 Tools（工具说明）

OpenClaw 注册的所有 first-class 工具说明，包括工具名称、参数描述、功能说明。Agent 被要求：

> "When a first-class tool exists for an action, use the tool directly instead of asking the user to run equivalent CLI or slash commands."

即：**优先用工具而不是让用户手动执行 CLI 命令**。

核心工具列表（持续更新）：

| 工具 | 说明 |
|------|------|
| `read` | 读取文件内容 |
| `write` | 创建或覆盖文件 |
| `edit` | 精确编辑文件 |
| `exec` | 执行 Shell 命令 |
| `process` | 管理后台 exec 会话 |
| `web_search` | 网页搜索 |
| `browser` | 控制浏览器 |
| `image` | 图片分析 |
| `image_generate` | 图片生成 |
| `gateway` | 重启 Gateway / 查看配置 |
| `cron` | 管理定时任务 |
| `message` | 跨渠道发送消息 |
| `sessions_list` | 列出会话 |
| `sessions_send` | 向其他会话发消息 |
| `sessions_spawn` | 启动子 Agent |
| `memory_search` | 语义搜索记忆 |
| `memory_get` | 安全读取记忆片段 |
| `agents_list` | 列出可用的 Agent IDs |
| `subagents` | 管理子 Agent |
| `tts` | 文字转语音 |
| `canvas` | 控制 Canvas |
| `nodes` | 控制配对节点设备 |
| `...` | 持续扩展中 |

---

#### 📌 Skills（可用技能）

当存在符合条件的 Skill 时，OpenClaw 注入 `formatSkillsForPrompt()` 生成的**紧凑技能列表**：

```
<available_skills>
  <skill>
    <name>tutorial-master</name>
    <description>跨平台文章采集与Markdown转换工具...</description>
    <location>~/.openclaw/skills/tutorial-master/</location>
  </skill>
  ...
</available_skills>
```

**关键规则**：Skill 的 `description` 触发匹配后，Agent 被指示用 `read` 工具读取对应路径下的 `SKILL.md`。

---

#### 📌 Memory Recall（记忆搜索指令）

> "Before answering anything about prior work, decisions, dates, people, preferences, or todos: run memory_search on MEMORY.md + memory/*.md; then use memory_get to pull only the needed lines."

这是 OpenClaw 的**记忆召回协议**，要求 Agent 在回答以下问题时**必须先搜索记忆**：
- 关于过去工作的问题
- 决策相关问题
- 日期/人物/偏好相关问题
- 待办事项

---

#### 📌 Model Aliases（模型别名）

预定义的模型别名，用于降低配置成本：

```markdown
## Model Aliases
Prefer aliases when specifying model overrides; full provider/model is also accepted.
- minimax-m2.1: minimax-portal/MiniMax-M2.1
- minimax-m2.1-lightning: minimax-portal/MiniMax-M2.1-lightning
- minimax-m2.7: minimax-portal/MiniMax-M2.7
- minimax-m2.7-highspeed: minimax-portal/MiniMax-M2.7-highspeed
```

---

#### 📌 Reply Tags（回复标签规范）

控制回复的路由和引用行为：

> To request a native reply/quote on supported surfaces, include one tag in your reply:
> - Reply tags must be the very first token in the message (no leading text/newlines)
> - `[[reply_to_current]]` — replies to the triggering message
> - `[[reply_to:<id>]]` — replies to a specific message id (when explicitly provided)
> - Tags are stripped before sending; support depends on the current channel config

---

#### 📌 Messaging（消息发送规范）

当使用 `message` 工具（`action=send`）传递用户可见回复时：

> "If you use `message` (`action=send`) to deliver your user-visible reply, respond with ONLY: NO_REPLY (avoid duplicate replies)."

即：**如果用 message 工具发送回复，则在当前 session 回复中只写 `NO_REPLY`**，避免重复。

---

#### 📌 Silent Replies（静默回复规范）

两个预定义静默回复词：

| 静默词 | 含义 | 使用场景 |
|--------|------|---------|
| `NO_REPLY` | 无用户可见回复 | 内部维护轮次（heartbeat/compaction） |
| `HEARTBEAT_OK` | 心跳正常，无需通知 | 心跳检查一切正常时 |

> "When you have nothing to say, respond with ONLY: NO_REPLY"

---

#### 📌 Heartbeats（心跳任务）

配置了 `HEARTBEAT.md` 时，OpenClaw 定期触发心跳巡逻。Agent 被要求：
- 按 HEARTBEAT.md 的计划执行检查
- 正常时回复 `HEARTBEAT_OK`
- 异常时通知用户

---

#### 📌 Safety（安全准则）

OpenClaw 的安全指令，包括：
- 不追求自我保存、自我复制、权力寻址
- 避免长期规划
- 优先考虑人类监督
- 遇到矛盾指令时暂停并询问
- 合规停止/暂停/审计请求

---

#### 📌 Workspace Files（工作区文件注入）

系统提示词中会注入 Workspace 文件路径和规范：

```
## Workspace
Your working directory is: /Users/d/.openclaw/workspaces/openclaw-assistant
Treat this directory as the single global workspace for file operations unless explicitly instructed otherwise.
```

以及 BOOTSTRAP.md 的处理逻辑。

---

#### 📌 Sandbox（沙箱环境）

当运行在 sandbox 环境时，注入容器挂载路径等信息。

---

#### 📌 Documentation（文档路径）

当可用时，指向本地文档目录或公共镜像：

```
## Documentation
OpenClaw docs: /opt/homebrew/lib/node_modules/openclaw/docs
Mirror: https://docs.openclaw.ai
Source: https://github.com/openclaw/openclaw
Community: https://discord.com/invite/clawd
Find new skills: https://clawhub.ai
```

---

#### 📌 Current Date & Time

注入当前时区和时间信息：

```
## Current Date & Time
Time zone: Asia/Shanghai
```

---

#### 📌 Runtime（运行时信息）

注入当前 session 的运行时上下文：

```
## Runtime
Runtime: agent=openclaw-assistant | host=d的Mac mini | repo=/Users/d/.openclaw/workspaces/openclaw-assistant | os=Darwin 25.3.0 (arm64) | node=v24.10.0 | model=minimax-portal/MiniMax-M2.7 | default_model=minimax-portal/MiniMax-M2.7 | shell=zsh | channel=telegram | capabilities=inlineButtons | thinking=off
Reasoning: off (hidden unless on/stream). Toggle /reasoning; /status shows Reasoning when enabled.
```

---

## 三、Compaction 相关提示词

### 3.1 Memory Flush（内存冲洗）提示词

当上下文即将触发 compaction 时，OpenClaw 注入一个**静默轮次**，提醒 Agent 保存重要上下文：

**默认提示词（可配置）：**

```
Write everything important from this session to memory/YYYY-MM-DD.md immediately.
```

**配置项（`agents.defaults.compaction.memoryFlush`）：**

```json
{
  "compaction": {
    "memoryFlush": {
      "enabled": true,
      "prompt": "Write everything important from this session to memory/YYYY-MM-DD.md immediately.",
      "visibleWarning": false,
      "warningPrompt": "⚠️ Context at 80% — remember to note what we're working on"
    }
  }
}
```

- `visibleWarning: true` 时发送**可见**警告消息
- `warningPrompt` 可自定义警告文本

### 3.2 NO_REPLY 在 Compaction 中的行为

Memory flush 轮次是静默的，Agent 被要求：
1. 执行内存写入
2. 回复 `NO_REPLY`（不向用户显示任何内容）

> ⚠️ **已知 Bug**：某些弱模型（如 GLM-5）在 `NO_REPLY` 前会输出内部总结文本。Issue [#42472](https://github.com/openclaw/openclaw/issues/42472) 正在修复此问题。

---

## 四、心跳提示词（Heartbeat Prompts）

### 4.1 HEARTBEAT_OK 规范

当心跳检查一切正常时，Agent 回复：

```
HEARTBEAT_OK
```

### 4.2 NO_FLUSH

用于不需要 flush 时的静默确认。

### 4.3 Heartbeat State 追踪

Agent 被建议使用 `heartbeat-state.json` 追踪状态，避免重复检查：

```json
// heartbeat-state.json
{
  "lastEmailCheck": "2026-04-03T01:00:00+08:00",
  "lastCalendarCheck": "2026-04-03T01:00:00+08:00",
  "lastNewsCheck": "2026-04-03T00:00:00+08:00"
}
```

---

## 五、子 Agent 提示词（Minimal 模式）

Sub-agent（通过 `sessions_spawn` 启动的 isolated session）使用精简提示词，**省略以下内容**：

| 省略的内容 | 原因 |
|-----------|------|
| Skills | 避免子 Agent 加载过多上下文 |
| Memory Recall | 子 Agent 独立管理自己的记忆 |
| OpenClaw Self-Update | 子 Agent 不应自行更新系统 |
| Model Aliases | 由父 Agent 统一管理 |
| User Identity | 子 Agent 可能服务不同用户 |
| Reply Tags | 子 Agent 的回复由父 Agent 路由 |
| Messaging | 子 Agent 不直接与用户通信 |
| Silent Replies | 子 Agent 正常回复 |
| Heartbeats | 子 Agent 不执行心跳任务 |

**仅保留**：
- Tools（工具说明）
- Safety（安全准则）
- Workspace（工作区路径）
- Sandbox（沙箱信息）
- Current Date & Time
- Runtime（运行时信息）
- 注入的 context（来自父 Agent）

---

## 六、内部系统消息类型

OpenClaw 在会话中注入多种系统消息（role=system），包括：

| 消息类型 | 格式 | 说明 |
|---------|------|------|
| **Heartbeat** | `[system] heartbeat` | 定期巡逻检查 |
| **Memory Flush** | `[system] memory flush` | compaction 前保存上下文 |
| **Compaction Notice** | `[system] context at X%` | 上下文即将满的警告 |
| **Session Metadata** | `{chat_id, channel, sender...}` | 渠道元数据 |
| **Cron Announcement** | `[system] cron` | 定时任务结果推送 |

> ⚠️ **已知 Bug**：这些内部系统消息有时会泄露到 TUI 聊天历史中显示给用户。Issue [#23979](https://github.com/openclaw/openclaw/issues/23979) 在修复中。

---

## 七、Prompt Injection 防御相关

### 7.1 Safety.md 中的防御规则

OpenClaw 源码中的 `SAFETY.md`（如果存在）会覆盖安全部分。

### 7.2 已知的 Prompt Injection 攻击模式

社区发现的攻击 payload 会尝试让 Agent：
1. 读取 `WORKFLOW_AUTO.md`（不存在的文件）
2. 覆盖系统提示词
3. 修改 MEMORY.md 中的信任状态

**防御建议**：
- 在 AGENTS.md 或 SOUL.md 中添加对未知系统格式消息的识别规则
- Workspace 文件定期审计，移除可疑内容
- Tool security 设置为 `allowlist` 而非 `full`

---

## 八、查看当前 System Prompt

### 方式一：CLI 命令（新功能，v2026.4+）

```bash
openclaw agents view-system-prompt
```

### 方式二：查看源码

```bash
# 找到 system-prompt.ts
find ~/.npm -name "system-prompt.ts" 2>/dev/null
# 或访问 GitHub
# https://github.com/openclaw/openclaw/blob/main/src/agents/system-prompt.ts
```

---

## 九、自定义 System Prompt

### 9.1 通过 Workspace 文件（推荐）

Workspace 文件（AGENTS.md / SOUL.md 等）是在系统提示词**之后**注入的，可以覆盖同名章节。

### 9.2 agents.defaults.systemPromptFile

在 `openclaw.json` 中指定外部文件作为系统提示词：

```json
{
  "agents": {
    "defaults": {
      "systemPromptFile": "/path/to/custom-system-prompt.md"
    }
  }
}
```

### 9.3 Safety.md 覆盖

将 `SAFETY.md` 放在 Workspace 或系统配置目录，可覆盖内置安全部分。

---

## 十、完整 System Prompt 注入顺序图

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Runtime Info                                             │
│    agent=... | host=... | model=... | channel=...          │
├─────────────────────────────────────────────────────────────┤
│ 2. Current Date & Time                                     │
│    Time zone: Asia/Shanghai                                 │
├─────────────────────────────────────────────────────────────┤
│ 3. Documentation Paths                                     │
│    OpenClaw docs / GitHub / Discord / ClawHub              │
├─────────────────────────────────────────────────────────────┤
│ 4. Model Aliases                                           │
│    minimax-m2.1 → minimax-portal/MiniMax-M2.1              │
├─────────────────────────────────────────────────────────────┤
│ 5. OpenClaw Self-Update Instructions                       │
│    Get Updates is ONLY allowed when user explicitly asks    │
├─────────────────────────────────────────────────────────────┤
│ 6. Skills Section                                          │
│    <available_skills>...</available_skills>                 │
├─────────────────────────────────────────────────────────────┤
│ 7. Tools Section                                           │
│    read / write / edit / exec / browser / ...              │
├─────────────────────────────────────────────────────────────┤
│ 8. Safety                                                   │
│    Red lines, human oversight priority, stop/pause/audit    │
├─────────────────────────────────────────────────────────────┤
│ 9. Messaging                                               │
│    message tool usage, NO_REPLY rule                       │
├─────────────────────────────────────────────────────────────┤
│ 10. Reply Tags                                             │
│     [[reply_to_current]] / [[reply_to:<id>]]               │
├─────────────────────────────────────────────────────────────┤
│ 11. Silent Replies                                         │
│     NO_REPLY / HEARTBEAT_OK规范                            │
├─────────────────────────────────────────────────────────────┤
│ 12. Memory Recall                                          │
│     memory_search before answering past work...             │
├─────────────────────────────────────────────────────────────┤
│ 13. User Identity                                          │
│     From USER.md                                           │
├─────────────────────────────────────────────────────────────┤
│ 14. Workspace Files (injected)                             │
│     AGENTS.md / SOUL.md / IDENTITY.md / USER.md /         │
│     TOOLS.md / MEMORY.md / HEARTBEAT.md / BOOTSTRAP.md    │
├─────────────────────────────────────────────────────────────┤
│ 15. Heartbeats                                             │
│     HEARTBEAT.md instructions (if configured)              │
├─────────────────────────────────────────────────────────────┤
│ 16. Sandbox                                                │
│     Container workspace dir (if in sandbox)                  │
└─────────────────────────────────────────────────────────────┘
         ↓ 组装完成后注入 LLM
```

---

## 相关资源

- [官方 System Prompt 文档](https://docs.openclaw.ai/concepts/system-prompt)
- [官方 Memory 文档](https://docs.openclaw.ai/concepts/memory)
- [GitHub: system-prompt.ts](https://github.com/openclaw/openclaw/blob/main/src/agents/system-prompt.ts)
- [GitHub Issue #41421](https://github.com/openclaw/openclaw/issues/41421) — `view-system-prompt` CLI 命令
- [GitHub Issue #23979](https://github.com/openclaw/openclaw/issues/23979) — TUI 泄露内部消息修复
- [GitHub Issue #42472](https://github.com/openclaw/openclaw/issues/42472) — NO_REPLY 后处理修复

---

*🦦 由 OpenClaw 助手生成*
