# ## Reasoning Format

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，约 line 380
>
> **注意**：Minimal 模式下此节**可能被注入**（取决于 `reasoningHint` 配置）

---

## 注入内容（动态）

```
## Reasoning Format
<reasoningHint>
```

## reasoningHint 来源

`reasoningHint` 由 Provider 的 `reasoningTagHint` 配置提供，非 OpenClaw 核心配置。

## 注入逻辑

```typescript
if (reasoningHint) {
  lines.push("## Reasoning Format", reasoningHint, "");
}
```

---

## 推理格式说明

```
Reasoning: <reasoningLevel> (hidden unless on/stream). Toggle /reasoning; /status shows Reasoning when enabled.
```

## reasoningLevel 选项

| 值 | 说明 |
|----|------|
| `off`（默认） | 隐藏推理过程 |
| `on` | 推理过程对用户可见 |
| `stream` | 推理过程流式输出 |

## 切换命令

| 命令 | 作用 |
|------|------|
| `/reasoning` | 切换推理模式 |
| `/status` | 显示当前推理状态 |

---

## 推理格式要求

当推理可见时，内部推理必须放在 `<think>...</think>` 标签内：

```
<think>
内部推理内容
</think>

<final>
最终回复
</final>
```

- 所有内部推理必须在 `<think>...</think>` 内
- 最终回复必须在 `<final>...</final>` 内
- 外部不显示任何 `<think>` 内容
