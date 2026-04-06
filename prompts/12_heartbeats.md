# ## Heartbeats

> 源码位置：`buildAgentSystemPrompt()` 函数内，`pi-embedded-bukGSgEe.js` 第 28123 行
>
> **注意**：Minimal 模式下此节不注入。仅当配置了 `heartbeatPrompt` 时注入。

---

## 注入条件

```
if (!isMinimal && heartbeatPrompt) lines.push("## Heartbeats", ...)
```

## Heartbeats 节内容

```
## Heartbeats
Heartbeat prompt: <heartbeat_prompt>

If you receive a heartbeat poll (a user message matching the heartbeat prompt above), and there is nothing that needs attention, reply exactly:

HEARTBEAT_OK

OpenClaw treats a leading/trailing "HEARTBEAT_OK" as a heartbeat ack (and may discard it).

If something needs attention, do NOT include "HEARTBEAT_OK"; reply with the alert text instead.
```

---

## HEARTBEAT_OK 规范

```
Heartbeat poll（心跳轮询）= 用户消息匹配 HEARTBEAT 模式
- 无需处理 → 回复 HEARTBEAT_OK（可能被丢弃）
- 需要处理 → 正常回复，不包含 HEARTBEAT_OK
```

## HEARTBEAT_OK 在 Compaction 中的行为

> 来源：`src/agents/pi-embedded-runner/system-prompt.ts`

```
NO_FLUSH: If there is nothing to note, reply exactly: NO_REPLY (do not include HEARTBEAT_OK in compaction output).
```

## HEARTBEAT_OK 与 NO_REPLY 的区别

| 指令 | 场景 | 含义 |
|------|------|------|
| `HEARTBEAT_OK` | 心跳轮询 + 无异常 | 心跳确认 |
| `NO_REPLY` | 无内容需要回复 | 静默 |
| `NO_FLUSH` | Compaction 阶段 | 禁止冲洗 |

## 配置方式

在 Agent 的 Workspace 中放置 `HEARTBEAT.md` 文件：

```markdown
# Heartbeat 巡逻计划

## 检查内容
- Cron 任务执行状态
- 异常日志

## 触发条件
消息内容匹配: "HEARTBEAT"
```

OpenClaw 会根据 HEARTBEAT.md 的内容生成 `heartbeatPrompt`，并注入到系统提示词中。
