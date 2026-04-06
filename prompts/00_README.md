# OpenClaw 内置提示词全集合

> 🦦 本目录基于官方 TypeScript 源码逐文件提取：[`openclaw/src/agents/system-prompt.ts`](https://github.com/openclaw/openclaw/tree/master/src/agents/system-prompt.ts)
>
> 源码文件路径：`src/agents/system-prompt.ts`

---

## 📁 目录结构

### Part A：内置系统提示词（按源码注入顺序）

| 文件 | 章节标题 | 源码行号 | 说明 |
|------|---------|---------|------|
| [01_tools.md](./01_tools.md) | ## Tooling | ~line 430 | 工具列表 + 可用性说明 |
| [02_tool_call_style.md](./02_tool_call_style.md) | ## Tool Call Style | ~line 440 | 工具调用风格规范 |
| [03_safety.md](./03_safety.md) | ## Safety | ~line 440 | 安全准则 |
| [04_cli_reference.md](./04_cli_reference.md) | ## OpenClaw CLI Quick Reference | ~line 460 | CLI 命令速查 |
| [05_skills.md](./05_skills.md) | ## Skills (mandatory) | ~line 459 | Skills 扫描与调用规范 |
| [06_memory_recall.md](./06_memory_recall.md) | ## Memory Recall | ~line 463 | 记忆召回指令（由 memory plugin 注册） |
| [07_self_update.md](./07_self_update.md) | ## OpenClaw Self-Update | ~line 568 | 自我更新规范 |
| [08_model_aliases.md](./08_model_aliases.md) | ## Model Aliases | ~line 560 | 模型别名说明 |
| [09_reply_tags.md](./09_reply_tags.md) | ## Reply Tags | ~line 652 | 回复标签规范 |
| [10_messaging.md](./10_messaging.md) | ## Messaging | ~line 653 | 消息发送规范 |
| [11_silent_replies.md](./11_silent_replies.md) | ## Silent Replies | ~line 710 | 静默回复规范 |
| [12_heartbeats.md](./12_heartbeats.md) | ## Heartbeats | ~line 749 | 心跳任务说明 |
| [13_runtime.md](./13_runtime.md) | ## Runtime | ~line 660 | 运行时信息 |
| [14_reactions.md](./14_reactions.md) | ## Reactions | ~line 635 | 反应/表情规范 |
| [15_reasoning_format.md](./15_reasoning_format.md) | ## Reasoning Format | ~line 380 | 推理格式说明 |
| [16_project_context.md](./16_project_context.md) | # Project Context | ~line 699 | 项目上下文文件注入 |
| [17_documentation.md](./17_documentation.md) | ## Documentation | ~line 665 | 文档路径说明 |
| [18_authorized_senders.md](./18_authorized_senders.md) | ## Authorized Senders | ~line 645 | 授权发送者 |
| [19_current_datetime.md](./19_current_datetime.md) | ## Current Date & Time | ~line 646 | 当前日期时间 |
| [20_exec_approval.md](./20_exec_approval.md) | ## Tool Call Style (扩展) | ~line 295 | Exec 审批引导 |
| [21_full_system_prompt.md](./21_full_system_prompt.md) | 完整 System Prompt | — | Full 模式完整注入顺序 |
| [22_minimal_system_prompt.md](./22_minimal_system_prompt.md) | Minimal System Prompt | — | Sub-agent 精简模式 |

### Part B：Workspace Bootstrap 模板（源码 `docs/reference/templates/`）

| 文件 | 来源 | 说明 |
|------|------|------|
| [bootstrap_SOUL.md](./bootstrap_SOUL.md) | `SOUL.md` | Agent 人格与原则 |
| [bootstrap_AGENTS.md](./bootstrap_AGENTS.md) | `AGENTS.md` | Workspace 操作指令 |
| [bootstrap_IDENTITY.md](./bootstrap_IDENTITY.md) | `IDENTITY.md` | Agent 身份记录 |
| [bootstrap_USER.md](./bootstrap_USER.md) | `USER.md` | 用户信息模板 |
| [bootstrap_HEARTBEAT.md](./bootstrap_HEARTBEAT.md) | `HEARTBEAT.md` | 心跳巡逻任务 |
| [bootstrap_BOOTSTRAP.md](./bootstrap_BOOTSTRAP.md) | `BOOTSTRAP.md` | 首次运行引导脚本 |

### Part C：Compaction 与 Memory Flush

| 文件 | 主题 |
|------|------|
| [23_compaction_memory_flush.md](./23_compaction_memory_flush.md) | Memory Flush 提示词 |
| [24_heartbeat_state_tracking.md](./24_heartbeat_state_tracking.md) | Heartbeat 状态追踪 |

---

## 两种模式对比

| 特性 | `full` 模式 | `minimal` 模式 |
|------|------------|--------------|
| 适用对象 | 主 Agent（main session） | Sub-agent / cron |
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
| Current Date & Time | ✅（有配置时） | ❌ |
| Runtime | ✅ | ✅ |
| Reactions | ✅（有配置时） | ❌ |
| Reasoning Format | ✅（有配置时） | ❌ |
| Project Context | ✅ | ❌ |
| Documentation | ✅ | ❌ |

---

## Bootstrap 文件注入顺序

```
SOUL.md        → Agent 人格与原则
USER.md       → 用户信息
AGENTS.md     → 操作指令 + 记忆规范
IDENTITY.md   → 名称/emoji/avatar
TOOLS.md      → 用户维护的工具说明
HEARTBEAT.md  → 心跳巡逻任务
BOOTSTRAP.md  → 首次运行引导（全新 workspace 时）
```

---

## 关键源码文件

| 源码文件 | 内容 |
|---------|------|
| `src/agents/system-prompt.ts` | 主要系统提示词构建器（813行） |
| `src/agents/workspace.ts` | Bootstrap 文件加载与模板常量 |
| `src/agents/bootstrap-budget.ts` | Bootstrap 截断预算管理 |
| `src/plugins/memory-core.ts` | Memory plugin 核心 |
| `docs/reference/templates/*.md` | 6 个 Workspace 模板文件 |

---

## 相关资源

- [OpenClaw 内部提示词全解析](../chapters/06_上下文与记忆/OpenClaw内部提示词全解析.md) — 包含各节详细解读和自定义方法
- [Workspace 维护指南](../chapters/06_上下文与记忆/OpenClaw%20Workspace%20维护指南.md)
- [官方 System Prompt 源码](https://github.com/openclaw/openclaw/blob/master/src/agents/system-prompt.ts)
- [官方 Templates](https://github.com/openclaw/openclaw/tree/master/docs/reference/templates)

---

*本目录由 Tutorial Master Skill 基于官方 TypeScript 源码提取更新 | 最后更新：2026-04*
