# ## Group Chat Context / ## Subagent Context

> 源码：`src/agents/system-prompt.ts`，约 line 944-950
>
> **注入条件**：`extraSystemPrompt` 参数存在时
>
> **注意**：根据 `promptMode` 决定显示哪个标题

---

## 两种模式

| 模式 | 标题 | 说明 |
|------|------|------|
| Full | `## Group Chat Context` | 主 Agent 在群组中的上下文 |
| Minimal | `## Subagent Context` | Sub-agent 的任务上下文 |

---

## Group Chat Context（Full 模式）

当主 Agent 在**群组对话**中运行时，会收到额外上下文：

```
## Group Chat Context

<extraSystemPrompt 内容>
```

### 典型内容

- 群组基本信息（群名称、成员列表）
- @提及历史
- 群组规则
- 历史消息摘要

### 触发条件

```typescript
if (promptMode === "full" && extraSystemPrompt) {
  lines.push("## Group Chat Context", extraSystemPrompt, "");
}
```

---

## Subagent Context（Minimal 模式）

当 Sub-agent 执行任务时，收到精简的上下文：

```
## Subagent Context

<extraSystemPrompt 内容>
```

### 典型内容

- 父 Agent 分配的任务描述
- 任务目标和完成标准
- 约束条件和限制
- 预期输出格式

### 触发条件

```typescript
if (promptMode === "minimal" && extraSystemPrompt) {
  lines.push("## Subagent Context", extraSystemPrompt, "");
}
```

---

## extraSystemPrompt 参数

`extraSystemPrompt` 是 `buildAgentSystemPrompt()` 的关键参数之一：

```typescript
export function buildAgentSystemPrompt(params: {
  // ...
  extraSystemPrompt?: string;  // 额外系统提示
  // ...
})
```

### 来源

| 来源 | 场景 |
|------|------|
| Gateway | 群组对话时自动填充 |
| sessions_spawn | 父 Agent spawn 子 Agent 时传入 |
| cron job | 定时任务上下文 |

---

## 消息路由与上下文

### 群组中如何判断谁在说话？

通过 `authorized_senders` 识别发送者身份，结合 `runtimeInfo` 中的 channel 信息。

```
## Authorized Senders
Owner numbers: 1234567890, 0987654321
```

### Sub-agent 如何知道任务背景？

父 Agent 在 spawn 时通过 `extraSystemPrompt` 传递关键上下文：

```typescript
sessions_spawn({
  task: "分析用户持仓数据并提供税务优化建议",
  message: `你的任务是：分析用户的投资组合，识别潜在的税务优化机会。
  
  背景信息：
  - 用户主要持有 A 股和港股
  - 年初至今有频繁交易
  - 最近一次交易发生在 3 天前
  
  输出要求：
  - 列出前 5 个税务优化建议
  - 每个建议附带简要说明和预期节税金额`
});
```

---

## 与 Bootstrap 的区别

| 维度 | Group/Subagent Context | Bootstrap |
|------|----------------------|-----------|
| **来源** | 运行时参数 | workspace 文件 |
| **时机** | 每次会话 | 首次创建 workspace |
| **内容** | 动态任务上下文 | 静态人格/规范 |
| **触发** | extraSystemPrompt 存在 | bootstrap mode 触发 |

---

## 典型使用场景

### 场景 1：Discord 线程

```typescript
// 主 Agent 在 Discord 线程中
promptMode: "full",
extraSystemPrompt: "This is a thread in the OpenClaw Dev channel. 3 members online. Recent topics: system prompt debugging."
```

### 场景 2：Telegram 群组

```typescript
promptMode: "full",
extraSystemPrompt: "Group: OpenClaw Users (1234 members). Bot added by @admin. Common commands: /help, /status"
```

### 场景 3：Sub-agent 任务分配

```typescript
// 父 Agent spawn 子 Agent
promptMode: "minimal",
extraSystemPrompt: "Analyze the user's portfolio data and provide tax optimization suggestions.\n\nConstraints:\n- Use only publicly available info\n- Output in Chinese\n- Maximum 5 recommendations"
```

### 场景 4：多 Agent 协作

```typescript
// mo-finance 调用 mo-law
promptMode: "minimal",
extraSystemPrompt: "你需要审查以下投资决策的合规性：\n\n决策内容：...\n适用法规：..."
```

---

## 注入位置

在提示词构建顺序中，此节位于：

```
...
21. ## Silent Replies
22. ## Subagent Context / ## Group Chat Context  ← 位置
23. ## Heartbeats
24. ## Runtime
...
```

---

## 相关文件

- [29_minimal_system_prompt.md](./29_minimal_system_prompt.md) — Minimal 模式提示词
- [28_full_system_prompt.md](./28_full_system_prompt.md) — Full 模式提示词
- [bootstrap_SOUL.md](./bootstrap_SOUL.md) — Agent 人格定义
- [13_runtime.md](./13_runtime.md) — Runtime 运行时信息
- [25_authorized_senders.md](./25_authorized_senders.md) — 授权发送者