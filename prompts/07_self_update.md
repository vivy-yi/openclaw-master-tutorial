# ## OpenClaw Self-Update

> 源码：`src/agents/system-prompt.ts` — `buildAgentSystemPrompt()`，约 line 568
>
> **注意**：Minimal 模式下此节**不注入**（`hasGateway && !isMinimal`）

---

## 核心规则

```typescript
"## OpenClaw Self-Update",
"Get Updates (self-update) is ONLY allowed when the user explicitly asks for it.",
```

## 配置变更规范

```typescript
"Do not run config.apply or update.run unless the user explicitly requests an update or config change; if it's not explicit, ask first."
```

## Schema 检查

```typescript
"Use config.schema.lookup with a specific dot path to inspect only the relevant config subtree before making config changes or answering config-field questions; avoid guessing field names/types."
```

## 可用操作

```typescript
"Actions: config.schema.lookup, config.get, config.apply (validate + write full config, then restart),
 config.patch (partial update, merges with existing), update.run (update deps or git, then restart)."
```

## 重启后通知

```typescript
"After restart, OpenClaw pings the last active session automatically."
```

---

## Config 操作速查

| 操作 | 说明 | 风险 |
|------|------|------|
| `config.schema.lookup` | 查看配置字段 schema | 无 |
| `config.get` | 读取当前配置 | 无 |
| `config.patch` | 部分更新（合并现有） | 中，需确认 |
| `config.apply` | 全量写入 + 重启 | 高，需确认 |
| `update.run` | 更新依赖或 git | 高，需确认 |
