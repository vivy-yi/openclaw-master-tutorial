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
| [7.12](./7.12_领域任务架构设计实战手册.md) | ★ 四层三环架构实战手册 | 60分钟 |

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

- [上一章：18 Skills开发 →](../18_Skills开发/)
- [下一章：21 CLI工具与命令行开发 →](../21_CLI工具与命令行开发/)
- [文档总览 →](../)

## 深度技术解析（外部资源）

> 以下来自社区整理的 Multi-Agent 技术文章，可作为本章补充学习材料：

| 文章 | 来源 | 特点 |
|------|------|------|
| [OpenClaw AI Agent框架详解：核心架构、多智能体协同](https://www.houdao.com/d/5182-OpenClaw-AI-Agent-kuang-jia-xiang-jie-he-xin-jia-gou-duo-zhi-neng-ti-xie-tong-yu-Skill-xi-tong) | 厚道科技 | 架构+协同+Skill 系统 |
| [OpenClaw(龙虾)进阶：AI Agent团队协同原理与使用](https://www.cnblogs.com/softlin/p/19694335) | 博客园 | 团队协同原理+实战使用 |

## 补充资源

- [Multi-Agent 文档](https://docs.openclaw.ai/multi-agent)
- [工作流示例](https://github.com/openclaw/workflows)
- [awesome-openclaw](https://github.com/openclaw/awesome-openclaw)

---

**最后更新**：2026-04-06（补充 Multi-Agent 深度技术资源）
