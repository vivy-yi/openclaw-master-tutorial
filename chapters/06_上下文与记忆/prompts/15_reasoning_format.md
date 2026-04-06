# ## Reasoning Format

> 源码位置：`buildAgentSystemPrompt()`，`pi-embedded-bukGSgEe.js` 第 28080 行
>
> **注意**：Minimal 模式下此节不注入。仅当配置了 `reasoningHint` 时注入。

---

## 注入内容（动态）

```
## Reasoning Format
<reasoningHint>
```

## reasoningHint 来源

`reasoningHint` 由 Agent 配置中的 `reasoningTagHint` 字段提供。

## 使用说明

```
Reasoning: <reasoningLevel> (hidden unless on/stream). Toggle /reasoning; /status shows Reasoning when enabled.
```

## 推理模式说明

| 模式 | 状态 | 说明 |
|------|------|------|
| `off`（默认） | 隐藏 | 推理过程不对用户可见 |
| `on` | 可见 | 推理过程对用户可见 |
| `stream` | 流式可见 | 推理过程流式输出 |

## 切换命令

| 命令 | 作用 |
|------|------|
| `/reasoning` | 切换推理模式 |
| `/status` | 显示当前推理状态 |

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
