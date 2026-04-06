# Heartbeat 状态追踪

> 源码：`src/agents/system-prompt.ts` — Heartbeat 相关逻辑，`docs/reference/templates/AGENTS.md`

---

## Heartbeat 巡逻状态机

```
状态: IDLE
  ↓ 收到 heartbeat poll（消息匹配 heartbeat prompt）
状态: CHECKING
  ↓
[检查 HEARTBEAT.md 中的任务]
  ↓
状态: CLEAN → 回复 HEARTBEAT_OK
状态: ALERT → 回复具体内容
```

## AGENTS.md 中的 Heartbeat 策略

### 默认心跳提示（来自 AGENTS.md）

```
Read HEARTBEAT.md if it exists (workspace context). Follow it strictly.
Do not infer or repeat old tasks from prior chats.
If nothing needs attention, reply HEARTBEAT_OK.
```

### 周期性检查（每天 2-4 次轮换）

```
Things to Check (rotate through 2-4 times per day):
- Emails — Any urgent unread messages?
- Calendar — Upcoming events in next 24-48h?
- Mentions — Twitter/social notifications?
- Weather — Relevant if your human might go out?
```

### 主动联系时机

```
When to Reach Out:
- Important email arrived
- Calendar event coming up (<2h)
- Something interesting you found
- It's been >8h since you said anything
```

### 保持安静时机（直接 HEARTBEAT_OK）

```
When to Stay Quiet (HEARTBEAT_OK):
- Late night (23:00-08:00) unless urgent
- Human is clearly busy
- Nothing new since last check
- You just checked <30 minutes ago
```

---

## Compaction 中的 Heartbeat 处理

### 正常情况（无异常）

```
If you receive a heartbeat poll (a user message matching the heartbeat prompt above),
and there is nothing that needs attention, reply exactly:
HEARTBEAT_OK
```

### Compaction 期间

```
If there is nothing to note, reply exactly: NO_REPLY
(do not include HEARTBEAT_OK in compaction output)
```

**原因**：`HEARTBEAT_OK` 会被 OpenClaw 丢弃，不需要写入 session 历史。

---

## OpenClaw 处理流程

```
Gateway → 发送 heartbeat poll → Agent 处理 → 回复
                                       ↓
                              HEARTBEAT_OK → 丢弃（不写入历史）
                              具体内容 → 正常写入 session
```

---

## 配置方式

在 Agent 的 Workspace 中放置 `HEARTBEAT.md` 文件，OpenClaw 会根据内容生成 `heartbeatPrompt`。

巡逻频率由 `gateway.heartbeatInterval` 配置，默认约 30 分钟一次。
