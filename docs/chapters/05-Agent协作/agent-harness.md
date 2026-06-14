# Agent Harness——OpenClaw 的工具骨架

> Agent Harness 是连接"有 LLM"和"有可靠的 Agent"之间的缺失层
> 本文档分析 GitHub 最新项目并对标 OpenClaw 实现

---

## 1. 什么是 Agent Harness

### 定义

```
Harness = 工具系统 + 技能包 + 记忆管理 + 审批工作流 + 扩展机制
```

它是 Agent 的"骨架"，提供：
- 工具的发现、选择、执行
- 技能的组合和复用
- 记忆的持久化和检索
- 执行前的审批机制
- MCP 协议支持

### GitHub 代表项目

| 项目 | Stars | 核心功能 |
|------|-------|---------|
| `harness-kit` | ⭐2.3k | Agent 基础设施层 |
| `EvoHarness` | ⭐1.2k | 终端原生 Agent 基础设施 |
| `agent-harness-skill` | - | Claude Code 兼容的 Harness |
| `agent-flywheel` | ⭐1.4k | 多 Agent 开发环境 |

---

## 2. OpenClaw Harness 架构

### 现有组件对标

| Harness 组件 | OpenClaw 实现 | 文档位置 |
|--------------|--------------|---------|
| 工具系统 | Tools + Skills | `08_插件与工具/` |
| 技能包 | Skills | `10_工具与Skills系统/` |
| 记忆管理 | Memory | `06_上下文与记忆/` |
| 审批工作流 | exec approval | `21.x1_exec_approval.md` |
| MCP 协议 | MCP 支持 | `18_Skills开发/` |
| 执行框架 | Agent Loop | `03_Agent运行循环/` |

---

## 3. OpenClaw Harness 配置

### 工具注册

```yaml
# openclaw.yaml
tools:
  # 内置工具
  builtin:
    - read
    - write
    - exec
    - fetch
    - browser

  # 工具组
  groups:
    filesystem:
      - read
      - write
      - edit
      - glob
    runtime:
      - exec
      - bash
    web:
      - fetch
      - browser
      - webhook
    memory:
      - memory_search
      - memory_write
      - memory_get

  # 工具权限
  permissions:
    filesystem:
      allowedPaths:
        - "${workspace}/**"
      deniedPaths:
        - "~/.ssh/**"
        - "/etc/**"
```

### Skills 配置

```yaml
skills:
  # 全局 Skills 目录
  globalPath: ~/.openclaw/skills/

  # 安装的 Skills
  installed:
    - name: github
      path: ~/.openclaw/skills/github
      enabled: true
    - name: browser
      path: ~/.openclaw/skills/browser
      enabled: true
    - name: memory
      path: ~/.openclaw/skills/memory
      enabled: true
```

### 审批工作流

```yaml
exec:
  # 执行审批
  approval:
    # 高风险命令需要审批
    required:
      - pattern: "^rm -rf"
        message: "确认删除操作"
      - pattern: "^curl.*\|.*sh"
        message: "确认管道执行"
      - pattern: "^git push"
        message: "确认推送到远程"

    # 自动审批（低风险命令）
    autoApprove:
      - pattern: "^ls"
      - pattern: "^cat"
      - pattern: "^pwd"
```

---

## 4. OpenClaw Agent Loop 作为 Harness 核心

```
┌─────────────────────────────────────────────────────────────────┐
│                      OpenClaw Agent Loop                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐             │
│  │  System   │───▶│  Memory   │───▶│  Tools   │             │
│  │  Prompt   │    │  Manager  │    │  Select  │             │
│  └───────────┘    └───────────┘    └───────────┘             │
│        │                                      │                  │
│        │                                      ▼                  │
│        │              ┌───────────┐    ┌───────────┐         │
│  ┌─────┴─────────────▶│    LLM   │◀───│  Tool    │         │
│  │                    │  Provider │    │  Executor │         │
│  │                    └───────────┘    └───────────┘         │
│  │                                                 │             │
│  │                    ┌───────────┐               │             │
│  └────────────────────│ Response  │◀─────────────┘             │
│                       │  Builder   │                              │
│                       └───────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. OpenClaw 与 harness-kit 对标

### harness-kit 核心概念

```typescript
// harness-kit 的设计
interface AgentHarness {
  // 工具层
  tools: ToolRegistry;
  
  // 技能层
  skills: SkillComposer;
  
  // 记忆层
  memory: MemoryManager;
  
  // 审批层
  approvals: ApprovalWorkflow;
  
  // MCP 层
  mcp: MCPClient;
}
```

### OpenClaw 对应实现

```typescript
// OpenClaw 的对应实现
interface OpenClawHarness {
  // 工具层
  tools: {
    registry: ToolRegistry;  // src/tools/registry.ts
    selector: ToolSelector;  // 工具选择
    executor: ToolExecutor; // 工具执行
  };
  
  // 技能层
  skills: {
    loader: SkillLoader;      // src/skills/loader.ts
    composer: SkillComposer;   // 技能组合
    registry: SkillRegistry;  // 技能注册
  };
  
  // 记忆层
  memory: {
    context: ContextManager;     // 上下文
    shortTerm: ShortTermMemory;  // 短期记忆
    longTerm: LongTermMemory;     // 长期记忆
    vector: VectorMemory;         // 向量记忆
  };
  
  // 审批层
  approvals: {
    executor: ExecApproval;       // 执行审批
    policies: PolicyEngine;       // 策略引擎
  };
  
  // 扩展层
  extensions: {
    plugins: PluginRuntime;       // 插件
    channels: ChannelManager;     // 渠道
  };
}
```

---

## 6. OpenClaw Harness 最佳实践

### 工具分组策略

```yaml
# 将工具按功能分组，便于管理和权限控制
tools:
  groups:
    # 基础操作（所有 Agent 默认可用）
    basic:
      - read
      - write
      - glob
      - exec:pwd
      - exec:ls

    # 文件操作（需要审批）
    file_operations:
      - write
      - edit
      - exec:rm
      - exec:cp
      - exec:mkdir

    # 网络操作（高风险）
    network:
      - fetch
      - webhook
      - browser
      require_approval: true

    # 开发操作
    development:
      - exec:git
      - exec:npm
      - exec:docker
      require_approval: true
```

### 技能组合示例

```yaml
# 创建一个数据分析技能包
skills:
  compose:
    data_analysis:
      name: 数据分析助手
      tools:
        - read        # 读取数据文件
        - fetch       # 获取外部数据
        - exec:python # 执行 Python 脚本
        - write       # 输出结果
      skills:
        - code-interpreter
        - data-visualization
      memory:
        short_term: 50
        long_term: true
```

---

## 7. 缺失功能与改进建议

### 当前缺失

| 功能 | 说明 | 优先级 |
|------|------|--------|
| MCP Server | OpenClaw 作为 MCP Server | 高 |
| 工具版本管理 | 工具的版本控制和回滚 | 中 |
| 工具市场 | 工具的发现和安装 | 中 |
| Harness 监控面板 | 工具调用统计和性能 | 低 |

### 改进建议

```yaml
# 建议新增配置
harness:
  # 工具版本管理
  versioning:
    enabled: true
    storage: ~/.openclaw/tool-versions/

  # 工具发现
  discovery:
    registry: https://registry.openclaw.ai
    auto_update: false

  # 监控
  monitoring:
    enabled: true
    metrics:
      - tool_call_count
      - tool_call_duration
      - tool_error_rate
```

---

## 8. 相关文档

| 文档 | 说明 |
|------|------|
| `08_插件与工具/` | 工具系统详解 |
| `10_工具与Skills系统/` | Skills 使用指南 |
| `18_Skills开发/` | 开发自定义 Skill |
| `03_Agent运行循环/3.1_agent_loop.md` | Agent Loop 详解 |

---

*文档版本: 2026-04-21*