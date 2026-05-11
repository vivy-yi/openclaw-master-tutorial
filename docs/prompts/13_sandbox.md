# ## Sandbox

> 源码：`src/agents/system-prompt.ts`，约 line 784
>
> **注入条件**：`sandboxInfo?.enabled === true`

---

## 什么是沙箱

当 Agent 运行在**沙箱环境**中时，工具会在 Docker 容器内执行，而非直接在本机运行。这提供了额外的安全隔离。

---

## 沙箱提示内容

```
You are running in a sandboxed runtime (tools execute in Docker).
Some tools may be unavailable due to sandbox policy.
Sub-agents stay sandboxed (no elevated/host access).
Need outside-sandbox read/write? Don't spawn; ask first.
```

---

## 关键规则

| 规则 | 说明 |
|------|------|
| 工具在 Docker 中执行 | 部分工具可能因沙箱策略不可用 |
| Sub-agent 保持沙箱隔离 | 无法获得 elevated/host 访问权限 |
| 读取沙箱外文件需审批 | 需要先询问用户，不可自行尝试 |
| ACP harness spawns 被阻止 | `runtime: "acp"` 不可用，应使用 `runtime: "subagent"` |

---

## 目录信息

沙箱模式下会暴露以下路径信息：

| 字段 | 说明 |
|------|------|
| `containerWorkspaceDir` | 沙箱容器内的工作目录 |
| `workspaceDir` | 宿主机挂载源（仅文件工具桥接用） |
| `workspaceAccess` | Agent 对工作区的访问级别 |

---

## 路径解析

### 正常模式 vs 沙箱模式

| 操作 | 正常模式 | 沙箱模式 |
|------|---------|---------|
| 文件工具（read/write/edit） | 使用 host workspace | 使用 host workspace 路径 |
| exec/bash | 使用 workspace | 使用 sandbox container 路径 |

### 推荐做法

使用**相对路径**，这样文件工具和 exec 都能正确处理：

```
# 正确
read memory/today.md
exec ls .

# 错误
read /Users/host/workspace/xxx  # 绝对路径在 exec 中无效
```

---

## 与 Workspace 的关系

Sandbox 是 Workspace 的扩展，共享工作区概念但有额外限制：

```
## Workspace
Your working directory is: /sandbox/container/workdir

## Sandbox
You are running in a sandboxed runtime (tools execute in Docker).
```

---

## 源码参考

```typescript
// 约 line 784
params.sandboxInfo?.enabled ? "## Sandbox" : "",
params.sandboxInfo?.enabled
  ? [
      "You are running in a sandboxed runtime (tools execute in Docker).",
      "Some tools may be unavailable due to sandbox policy.",
      "Sub-agents stay sandboxed (no elevated/host access).",
      "Need outside-sandbox read/write? Don't spawn; ask first.",
      // ...
    ]
  : "",
```

---

## 相关文件

- [12_workspace.md](./12_workspace.md) — 工作区目录
- [21_runtime.md](./21_runtime.md) — 运行时信息
- [29_minimal_system_prompt.md](./29_minimal_system_prompt.md) — Minimal 模式