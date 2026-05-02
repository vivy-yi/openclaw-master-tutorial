# Agent 系统专业维度分析

> 基于 GitHub 搜索结果和 OpenClaw 源码分析
> 文档位置：`docs/chapters/07_Agent协作/`
> 更新时间: 2026-04-21

---

## 一、OpenClaw 分层架构

OpenClaw 有多套分层架构，适用于不同场景：

### 1. 基础六层架构（系统架构）

| 层级 | 名称 | 说明 |
|------|------|------|
| 第1层 | 用户层 | 飞书/企微/钉钉/Telegram/Discord/Web |
| 第2层 | Gateway 层 | 消息路由/会话管理/渠道适配/权限控制 |
| 第3层 | Agent 层 | 任务规划/意图理解/工具选择/状态管理 |
| 第4层 | Model 层 | LLM调用/模型路由/failover/流式输出 |
| 第5层 | Tools 层 | 内置工具/Skills/Plugins |
| 第6层 | System 层 | 文件系统/命令行/浏览器/日历/API |

### 2. 墨家六层架构（领域助手设计）

| 层级 | 名称 | 说明 |
|------|------|------|
| 第6层 | 用户体验层 | 终端输出/回复风格 |
| 第5层 | 合规风控层 | 底线保障/规范边界 |
| 第4层 | 领域专业层 | 差异化竞争力/专业深度 |
| 第3层 | Agent协作层 | 跨域协作/sessions_send |
| 第2层 | 外部知识层 | RAG/搜索/平台API |
| 第1层 | Agent能力层 | 推理/记忆/工具/角色/自主性 |

### 3. 六层记忆架构

| 层级 | 名称 | 存储位置 |
|------|------|---------|
| Layer 6 | 外部知识库 | 向量数据库 |
| Layer 5 | 向量数据库 | lancedb/ |
| Layer 4 | 共享知识库 | shared/ |
| Layer 3 | 纠正记录 | corrections.md |
| Layer 2 | 长期记忆 | MEMORY.md |
| Layer 1 | 每日日志 | memory/YYYY-MM-DD.md |

---

## 二、Agent 系统维度定义

### 1. Agent-Infra (Agent Infrastructure)

**定义**: 支撑 Agent 运行的基础设施层，包括部署、监控、扩展、日志、密钥管理等。

**核心组成**:
| 组件 | 说明 | 相关项目 |
|------|------|---------|
| 部署自动化 | 一键部署、环境配置 | agent-flywheel |
| 监控可观测 | 日志、指标、追踪 | - |
| 扩展管理 | 水平扩展、容器编排 | - |
| 密钥管理 | API Key、凭证管理 | - |
| 配置管理 | 环境差异、热重载 | - |

---

### 2. Agent-Harness

**定义**: 连接"有 LLM"和"有可靠的 Agent"之间的缺失层，即 Agent 的"骨架"或"脚手架"。

**核心组成**:
| 组件 | 说明 | 相关项目 |
|------|------|---------|
| 工具集成 | 外部工具的接入 | EvoHarness |
| Skill 系统 | 可组合的技能包 | - |
| 记忆管理 | 短期/长期记忆 | - |
| 审批工作流 | 执行前的审批 | - |
| MCP 协议 | Model Context Protocol | - |

---

### 3. Agent-Runtime

**定义**: Agent 实际运行时的执行环境，包括状态管理、工具沙箱、记忆管理、错误处理、检查点等。

**核心组成**:
| 组件 | 说明 | 相关项目 |
|------|------|---------|
| 状态管理 | Agent 状态切换、持久化 | agentscope-runtime |
| 工具沙箱 | 安全隔离的工具执行 | OpenSandbox |
| 记忆管理 | 上下文、向量记忆 | tensorlake |
| 错误处理 | 重试、降级 | - |
| 检查点 | 状态快照、恢复 | - |

---

### 4. Agent-Native

**定义**: Agent 框架内置的原生能力，如内置工具调用、内置记忆、内置推理等。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|--------------|
| 原生工具调用 | 内置的工具系统 | exec, read, write |
| 原生记忆 | 内置的记忆系统 | 六层记忆 |
| 原生推理 | 内置的推理能力 | LLM |
| 原生规划 | 内置的规划能力 | Agent Loop |

---

### 5. Agentic Tools

**定义**: Agent 可以调用的外部工具集，用于执行具体任务。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 工具选择 | 从多个工具中选择 | Tool Selector |
| 工具执行 | 调用工具并处理结果 | Tool Executor |
| 工具组合 | 串联多个工具 | Tool Chain |
| 错误处理 | 工具调用失败处理 | Error Handler |

---

### 6. Agent Workflow

**定义**: 多步骤任务的自动化编排，包括工作流设计、执行、状态管理等。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 步骤编排 | 任务步骤的顺序和依赖 | Cron + Heartbeat |
| 条件分支 | 根据条件选择路径 | Agent Loop |
| 迭代 | 循环执行直到完成 | Agent Loop |
| 状态持久化 | 工作流状态的保存 | Memory |

**相关项目**: dify, FastGPT, trigger.dev, CrewAI

---

### 7. Agent Orchestra

**定义**: 有计划、有角色分配的多 Agent 协调，强调结构化的协作模式。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 角色分配 | 根据能力分配角色 | subagents |
| 协调同步 | Agent 间的同步 | sessions_send |
| 通信协议 | Agent 间消息传递 | Message |
| 任务委托 | 主 Agent 向子 Agent 分发 | sessions_spawn |

---

### 8. Agent Swarm

**定义**: 大规模、自组织的 Agent 群体，行为是涌现性的，非完全预设的。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 涌现协调 | 非完全预设的协调 | 墨家共享知识库 |
| 分布式决策 | 分散决策机制 | 多 Agent 协作 |
| 大规模扩展 | 支持大量 Agent | Scalability |
| 自适应角色 | 动态角色调整 | Role Assignment |

**相关项目**: swarm (OpenAI), swarms, agency-swarm

---

### 9. Message Channel

**定义**: Agent 与外部系统、用户、其他 Agent 之间的消息通信基础设施。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 协议支持 | WebSocket, HTTP, Webhook 等 | Gateway |
| 消息队列 | 异步消息处理 | Task Queue |
| 多渠道支持 | Telegram, Discord, 飞书等 | Channels |
| 路由 | 消息路由到正确的目标 | Message Router |

**相关项目**: pulso, EzCoworker, orka

---

### 10. Agent Coworker

**定义**: 与人类协作者的 AI Agent，强调人机协作。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 人机交互 | 与人类用户交互 | Telegram/飞书等 |
| 任务协作 | 与人类分担任务 | Agent Loop |
| 个性化适应 | 根据用户调整行为 | USER.md |
| 共享上下文 | 与人类共享工作上下文 | Workspace |

---

### 11. Agent Sandbox

**定义**: Agent 代码的安全隔离执行环境，防止恶意代码影响宿主系统。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 进程隔离 | 隔离的进程空间 | Runtime Sandbox |
| 资源限制 | CPU、内存、网络限制 | Resource Limit |
| 安全策略 | 权限控制、访问限制 | Security |
| 有状态工作负载 | 持久化状态 | Memory |

**相关项目**: OpenSandbox, agent-sandbox, tensorlake, capsule, ironcurtain

---

### 12. 架构与高并发高扩展

**定义**: 分布式系统架构，支持高并发、高可用、水平扩展。

**核心组成**:
| 组件 | 说明 | 对应 OpenClaw |
|------|------|---------------|
| 分布式架构 | 微服务、无服务器 | Scalability |
| 负载均衡 | 请求分发 | Gateway |
| 容错 | 故障转移、自愈 | Availability |
| 高可用 | 多副本、自恢复 | Health Check |
| 消息队列 | 异步处理、削峰 | Task Queue |

---

## 三、维度重叠分析

### 重叠矩阵

| 维度 | 重叠维度 | 重叠原因 |
|------|----------|----------|
| Agent-Infra | Agent-Harness | 都涉及部署和工具 |
| Agent-Infra | Scalability | 都涉及扩展能力 |
| Agent-Harness | Agent-Runtime | 都涉及运行时环境 |
| Agent-Harness | Plugin-System | 都涉及扩展机制 |
| Agent-Runtime | Agent-Sandbox | 都涉及隔离执行 |
| Agent-Runtime | State-Management | 都涉及状态管理 |
| Agent-Native | Agentic-Tools | 原生 vs 外部工具 |
| Agentic-Tools | Tool-System | 工具系统 |
| Agent Workflow | Planning | 都涉及任务规划 |
| Agent Workflow | Execution-Flow | 都涉及执行流程 |
| Agent Orchestra | Agent Swarm | 多 Agent 协作 |
| Agent Orchestra | Multi-Agent-Comm | Agent 间通信 |
| Agent Swarm | Scalability | 大规模扩展 |
| Message-Channel | Channel-Integration | 渠道集成 |
| Message-Channel | Message-Routing | 消息路由 |
| Agent Coworker | User-Interaction | 人机交互 |
| Agent Coworker | Coordination | 任务协调 |
| Agent Sandbox | Security | 安全机制 |
| Agent Sandbox | Runtime-Sandbox | 沙箱隔离 |

---

## 四、合并建议

| 合并建议 | 原维度 | 合并后 |
|----------|--------|--------|
| **Agent-Infra + Agent-Harness** | agent-infra, agent-harness | `agent-platform` |
| **Agent-Orchestra + Agent-Swarm** | agent-orchestra, agent-swarm | `multi-agent-system` |
| **Agent-Coworker + User-Interaction** | agent-coworker, user-interaction | `human-agent-collaboration` |
| **Message-Channel + Channel-Integration** | message-channel, channel-integration | `communication-channel` |
| **Agentic-Tools + Tool-System** | agentic-tools, tool-system | `tool-ecosystem` |

---

## 五、OpenClaw 维度映射

| OpenClaw 组件 | 对应维度 | 说明 |
|---------------|---------|------|
| prompts/ | Agent-Native | 系统提示词 |
| skills/ | Tool-Ecosystem | 技能系统 |
| cron + heartbeat | Agent-Workflow | 调度系统 |
| workspace/ | Runtime + Platform | 工作空间 |
| memory/ | Memory-System | 记忆系统 |
| channels/ | Communication-Channel | 渠道集成 |
| tools/ | Tool-Ecosystem | 工具 |
| subagents/ | Multi-Agent-System | 子Agent |
| shared/ | Coordination | 共享知识库 |
| six-layer/ | All Layers | 六层架构 |

---

## 六、新发现需补充的维度

| 维度 | 说明 | 是否已有 |
|------|------|---------|
| `A2A-Protocol` | Agent-to-Agent 协议 | ❌ |
| `MCP-Integration` | Model Context Protocol | ❌ |
| `Enterprise-Integration` | 企业系统集成（SSO、LDAP等）| ❌ |
| `Evaluation` | Agent 效果评估 | ❌ |

---

*分析版本: 2026-04-21*
*数据来源: GitHub API, OpenClaw 源码分析*