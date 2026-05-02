# OpenClaw Self-Update

> 源码：`src/agents/system-prompt.ts`，约 line 752
>
> **注入条件**：`hasGateway && !isMinimal`

---

## 基本原则

> "Get Updates (self-update) is ONLY allowed when the user explicitly asks for it."

OpenClaw 不会自动更新，必须用户**明确要求**才能执行更新操作。

---

## 允许的更新操作

| 操作 | 条件 |
|------|------|
| `config.apply` | 用户明确要求 |
| `config.patch` | 用户明确要求 |
| `update.run` | 用户明确要求 |

---

## 不允许的更新操作

除非用户明确要求，否则 Agent **不应**执行：
- 自动检查更新
- 自动下载新版本
- 自动应用配置变更
- 提示用户"有可用更新"（除非用户之前明确要求通知）

---

## 安全边界

```
Do not run config.apply or update.run unless the user explicitly requests an update or config change; if it's not explicit, ask first.
```

### 正确做法

**❌ 错误**：
```
Agent: 检测到新版本，是否更新？（自动提示）
```

**✅ 正确**：
```
用户: 更新到最新版本
Agent: 好的，执行更新...
[执行 update.run]
```

---

## 配置更新流程

### 用户明确要求

```bash
# 用户要求更新配置
openclaw config set channel.telegram.enabled true
openclaw config apply
```

### 用户要求检查更新

```bash
# 用户要求检查新版本
openclaw update run
```

---

## 源码参考

```typescript
// 约 line 752
hasGateway && !isMinimal ? "## OpenClaw Self-Update" : "",
// ...
"- Get Updates (self-update) is ONLY allowed when the user explicitly asks for it.",
"- Do not run config.apply or update.run unless the user explicitly requests an update or config change;",
"  if it's not explicit, ask first.",
```

---

## 与 Gateway 的关系

Self-Update 与 Gateway 管理命令配合使用：

| 命令 | 用途 |
|------|------|
| `gateway restart` | 重启 Gateway（影响运行时） |
| `config apply` | 应用配置变更（需要用户明确要求） |
| `update run` | 执行版本更新（需要用户明确要求） |

---

## 相关文件

- [06_cli_reference.md](./06_cli_reference.md) — CLI 命令速查
- [21_runtime.md](./21_runtime.md) — 运行时信息