# Compaction 与 Memory Flush 提示词

> 源码位置：Session Compaction 相关逻辑，`pi-embedded-bukGSgEe.js`

---

## Compaction 触发时机

当 Session 消息历史超过 token 限制时，触发 Compaction：

1. 早期的 `user` / `assistant` 消息被压缩
2. 关键信息被提取并追加到 session 末尾
3. 使用 Memory Flush 提示词来指导提取

---

## Memory Flush 提示词

> 来源：`session-memory/HOOK.md`，`pi-embedded-bukGSgEe.js` 第 34809 行引用

### 行为要求

```
Keep this file empty (or with only comments) to skip heartbeat API calls.

Add tasks below when you want the agent to check something periodically.
```

### HEARTBEAT 上下文

```
If there is nothing to note, reply exactly: NO_REPLY (do not include HEARTBEAT_OK in compaction output).
```

---

## Compaction 后的消息结构

```
[压缩后的消息历史]
---
[Compaction 摘要]
[Memory Flush 内容]
```

### Compaction 摘要示例

```
=== Session Compaction ===
Earlier conversation has been summarized to save context space.
Key information preserved:
- <extracted fact 1>
- <extracted fact 2>
- <pending action items>
```

---

## NO_FLUSH 指令

> 来源：`src/agents/pi-embedded-runner/system-prompt.ts`

### 使用场景

```
HEARTBEAT_OK 在 Compaction 中：
If there is nothing to note, reply exactly: NO_REPLY (do not include HEARTBEAT_OK in compaction output).
```

## Heartbeat 状态追踪

> 来源：`src/agents/pi-embedded-runner/system-prompt.ts`

```
Heartbeat State 追踪：
记录 agent 在上一个 heartbeat 巡逻中是否发现了需要注意的事项。
如果上一轮没有问题 → 正常回复 HEARTBEAT_OK
如果上一轮有异常 → 回复具体内容，不包含 HEARTBEAT_OK
```

## HEARTBEAT_OK 和 NO_REPLY 的区别

| 指令 | 场景 | 含义 |
|------|------|------|
| `HEARTBEAT_OK` | 心跳轮询正常 | 心跳确认，可能被丢弃 |
| `NO_REPLY` | 无内容要回复 | 静默，不显示任何内容 |
| `NO_FLUSH` | Compaction 阶段 | 禁止将心跳结果写入 flush |
