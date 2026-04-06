# ## Model Aliases

> 源码位置：`buildAgentSystemPrompt()` 函数内，`pi-embedded-bukGSgEe.js` 第 28016 行
>
> **注意**：Minimal 模式下此节不注入

---

## 说明

```
Prefer aliases when specifying model overrides; full provider/model is also accepted.
```

## 当前可用别名

| 别名 | 对应模型 |
|------|---------|
| `minimax-m2.1` | minimax-portal/MiniMax-M2.1 |
| `minimax-m2.1-lightning` | minimax-portal/MiniMax-M2.1-lightning |
| `minimax-m2.7` | minimax-portal/MiniMax-M2.7 |
| `minimax-m2.7-highspeed` | minimax-portal/MiniMax-M2.7-highspeed |

## 使用方式

```
/model minimax-m2.7
# 或完整写法：
/model minimax-portal/MiniMax-M2.7
```

## 模型选择规则

- 使用别名时优先使用别名（更简洁）
- 使用完整 provider/model 格式时直接透传到后端
- 子 Agent 可以通过 `sessions_spawn` 时指定 `model` 参数来覆盖模型
