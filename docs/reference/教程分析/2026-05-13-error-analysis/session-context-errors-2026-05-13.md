# Session/Context 模块错误分析

**分析日期**: 2026-05-13
**对比文件**:
- 教程文件: `/Volumes/waku/github-维护/openclaw-master-tutorial/docs/chapters/06_上下文与记忆/6.1_context_system.md`, `6.2_message_history.md`
- 官方文档: `/opt/homebrew/lib/node_modules/openclaw/docs/concepts/` 下的 `session.md`, `context.md`, `compaction.md`, `messages.md`, `memory.md`

---

## 错误列表

### 错误 1: [6.1_context_system.md] "Skills" 提示词误认为是上下文默认组成部分

**位置**: 第 6.1.2 节 "完整结构" 图示
```
4. Skills Prompts
   ├── 激活的 Skill
   └── 注入的提示词
```

**问题**: 该图将 "Skills Prompts" 作为上下文结构的独立顶层项，并描述为"激活的 Skill" + "注入的提示词"。

**正确内容**: 官方 `context.md` 明确说明：
> Skills list (system prompt text): 2,184 chars
> Skill instructions are **not** included by default. The model is expected to read the skill's SKILL.md only when needed.

技能在系统提示中只存储**元数据列表**（名称 + 描述 + 路径），而非注入完整提示词。模型需要时主动读取技能文件，而非预先注入。

---

### 错误 2: [6.1_context_system.md] "Persona Config" 被列为独立顶层上下文项

**位置**: 第 6.1.2 节 "完整结构" 图示
```
2. Persona Config
   ├── 角色设定
   ├── 说话风格
   └── 专业知识
```

**问题**: 官方 `context.md` 和 `system-prompt.md` 的系统提示构建中，没有独立顶层 "Persona Config" 节。Persona 相关内容通过 `SOUL.md`, `IDENTITY.md` 等 Project Context 文件注入，并非作为独立上下文组件存在。

---

### 错误 3: [6.1_context_system.md] "额外上下文 (Extra Context)" 未在官方文档中找到对应概念

**位置**: 第 6.1.1 节 "上下文组成" 图示
```
上下文 = 发送给 LLM 的完整信息
包含内容：
├── 系统提示 (System Prompt)
├── 用户消息 (User Message)
├── 历史消息 (History Messages)
├── 工具结果 (Tool Results)
├── 记忆内容 (Memory)      ← 错误：记忆不属于上下文
└── 额外上下文 (Extra Context) ← 官方无此分类
```

**问题**: 
- 官方 `context.md` 明确指出："Context is **not** the same thing as 'memory': memory can be stored on disk and reloaded later; context is what's inside the model's current window."
- 记忆内容（MEMORY.md, memory/ 日期文件）属于长期存储，通过 `memory_search` 工具检索后作为信息源注入，而非直接存在于上下文窗口中。
- "额外上下文 (Extra Context)" 这一分类在官方文档中不存在。

---

### 错误 4: [6.2_message_history.md] 消息类型定义缺少重要类型

**位置**: 第 6.2.1 节
```
消息类型：
1. user - 用户消息
2. assistant - AI 回复
3. system - 系统消息
4. tool - 工具调用
5. tool_result - 工具结果
```

**问题**: 
- 官方 `messages.md` 中工具调用的结构是：tool call 消息（role: assistant，带 tool_calls）及其 tool result 回执（role: tool）。不存在独立的 `tool_result` 消息类型——tool result 是 tool call 的回执。
- 缺少 `function` 角色类型（部分 API 兼容格式）。

---

### 错误 5: [6.2_message_history.md] "滑动窗口" 配置示例与官方机制不符

**位置**: 第 6.2.4 节
```json
{
  "history": {
    "window": {
      "type": "sliding",
      "size": 20,
      "slide_by": 5
    }
  }
}
```

**问题**: 官方 `session.md` 和 `compaction.md` 描述的机制是：
- 使用 **compaction（压缩）** 而非滑动窗口来管理历史
- compaction 将旧消息**汇总为摘要**保存到会话记录中
- 历史管理通过 `compression` + `pruning` 实现，不是"滑动窗口"概念

官方 compaction 文档特别强调：
> When OpenClaw splits history into compaction chunks, it keeps assistant tool calls paired with their matching `toolResult` entries. If a split point lands inside a tool block, OpenClaw moves the boundary so the pair stays together.

教程中的 `slide_by` 配置项在官方文档中未找到对应配置。

---

### 错误 6: [6.2_message_history.md] "会话隔离" 配置项与官方参数名不符

**位置**: 第 6.2.5 节
```json
{
  "session": {
    "default_isolation": "session",
    "global_session": "global_shared",
    "cross_session_memory": false
  }
}
```

**问题**: 官方 `session.md` 中的实际配置项为：
```json5
{
  session: {
    dmScope: "per-channel-peer", // isolate by channel + sender
    // 其他选项: "main"(默认), "per-peer", "per-channel-peer", "per-account-channel-peer"
  },
}
```

教程使用的 `default_isolation`, `global_session`, `cross_session_memory` 均非官方配置项。

---

### 错误 7: [6.2_message_history.md] "压缩提示词" 示例与官方 compaction 机制描述不符

**位置**: 第 6.2.3 节
```markdown
# 消息摘要提示词

请将以下消息历史压缩为简洁的摘要：

## 要求
1. 保留关键信息
2. 保留用户意图
3. 保留重要结论
4. 删除重复内容
5. 保持时间线清晰

## 格式
用 3-5 句话概括：
- 用户的核心需求
- AI 的主要回复
- 关键结论或操作
```

**问题**: 官方 `compaction.md` 说明 compaction 是 OpenClaw 内置的自动行为，通过 LLM 总结旧对话来工作。教程给出了一个"手动摘要提示词"，但官方 compaction 是由 OpenClaw 自动触发（靠近上下文限制时）或用户通过 `/compact` 手动触发，且可以指定压缩模型和内存刷新配置。

教程的提示词格式不反映官方实际的 compaction pipeline。

---

### 错误 8: [6.1_context_system.md] "压缩预留" 不属于上下文 Token 分配

**位置**: 第 6.1.2 节 Token 预算分配图示
```
压缩预留          ████░░░░░░░░  10K 10%
```

**问题**: 压缩（compaction）是一种**操作**，不是上下文的一部分。"压缩预留"不是一个官方概念，也不出现在 `context.md` 的任何 token 分配说明中。

---

## 正确架构（官方）

### 上下文构成（官方）

根据 `context.md`：

```
上下文 (Context) = 发送给模型的全部内容

组成部分：
├── System Prompt（OpenClaw 构建）
│   ├── Tool list + short descriptions
│   ├── Skills list (metadata only, NOT full instructions)
│   ├── Workspace location
│   ├── Time (UTC + user time if configured)
│   ├── Runtime metadata (host/OS/model/thinking)
│   └── Injected workspace files (Project Context: AGENTS.md, SOUL.md, IDENTITY.md, USER.md, HEARTBEAT.md, BOOTSTRAP.md)
│
├── Conversation History
│   ├── 消息历史（user + assistant）
│   └── 压缩摘要（如已执行 compaction）
│
├── Tool calls + results
│   ├── 工具调用（assistant 消息中的 tool_calls）
│   └── 工具结果回执（role: tool）
│
└── Attachments/Transcripts
    ├── 图片/音频/文件
    └── provider wrappers（不可见但占 token）
```

**重要区分**: Memory ≠ Context
- Memory: 写入磁盘的文件（MEMORY.md, memory/日期.md），通过 memory_search 检索后可能注入上下文
- Context: 模型当前窗口能看到的全部内容

### 历史管理机制（官方）

根据 `session.md` + `compaction.md`:

```
Session 生命周期管理：
├── 每日重置（默认 4:00 AM 本地时间）
├── 空闲重置（可选，配置 session.reset.idleMinutes）
└── 手动重置（/new 或 /reset）

历史维护机制：
├── Compaction（压缩）
│   ├── 触发条件：接近上下文限制 或 收到 overflow 错误
│   ├── 操作：将旧对话汇总为 compact summary
│   ├── 保存位置：session transcript
│   └── 配置项：agents.defaults.compaction.*
│
├── Session Pruning（修剪）
│   ├── 操作：仅删除旧的 tool results（内存中）
│   ├── 不修改 transcript（磁盘上的完整历史仍可查）
│   └── 范围：仅工具结果，非整个消息历史
│
└── Memory Flush
    ├── 触发：compaction 前自动运行静默 turn
    └── 操作：提醒 agent 将重要信息写入 memory 文件
```

### 会话隔离机制（官方）

根据 `session.md`:
```
DM 隔离选项（session.dmScope）：
├── "main"（默认）— 所有 DM 共享一个 session
├── "per-peer" — 按发送者隔离（跨 channel）
├── "per-channel-peer" — 按 channel + 发送者隔离（推荐）
└── "per-account-channel-peer" — 按 account + channel + 发送者隔离

使用 session.identityLinks 链接同一人的多个身份，使其共享 session。
```

---

## 总结

| # | 文件 | 问题类型 | 严重程度 |
|---|------|---------|---------|
| 1 | 6.1_context_system.md | Skills Prompts 误作为默认注入项 | 高 |
| 2 | 6.1_context_system.md | Persona Config 误作为独立顶层项 | 中 |
| 3 | 6.1_context_system.md | 将记忆内容列为上下文组成部分 | 高 |
| 4 | 6.2_message_history.md | 消息类型定义不准确 | 中 |
| 5 | 6.2_message_history.md | "滑动窗口"机制与官方 compaction 不符 | 中 |
| 6 | 6.2_message_history.md | 会话隔离配置项名称错误 | 高 |
| 7 | 6.2_message_history.md | 压缩提示词与官方 compaction 机制描述不符 | 中 |
| 8 | 6.1_context_system.md | "压缩预留"不属于上下文 Token 分配 | 低 |

**核心错误**: 教程过度简化了 OpenClaw 的上下文管理机制，将 memory 混入了 context，将 compaction 和 pruning 描述为滑动窗口，并使用了不存在的配置项名称。