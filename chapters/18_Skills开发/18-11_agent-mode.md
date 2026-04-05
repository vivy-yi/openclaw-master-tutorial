# Agent 模式详解

> 本章介绍 OpenClaw Agent 支持的各种运行模式，包括 Sandbox、Session、Subagent、Thread 等。

---

## 1. Agent 模式概览

OpenClaw Agent 支持多种运行模式，用于控制：
- 隔离级别（沙箱）
- 会话管理方式
- 子 Agent 调用方式
- 线程绑定机制

---

## 2. Sandbox 沙箱模式

### 2.1 模式类型

| 模式 | 说明 | 使用场景 |
|------|------|----------|
| `"off"` | 关闭沙箱，运行在主机 | 开发测试 |
| `"non-main"` | 非 main session 运行在沙箱 | 生产环境推荐 |
| `"all"` | 所有 session 都运行在沙箱 | 高安全要求 |

### 2.2 Scope 作用域

| Scope | 说明 |
|--------|------|
| `"session"` | 每个 session 一个容器 |
| `"agent"` | 每个 Agent 一个容器（共享） |
| `"shared"` | 所有 Agent 共享容器 |

### 2.3 配置示例

```json5
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main",  // off | non-main | all
        scope: "agent"      // session | agent | shared
      }
    }
  }
}
```

---

## 3. Session 会话模式

### 3.1 DM Scope 类型

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `"main"` | 所有 DM 共享主 session | 个人助手 |
| `"per-peer"` | 每用户一个 session | 多用户共享 |
| `"per-channel-peer"` | 每渠道每用户 | 推荐生产使用 |
| `"per-account-channel-peer"` | 多账号场景 | 企业部署 |

### 3.2 Thread Bindings

| 配置 | 说明 | 默认值 |
|------|------|--------|
| `enabled` | 启用线程绑定 | false |
| `idleHours` | 空闲多少小时后解绑 | 24 |
| `maxAgeHours` | 最大绑定时间 | 0（不限制） |

### 3.3 配置示例

```json5
{
  session: {
    dmScope: "per-channel-peer",
    threadBindings: {
      enabled: true,
      idleHours: 24,
      maxAgeHours: 0
    },
    reset: {
      mode: "daily",
      atHour: 4,
      idleMinutes: 120
    }
  }
}
```

---

## 4. Subagent 子 Agent 模式

### 4.1 Spawn 模式

| 模式 | 说明 |
|------|------|
| `"run"` | 一次性运行，完成后 announce 结果 |
| `"session"` | 持久 session，支持线程绑定 |

### 4.2 Thread 绑定

| 模式 | 说明 |
|------|------|
| `thread: false` | 不绑定线程（默认） |
| `thread: true` | 绑定到当前线程 |

### 4.3 Spawn 配置

```json5
{
  agents: {
    defaults: {
      subagents: {
        maxSpawnDepth: 2,           // 最大嵌套深度 (1-5)
        maxChildrenPerAgent: 5,    // 每个 Agent 最大子数
        maxConcurrent: 8,          // 全局并发上限
        runTimeoutSeconds: 900     // 默认超时 (0=无限制)
      }
    }
  }
}
```

### 4.4 嵌套深度

| 深度 | Session Key | 角色 | 可 Spawn |
|------|-------------|------|---------|
| 0 | `agent:<id>:main` | 主 Agent | 始终可以 |
| 1 | `agent:<id>:subagent:<uuid>` | 子 Agent | `maxSpawnDepth >= 2` |
| 2 | `agent:<id>:subagent:<uuid>:subagent:<uuid>` | 孙 Agent | 永远不能 |

### 4.5 调用示例

```javascript
// 一次性子 Agent
sessions_spawn({
  task: "执行任务描述",
  mode: "run",           // run | session
  agentId: "mo-finance"   // 可选，指定 Agent
})

// 持久线程子 Agent
sessions_spawn({
  task: "持续对话任务",
  mode: "session",
  thread: true
})
```

---

## 5. Agent 通信模式

### 5.1 通信类型

| 类型 | 说明 | 使用场景 |
|------|------|----------|
| **delegate** | 主 Agent 分发任务 | 任务分发 |
| **spawn** | 创建新会话执行 | 独立任务 |
| **session** | 绑定持久会话 | 持续对话 |

### 5.2 调用流程

```
主 Agent (main)
    │
    ├── delegate → 子 Agent A
    │                │
    │                └── run → 返回结果
    │
    ├── spawn → 子 Agent B (新 session)
    │                │
    │                └── session + thread → 持久对话
    │
    └── session → 子 Agent C (绑定 session)
                     │
                     └── 持续交互
```

---

## 6. 跨群调用子 Agent

### 6.1 配置 allowAgents

要让其他 Agent 调用目标 Agent 的子 Agent，需要在目标 Agent 的 `subagents.allowAgents` 中添加：

```json5
{
  "id": "mo-finance",
  "name": "墨财",
  "subagents": {
    "allowAgents": [
      "墨股神",           // 原有
      "mo量投",           // 同群新增
      "paper-墨搜"         // 跨群添加
    ]
  }
}
```

### 6.2 跨群调用示例

```javascript
// 在 paper-assistant 中调用 mo-finance 的子 Agent
sessions_spawn({
  agentId: "mo-finance",
  task: "查询股票行情",
  mode: "run"
})
```

---

## 7. Agent 层级结构示例

```
main (主控)
├── paper-assistant (论文助手)
│   ├── paper-墨搜
│   ├── paper-墨析
│   ├── paper-墨润
│   └── paper-墨论
│
├── mo-finance (墨财)
│   ├── 墨股神
│   ├── 墨量投
│   ├── mo-hongguan (墨宏观)
│   └── mo-fengkong (墨风控)
│
├── mo-yunying (墨营)
│   ├── 墨SE
│   ├── 墨用
│   └── 总监
│
├── mo-richang
│   ├── mo-richang-墨讯
│   └── mo-richang-墨鉴
│
├── shenghuo (生活服务)
│   ├── 墨学
│   ├── 墨惠
│   ├── 墨修
│   ├── 墨管家
│   └── 墨食
│
└── game-director (游戏产业)
    ├── game-researcher
    ├── game-builder
    ├── game-art-director
    └── game-pm
```

---

## 8. 运行时类型

| 运行时 | 说明 | 使用场景 |
|--------|------|----------|
| `"subagent"` | OpenClaw 内置 subagent | 常规任务 |
| `"acp"` | ACP harness | Codex, Claude Code 等 |

### 配置示例

```javascript
// 使用内置 subagent
sessions_spawn({
  runtime: "subagent",
  task: "任务描述",
  mode: "run"
})

// 使用 ACP (Codex)
sessions_spawn({
  runtime: "acp",
  agentId: "codex",
  mode: "session",
  thread: true
})
```

---

## 9. 工具策略

### 9.1 工具权限

| 深度 | 可用工具 |
|------|---------|
| Depth 0 (主) | 所有工具 |
| Depth 1 (orchestrator) | `sessions_spawn`, `subagents`, `sessions_list`, `sessions_history` |
| Depth 1 (leaf) | 无 session 工具 |
| Depth 2 | 无任何 session 工具 |

### 9.2 配置工具限制

```json5
{
  agents: {
    defaults: {
      subagents: {
        tools: {
          deny: ["gateway", "cron"],  // 拒绝的工具
          allow: ["read", "exec"]      // 只允许的工具
        }
      }
    }
  }
}
```

---

## 10. 最佳实践

### 10.1 模式选择指南

| 场景 | 推荐模式 |
|------|---------|
| 快速一次性任务 | `mode: "run"` |
| 需要持续对话 | `mode: "session"` + `thread: true` |
| 并行处理 | `maxConcurrent: 8` + `mode: "run"` |
| 嵌套协调 | `maxSpawnDepth: 2` |

### 10.2 安全建议

1. **沙箱隔离**：生产环境使用 `"mode: "non-main""` 或 `"all"`
2. **工具限制**：subagent 使用 `tools.deny` 限制危险操作
3. **超时设置**：设置 `runTimeoutSeconds` 防止无限运行
4. **并发控制**：设置 `maxConcurrent` 防止资源耗尽

### 10.3 性能优化

1. **模型选择**：subagent 使用更便宜的模型
2. **嵌套深度**：不建议超过 2 层
3. **超时配置**：合理设置超时避免资源浪费
4. **并发限制**：`maxChildrenPerAgent` 防止过多子进程

---

## 11. 常见问题

### Q: 如何让子 Agent 调用其他子 Agent？

A: 设置 `maxSpawnDepth: 2`，深度 1 的 orchestrator 可以 spawn 深度 2 的 worker。

### Q: subagent 的结果如何返回？

A: 通过 announce 机制，结果会自动 announce 到请求者的 chat channel。

### Q: 如何控制子 Agent 的生命周期？

A: 使用 `/subagents kill <id>` 或 `/stop` 命令可以停止子 Agent。

---

*最后更新: 2026-03-29*
