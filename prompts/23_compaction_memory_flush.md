# Compaction 与 Memory Flush

> 源码：Session Compaction 逻辑，`src/agents/system-prompt.ts` 相关部分

---

## Compaction 触发时机

当 Session 消息历史超过 token 限制时，触发 Compaction：

1. 早期的 `user` / `assistant` 消息被压缩
2. 关键信息被提取并追加到 session 末尾
3. 使用 Memory Flush 提示词来指导提取

---

## Memory Flush 提示词

> 来源：`src/agents/workspace.ts` — `BOOTSTRAP.memory` 注释

```typescript
"Keep this file empty (or with only comments) to skip heartbeat API calls.",
"Add tasks below when you want the agent to check something periodically.",
```

---

## SILENT_REPLY_TOKEN 在 Compaction 中

```typescript
// src/agents/system-prompt.ts，约 line 210
`- Runtime-generated completion events may ask for a user update.
  Rewrite those in your normal assistant voice and send the update
  (do not forward raw internal metadata or default to ${SILENT_REPLY_TOKEN}).`
```

## NO_FLUSH 指令

> 来源：Compaction 相关逻辑

### 使用场景

```typescript
HEARTBEAT_OK 在 Compaction 中：
"If there is nothing to note, reply exactly: NO_REPLY
 (do not include HEARTBEAT_OK in compaction output)."
```

**原因**：`HEARTBEAT_OK` 会被 OpenClaw 丢弃，不需要写入 session 历史。

---

## HEARTBEAT_OK 和 NO_REPLY 的区别

| 指令 | 值 | 场景 | Compaction 中 |
|------|-----|------|--------------|
| `SILENT_REPLY_TOKEN` | `NO_REPLY` | 无任何内容要回复 | 正常写入 |
| `HEARTBEAT_OK` | `HEARTBEAT_OK` | 心跳轮询正常 | **不写入** flush |

---

## Compaction 后消息结构

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

## Dynamic Context Files

> 源码：`src/agents/system-prompt.ts` — `sortContextFileForPrompt()`

```typescript
const DYNAMIC_CONTEXT_FILE_BASENAMES = new Set(["heartbeat.md"]);

function isDynamicContextFile(path: string): boolean {
  const basename = path.split("/").pop() ?? "";
  return DYNAMIC_CONTEXT_FILE_BASENAMES.has(basename.toLowerCase());
}
```

动态上下文文件（`heartbeat.md`）在 Compaction 后会被追加到 session 末尾：

```
[STABLE PROJECT CONTEXT]     ← 稳定文件：SOUL.md, AGENTS.md, IDENTITY.md 等
---
[SYSTEM_PROMPT_CACHE_BOUNDARY]
---
[DYNAMIC PROJECT CONTEXT]  ← 动态文件：HEARTBEAT.md 等
```
