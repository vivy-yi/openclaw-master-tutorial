# OpenClaw 完全指南：多智能体团队

> 📖 来源：[知乎 - OpenClaw 完全指南](https://zhuanlan.zhihu.com/p/2015027745743189513)  
> ✍️ 作者：ConardLi（code秘密花园）  
> ⭐ 评分：⭐⭐⭐⭐⭐  
> 📅 采集日期：2026-07-20

---

## 九、OpenClaw 的多智能体团队如何搭建？

### 9.1 多 Agent 架构概述

OpenClaw 支持构建**多智能体协作系统**，让不同的 AI Agent 承担不同角色，协同完成复杂任务：

```
┌────────────────────────────────────────────────────────┐
│              Multi-Agent Team Architecture             │
├────────────────────────────────────────────────────────┤
│                                                         │
│    ┌──────────────┐                                    │
│    │   Manager    │  👑 团队主管                       │
│    │   Agent      │     - 任务分解                     │
│    └──────┬───────┘     - 结果整合                     │
│           │                                          │
│    ┌──────┴───────┐                                    │
│    ▼              ▼                                    │
│ ┌──────┐    ┌──────┐    ┌──────┐                      │
│ │ Coder │    │Research│   │Reviewer│                 │
│ │ Agent │    │ Agent  │   │ Agent  │                  │
│ └──────┘    └──────┘    └──────┘                      │
│                                                         │
└────────────────────────────────────────────────────────┘
```

### 9.2 Agent 类型

| 类型 | 职责 | 典型用途 |
|------|------|----------|
| **Manager Agent** | 任务分解、协调 | 总指挥 |
| **Coder Agent** | 代码编写、调试 | 开发任务 |
| **Research Agent** | 信息检索、分析 | 调研任务 |
| **Reviewer Agent** | 质量审核、把控 | 代码审查 |
| **Writer Agent** | 内容创作、编辑 | 写作任务 |

### 9.3 团队配置

```yaml
agents:
  team:
    name: dev-team
    mode: parallel  # parallel | sequential | hierarchical
    
  members:
    - name: coder
      role: developer
      model: gpt-4o
      systemPrompt: 你是一名资深 Python 开发者...
      
    - name: researcher
      role: research
      model: claude-3-5-sonnet
      systemPrompt: 你是一名技术调研专家...
      
    - name: reviewer
      role: quality
      model: gpt-4o
      systemPrompt: 你是一名代码审查专家...
```

### 9.4 协作模式

#### 并行模式（Parallel）

所有 Agent 同时工作，适合相互独立的任务：

```yaml
team:
  mode: parallel
  task: 分析以下三个技术问题
  items:
    - 性能优化
    - 安全漏洞
    - 可扩展性
```

#### 串行模式（Sequential）

Agent 按顺序执行，每个 Agent 的输出作为下一个的输入：

```yaml
team:
  mode: sequential
  pipeline:
    - researcher: 收集信息
    - coder: 实现功能
    - reviewer: 代码审查
```

#### 层级模式（Hierarchical）

Manager Agent 分解任务并分配给子 Agent：

```yaml
team:
  mode: hierarchical
  manager:
    name: project-manager
    prompt: 你负责项目管理，协调团队完成目标
  workers:
    - coder
    - researcher
    - tester
```

### 9.5 任务分配

```yaml
tasks:
  - id: task-1
    name: 开发用户认证模块
    assignedTo: coder
    description: 实现 JWT 认证
    
  - id: task-2
    name: 安全审计
    assignedTo: reviewer
    description: 检查认证安全性
    
  - id: task-3
    name: 竞品调研
    assignedTo: researcher
    description: 分析竞品功能特性
```

### 9.6 Agent 间通信

#### 消息传递

```yaml
team:
  communication:
    sharedContext: true  # 共享上下文
    broadcast: false    # 是否广播消息
```

#### 结果聚合

```yaml
team:
  aggregation:
    strategy: summarize  # summarize | vote | custom
    summarizePrompt: |
      请总结以下各 Agent 的工作成果，
      提炼关键结论和建议...
```

### 9.7 多 Agent 使用示例

#### 创建团队

```bash
# 使用模板创建团队
openclaw team create --template development

# 查看可用模板
openclaw team templates
```

#### 启动团队任务

```bash
# 启动团队协作
openclaw team run "开发一个博客系统"

# 指定团队配置
openclaw team run "开发博客系统" --config ./my-team.yaml
```

#### 监控团队状态

```bash
# 查看团队状态
openclaw team status

# 查看 Agent 日志
openclaw team logs --agent coder

# 实时跟踪任务进度
openclaw team watch
```

### 9.8 最佳实践

1. **明确角色分工**：每个 Agent 有清晰的职责
2. **合理模型选择**：简单任务用小模型，复杂任务用大模型
3. **控制团队规模**：建议 3-5 个 Agent，避免过度复杂
4. **设置检查点**：重要节点设置人工确认
5. **结果验证**：Reviewer Agent 审核最终输出

---

## 相关资源

- 🔗 原文链接：[OpenClaw 完全指南 - 知乎](https://zhuanlan.zhihu.com/p/2015027745743189513)
- 📖 [认识 OpenClaw](../01_认识openclaw/openclaw-complete-guide-overview.md)
- 🔧 [Skills 配置](../15_Skills/README.md)

---

*本文档由墨客自动采集整理，遵循原文 CC BY-SA 协议*
