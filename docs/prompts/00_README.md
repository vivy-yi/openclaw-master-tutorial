# OpenClaw 内置提示词全集合

> 🦦 本目录基于官方 TypeScript 源码逐文件提取
> 源码文件路径：`src/agents/system-prompt.ts`

---

## 功能分类（渐进式学习路径）

### 1️⃣ 身份与工具层

| 文件 | 章节标题 | 源码行号 | 说明 |
|------|---------|---------|------|
| [01_identity.md](./01_identity.md) | Identity | ~570 | 身份行（始终） |
| [02_tools.md](./02_tools.md) | ## Tooling | ~570 | 工具列表 |
| [03_tool_call_style.md](./03_tool_call_style.md) | ## Tool Call Style | ~713 | 工具调用风格 |
| [04_execution_bias.md](./04_execution_bias.md) | ## Execution Bias | ~299 | 行动优先原则 |
| [05_safety.md](./05_safety.md) | ## Safety | ~639 | 安全准则 |

### 2️⃣ 能力与配置层

| 文件 | 章节标题 | 源码行号 | 说明 |
|------|---------|---------|------|
| [06_cli_reference.md](./06_cli_reference.md) | ## OpenClaw CLI Quick Reference | ~740 | CLI 命令速查 |
| [07_skills.md](./07_skills.md) | ## Skills (mandatory) | ~156 | Skills 系统 |
| [08_self_update.md](./08_self_update.md) | ## OpenClaw Self-Update | ~752 | 自我更新 |
| [09_model_aliases.md](./09_model_aliases.md) | ## Model Aliases | ~766 | 模型别名 |
| [10_reply_tags.md](./10_reply_tags.md) | ## Reply Tags | ~652 | 回复标签 |

### 3️⃣ 上下文与记忆层

| 文件 | 章节标题 | 源码行号 | 说明 |
|------|---------|---------|------|
| [11_memory_recall.md](./11_memory_recall.md) | ## Memory Recall | ~174 | 记忆召回 |
| [12_workspace.md](./12_workspace.md) | ## Workspace | ~778 | 工作区目录 |
| [13_sandbox.md](./13_sandbox.md) | ## Sandbox | ~784 | 沙箱环境 |
| [14_project_context.md](./14_project_context.md) | # Project Context | ~95 | 上下文文件 |

### 4️⃣ 输出与渠道层

| 文件 | 章节标题 | 源码行号 | 说明 |
|------|---------|---------|------|
| [15_assistant_output_directives.md](./15_assistant_output_directives.md) | ## Assistant Output Directives | ~255 | 输出指令 |
| [16_control_ui_embed.md](./16_control_ui_embed.md) | ## Control UI Embed | ~275 | Canvas embed |
| [17_messaging.md](./17_messaging.md) | ## Messaging | ~335 | 消息发送 |
| [18_voice_tts.md](./18_voice_tts.md) | ## Voice (TTS) | ~375 | TTS 使用 |
| [19_reactions.md](./19_reactions.md) | ## Reactions | ~892 | 反应/表情 |
| [20_silent_replies.md](./20_silent_replies.md) | ## Silent Replies | ~916 | 静默回复 |

### 5️⃣ 运行时与元信息

| 文件 | 章节标题 | 源码行号 | 说明 |
|------|---------|---------|------|
| [21_runtime.md](./21_runtime.md) | ## Runtime | ~957 | 运行时信息 |
| [22_documentation.md](./22_documentation.md) | ## Documentation | ~386 | 文档路径 |
| [23_reasoning_format.md](./23_reasoning_format.md) | ## Reasoning Format | ~895 | 推理格式 |
| [24_heartbeats.md](./24_heartbeats.md) | ## Heartbeats | ~127 | 心跳任务 |
| [25_authorized_senders.md](./25_authorized_senders.md) | ## Authorized Senders | ~217 | 授权发送者 |
| [26_current_datetime.md](./26_current_datetime.md) | ## Current Date & Time | ~248 | 日期时间 |
| [27_exec_approval.md](./27_exec_approval.md) | ## Exec Approval | ~140 | 执行审批 |

### 6️⃣ 综合与专题

| 文件 | 章节标题 | 说明 |
|------|---------|------|
| [28_full_system_prompt.md](./28_full_system_prompt.md) | 完整 System Prompt | Full 模式完整注入顺序 |
| [29_minimal_system_prompt.md](./29_minimal_system_prompt.md) | Minimal System Prompt | Sub-agent 精简模式 |
| [30_compaction_memory_flush.md](./30_compaction_memory_flush.md) | Memory Flush | 记忆压缩刷新 |
| [31_heartbeat_state_tracking.md](./31_heartbeat_state_tracking.md) | Heartbeat Tracking | 心跳状态追踪 |
| [32_group_subagent_context.md](./32_group_subagent_context.md) | Group/Subagent Context | 群组/子Agent上下文 |

### 📚 教程

| 文件 | 说明 |
|------|------|
| [33_system_prompt_building.md](./33_system_prompt_building.md) | 系统提示词构建完全指南 |

---

### Part B：Workspace Bootstrap 模板

| 文件 | 说明 |
|------|------|
| [bootstrap_SOUL.md](./bootstrap_SOUL.md) | Agent 人格与原则 |
| [bootstrap_AGENTS.md](./bootstrap_AGENTS.md) | Agent 协作规范 |
| [bootstrap_IDENTITY.md](./bootstrap_IDENTITY.md) | Agent 身份记录 |
| [bootstrap_USER.md](./bootstrap_USER.md) | 用户信息模板 |
| [bootstrap_HEARTBEAT.md](./bootstrap_HEARTBEAT.md) | 心跳巡逻任务 |
| [bootstrap_BOOTSTRAP.md](./bootstrap_BOOTSTRAP.md) | 首次运行引导 |

---

## 两种模式对比

| 特性 | Full 模式 | Minimal 模式 |
|------|----------|--------------|
| 适用对象 | 主 Agent | Sub-agent / cron |
| Tooling | ✅ | ✅ |
| Safety | ✅ | ✅ |
| Skills | ✅ | ❌ |
| Memory Recall | ✅ | ❌ |
| Self-Update | ✅ | ❌ |
| Model Aliases | ✅ | ❌ |
| Reply Tags | ✅ | ❌ |
| Messaging | ✅ | ❌ |
| Silent Replies | ✅ | ❌ |
| Heartbeats | ✅ | ❌ |
| Authorized Senders | ✅ | ❌ |
| Current Date & Time | ✅ | ❌ |
| Reactions | ✅ | ❌ |
| Documentation | ✅ | ❌ |
| Execution Bias | ✅ | ❌ |
| Workspace | ✅ | ✅ |
| Sandbox | ✅ | ✅ |
| Runtime | ✅ | ✅ |

---

## 关键源码文件

| 文件 | 内容 |
|------|------|
| `src/agents/system-prompt.ts` | 主要系统提示词构建器（约 1007 行） |
| `src/agents/bootstrap-prompt.ts` | Bootstrap 文件加载 |
| `src/plugins/memory-core.ts` | Memory plugin 核心 |

---

## 相关资源

- [官方 System Prompt 源码](https://github.com/openclaw/openclaw/blob/master/src/agents/system-prompt.ts)
- [官方 Templates](https://github.com/openclaw/openclaw/tree/master/docs/reference/templates)
- [构建指南](./33_system_prompt_building.md)

---

*本目录由 Tutorial Master Skill 基于官方 TypeScript 源码提取更新 | 最后更新：2026-04-21*