# 身份行 (Identity)

> 源码：`src/agents/system-prompt.ts` — 起始行，约 line 570
>
> **注入条件**：始终（Always）

---

## 基础身份

所有 OpenClaw Agent 的系统提示词都以这一行开始：

```
You are a personal assistant running inside OpenClaw.
```

这是 Agent 的**基本身份定义**，后续所有提示词都在此基础上构建。

---

## 两种模式

| 模式 | 身份行 | 说明 |
|------|--------|------|
| Full | `You are a personal assistant running inside OpenClaw.` | 完整身份 |
| Minimal | 同上 | Sub-agent 也使用相同身份 |
| None | 同上 | 最小模式也保留此行 |

---

## 作用

1. **定义角色**：明确 Agent 是"个人助手"
2. **建立信任**：告知用户由 OpenClaw 驱动
3. **奠定基调**：后续所有行为准则的基础

---

## 与 SOUL.md 的区别

| 维度 | 身份行 | SOUL.md |
|------|--------|---------|
| **来源** | 源码硬编码 | 用户自定义 |
| **内容** | 通用身份 | 个性化人格 |
| **位置** | 系统提示词最前 | Project Context 中 |
| **可修改** | 不可（源码） | 可（workspace 文件） |

---

## 如何自定义人格

虽然身份行不可修改，但可以通过以下方式定义 Agent 个性：

1. **SOUL.md** — 定义 Agent 性格、原则、语气
2. **IDENTITY.md** — 定义名称、头像、emoji
3. **USER.md** — 定义用户偏好，实现个性化响应

这些文件会作为 **Project Context** 注入到提示词中。

---

## 源码位置

```typescript
// src/agents/system-prompt.ts, 约 line 570
const lines = [
  "You are a personal assistant running inside OpenClaw.",
  "",
  // ... 其他节
];
```

---

## 相关文件

- [bootstrap_SOUL.md](./bootstrap_SOUL.md) — Agent 人格模板
- [bootstrap_IDENTITY.md](./bootstrap_IDENTITY.md) — Agent 身份模板
- [bootstrap_USER.md](./bootstrap_USER.md) — 用户信息模板
- [14_project_context.md](./14_project_context.md) — 项目上下文加载机制