# 07 多 Agent 协作

本章节帮助你理解 OpenClaw 的多 Agent 协作系统，掌握如何构建多 Agent 工作流，实现复杂任务的分布式处理。

## 内容导航

| 小节 | 主题 | 预计用时 |
|-----|------|---------|
| [7.1](./7.1_multi_agent_overview.md) | 多 Agent 概述 | 20分钟 |
| [7.2](./7.2_agent_teams.md) | Agent 团队配置 | 25分钟 |
| [7.3](./7.3_collaboration_patterns.md) | 协作模式 | 30分钟 |
| [7.4](./7.4_workflow_design.md) | 工作流设计 | 30分钟 |
| [7.5](./7.5_case_study.md) | 实战案例 | 25分钟 |
| [7.6](./7.6_acp_agents.md) | ACP 代理协议 | 25分钟 |
| [7.7](./7.7_agent_create.md) | Agent 创建与管理 | 25分钟 |
| [7.8](./7.8_agent_channel_binding.md) | Agent 渠道绑定 | 25分钟 |
| [7.9](./7.9_multi_agent_collaboration.md) | 多 Agent 沟通与协作 | 30分钟 |
| [7.10](./7.10_telegram_feishu_multi_agent.md) | Telegram & 飞书群组多 Agent 方案 | 25分钟 |
| [7.11](./7.11_group_agent_communication.md) | 群组多 Agent 通信机制 | 20分钟 |

## 学习目标

完成本章后，你将能够：

- ✅ 理解多 Agent 协作架构
- ✅ 配置 Agent 团队
- ✅ 设计工作流模式
- ✅ 构建复杂任务系统
- ✅ 使用 ACP 代理运行外部编码工具
- ✅ 创建和管理 Agent
- ✅ 绑定 Agent 到渠道
- ✅ 理解 Agent 间通信机制
- ✅ 配置多 Agent 协作工作流

## 核心概念

```
多 Agent = 多个专业 Agent 协作
团队 = Agent + 角色 + 协作规则
工作流 = 任务的分解和编排
```

## 快速导航

- [上一章：06 上下文与记忆 →](../06_context_memory/)
- [下一章：08 通道集成 →](../08_channels/)
- [文档总览 →](../)

## 补充资源

- [Multi-Agent 文档](https://docs.openclaw.ai/multi-agent)
- [工作流示例](https://github.com/openclaw/workflows)

---

**最后更新**：2026-03-28（由 Tutorial Master Skill 自动更新）
