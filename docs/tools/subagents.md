---
summary: "Spawn isolated background agent runs that announce results back to the requester chat"
read_when:
  - You want background or parallel work via the agent
  - You are changing sessions_spawn or sub-agent tool policy
  - You are implementing or troubleshooting thread-bound subagent sessions
title: "Sub-agents"
sidebarTitle: "Sub-agents"
---

Sub-agents are background agent runs spawned from an existing agent run.
They run in their own session (`agent:<agentId>:subagent:<uuid>`) and,
when finished, **announce** their result back to the requester chat
channel.

## 核心目标

- **并行化**："研究 / 长任务 / 慢工具" 工作不阻塞主运行
- **隔离**：默认 session 分离 + 可选沙箱
- **工具表面精简**：默认无 session tools
- **可配置嵌套深度**：支持 orchestrator 模式

> **成本注意**：每个 sub-agent 有自己的 context 和 token 使用。
> 对于重型/重复任务，为 sub-agent 设置更便宜的模型。
> 配置：`agents.defaults.subagents.model` 或 per-agent overrides。

---

## 工具：`sessions_spawn`

### 参数

| 参数 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| `task` | string | 必填 | sub-agent 任务描述 |
| `label` | string | - | 可读标签 |
| `agentId` | string | - | 在另一个 agent id 下 spawn |
| `runtime` | `"subagent"` / `"acp"` | `subagent` | ACP 用于外部 ACP harnesses |
| `model` | string | 继承 | 覆盖 sub-agent 模型 |
| `thinking` | string | 继承 | 覆盖 thinking 级别 |
| `runTimeoutSeconds` | number | 0 | 超时秒数（0=无超时） |
| `thread` | boolean | false | 请求 channel thread binding |
| `mode` | `"run"` / `"session"` | `run` | 需要 `thread: true` |
| `cleanup` | `"delete"` / `"keep"` | `keep` | announce 后是否 archive |
| `sandbox` | `"inherit"` / `"require"` | `inherit` | `require` 拒绝非沙箱目标 |
| `context` | `"isolated"` / `"fork"` | `isolated` | fork 会分支请求者 transcript |

### 默认值

- **Model**：继承调用者，除非设置 `agents.defaults.subagents.model`
- **Thinking**：继承调用者，除非设置 `agents.defaults.subagents.thinking`
- **Run timeout**：使用 `agents.defaults.subagents.runTimeoutSeconds`，否则 `0`（无超时）

---

## Context 模式

| 模式 | 适用场景 | 行为 |
| ---- | -------- | ---- |
| `isolated` | 新研究、独立实现、慢工具 | 创建干净的子 transcript（默认） |
| `fork` | 依赖当前对话、先前工具结果 | 将请求者 transcript 分支到子 session |

**使用建议**：`fork` 仅用于上下文敏感的委托，而非替代编写清晰的 task prompt。

---

## Tool Policy

默认 sub-agents 获取 **除 session tools 外的所有工具**：
- ❌ `sessions_list`
- ❌ `sessions_history`
- ❌ `sessions_send`
- ❌ `sessions_spawn`
- ✅ 所有其他工具（包括 `subagents` 用于 orchestrator）

当 `maxSpawnDepth >= 2` 时，depth-1 orchestrator 额外获取：
- ✅ `sessions_spawn`
- ✅ `subagents`
- ✅ `sessions_list`
- ✅ `sessions_history`

---

## 嵌套 Sub-agents

| Depth | Session key | Role | Can spawn? |
| ----- | ----------- | ---- | ---------- |
| 0 | `agent:<id>:main` | Main agent | Always |
| 1 | `agent:<id>:subagent:<uuid>` | Sub-agent (orchestrator when depth 2) | Only if `maxSpawnDepth >= 2` |
| 2 | `agent:<id>:subagent:<uuid>:subagent:<uuid>` | Sub-sub-agent (leaf) | Never |

### 配置

```json5
{
  agents: {
    defaults: {
      subagents: {
        maxSpawnDepth: 2,           // 允许子 sub-agent（默认: 1）
        maxChildrenPerAgent: 5,     // 每 agent 最大活跃子数（默认: 5）
        maxConcurrent: 8,           // 全局并发上限（默认: 8）
        runTimeoutSeconds: 900,      // 默认超时（0=无超时）
      },
    },
  },
}
```

---

## Announce（结果回报）

Sub-agents 通过 announce 步骤报告：
- announce 步骤在 sub-agent session 内运行（不在请求者 session）
- 如果 sub-agent 回复恰好是 `ANNOUNCE_SKIP`，什么都不发布
- 如果最新 assistant 文本是精确的静默 token `NO_REPLY` / `no_reply`，抑制 announce 输出

**Stats line（包含在 announce payload 末尾）：**
- Runtime（运行时长）
- Token 使用（input/output/total）
- 估算成本（当配置了 model pricing 时）
- `sessionKey`, `sessionId`, transcript path

---

## Thread-bound Sessions

当前仅 **Discord** 支持。
支持持久 thread-bound subagent sessions。

### 控制命令

| 命令 | 效果 |
| ---- | ---- |
| `/focus <target>` | 将当前 thread（或创建新）绑定到 sub-agent/session target |
| `/unfocus` | 移除当前 bound thread 的绑定 |
| `/agents` | 列出活跃 runs 和绑定状态 |
| `/session idle` | 检查/更新 idle auto-unfocus |
| `/session max-age` | 检查/更新硬性上限 |

---

## 配置项

```json5
{
  agents: {
    defaults: {
      subagents: {
        model: "minimax-m2.1",           // 默认子模型
        thinking: "off",                  // 默认 thinking 级别
        runTimeoutSeconds: 900,            // 默认超时
        allowAgents: ["*"],                // 允许的目标 agent id
        requireAgentId: false,             // 是否强制指定 agentId
        archiveAfterMinutes: 60,          // 自动 archive 时间
      },
    },
  },
}
```

---

## 限制

- Sub-agent announce 是 **best-effort**。Gateway 重启时 pending announce 工作丢失。
- 最大嵌套深度是 5（`maxSpawnDepth` 范围: 1–5）。Depth 2 推荐大多数用例。
- `maxChildrenPerAgent` 限制每 session 最大活跃子数（默认 `5`，范围 `1–20`）。
- Sub-agent context 仅注入 `AGENTS.md` + `TOOLS.md`（无 `SOUL.md`, `IDENTITY.md`, `USER.md`, `HEARTBEAT.md`, `BOOTSTRAP.md`）。

---

## 相关文档

- [ACP agents](/tools/acp-agents)
- [Agent send](/tools/agent-send)
- [Background tasks](/automation/tasks)
- [Multi-agent sandbox tools](/tools/multi-agent-sandbox-tools)
- [Skills](/tools/skills)
