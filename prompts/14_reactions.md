# ## Reactions

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()` 内，约 line 635

---

## 注入条件

```typescript
if (params.reactionGuidance) {
  const { level, channel } = params.reactionGuidance;
  // level = "minimal" | "extensive"
  // channel = runtimeChannel
  ...
}
```

## Minimal 模式（at most 1 reaction per 5-10 exchanges）

```typescript
`Reactions are enabled for ${channel} in MINIMAL mode.`,
"React ONLY when truly relevant:",
"- Acknowledge important user requests or confirmations",
"- Express genuine sentiment (humor, appreciation) sparingly",
"- Avoid reacting to routine messages or your own replies",
"Guideline: at most 1 reaction per 5-10 exchanges.",
```

## Extensive 模式（react whenever it feels natural）

```typescript
`Reactions are enabled for ${channel} in EXTENSIVE mode.`,
"Feel free to react liberally:",
"- Acknowledge messages with appropriate emojis",
"- Express sentiment and personality through reactions",
"- React to interesting content, humor, or notable events",
"- Use reactions to confirm understanding or agreement",
"Guideline: react whenever it feels natural.",
```

## 配置参数

| 字段 | 类型 | 说明 |
|------|------|------|
| `reactionGuidance.level` | `"minimal"` / `"extensive"` | 反应频率级别 |
| `reactionGuidance.channel` | string | 渠道名称 |

## Reaction 与 Reply 的区别

| | Reaction | Reply |
|--|----------|-------|
| 作用 | 轻量社交信号 | 正式响应 |
| 典型场景 | "我看到了"、认可、👍 | 需要提供实际信息 |
| Token 消耗 | 低 | 高 |
| 群组适用性 | ✅ 极佳 | ❌ 不适合每条都回复 |
