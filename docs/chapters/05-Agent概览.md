# Agent 章节总览

> 整合 OpenClaw Agent 相关内容，提供统一的学习路径和导航

---

## 📚 Agent 内容分布

Agent 相关内容分布在以下目录，通过本总览统一索引：

| 目录 | 内容 | 文件数 |
|------|------|--------|
| [03_Agent运行循环](./03_Agent运行循环/) | Agent Loop 核心机制 | 12 |
| [07_Agent协作](./07_Agent协作/) | 多 Agent 协作模式 | 8 |
| [11_工作空间](./11_工作空间/) | Workspace 与 Agent 关系 | 2 |
| [20_Agent管理专题](./20_Agent管理专题/) | 高级管理和深度技术 | 66+ |

---

## 🗺️ 学习路径

### 入门路线：Agent 基础

```
03_Agent运行循环/
├── 3.1 Agent Loop        → 核心运行机制
├── 3.2 发出指令          → 第一次对话
├── 3.3 工作区            → Workspace 基础
├── 3.9 Session 管理      → 会话管理
└── 3.12 运行时与沙盒     → 安全隔离
```

### 进阶路线：多 Agent

```
07_Agent协作/
├── agent-coworker        → Agent 协作模式
├── agentic-dimensions    → 多维架构
└── 7.x_kiro_*            → 协议与框架
```

### 高级路线：架构设计

```
20_Agent管理专题/
├── 04-multi-agent        → 多 Agent 系统设计
├── 05-workspace          → Workspace 进阶
├── 07-lifecycle          → Agent 生命周期
└── 08-migration          → 迁移与版本管理
```

---

## 📖 核心文档索引

### 3.x Agent 运行循环（12个文档）

| 文档 | 主题 | 难度 |
|------|------|------|
| [3.1_agent_loop.md](./03_Agent运行循环/3.1_agent_loop.md) | Agent Loop 生命周期 | ⭐ 入门 |
| [3.2_first_command.md](./03_Agent运行循环/3.2_first_command.md) | 发出第一条指令 | ⭐ 入门 |
| [3.3_workspace.md](./03_Agent运行循环/3.3_workspace.md) | 工作区使用 | ⭐ 入门 |
| [3.4_memory.md](./03_Agent运行循环/3.4_memory.md) | 长期记忆 | ⭐ 入门 |
| [3.5_daily_memory.md](./03_Agent运行循环/3.5_daily_memory.md) | 每日记忆 | ⭐ 入门 |
| [3.6_multi_workspace.md](./03_Agent运行循环/3.6_multi_workspace.md) | 多工作空间 | ⭐⭐ 进阶 |
| [3.7_message_routing.md](./03_Agent运行循环/3.7_message_routing.md) | 消息路由 | ⭐⭐ 进阶 |
| [3.8_group_multi_agent.md](./03_Agent运行循环/3.8_group_multi_agent.md) | 群组多 Agent | ⭐⭐ 进阶 |
| [3.9_session.md](./03_Agent运行循环/3.9_session.md) | Session 管理 | ⭐⭐ 进阶 |
| [3.10_session_routing.md](./03_Agent运行循环/3.10_session_routing.md) | Session 路由 | ⭐⭐ 进阶 |
| [3.11_session_context.md](./03_Agent运行循环/3.11_session_context.md) | 上下文管理 | ⭐⭐⭐ 高级 |
| [3.12_runtime_sandbox.md](./03_Agent运行循环/3.12_runtime_sandbox.md) | 运行时与沙盒 | ⭐⭐⭐ 高级 |

### 7.x Agent 协作（8个文档）

| 文档 | 主题 | 难度 |
|------|------|------|
| [agent-coworker.md](./07_Agent协作/agent-coworker.md) | Agent 协作者模式 | ⭐⭐ 进阶 |
| [agent-harness.md](./07_Agent协作/agent-harness.md) | Agent 驾驭模式 | ⭐⭐ 进阶 |
| [agentic-dimensions-v2.md](./07_Agent协作/agentic-dimensions-v2.md) | 多维 Agent 架构 | ⭐⭐⭐ 高级 |
| [7.x_kiro_dual_protocol.md](./07_Agent协作/7.x_kiro_dual_protocol.md) | 双协议架构 | ⭐⭐⭐ 高级 |
| [7.x_six_layer_framework.md](./07_Agent协作/7.x_six_layer_framework.md) | 六层框架 | ⭐⭐⭐ 高级 |

### 20.x Agent 管理专题（66+个文档）

| 文档 | 主题 | 难度 |
|------|------|------|
| [04-multi-agent.md](./20_Agent管理专题/04-multi-agent.md) | 多 Agent 系统设计 | ⭐⭐ 进阶 |
| [05-workspace.md](./20_Agent管理专题/05-workspace.md) | Workspace 进阶管理 | ⭐⭐ 进阶 |
| [07-lifecycle.md](./20_Agent管理专题/07-lifecycle.md) | Agent 生命周期 | ⭐⭐⭐ 高级 |
| [08-migration.md](./20_Agent管理专题/08-migration.md) | 迁移与版本管理 | ⭐⭐⭐ 高级 |

---

## 🎯 主题索引

### 按主题快速查找

| 主题 | 相关文档 |
|------|---------|
| **Agent Loop 原理** | 3.1, 3.12 |
| **发出指令** | 3.2 |
| **Workspace/工作区** | 3.3, 11.x, 20.05 |
| **记忆系统** | 3.4, 3.5 |
| **多工作空间** | 3.6, 11.x |
| **消息路由** | 3.7, 3.10 |
| **多 Agent 协作** | 3.8, 7.x, 20.04 |
| **Session 管理** | 3.9, 3.10, 3.11 |
| **安全与沙盒** | 3.12, 16.x |
| **生命周期** | 20.07 |
| **迁移升级** | 20.08 |

---

## 📊 知识体系图

```
                    ┌─────────────────────────────────────┐
                    │         Agent 知识体系               │
                    └─────────────────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ↓                       ↓                       ↓
     ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
     │   基础概念    │        │   进阶应用    │        │   高级架构    │
     ├──────────────┤        ├──────────────┤        ├──────────────┤
     │ • Agent Loop │        │ • 多 Agent   │        │ • 六层框架   │
     │ • Workspace  │        │ • 协作模式   │        │ • 双协议     │
     │ • 发出指令   │        │ • 消息路由   │        │ • 生命周期   │
     │ • 记忆系统   │        │ • Session    │        │ • 迁移升级   │
     └──────────────┘        └──────────────┘        └──────────────┘
            │                       │                       │
            ↓                       ↓                       ↓
      03_Agent运行循环          07_Agent协作           20_Agent管理专题
      (入门)                   (进阶)                  (高级)
```

---

## 🔗 关联章节

| 关联主题 | 章节 |
|---------|------|
| Tools 与 Skills | [10_工具与Skills系统](./10_工具与Skills系统/) |
| 记忆与上下文 | [06_上下文与记忆](./06_上下文与记忆/) |
| 安全配置 | [16_安全配置](./16_安全配置/) |
| 渠道绑定 | [05_渠道集成](./05_渠道集成/) |

---

## 📝 内容贡献说明

Agent 相关内容分散在多个目录，保持原有文件夹结构便于：
- 按技术领域组织（Loop/协作/管理）
- 独立版本控制和更新
- 社区贡献者定向维护

本总览文档提供统一索引，不移动原始文件。

---

**最后更新**：2026-05-12