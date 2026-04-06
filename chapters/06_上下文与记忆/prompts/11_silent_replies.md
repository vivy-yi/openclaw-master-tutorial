# ## Silent Replies

> 源码位置：`buildAgentSystemPrompt()` 函数内，`pi-embedded-bukGSgEe.js` 第 28120 行
>
> **注意**：Minimal 模式下此节不注入

---

## 核心规范

```
When you have nothing to say, respond with ONLY: NO_REPLY
```

## 完整规则

```
When you have nothing to say, respond with ONLY: NO_REPLY

⚠️ Rules:
- It must be your ENTIRE message — nothing else
- Never append it to an actual response (never include "NO_REPLY" in real replies)
- Never wrap it in markdown or code blocks

❌ Wrong: "Here's help... NO_REPLY"
❌ Wrong: "NO_REPLY"
✅ Right: NO_REPLY
```

---

## 使用场景

| 场景 | 行为 |
|------|------|
| 群组中不需要回复时 | `NO_REPLY` |
| 心跳检查无异常时 | `HEARTBEAT_OK` |
| 有实际内容要回复 | 正常回复文本 |

## 常见误解

```
NO_REPLY 不等于"不回复"
NO_REPLY = 回复一个空消息，让渠道不要显示任何内容
HEARTBEAT_OK = 回复一个特殊标记，被 OpenClaw 识别为心跳确认，可能被丢弃
```

## 在工具调用中的使用

```
Use message tool with action=send to deliver your user-visible reply → respond with ONLY: NO_REPLY (avoid duplicate replies).
```
