# OpenClaw 系统提示词构建完全指南

> 📅 更新日期：2026-04-21
> 📖 预计阅读：30-45 分钟
> 🎯 适合读者：想深入理解 OpenClaw 提示词机制的用户

---

## 目录

- [1. 概述](#1-概述)
- [2. 核心入口：`buildAgentSystemPrompt()`](#2-核心入口buildagentsystemprompt)
- [3. 两种模式：Full vs Minimal](#3-两种模式full-vs-minimal)
- [4. 提示词构建流程（完整注入顺序）](#4-提示词构建流程完整注入顺序)
- [5. 各节详解与触发条件](#5-各节详解与触发条件)
- [6. 项目上下文文件（Dynamic Context）](#6-项目上下文文件dynamic-context)
- [7. Provider 贡献机制](#7-provider-贡献机制)
- [8. 条件注入一览表](#8-条件注入一览表)
- [9. 实战：追踪一次完整提示词构建](#9-实战追踪一次完整提示词构建)
- [10. 常见问题](#10-常见问题)

---

## 1. 概述

OpenClaw 的系统提示词不是静态的，而是**根据运行时环境动态组装**的。核心逻辑位于：

```
src/agents/system-prompt.ts  (约 1007 行)
```

主要特点：
- **模式化**：`full`（主 Agent）、`minimal`（子 Agent）、`none`（仅身份行）
- **条件注入**：根据配置、渠道、能力决定哪些节注入
- **可覆盖**：Provider 可以覆盖某些节的默认内容
- **上下文注入**：动态加载 workspace 文件（SOUL.md、USER.md 等）

---

## 2. 核心入口：`buildAgentSystemPrompt()`

这是构建系统提示词的**唯一入口**，接收大量参数：

```typescript
export function buildAgentSystemPrompt(params: {
  workspaceDir: string;           // 工作区目录
  defaultThinkLevel?: ThinkLevel; // 思考级别
  reasoningLevel?: ReasoningLevel; // 推理可见性
  extraSystemPrompt?: string;     // 额外系统提示
  ownerNumbers?: string[];        // 所有者号码
  ownerDisplay?: OwnerIdDisplay;  // 显示模式（raw/hash）
  toolNames?: string[];           // 可用工具列表
  toolSummaries?: Record<string, string>; // 工具描述
  modelAliasLines?: string[];     // 模型别名
  userTimezone?: string;          // 用户时区
  contextFiles?: EmbeddedContextFile[]; // 上下文文件
  skillsPrompt?: string;          // Skills 提示词
  heartbeatPrompt?: string;       // Heartbeat 提示词
  docsPath?: string;              // 文档路径
  ttsHint?: string;               // TTS 提示
  promptMode?: PromptMode;        // 提示词模式
  runtimeInfo?: {...};            // 运行时信息
  sandboxInfo?: {...};            // 沙箱信息
  reactionGuidance?: {...};       // 反应指导
  promptContribution?: {...};     // Provider 贡献
  // ...
})
```

---

## 3. 两种模式：Full vs Minimal

| 特性 | Full 模式 | Minimal 模式 |
|------|----------|-------------|
| **适用对象** | 主 Agent（main session） | Sub-agent / cron isolated sessions |
| **工具列表** | ✅ 完整 | ✅ 精简 |
| **Safety** | ✅ | ✅ |
| **Skills** | ✅ | ❌ |
| **Memory Recall** | ✅ | ❌ |
| **Self-Update** | ✅ | ❌ |
| **Model Aliases** | ✅ | ❌ |
| **Reply Tags** | ✅ | ❌ |
| **Messaging** | ✅ | ❌ |
| **Silent Replies** | ✅ | ❌ |
| **Heartbeats** | ✅ | ❌ |
| **Authorized Senders** | ✅ | ❌ |
| **Current Date & Time** | ✅ | ❌ |
| **Reactions** | ✅ | ❌ |
| **Documentation** | ✅ | ❌ |
| **Execution Bias** | ✅ | ❌ |
| **Workspace** | ✅ | ✅ 精简 |
| **Sandbox** | ✅ | ✅ 可能 |
| **Runtime** | ✅ | ✅ |
| **Project Context** | ✅ | 仅动态文件 |

---

## 4. 提示词构建流程（完整注入顺序）

下面是 `buildAgentSystemPrompt()` 内部的实际顺序（基于源码）：

```
1. 身份行
   "You are a personal assistant running inside OpenClaw."

2. ## Tooling
   工具列表 + 可用性说明

3. ## Tool Call Style
   工具调用风格规范

4. ## Execution Bias
   执行偏向（actionable request 原则）

5. ## Safety
   安全准则

6. ## OpenClaw CLI Quick Reference
   CLI 命令速查

7. ## OpenClaw Self-Update
   自我更新规范（仅 Full 且有 gateway）

8. ## Model Aliases
   模型别名说明（仅 Full）

9. ## Skills (mandatory)
   Skills 扫描与调用规范（仅 Full）

10. ## Memory Recall
    记忆召回指令（由 memory plugin 注册，仅 Full）

11. ## Workspace
    工作区目录说明

12. ## Sandbox
    沙箱环境提示（仅当 sandboxInfo.enabled === true）

13. ## Workspace Files (injected)
    上下文文件内容注入（SOUL.md, USER.md, AGENTS.md 等）

14. ## Assistant Output Directives
    输出指令（M友媒体附件、reply tags）

15. ## Control UI Embed
    Canvas embed 语法（仅 webchat + Full）

16. ## Messaging
    消息发送规范（仅 Full）

17. ## Voice (TTS)
    TTS 使用指引（仅 Full + ttsHint 存在）

18. ## Documentation
    文档路径说明（仅 Full）

19. ## Reactions
    反应/表情规范（仅当 reactionGuidance 存在）

20. ## Reasoning Format
    推理格式说明（仅当 reasoningHint 存在）

21. ## Silent Replies
    静默回复规范（仅 Full）

22. ## Subagent Context / ## Group Chat Context
    子 Agent 上下文 或 群组上下文

23. ## Heartbeats
    心跳任务说明（仅 Full + heartbeatPrompt 存在）

24. ## Runtime
    运行时信息（agentId, host, os, model, channel 等）

25. ## Authorized Senders
    授权发送者

26. ## Current Date & Time
    当前日期时间（仅 Full + userTimezone 存在）
```

---

## 5. 各节详解与触发条件

### 5.1 身份与工具层

| 节名 | 源码函数 | 触发条件 | 行号 |
|------|---------|---------|------|
| 身份行 | 直接输出 | 始终 | - |
| Tooling | 内联构建 | 始终 | ~670 |
| Tool Call Style | `buildOverridablePromptSection()` | 始终 | ~713 |
| Execution Bias | `buildExecutionBiasSection()` | 始终（Minimal 时简化） | ~299 |
| Safety | 内联构建 | 始终 | ~639 |

### 5.2 能力与配置层

| 节名 | 源码函数 | 触发条件 | 行号 |
|------|---------|---------|------|
| CLI Reference | 内联构建 | hasGateway && !isMinimal | ~740 |
| Self-Update | 条件输出 | hasGateway && !isMinimal | ~752 |
| Model Aliases | 条件输出 | modelAliasLines 存在 | ~766 |
| Skills | `buildSkillsSection()` | skillsPrompt 存在 && !isMinimal | ~156 |

### 5.3 上下文与记忆层

| 节名 | 源码函数 | 触发条件 | 行号 |
|------|---------|---------|------|
| Memory Recall | `buildMemorySection()` | includeMemorySection && !isMinimal | ~174 |
| Workspace | 内联构建 | 始终 | ~778 |
| Sandbox | 条件输出 | sandboxInfo.enabled === true | ~784 |
| Project Context | `buildProjectContextSection()` | contextFiles 存在 | ~95 |

### 5.4 输出与渠道层

| 节名 | 源码函数 | 触发条件 | 行号 |
|------|---------|---------|------|
| Assistant Output | `buildAssistantOutputDirectivesSection()` | !isMinimal | ~255 |
| Control UI Embed | `buildWebchatCanvasSection()` | !isMinimal && channel === "webchat" | ~275 |
| Messaging | `buildMessagingSection()` | !isMinimal | ~335 |
| Voice (TTS) | `buildVoiceSection()` | !isMinimal && ttsHint 存在 | ~375 |
| Reactions | 条件输出 | reactionGuidance 存在 | ~892 |
| Silent Replies | 条件输出 | !isMinimal | ~916 |

### 5.5 运行时与元信息

| 节名 | 源码函数 | 触发条件 | 行号 |
|------|---------|---------|------|
| Documentation | `buildDocsSection()` | docsPath && !isMinimal | ~386 |
| Reasoning Format | 条件输出 | reasoningHint 存在 | ~895 |
| Heartbeats | `buildHeartbeatSection()` | heartbeatPrompt && !isMinimal | ~127 |
| Runtime | `buildRuntimeLine()` | 始终 | ~957 |
| Authorized Senders | `buildUserIdentitySection()` | ownerNumbers 存在 | ~217 |
| Time | `buildTimeSection()` | userTimezone && !isMinimal | ~248 |

---

## 6. 项目上下文文件（Dynamic Context）

OpenClaw 会从 workspace 目录加载以下文件并注入到提示词中：

### 6.1 加载顺序（CONTEXT_FILE_ORDER）

```typescript
const CONTEXT_FILE_ORDER = new Map([
  ["agents.md", 10],    // 第1个加载
  ["soul.md", 20],      // 第2个加载
  ["identity.md", 30],  // 第3个加载
  ["user.md", 40],      // 第4个加载
  ["tools.md", 50],     // 第5个加载
  ["bootstrap.md", 60], // 第6个加载
  ["memory.md", 70],    // 第7个加载
]);
```

### 6.2 动态文件

```typescript
const DYNAMIC_CONTEXT_FILE_BASENAMES = new Set(["heartbeat.md"]);
```

Heartbeat.md 每次都会重新读取并注入。

### 6.3 注入格式

```markdown
## agents.md

[文件内容...]
---
```

### 6.4 Bootstrap 文件

当 workspace 为全新时，会额外注入 bootstrap 模板：
- bootstrap_SOUL.md
- bootstrap_AGENTS.md
- bootstrap_IDENTITY.md
- bootstrap_USER.md
- bootstrap_HEARTBEAT.md
- bootstrap_BOOTSTRAP.md

---

## 7. Provider 贡献机制

OpenClaw 支持 Provider 覆盖默认提示词内容：

### 7.1 可覆盖的节

```typescript
promptContribution?: {
  stablePrefix?: string;      // 前缀覆盖
  dynamicSuffix?: string;     // 后缀覆盖
  sectionOverrides?: {
    interaction_style?: string;
    tool_call_style?: string;
    execution_bias?: string;
    // ...
  };
}
```

### 7.2 覆盖示例

```typescript
// Provider 配置
{
  promptContribution: {
    sectionOverrides: {
      tool_call_style: "Your custom tool call style guidance...",
    }
  }
}
```

---

## 8. 条件注入一览表

| 节 | Full | Minimal | 条件 |
|----|------|---------|------|
| Tooling | ✅ | ✅ | 始终 |
| Safety | ✅ | ✅ | 始终 |
| Skills | ✅ | ❌ | skillsPrompt 存在 |
| Memory Recall | ✅ | ❌ | includeMemorySection |
| Self-Update | ✅ | ❌ | hasGateway |
| Model Aliases | ✅ | ❌ | modelAliasLines 存在 |
| Messaging | ✅ | ❌ | 始终 |
| Silent Replies | ✅ | ❌ | 始终 |
| Heartbeats | ✅ | ❌ | heartbeatPrompt 存在 |
| Authorized Senders | ✅ | ❌ | ownerNumbers 存在 |
| Current Date & Time | ✅ | ❌ | userTimezone 存在 |
| Reactions | ✅ | ❌ | reactionGuidance 存在 |
| Reasoning Format | ✅ | ❌ | reasoningHint 存在 |
| Documentation | ✅ | ❌ | docsPath 存在 |
| Control UI Embed | ✅ | ❌ | channel === "webchat" |
| Voice (TTS) | ✅ | ❌ | ttsHint 存在 |
| Sandbox | ✅ | ✅ | sandboxInfo.enabled |
| Execution Bias | ✅ | 简化 | isMinimal |
| Workspace | ✅ | 简化 | 始终 |
| Runtime | ✅ | ✅ | 始终 |

---

## 9. 实战：追踪一次完整提示词构建

### 9.1 场景：用户在 Telegram 发送消息

```
1. Gateway 接收消息
2. 判断 promptMode = "full"（主 Agent）
3. 收集运行时信息：
   - channel: "telegram"
   - agentId: "main"
   - model: "claude-sonnet"
   - capabilities: ["reactions"]
4. 加载 contextFiles：
   - SOUL.md
   - USER.md
   - AGENTS.md
5. 调用 buildAgentSystemPrompt()
6. 条件判断：
   - isMinimal = false
   - hasGateway = true
   - reactionGuidance = { level: "minimal", channel: "telegram" }
7. 构建输出（按顺序注入各节）
8. 最终 System Prompt 约 3000-5000 tokens
```

### 9.2 场景：Sub-agent 执行任务

```
1. main Agent 调用 sessions_spawn
2. promptMode = "minimal"
3. 收集运行时信息（继承父 Agent 部分信息）
4. 不加载 SOUL.md/USER.md 等（安全隔离）
5. 调用 buildAgentSystemPrompt()
6. isMinimal = true，跳过大部分节
7. 最终 System Prompt 约 500-1000 tokens
```

### 9.3 场景：Sandbox 环境下执行

```
1. 配置 sandboxInfo: { enabled: true, ... }
2. promptMode = "full"
3. buildAgentSystemPrompt() 检测到沙箱
4. 注入 ## Sandbox 节
5. 注入沙箱特定路径规则
6. 阻止 ACP harness spawns
7. 提示 Sub-agent 无法获得 elevated 权限
```

---

## 10. 常见问题

### Q1：如何查看当前 System Prompt？

在 Control UI 的调试面板可以看到当前会话的 System Prompt（去除敏感信息后）。

### Q2：如何自定义某个节的内容？

两种方式：
1. **Provider 配置**：通过 `promptContribution.sectionOverrides` 覆盖
2. **修改源码**：`src/agents/system-prompt.ts` 对应函数

### Q3：Minimal 模式会加载哪些文件？

Minimal 模式只加载**动态文件**（如 heartbeat.md），不加载 SOUL.md、USER.md 等静态文件。

### Q4：为什么有些节没有注入？

检查触发条件：
- 是否在 Minimal 模式？
- 对应的参数是否传递？
- 条件是否满足（如 channel、capabilities）？

### Q5：如何调试提示词构建？

```bash
# 开启详细日志
openclaw gateway restart --verbose

# 查看构建日志
tail -f ~/.openclaw/logs/prompt-*.log
```

---

## 相关资源

| 资源 | 链接 |
|------|------|
| 官方源码 | [system-prompt.ts](https://github.com/openclaw/openclaw/blob/master/src/agents/system-prompt.ts) |
| 提示词文件集合 | [prompts/](../prompts/) |
| 完整 System Prompt | [28_full_system_prompt.md](./28_full_system_prompt.md) |
| Minimal System Prompt | [29_minimal_system_prompt.md](./29_minimal_system_prompt.md) |

---

*本文档基于 OpenClaw 源码分析生成 | 分析日期：2026-04-21*