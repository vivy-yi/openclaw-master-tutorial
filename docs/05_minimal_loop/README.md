# 03 最小循环

本章节帮助你理解 OpenClaw 的核心运行机制——Agent Loop，以及如何发出第一条指令。

## 内容导航

| 小节 | 主题 | 预计用时 |
|-----|------|---------|
| [3.1 Agent 循环](./3.1_agent_loop.md) | Agent Loop 生命周期和原理 | 25分钟 |
| [3.2 发出指令](./3.2_first_command.md) | 基础对话和工具调用 | 20分钟 |
| [3.3 工作区](./3.3_workspace.md) | 工作区概述和文件操作 | 15分钟 |
| [3.4 长期记忆](./3.4_memory.md) | 长期记忆系统 MEMORY.md | 15分钟 |
| [3.5 每日记忆](./3.5_daily_memory.md) | 每日记忆 daily/ | 15分钟 |
| [3.6 多工作空间](./3.6_multi_workspace.md) | 多工作空间管理和 Agent 隔离 | 20分钟 |
| [3.7 消息路由](./3.7_message_routing.md) | 消息路由流程和 Binding 配置 | 20分钟 |
| [3.8 群组多 Agent](./3.8_group_multi_agent.md) | 群组多 Agent 和广播组 | 20分钟 |
| [3.9 Session 管理](./3.9_session.md) | Session 会话管理和工具 | 20分钟 |
| [3.10 Session 路由](./3.10_session_routing.md) | Session 路由和 Binding 配置 | 20分钟 |
| [3.11 Session 上下文](./3.11_session_context.md) | 上下文管理和压缩机制 | 25分钟 |
| [3.12 Agent 运行时与沙盒](./3.12_runtime_sandbox.md) | 运行时架构和沙盒隔离 | 20分钟 |

## 学习目标

完成本章后，你将能够：

- ✅ 理解 Agent Loop 的完整生命周期
- ✅ 掌握消息处理流程
- ✅ 发出第一条指令
- ✅ 使用工作区进行文件操作
- ✅ 配置多工作空间和 Agent 隔离
- ✅ 理解消息路由和群组多 Agent 机制
- ✅ 掌握 Session 会话管理和工具
- ✅ 掌握 Session 路由和 Binding 配置
- ✅ 理解上下文管理和压缩机制

## 核心概念

```
Agent Loop = 接收 → 理解 → 规划 → 执行 → 返回

工作区 = ~/.openclaw/workspace/
Session = ~/.openclaw/agents/<agentId>/sessions/
```

## 快速导航

- [上一章：02 安装部署 →](../02_setup/)
- [下一章：04 模型配置 →](../04_config_models/)
- [文档总览 →](../)

---

## 补充资源

- [官方 Agent Loop 文档](https://docs.openclaw.ai/concepts/agent-loop)
