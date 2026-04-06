# OpenClaw 内置提示词全集合

> 🦦 本目录提取自 OpenClaw 源码 `pi-embedded-bukGSgEe.js`，按源码中的实际章节顺序整理。
> 源码路径：`src/agents/system-prompt.ts`

---

## 📁 目录结构

### Part A：内置系统提示词（源码注入，User 不可见）

| 文件 | 章节标题 | 说明 |
|------|---------|------|
| [01_tools.md](./01_tools.md) | ## Tooling | 工具列表 + 可用性说明 |
| [02_tool_call_style.md](./02_tool_call_style.md) | ## Tool Call Style | 工具调用风格规范 |
| [03_safety.md](./03_safety.md) | ## Safety | 安全准则 |
| [04_cli_reference.md](./04_cli_reference.md) | ## OpenClaw CLI Quick Reference | CLI 命令速查 |
| [05_skills.md](./05_skills.md) | ## Skills (mandatory) | Skills 扫描与调用规范 |
| [06_memory_recall.md](./06_memory_recall.md) | ## Memory Recall | 记忆召回指令 |
| [07_self_update.md](./07_self_update.md) | ## OpenClaw Self-Update | 自我更新规范 |
| [08_model_aliases.md](./08_model_aliases.md) | ## Model Aliases | 模型别名说明 |
| [09_reply_tags.md](./09_reply_tags.md) | ## Reply Tags | 回复标签规范 |
| [10_messaging.md](./10_messaging.md) | ## Messaging | 消息发送规范 |
| [11_silent_replies.md](./11_silent_replies.md) | ## Silent Replies | 静默回复规范 |
| [12_heartbeats.md](./12_heartbeats.md) | ## Heartbeats | 心跳任务说明 |
| [13_runtime.md](./13_runtime.md) | ## Runtime | 运行时信息 |
| [14_reactions.md](./14_reactions.md) | ## Reactions | 反应/表情规范 |
| [15_reasoning_format.md](./15_reasoning_format.md) | ## Reasoning Format | 推理格式说明 |
| [16_project_context.md](./16_project_context.md) | # Project Context | 项目上下文文件注入 |
| [17_documentation.md](./17_documentation.md) | ## Documentation | 文档路径说明 |
| [18_authorized_senders.md](./18_authorized_senders.md) | ## Authorized Senders | 授权发送者 |
| [19_current_datetime.md](./19_current_datetime.md) | ## Current Date & Time | 当前日期时间 |
| [20_full_system_prompt.md](./20_full_system_prompt.md) | 完整 System Prompt | Full 模式完整注入顺序 |
| [21_minimal_system_prompt.md](./21_minimal_system_prompt.md) | Minimal System Prompt | Sub-agent 精简模式 |

### Part B：Compaction 与 Memory Flush

| 文件 | 主题 |
|------|------|
| [22_compaction_memory_flush.md](./22_compaction_memory_flush.md) | Memory Flush 提示词 |
| [23_heartbeat_state_tracking.md](./23_heartbeat_state_tracking.md) | Heartbeat 状态追踪 |

---

## 两种模式对比

| 特性 | `full` 模式 | `minimal` 模式 |
|------|------------|--------------|
| 适用对象 | 主 Agent（main session） | Sub-agent |
| Tools | ✅ | ✅ |
| Safety | ✅ | ✅ |
| Skills | ✅ | ❌ |
| Memory Recall | ✅ | ❌ |
| Self-Update | ✅ | ❌ |
| Model Aliases | ✅ | ❌ |
| Reply Tags | ✅ | ❌ |
| Messaging | ✅ | ❌ |
| Silent Replies | ✅ | ❌ |
| Heartbeats | ✅（有配置时） | ❌ |
| Authorized Senders | ✅ | ❌ |
| Current Date & Time | ✅ | ✅ |
| Runtime | ✅ | ✅ |
| Reactions | ✅ | ❌ |
| Reasoning Format | ✅ | ❌ |
| Project Context | ✅ | ❌ |
| Documentation | ✅ | ❌ |

---

## 相关资源

- [OpenClaw 内部提示词全解析](../OpenClaw内部提示词全解析.md) — 包含各节详细解读和自定义方法
- [Workspace 维护指南](../OpenClaw%20Workspace%20维护指南.md)
- 官方文档：[System Prompt](https://docs.openclaw.ai/concepts/system-prompt)

---

*本目录由 Tutorial Master Skill 自动提取更新 | 最后更新：2026-04*
