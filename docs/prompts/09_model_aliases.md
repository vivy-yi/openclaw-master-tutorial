# ## Model Aliases

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，约 line 560
>
> **注意**：Minimal 模式下此节**不注入**（`!isMinimal`）

---

## 注入条件

```typescript
modelAliasLines.length > 0 && !isMinimal ? "## Model Aliases" : "",
modelAliasLines.length > 0 && !isMinimal
  ? "Prefer aliases when specifying model overrides; full provider/model is also accepted."
  : "",
modelAliasLines.length > 0 && !isMinimal ? modelAliasLines.join("\n") : "",
```

---

## Model Alias Lines

`modelAliasLines` 由 `agents.defaults.modelAliases` 配置注入，格式为：

```json
{
  "agents": {
    "defaults": {
      "modelAliases": [
        "minimax-m2.1 → minimax-portal/MiniMax-M2.1",
        "minimax-m2.7 → minimax-portal/MiniMax-M2.7",
        "claude-3.5 → anthropic/Claude-Sonnet-4-20250514"
      ]
    }
  }
}
```

## 当前默认别名（从源码提取）

| 别名 | 对应模型 |
|------|---------|
| `minimax-m2.1` | minimax-portal/MiniMax-M2.1 |
| `minimax-m2.1-lightning` | minimax-portal/MiniMax-M2.1-lightning |
| `minimax-m2.7` | minimax-portal/MiniMax-M2.7 |
| `minimax-m2.7-highspeed` | minimax-portal/MiniMax-M2.7-highspeed |

## 使用方式

```
Prefer aliases when specifying model overrides; full provider/model is also accepted.
```

示例：
```
/model minimax-m2.7
# 或完整写法：
/model minimax-portal/MiniMax-M2.7
```

## 子 Agent 模型覆盖

在 `sessions_spawn` 时指定 `model` 参数：

```json
{
  "model": "minimax-m2.7",
  "task": "执行知识蒸馏..."
}
```
