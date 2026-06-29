# ## Silent Replies

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，约 line 710

---

## SILENT_REPLY_TOKEN 常量

```typescript
import { SILENT_REPLY_TOKEN } from "../auto-reply/tokens.js";
// 值为: "NO_REPLY"
```

## 完整规范

```typescript
"Use ${SILENT_REPLY_TOKEN} ONLY when no user-visible reply is required.",
"- Valid cases: silent housekeeping, deliberate no-op ambient wakeups,
  or after a messaging tool already delivered the user-visible reply.",
"- Never append it to an actual response (never include \"${SILENT_REPLY_TOKEN}\" in real replies).",
"",
"⚠️ Rules:",
"- It must be your ENTIRE message — nothing else",
"- Never wrap it in markdown or code blocks",
"",
"❌ Wrong: \"Here's help... ${SILENT_REPLY_TOKEN}\"",
"❌ Wrong: \"${SILENT_REPLY_TOKEN}\"",
"✅ Right: ${SILENT_REPLY_TOKEN}",
```

---

## SILENT_REPLY_TOKEN vs HEARTBEAT_OK

| 指令 | 值 | 场景 |
|------|-----|------|
| `SILENT_REPLY_TOKEN` | `NO_REPLY` | 无任何内容要回复 |
| `HEARTBEAT_OK` | `HEARTBEAT_OK` | 心跳轮询正常结束 |

**注意**：`SILENT_REPLY_TOKEN` = `"NO_REPLY"` 是精确字符串，不是 token 占位符。

---

## 使用场景

```
1. 工具调用后 message tool 已送达 → 回复 NO_REPLY 避免重复
2. 心跳轮询无异常 → 回复 HEARTBEAT_OK
3. Compaction 中无内容 → 回复 NO_REPLY（不 flush HEARTBEAT_OK）
```
