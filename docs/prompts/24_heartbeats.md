# ## Heartbeats

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，约 line 749

---

## 注入条件

```typescript
if (!isMinimal && heartbeatPrompt) {
  lines.push(
    "## Heartbeats",
    `Heartbeat prompt: ${heartbeatPrompt}`,
    "If you receive a heartbeat poll (a user message matching the heartbeat prompt above),",
    "and there is nothing that needs attention, reply exactly:",
    "HEARTBEAT_OK",
    'OpenClaw treats a leading/trailing "HEARTBEAT_OK" as a heartbeat ack (and may discard it).',
    'If something needs attention, do NOT include "HEARTBEAT_OK"; reply with the alert text instead.',
  );
}
```

## Minimal 模式

Minimal 模式（sub-agent）**不注入此节**。

---

## AGENTS.md 中的 Heartbeat vs Cron 对比

> 来源：`docs/reference/templates/AGENTS.md`（由官方模板提供）

### 何时用 Heartbeat

```
- Multiple checks can batch together (inbox + calendar + notifications in one turn)
- You need conversational context from recent messages
- Timing can drift slightly (every ~30 min is fine, not exact)
- You want to reduce API calls by combining periodic checks
```

### 何时用 Cron

```
- Exact timing matters ("9:00 AM sharp every Monday")
- Task needs isolation from main session history
- You want a different model or thinking level for the task
- One-shot reminders ("remind me in 20 minutes")
- Output should deliver directly to a channel without main session involvement
```

### 建议

```
Batch similar periodic checks into HEARTBEAT.md instead of creating multiple cron jobs.
Use cron for precise schedules and standalone tasks.
```

---

## HEARTBEAT.md 模板

> 源码：`docs/reference/templates/HEARTBEAT.md`

```markdown
# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.
```

---

## AGENTS.md 中的 Heartbeat 检查清单

> 来源：`docs/reference/templates/AGENTS.md`

### 周期性检查项（每天 2-4 次轮换）

```
- Emails — Any urgent unread messages?
- Calendar — Upcoming events in next 24-48h?
- Mentions — Twitter/social notifications?
- Weather — Relevant if your human might go out?
```

### 主动联系时机

```
- Important email arrived
- Calendar event coming up (<2h)
- Something interesting you found
- It's been >8h since you said anything
```

### 保持安静时机（直接 HEARTBEAT_OK）

```
- Late night (23:00-08:00) unless urgent
- Human is clearly busy
- Nothing new since last check
- You just checked <30 minutes ago
```

---

## 状态追踪

Agent 在每次心跳巡逻后记录状态：

```json
// memory/heartbeat-state.json
{
  "lastChecks": {
    "email": 1703275200,
    "calendar": 1703260800,
    "weather": null
  }
}
```
