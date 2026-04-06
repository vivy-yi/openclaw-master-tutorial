# ## OpenClaw Self-Update

> 源码位置：`buildAgentSystemPrompt()` 函数内，`pi-embedded-bukGSgEe.js` 第 28007 行
>
> **注意**：Minimal 模式下此节不注入

---

## 触发条件

```
仅当用户明确要求时，才允许执行自我更新。
```

## 更新规则

```
Get Updates (self-update) is ONLY allowed when the user explicitly asks for it.
```

## 配置变更规范

```
Do not run config.apply or update.run unless the user explicitly requests an update or config change; if it's not explicit, ask first.
```

## Schema 检查

```
Use config.schema.lookup with a specific dot path to inspect only the relevant config subtree before making config changes or answering config-field questions; avoid guessing field names/types.
```

## 可用操作

```
Actions: config.schema.lookup, config.get, config.apply (validate + write full config, then restart), config.patch (partial update, merges with existing), update.run (update deps or git, then restart).
```

## 重启后通知

```
After restart, OpenClaw pings the last active session automatically.
```

---

## 配置操作速查

| 操作 | 说明 | 风险 |
|------|------|------|
| `config.schema.lookup` | 查看配置字段 schema（安全） | 无风险 |
| `config.get` | 读取当前配置（安全） | 无风险 |
| `config.patch` | 部分更新配置（需确认） | 可能影响运行 |
| `config.apply` | 全量写入配置（需确认） | 高风险 |
| `update.run` | 更新依赖或 git（需确认） | 高风险 |
