# Agent 系统维度架构图

> 基于 GitHub 行业研究与 OpenClaw 源码分析
> 更新时间: 2026-04-21

---

## 1. OpenClaw 基础六层架构

来自 `1.2_architecture.md`

```mermaid
graph TB
    subgraph "用户层"
        U1[飞书]
        U2[企业微信]
        U3[钉钉]
        U4[Telegram]
        U5[Discord]
        U6[Web]
    end

    subgraph "Gateway 层"
        G1[消息路由]
        G2[会话管理]
        G3[渠道适配]
        G4[权限控制]
        G5[安全拦截]
    end

    subgraph "Agent 层"
        A1[任务规划]
        A2[意图理解]
        A3[工具选择]
        A4[状态管理]
        A5[错误恢复]
    end

    subgraph "Model 层"
        M1[LLM 调用]
        M2[模型路由]
        M3[多模型 failover]
        M4[流式输出]
        M5[Token 统计]
    end

    subgraph "Tools 层"
        T1[内置工具]
        T2[Skills]
        T3[Plugins]
    end

    subgraph "System 层"
        S1[文件系统]
        S2[命令行]
        S3[浏览器]
        S4[日历]
        S5[API]
    end

    U1 --> G1
    U2 --> G1
    U3 --> G1
    U4 --> G1
    U5 --> G1
    U6 --> G1

    G1 --> A1
    A1 --> M1
    M1 --> T1
    T1 --> S1
```

---

## 2. 墨家六层架构

来自 `7.x_six_layer_framework.md`

```mermaid
graph TB
    subgraph "第6层: 用户体验层 (UX)"
        UX[终端输出<br/>回复风格<br/>感知体验]
    end

    subgraph "第5层: 合规和风控层"
        COMP[底线保障<br/>规范边界<br/>硬性/软性规则]
    end

    subgraph "第4层: 领域专业能力层"
        DOMAIN[差异化竞争力<br/>专业深度<br/>Level3 决策]
    end

    subgraph "第3层: Agent团队协作层"
        MULTI[跨域协作<br/>sessions_send<br/>能力扩展]
    end

    subgraph "第2层: 外部知识层"
        KNOW[信息获取<br/>RAG/搜索<br/>平台API]
    end

    subgraph "第1层: Agent能力层"
        CORE[推理能力<br/>记忆能力<br/>工具能力<br/>角色扮演<br/>自主性]
    end

    UX --> COMP
    COMP --> DOMAIN
    DOMAIN --> MULTI
    MULTI --> KNOW
    KNOW --> CORE
```

---

## 3. 六层记忆架构

来自 `梦境系统详解.md`

```mermaid
graph TB
    subgraph "Layer 6: 外部知识库"
        L6[向量数据库<br/>外部文档<br/>第三方知识]
    end

    subgraph "Layer 5: 向量数据库"
        L5[lancedb/<br/>语义搜索<br/>Embedding]
    end

    subgraph "Layer 4: 共享知识库"
        L4[shared/<br/>跨Agent共享<br/>墨家协议]
    end

    subgraph "Layer 3: 纠正记录"
        L3[corrections.md<br/>用户纠正<br/>偏好记录]
    end

    subgraph "Layer 2: 长期记忆"
        L2[MEMORY.md<br/>蒸馏精华<br/>高置信度]
    end

    subgraph "Layer 1: 每日日志"
        L1[memory/YYYY-MM-DD.md<br/>原始记录<br/>待蒸馏]
    end

    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> L5
    L5 --> L6
```

---

## 4. Agent 系统完整分层架构

```mermaid
graph TB
    subgraph "🌐 人机协作层 (Human-Agent Layer)"
        H1[Human-Agent Collaboration<br/>人机协作]
        H2[Agent Coworker<br/>Agent 同事]
        H3[User Interaction<br/>用户交互]
    end

    subgraph "🔄 多 Agent 层 (Multi-Agent Layer)"
        M1[Multi-Agent System<br/>多Agent系统]
        M2[Agent Orchestra<br/>Agent 管弦乐团]
        M3[Agent Swarm<br/>Agent 蜂群]
        M4[Coordination<br/>协调能力]
    end

    subgraph "⚙️ 工作流层 (Workflow Layer)"
        W1[Agent Workflow<br/>工作流编排]
        W2[Goal Decomposition<br/>目标分解]
        W3[Planning<br/>规划能力]
        W4[Self-Correction<br/>自纠正能力]
    end

    subgraph "🛠️ 工具生态层 (Tool Ecosystem Layer)"
        T1[Tool Ecosystem<br/>工具生态]
        T2[Tool Selection<br/>工具选择]
        T3[Tool Execution<br/>工具执行]
        T4[Tool Composition<br/>工具组合]
    end

    subgraph "📡 通信层 (Communication Layer)"
        C1[Communication Channel<br/>通信渠道]
        C2[Message Routing<br/>消息路由]
        C3[Channel Integration<br/>渠道集成]
        C4[A2A Protocol<br/>Agent间协议]
    end

    subgraph "⚡ 运行时层 (Runtime Layer)"
        R1[Agent Runtime<br/>运行时环境]
        R2[Agent Sandbox<br/>沙箱隔离]
        R3[Execution Flow<br/>执行流程]
        R4[State Management<br/>状态管理]
    end

    subgraph "🏗️ 平台层 (Platform Layer)"
        P1[Agent Platform<br/>Agent平台]
        P2[Agent Harness<br/>Agent骨架]
        P3[Plugin System<br/>插件系统]
    end

    subgraph "🛡️ 治理层 (Governance Layer)"
        G1[Governance<br/>治理]
        G2[Lifecycle Management<br/>生命周期管理]
        G3[Cost Control<br/>成本控制]
        G4[Security<br/>安全机制]
    end

    subgraph "🧠 核心能力层 (Native Layer)"
        N1[Agent Native<br/>原生能力]
        N2[Perceive<br/>感知]
        N3[Reason<br/>推理]
        N4[Act<br/>行动]
    end

    subgraph "🗄️ 记忆层 (Memory Layer)"
        MEM1[Memory System<br/>记忆系统]
        MEM2[Short-term Memory<br/>短期记忆]
        MEM3[Long-term Memory<br/>长期记忆]
        MEM4[Learning<br/>学习能力]
    end

    %% 层间关系
    H1 --> M1
    M1 --> W1
    W1 --> T1
    T1 --> C1
    C1 --> R1
    R1 --> P1
    P1 --> G1
    N1 --> R1
    MEM1 --> N1
```

---

## 5. 维度重叠与合并关系

```mermaid
graph LR
    subgraph "合并前"
        A1[Agent-Infra<br/>基础设施]
        A2[Agent-Harness<br/>骨架]
        O1[Agent-Orchestra<br/>管弦乐团]
        O2[Agent-Swarm<br/>蜂群]
        C1[Message-Channel<br/>消息通道]
        C2[Channel-Integration<br/>渠道集成]
    end

    subgraph "合并后"
        P1[Agent-Platform<br/>Agent平台]
        M1[Multi-Agent-System<br/>多Agent系统]
        CM[Communication<br/>通信渠道]
    end

    A1 -->|<分析后合并>| P1
    A2 -->|<分析后合并>| P1
    O1 -->|<分析后合并>| M1
    O2 -->|<分析后合并>| M1
    C1 -->|<分析后合并>| CM
    C2 -->|<分析后合并>| CM
```

---

## 6. Agent-Runtime 内部架构

```mermaid
graph TB
    subgraph "Agent Runtime"
        subgraph "执行引擎"
            E1[Execution Flow<br/>执行流程]
            E2[State Machine<br/>状态机]
            E3[Checkpoint<br/>检查点]
        end

        subgraph "工具系统"
            T1[Tool Registry<br/>工具注册]
            T2[Tool Executor<br/>工具执行器]
            T3[Sandbox<br/>沙箱]
        end

        subgraph "记忆系统"
            M1[Context Manager<br/>上下文管理]
            M2[Memory Store<br/>记忆存储]
            M3[Compaction<br/>压缩]
        end

        subgraph "通信"
            C1[Message Handler<br/>消息处理]
            C2[Response Generator<br/>响应生成]
        end
    end

    E1 --> E2
    E2 --> E3
    T1 --> T2
    T2 --> T3
    M1 --> M2
    M2 --> M3
    C1 --> C2
```

---

## 7. Multi-Agent 系统架构

```mermaid
graph TB
    subgraph "Multi-Agent System"
        subgraph "协调层"
            CO1[Coordinator<br/>协调器]
            CO2[Role Assigner<br/>角色分配器]
            CO3[Task Delegator<br/>任务委托器]
        end

        subgraph "Agent 群体"
            A1[Agent-1]
            A2[Agent-2]
            A3[Agent-N]
        end

        subgraph "通信层"
            COM1[Message Bus<br/>消息总线]
            COM2[A2A Protocol<br/>A2A协议]
            COM3[Shared Context<br/>共享上下文]
        end

        subgraph "记忆共享"
            SM1[Shared Memory<br/>共享记忆]
            SM2[Knowledge Base<br/>知识库]
        end
    end

    CO1 --> CO2
    CO2 --> CO3
    CO3 --> A1
    CO3 --> A2
    CO3 --> A3
    A1 <--> COM1
    A2 <--> COM1
    A3 <--> COM1
    COM1 --> COM2
    COM2 --> COM3
    COM3 --> SM1
    SM1 --> SM2
```

---

## 8. OpenClaw 源码组件分层

```mermaid
graph TB
    subgraph "用户接入层"
        UI[Web UI]
        CLI[CLI 客户端]
        MOBILE[移动应用]
        WS[WebSocket]
    end

    subgraph "Gateway Server"
        AUTH[Auth Manager<br/>认证管理]
        ROUTER[Message Router<br/>消息路由]
        CHANNELS[Channel Manager<br/>渠道管理]
    end

    subgraph "核心引擎"
        AGENT[Agent Loop<br/>Agent循环]
        TOOLS[Tool Registry<br/>工具注册]
        MEMORY[Memory Manager<br/>记忆管理]
    end

    subgraph "扩展层"
        PLUGINS[Plugin Runtime<br/>插件运行时]
        SKILLS[Skills System<br/>技能系统]
    end

    subgraph "外部服务"
        LLM[LLM Provider<br/>OpenAI/Claude]
        API[外部 API]
    end

    subgraph "数据层"
        REDIS[(Redis<br/>会话缓存)]
        FS[(文件系统)]
    end

    UI --> WS
    CLI --> WS
    MOBILE --> WS
    WS --> AUTH
    AUTH --> ROUTER
    ROUTER --> AGENT
    AGENT --> TOOLS
    AGENT --> MEMORY
    AGENT --> LLM
    TOOLS --> API
    PLUGINS -.-> TOOLS
    CHANNELS -.-> LLM
    MEMORY --> REDIS
    MEMORY --> FS
```

---

## 9. 消息处理分层

```mermaid
graph LR
    subgraph "1. 渠道适配层"
        IN1[Telegram]
        IN2[Discord]
        IN3[飞书]
        ADAPTER[Channel Adapter<br/>协议转换<br/>身份映射]
    end

    subgraph "2. 消息路由层"
        ROUTER[Message Router<br/>会话查找<br/>速率限制]
    end

    subgraph "3. 上下文构建层"
        CONTEXT[Context Builder<br/>历史加载<br/>系统提示注入]
    end

    subgraph "4. LLM 调用层"
        LLM[Model Provider<br/>连接池<br/>流式传输]
    end

    subgraph "5. 响应解析层"
        PARSER[Response Parser<br/>工具调用检测]
    end

    subgraph "6. 输出层"
        OUT[Streaming Output<br/>流式输出]
        TOOL[Tool Executor<br/>工具执行]
    end

    IN1 --> ADAPTER
    IN2 --> ADAPTER
    IN3 --> ADAPTER
    ADAPTER --> ROUTER
    ROUTER --> CONTEXT
    CONTEXT --> LLM
    LLM --> PARSER
    PARSER --> OUT
    PARSER --> TOOL
    TOOL --> LLM
```

---

## 10. 治理与管理层

```mermaid
graph TB
    subgraph "Lifecycle Management"
        L1[Creation<br/>创建]
        L2[Initialization<br/>初始化]
        L3[Pause/Resume<br/>暂停/恢复]
        L4[Graceful Shutdown<br/>优雅停止]
    end

    subgraph "Observability"
        O1[Metrics<br/>指标]
        O2[Logging<br/>日志]
        O3[Tracing<br/>追踪]
        O4[Alerting<br/>告警]
    end

    subgraph "Cost Control"
        C1[Token Tracking<br/>Token追踪]
        C2[Budget Alert<br/>预算告警]
        C3[Cost Attribution<br/>成本归属]
    end

    subgraph "Security"
        S1[Authentication<br/>认证]
        S2[Authorization<br/>授权]
        S3[Audit Log<br/>审计日志]
    end

    L1 --> O1
    O1 --> O2
    O2 --> O3
    O3 --> O4
    L1 --> C1
    C1 --> C2
    C2 --> C3
    L1 --> S1
    S1 --> S2
    S2 --> S3
```

---

## 图例

| 符号 | 含义 |
|------|------|
| 🧠 | 核心能力 |
| 🛠️ | 工具 |
| 🗄️ | 记忆 |
| ⚙️ | 工作流 |
| 🔄 | 多Agent |
| 📡 | 通信 |
| ⚡ | 运行时 |
| 🏗️ | 平台 |
| 🛡️ | 治理 |
| 🌐 | 扩展 |
| 👤 | 人机协作 |

---

*架构图版本: 2026-04-21*