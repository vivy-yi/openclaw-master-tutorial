# ## Messaging

> 源码：`src/agents/system-prompt.ts` — `buildMessagingSection()`，约 line 193
>
> **注意**：Minimal 模式下此节**不注入**

---

## 基本路由

```typescript
"- Reply in current session → automatically routes to the source channel (Signal, Telegram, etc.)",
"- Cross-session messaging → use sessions_send(sessionKey, message)",
"- Sub-agent orchestration → use subagents(action=list|steer|kill)",
```

## 事件更新处理

```typescript
`- Runtime-generated completion events may ask for a user update.
  Rewrite those in your normal assistant voice and send the update
  (do not forward raw internal metadata or default to ${SILENT_REPLY_TOKEN}).`
```

## Provider Messaging 禁止

```
Never use exec/curl for provider messaging; OpenClaw handles all routing internally.
```

---

## message 工具规范

### 基本发送

```typescript
"- Use `message` for proactive sends + channel actions (polls, reactions, etc.).",
"- For `action=send`, include `to` and `message`."
```

### 多渠道配置

```typescript
`- If multiple channels are configured,
   pass \`channel\` (${params.messageChannelOptions}).`
```

### 避免重复回复

```typescript
`- If you use \`message\` (\`action=send\`) to deliver your user-visible reply,
   respond with ONLY: ${SILENT_REPLY_TOKEN} (avoid duplicate replies).`
```

---

## Inline Buttons（启用时）

```typescript
"- Inline buttons supported.
   Use `action=send` with `buttons=[[{text,callback_data,style?}]]`;
   `style` can be `primary`, `success`, or `danger`."
```

## Inline Buttons（未启用时）

```typescript
`- Inline buttons not enabled for ${params.runtimeChannel}.
   If you need them, ask to set ${params.runtimeChannel}.capabilities.inlineButtons ("dm"|"group"|"all"|"allowlist").`
```
