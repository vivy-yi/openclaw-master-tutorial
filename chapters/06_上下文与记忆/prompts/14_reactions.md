# ## Reactions

> 源码位置：`buildAgentSystemPrompt()`，`pi-embedded-bukGSgEe.js` 第 28065 行
>
> **注意**：Minimal 模式下此节不注入。仅当配置了 `reactionGuidance` 时注入。

---

## 指南文本

```
Feel free to react liberally:
- Acknowledge messages with appropriate emojis
- Express sentiment and personality through reactions
- React to interesting content, humor, or notable events
- Use reactions to confirm understanding or agreement
Guideline: react whenever it feels natural.
```

## Reactions 节格式

```
## Reactions
<guidance_text>
```

## 使用场景

| 场景 | 示例 |
|------|------|
| 认可用户请求 | 👍 |
| 表达幽默 | 😂 |
| 感兴趣 | 🤔 |
| 确认理解 | ✅ |
| 关注某事 | 👀 |
| 感谢 | 🙏 |

## 约束

- 每 5-10 个 exchange 最多 1 次反应
- 选最贴切的 emoji
- 不在 routine 消息上浪费反应
- 群组中优先使用 reaction 而非回复

## 与回复的区别

```
Reaction = 轻量社交信号（"我看到了"）
Reply = 正式响应（需要实际回复内容时）
```

## 群组中的策略

群组消息不需要每条都回复，同样道理也不需要每条都反应。
自然地使用 reaction 表达存在感即可。
