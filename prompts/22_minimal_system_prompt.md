# 精简 System Prompt（Minimal 模式）

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，`promptMode = "minimal"`
>
> 适用：Sub-agent / cron isolated sessions
>
> **重要**：以下基于 TypeScript 源码实际逻辑还原，Minimal 模式会跳过大量节。

---

## Minimal 模式跳过哪些节

| 被跳过的节 | 原因 |
|-----------|------|
| Skills | 避免 Sub-agent 自行调用 Skill，导致递归 |
| Memory Recall | 不加载 MEMORY.md，安全隔离 |
| Self-Update | 不允许 Sub-agent 修改系统 |
| Model Aliases | 由父 Agent 控制模型选择 |
| Reply Tags | 不需要原生回复能力 |
| Messaging | Sub-agent 不直接发送消息 |
| Silent Replies | 不需要静默回复 |
| Heartbeats | Sub-agent 不处理心跳 |
| Authorized Senders | 由 Gateway 统一处理 |
| Current Date & Time | 不需要 |
| Reactions | 不需要社交反应 |
| Documentation | 不需要文档路径 |
| Execution Bias | 不需要（父 Agent 已分配任务） |

## Minimal 模式保留的节

```typescript
// promptMode === "minimal" 时：
// - Tooling (完整)
// - Safety (完整)
// - Workspace Guidance
// - Sandbox (有配置时)
// - Runtime (完整)
// - Project Context (仅动态文件，如 HEARTBEAT.md)
// - Reasoning Format (有配置时)
```

## 实际源码中的 Minimal 返回

```typescript
// src/agents/system-prompt.ts，约 line 485

if (promptMode === "none") {
  return "You are a personal assistant running inside OpenClaw.";
}
// 返回完整 Full 模式，但 isMinimal=true 时跳过多个节
```

## Minimal 模式 vs Full 模式核心差异

```
Full Agent（父）                        Minimal Agent（子）
─────────────────                      ──────────────────
读 Skills → 决定是否调用 Skill          不读 Skills
读 MEMORY.md → 召回历史知识             不读 MEMORY.md
可以 Self-Update                      不可以
可以 Reply Tags                       不可以
可以 Messaging（直接发消息）            不可以（结果返回父 Agent）
处理 Heartbeats                       不处理
有 Reactions                         不有
读所有 Project Context 文件            只读动态文件
读 Authorized Senders                 不读
```

## 注入顺序（Minimal 实际保留部分）

```
You are a personal assistant running inside OpenClaw.

## Tooling
[完整工具列表 + 可用性说明]

## Tool Call Style
[Exec 审批引导]
Never execute /approve through exec...

## Safety
You have no independent goals...
Prioritize safety and human oversight...

## OpenClaw CLI Quick Reference
OpenClaw is controlled via subcommands...

## Sandbox
<IF sandbox enabled>
You are running in a sandboxed runtime...
<END>

## Workspace
Your working directory: <workspaceDir>

## Runtime
Runtime: agent=<agentId> | host=<host> | os=<os> | node=<node> | model=<model> | channel=<channel> | thinking=<level>
Reasoning: <reasoningLevel> (hidden unless on/stream). Toggle /reasoning.

## Dynamic Project Context
<HEARTBEAT.md instructions — 唯一保留的上下文文件>

---
[SYSTEM_PROMPT_CACHE_BOUNDARY]
---

## Subagent Context
<extraSystemPrompt — 父 Agent 传递的额外指令>
```

## 为什么这样设计

```
1. 减少 token 消耗 — 不注入不需要的上下文
2. 防止循环 — Sub-agent 不调用 Skills，避免递归调用
3. 安全隔离 — Sub-agent 不加载用户敏感信息
4. 角色清晰 — Sub-agent 是执行者，不是对话者
5. 能力完整 — 仍保留 Safety、Tooling、Sandbox 等核心能力
```

## Sub-agent 的两种触发方式

| 触发方式 | 使用的 promptMode | 说明 |
|---------|-----------------|------|
| `sessions_spawn` | `minimal`（默认） | 最精简隔离 |
| `sessions_spawn` | `full` | 不推荐，开销大 |
| Cron isolated | `minimal` | 定时任务隔离模式 |

### Full 模式（不推荐）

```typescript
// 强制使用 Full 模式（开销很大，不推荐）
sessions_spawn({
  task: "...",
  promptMode: "full", // 不推荐！Sub-agent 读所有文件
})
```
