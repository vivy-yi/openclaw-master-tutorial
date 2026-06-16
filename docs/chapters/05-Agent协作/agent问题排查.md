# OpenClaw Agent 问题排查指南

> **版本**: v1.0  
> **创建时间**: 2026-06-15  
> **来源**: 墨客-深度调研报告 (GitHub Issues)  
> 🦉 教程大师出品

---

## 一、概述

本章节汇总 OpenClaw Agent 协作模块的常见问题及其解决方案。主要基于 GitHub Issues 和实际使用场景整理。

**涵盖范围**:
- Agent 行为异常
- Session 锁释放问题
- 工具调用空响应问题

---

## 二、空响应问题 — #93073

### 2.1 问题描述

| 字段 | 内容 |
|------|------|
| **Issue** | #93073 |
| **类型** | Bug Fix |
| **状态** | OPEN |
| **标题** | fix(agents): retry empty post-tool final turns |
| **作者** | fuller-stack-dev |

### 2.2 问题现象

`assistantTexts` 和 `payloadCount` 会聚合整个 attempt 的可见文本。如果模型在说 "checking something" 之后再调用工具，该 narration 会一直保持非空，导致现有的空响应恢复逻辑永远不会触发，最终用户在 channel 中看到 narration 之后就是沉默。

### 2.3 根因分析

- 模型在调用工具前的 narration 被保留
- 现有的空响应检测逻辑基于整个 attempt 的可见文本
- 当有 narration 时，空响应恢复不触发

### 2.4 解决方案

1. **基于 typed attempt facts 决策**（当前 attempt 工具活动、最新 assistant 消息、可见 assistant 内容、terminal 输出/交付状态、replay 安全性）
2. **对未分类的工具名处理**：embedded/Pi replay 元数据 fail closed（只允许无条件只读或幂等的工具保持 replay-safe）
3. **不解析 assistant prose**，不添加新的正则、provider 短语或 public API

### 2.5 成功标准

- `checking... → tool/search → empty final assistant` 轨迹会获得一次有界续接
- 可见最终答案、显式沉默、terminal media/delivery、异步工作、有副作用的 attempt 保持原有行为

### 2.6 临时规避方案

在对话中主动提供下一步指令，例如：
```
"请继续完成搜索并返回结果"
```

---

## 三、Session 锁释放问题 — #90065

### 3.1 问题描述

| 字段 | 内容 |
|------|------|
| **Issue** | #90065 |
| **类型** | Bug Fix |
| **状态** | OPEN |
| **标题** | fix(agents): bound abort-path session lock release; force-release on unsettled retained writes |
| **作者** | matin |

### 3.2 问题现象

Agent 在 abort-path 上的 session lock release 没有边界约束，可能在未解决的 retained writes 情况下导致资源泄漏或死锁。

### 3.3 解决方案

对 abort-path 的 session lock release 添加边界约束，在未解决的 retained writes 时强制释放。

### 3.4 识别信号

- Session 长时间无响应
- 资源使用率持续偏高
- 并发请求被阻塞

### 3.5 临时规避方案

```bash
# 强制释放锁
openclaw sessions unlock <session-id>

# 或重启 Gateway
openclaw gateway restart
```

---

## 四、runEmbeddedAgent 模型忽略问题 — #93419

### 4.1 问题描述

| 字段 | 内容 |
|------|------|
| **Issue** | [#93419](https://github.com/openclaw/openclaw/issues/93419) |
| **类型** | Bug（行为错误） |
| **状态** | ✅ **Closed**（已修复） |
| **影响标签** | `impact:auth-provider` |
| **Issue评级** | 🦞 **diamond lobster**（源码级最高质量） |
| **作者** | danielgerlag |

### 4.2 问题现象

`api.runtime.agent.runEmbeddedAgent(...)` **完全忽略**配置的默认模型（`agents.defaults.model`），硬编码使用 `openai/gpt-5.5`。即使在 Gateway 启动日志中正确显示了模型解析（`anthropic/claude-sonnet-4-6`），embedded agent 仍然使用错误的硬编码路径。

**Gateway 启动日志（正确）**：
```
[gateway] agent model: anthropic/claude-sonnet-4-6 (thinking=adaptive, fast=off)
```

**实际行为（错误）**：
```
openai/gpt-5.5  # 完全忽略配置
```

### 4.3 根因分析（源码级）

```typescript
// dist/embedded-agent-L9tQaO-.js:2286-2287
let provider = (params.provider ?? "openai").trim() || "openai";
let modelId  = (params.model    ?? "gpt-5.5").trim() || "gpt-5.5";
```

**关键矛盾**：
- SDK 文档声明：`runEmbeddedAgent` 使用与 channel-triggered replies 相同的 provider/model 解析
- 实际行为：硬编码 fallback `openai/gpt-5.5`，不走 `agents.defaults.model` 配置

### 4.4 识别信号

- 使用非 OpenAI 模型时，`runEmbeddedAgent` 调用报错 `No API key found for provider "openai"`
- Gateway 日志显示正确解析，但 embedded agent 使用了错误的模型
- 仅在使用 `runEmbeddedAgent` 时出现，channel-triggered replies 正常

### 4.5 解决方案

**✅ 正确做法**：将 canonical ref 拆分为 provider + bare model

```typescript
await api.runtime.agent.runEmbeddedAgent({
  provider: "anthropic",                        // ✅ 显式指定 provider
  model: "claude-sonnet-4-6",                   // ✅ bare model id（不含前缀）
  sessionId: "...",
  runId: crypto.randomUUID(),
  sessionFile: path.join(workspaceDir, "repro.jsonl"),
  workspaceDir,
  prompt: "summarize this",
  timeoutMs: api.runtime.agent.resolveAgentTimeoutMs({ cfg: api.config }),
});
```

**❌ 错误做法**：传 canonical ref（会被错误地 prepend `openai/`）

```typescript
await api.runtime.agent.runEmbeddedAgent({
  model: "anthropic/claude-sonnet-4-6",  // ❌ 变成 openai/anthropic/claude-sonnet-4-6
  // ...
});
```

### 4.6 验证步骤

```bash
# 检查 Gateway 配置
openclaw config get agents.defaults.model

# 查看 embedded agent 日志
openclaw logs --agent --last 50 | grep -i "model"
```

### 4.7 影响范围

- 所有使用 `runEmbeddedAgent` 的插件
- **仅影响非 OpenAI 配置的用户**（OpenAI 用户有 API key，所以 fallback 仍能工作）
- 影响所有版本的 OpenClaw（直到修复版本发布）

---

## 五、相关 Issues

| Issue | 标题 | 状态 | 优先级 |
|-------|------|------|--------|
| #93073 | fix(agents): retry empty post-tool final turns | OPEN | P1 |
| #90065 | fix(agents): bound abort-path session lock release | OPEN | P2 |
| #93419 | runEmbeddedAgent ignores agents.defaults.model | ✅ Closed | P1 |

---

## 六、排查命令

### 5.1 查看 Session 状态

```bash
# 列出所有活跃 Session
openclaw sessions list

# 查看特定 Session 详情
openclaw sessions show <session-id>
```

### 5.2 查看 Agent 日志

```bash
# 查看最近日志
openclaw logs --agent --last 50

# 实时日志
openclaw logs --agent --follow
```

### 5.3 健康检查

```bash
# 运行诊断
openclaw doctor
```

---

## 七、预防措施

1. **避免长时间-running 的 narration** — 明确指令分步执行
2. **合理设置超时** — 在配置中设置合理的 timeout
3. **监控资源使用** — 使用 dashboard 监控 session 数量和资源

---

## 八、相关文档

- **[Agent 协作机制](./agent-coworker.md)** — Agent 协作原理
- **[Agent Harness](./agent-harness.md)** — Agent 配置和使用
- **[六层架构](./7.x_six_layer_framework.md)** — 架构详解

---

🦉 教程大师 | 墨客内容生成 | 2026-06-16