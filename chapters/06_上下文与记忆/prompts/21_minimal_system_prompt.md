# 精简 System Prompt（Minimal 模式）

> 源码位置：`buildAgentSystemPrompt()`，`pi-embedded-bukGSgEe.js`
>
> 适用：Sub-agent（派生子 Agent 时）
>
> **设计原则**：Sub-agent 保持上下文精简，仅注入运行所必需的节。

---

## Minimal 模式 vs Full 模式

Minimal 模式下，**以下节被省略**：

| 被省略的节 | 原因 |
|-----------|------|
| Skills | 避免 Sub-agent 自行调用 Skill，避免循环 |
| Memory Recall | 不加载 MEMORY.md，避免记忆泄漏 |
| Self-Update | 不允许 Sub-agent 修改系统 |
| Model Aliases | 由父 Agent 控制模型选择 |
| Reply Tags | 不需要原生回复能力 |
| Messaging | Sub-agent 不直接发送消息 |
| Silent Replies | 不需要静默回复 |
| Heartbeats | Sub-agent 不处理心跳 |
| Reactions | 不需要社交反应 |
| Reasoning Format | 可选，由父 Agent 控制 |
| Project Context | 不加载 Workspace 文件 |
| Documentation | 不需要文档路径 |
| Authorized Senders | 由 Gateway 统一处理 |
| Current Date & Time | 可选注入 |

## Minimal 模式保留的节

```
You are a personal assistant running inside OpenClaw.

## Tooling
<tools injected>

TOOLS.md does not control tool availability; it is user guidance for how to use external tools.

## Safety
You have no independent goals...
Prioritize safety and human oversight...
Do not manipulate or persuade anyone...

## Runtime
Runtime: agent=<agentId> | host=<host> | os=<os> | node=<node> | model=<model> | channel=<channel> | thinking=<level>
Reasoning: <reasoningLevel> (hidden unless on/stream). Toggle /reasoning.

## Sandbox
<sandboxInfo if sandboxed>
```

## Sub-agent Workspace 注入

Sub-agent 只注入以下 Workspace 文件（**不是全部**）：

```
AGENTS.md   ← 操作指令 + 记忆
TOOLS.md    ← 用户维护的工具说明
```

**不注入**：
```
SOUL.md     ← Persona（由父 Agent 决定）
IDENTITY.md ← 名称/emoji
USER.md     ← 用户信息（由父 Agent 提供）
MEMORY.md   ← 主记忆（在父 session 中）
HEARTBEAT.md ← 心跳配置（在父 session 中）
BOOTSTRAP.md ← 首次运行引导
```

## 为什么这样设计

```
Full Agent（父）
  ↓ sessions_spawn
Minimal Agent（子）→ 只读 AGENTS.md + TOOLS.md
                        ↓
                    执行任务 → 返回结果给父 Agent
                        ↓
                    父 Agent 整合后回复用户
```

目的：
1. **减少 token 消耗**：不注入不需要的上下文
2. **防止循环**：Sub-agent 不调用 Skills，避免递归
3. **安全隔离**：Sub-agent 不加载用户敏感信息
4. **角色清晰**：Sub-agent 是执行者，不是对话者
