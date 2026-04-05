# OpenClaw Agent 类型详解：Persistent / Subagent / ACP

> 深入理解 OpenClaw 中的三种 Agent 运行模式
> 日期：2026-03-27

---

## 1. 三种 Agent 类型概览

| 类型 | 运行环境 | 隔离性 | 生命周期 | 典型用途 |
|------|----------|--------|----------|---------|
| **Persistent Agent** | OpenClaw 内置 | Workspace 隔离 | 持久存在 | 业务Agent（高考/金融/生活） |
| **Subagent** | OpenClaw 内置 | Session 隔离 | 临时任务 | 代码调试/内容创作 |
| **ACP Agent** | 外部 Harness | 完全独立 | 持久/临时 | Codex/Claude Code 编程 |

---

## 2. Persistent Agent（持久化 Agent）

### 2.1 什么是 Persistent Agent

Persistent Agent = 绑定到特定 Workspace 的持久化 Agent，与 Gateway 共存亡。

```
Gateway 启动
    ↓
加载 Persistent Agent
    ↓
Workspace 初始化（SOUL.md / AGENTS.md / USER.md）
    ↓
Agent 持续运行，等待消息
    ↓
Gateway 关闭
    ↓
Agent 终止
```

### 2.2 核心特性

| 特性 | 说明 |
|------|------|
| **Workspace 隔离** | 每个 Agent 有独立的工作目录 |
| **独立 Session Store** | `~/.openclaw/agents/<agentId>/sessions/` |
| **独立 Auth** | `~/.openclaw/agents/<agentId>/agent/auth-profiles.json` |
| **独立 Skills** | 可共享 `~/.openclaw/skills/` 或私有 `workspace/skills/` |
| **Binding 路由** | 通过 `bindings` 配置绑定到特定群/频道 |

### 2.3 创建 Persistent Agent

```bash
# 使用向导创建
openclaw agents add gaokao-service

# 手动创建
openclaw agents add custom --workspace ~/.openclaw/workspaces/gaokao
```

### 2.4 配置示例

```json5
{
  agents: {
    list: [
      {
        id: "main",
        default: true,
        workspace: "~/.openclaw/workspace",
      },
      {
        id: "gaokao-service",
        workspace: "~/.openclaw/workspaces/gaokao",
        agentDir: "~/.openclaw/agents/gaokao-service/agent",
      },
      {
        id: "shenghuo",
        workspace: "~/.openclaw/workspaces/shenghuo",
        agentDir: "~/.openclaw/agents/shenghuo/agent",
      },
    ],
  },
  bindings: [
    // DM → main
    { agentId: "main", match: { channel: "telegram", chatType: "direct" } },
    // 高考群 → gaokao-service
    { agentId: "gaokao-service", match: { channel: "telegram", chatId: "-5154981764" } },
    // 生活群 → shenghuo
    { agentId: "shenghuo", match: { channel: "telegram", chatId: "-5153278498" } },
  ],
}
```

### 2.5 Session Key 格式

| 会话类型 | Session Key 格式 |
|---------|------------------|
| DM (main) | `agent:main:main` |
| DM (其他Agent) | `agent:<agentId>:main` |
| 群聊 | `agent:<agentId>:telegram:group:<chatId>` |
| 主题 | `agent:<agentId>:telegram:group:<chatId>:topic:<threadId>` |

### 2.6 Workspace 文件加载

```
Agent 启动
    ↓
SOUL.md ──→ 人格定义
    ↓
USER.md ──→ 用户信息
    ↓
AGENTS.md ──→ 行为规则 + 记忆指导
    ↓
IDENTITY.md ──→ 名称/emoji（可选）
    ↓
TOOLS.md ──→ 本地工具备注（可选）
    ↓
Skills ──→ 按需加载
```

---

## 3. Subagent（子 Agent）

### 3.1 什么是 Subagent

Subagent = 由 Parent Agent 通过 `sessions_spawn` 创建的临时隔离会话。

```
Parent Agent
    ↓ sessions_spawn
创建 Subagent Session
    ↓
独立执行任务
    ↓
完成后 Announce 结果
    ↓
Session 归档（默认 60 分钟后）
```

### 3.2 核心特性

| 特性 | 说明 |
|------|------|
| **Session 隔离** | 新 Session Key: `agent:<parent>:subagent:<uuid>` |
| **Tool 限制** | 默认禁用 `sessions_*` 工具 |
| **非阻塞** | `sessions_spawn` 立即返回 `runId` |
| **结果 Announce** | 完成后发消息到 Parent 聊天 |
| **超时控制** | `runTimeoutSeconds` 可选 |

### 3.3 创建 Subagent

```javascript
// 在 Agent 中调用
sessions_spawn({
  task: "帮我分析这段代码的问题",
  runtime: "subagent",  // 默认值，可省略
  mode: "run",          // run=一次性, session=持久
  runTimeoutSeconds: 300,
})
```

### 3.4 Subagent vs Parent Agent 对比

| 维度 | Subagent | Parent Agent |
|------|----------|--------------|
| Session Key | `agent:*:subagent:<uuid>` | `agent:*:main` 或 `agent:*:group:*` |
| 生命周期 | 任务级 | Gateway 级 |
| Tool 访问 | 受限（无 sessions_*） | 完整 |
| 上下文 | 新 Session，无历史 | 保持对话历史 |
| 适用场景 | 临时任务 | 持续服务 |

### 3.5 Subagent 配置

```json5
{
  agents: {
    defaults: {
      subagents: {
        // Subagent 超时时间（0=无限制）
        runTimeoutSeconds: 600,
        // 归档时间（默认 60 分钟）
        archiveAfterMinutes: 60,
      },
    },
  },
}
```

### 3.6 Sandbox 隔离

```json5
{
  agents: {
    list: [
      {
        id: "family",
        sandbox: {
          mode: "all",    // 启用沙箱
          scope: "agent", // 每个 Agent 独立容器
        },
        tools: {
          allow: ["read", "exec", "sessions_list"],
          deny: ["write", "edit", "browser", "nodes"],
        },
      },
    ],
  },
}
```

---

## 4. ACP Agent（外部 Harness Agent）

### 4.1 什么是 ACP Agent

ACP (Agent Client Protocol) = 让 OpenClaw 调用外部编程 Harness（Codex/Claude Code/Pi）的协议。

```
OpenClaw (调度)
    ↓ sessions_spawn(runtime: "acp")
ACP Backend (acpx)
    ↓
外部 Harness (Codex / Claude Code / Pi / Gemini CLI)
    ↓
执行结果
```

### 4.2 ACP vs Subagent vs Persistent

| 维度 | ACP | Subagent | Persistent |
|------|-----|----------|------------|
| **Runtime** | 外部 Harness | OpenClaw 内置 | OpenClaw 内置 |
| **Session Key** | `agent:*:acp:<uuid>` | `agent:*:subagent:<uuid>` | `agent:*:main` |
| **隔离性** | 完全独立进程 | Session 隔离 | Workspace 隔离 |
| **工具访问** | Harness 自身工具 | 受限 | 完整 |
| **持久化** | 可选 | 临时 | Gateway 级 |
| **用途** | 复杂编程任务 | 临时任务 | 业务服务 |

### 4.3 支持的 Harness

| Harness | Agent ID | 说明 |
|---------|----------|------|
| **Pi** | `pi` | 轻量编程助手 |
| **Claude Code** | `claude` | Anthropic Claude 编程 |
| **Codex** | `codex` | OpenAI Codex 编程 |
| **OpenCode** | `opencode` | 开源编程助手 |
| **Gemini CLI** | `gemini` | Google Gemini CLI |
| **Kimi** | `kimi` | 月之暗面 Kimi |

### 4.4 创建 ACP Session

```javascript
// 一次性任务
sessions_spawn({
  task: "帮我重构这段代码，增加错误处理",
  runtime: "acp",
  agentId: "codex",
  mode: "run",
})

// 持久会话（需要 thread 绑定）
sessions_spawn({
  task: "开始一个代码审查会话",
  runtime: "acp",
  agentId: "claude",
  mode: "session",
  thread: true,
})
```

### 4.5 ACP 配置

```json5
{
  acp: {
    enabled: true,
    backend: "acpx",
    defaultAgent: "codex",
    allowedAgents: ["pi", "claude", "codex", "opencode", "gemini", "kimi"],
    maxConcurrentSessions: 8,
    stream: {
      coalesceIdleMs: 300,
      maxChunkChars: 1200,
    },
    runtime: {
      ttlMinutes: 120,
    },
  },
}
```

### 4.6 /acp 命令

| 命令 | 功能 |
|------|------|
| `/acp spawn` | 创建 ACP Session |
| `/acp status` | 查看状态 |
| `/acp steer` | 发送 steering 指令 |
| `/acp cancel` | 取消当前 Turn |
| `/acp close` | 关闭 Session |
| `/acp sessions` | 列出 Sessions |
| `/acp doctor` | 诊断健康状态 |

```bash
# 创建持久 Codex Session
/acp spawn codex --mode persistent --thread auto

# 创建一次性 Claude Session
/acp spawn claude --mode oneshot --thread off

# 查看状态
/acp status

# Steering
/acp steer tighten logging and continue

# 关闭
/acp close
```

### 4.7 Thread 绑定

ACP Session 可以绑定到 Discord Thread 或 Telegram Topic：

```json5
{
  bindings: [
    {
      type: "acp",
      agentId: "codex",
      match: {
        channel: "discord",
        peer: { kind: "channel", id: "222222222222222222" },
      },
      acp: { mode: "persistent" },
    },
  ],
}
```

---

## 5. 三种 Agent 协作流程

### 5.1 典型架构

```
用户消息 (Telegram)
    ↓
Gateway + Binding 路由
    ↓
Persistent Agent (业务服务)
    ↓
├── 需要编程 ──→ ACP Agent (Codex/Claude)
    ↓
├── 需要临时任务 ──→ Subagent
    ↓
└── 需要调度 ──→ 另一个 Persistent Agent
```

### 5.2 协作示例

**场景：高考Agent需要分析用户数据**

```
用户: "帮我分析能上什么大学"
    ↓
高考 Agent (Persistent)
    ↓ 意图识别：需要数据分析
    ↓ sessions_spawn
Subagent (数据分析)
    ↓ 完成，Announce 结果
高考 Agent
    ↓ 整合结果
返回给用户
```

**场景：需要复杂编程**

```
用户: "帮我写一个志愿填报算法"
    ↓
生活 Agent (Persistent)
    ↓ sessions_spawn(runtime: "acp")
ACP Agent (Codex)
    ↓ 编程完成
返回代码
```

### 5.3 调度权限配置

```json5
{
  agents: {
    list: [
      {
        id: "main",
        subagents: {
          allowAgents: ["gaokao-service", "shenghuo", "mo-finance"],
        },
      },
    ],
  },
}
```

---

## 6. Session 管理对比

| 维度 | Persistent | Subagent | ACP |
|------|-----------|----------|-----|
| **Session Key** | `agent:<id>:main` | `agent:<id>:subagent:<uuid>` | `agent:<id>:acp:<uuid>` |
| **存储位置** | `~/.openclaw/agents/<id>/sessions/` | 同上 | 同上 |
| **生命周期** | Gateway 周期 | 任务周期 | 可配置 |
| **历史保持** | 是 | 新 Session | 可选 |
| **跨 Session 通信** | `sessions_send` | 受限 | 受限 |

---

## 7. 工具权限对比

| 工具 | Persistent | Subagent | ACP |
|------|-----------|----------|-----|
| `read/write/edit/exec` | ✅ | ✅ | ✅ (Harness 决定) |
| `sessions_list/history` | ✅ | ❌ | ❌ |
| `sessions_spawn` | ✅ | ❌ | ❌ |
| `message` | ✅ | ✅ | ✅ |
| `cron` | ✅ | ❌ | ❌ |
| `browser/canvas` | ✅ | ✅ | ❌ |

---

## 8. 选型决策树

```
任务类型
    │
    ├─ 业务服务（持续运行）─→ Persistent Agent
    │
    ├─ 临时单一任务 ─→ Subagent
    │
    ├─ 复杂编程任务 ─→ ACP Agent
    │
    └─ 需要特定模型 ─→ ACP Agent (指定 agentId)
```

---

## 9. 实战配置示例

### 9.1 完整的多 Agent 架构

```json5
{
  agents: {
    list: [
      // === Persistent Agents ===
      {
        id: "main",
        default: true,
        workspace: "~/.openclaw/workspace",
      },
      {
        id: "gaokao-service",
        workspace: "~/.openclaw/workspaces/gaokao",
        subagents: {
          allowAgents: ["main"],  // 允许被 main 调度
        },
      },
      {
        id: "shenghuo",
        workspace: "~/.openclaw/workspaces/shenghuo",
      },
      // === ACP Agent (持久绑定到 Discord) ===
      {
        id: "codex",
        runtime: {
          type: "acp",
          acp: {
            agent: "codex",
            backend: "acpx",
            mode: "persistent",
          },
        },
      },
    ],
  },
  bindings: [
    // DM → main
    { agentId: "main", match: { channel: "telegram", chatType: "direct" } },
    // 高考群 → gaokao-service
    { agentId: "gaokao-service", match: { channel: "telegram", chatId: "-5154981764" } },
    // 生活群 → shenghuo
    { agentId: "shenghuo", match: { channel: "telegram", chatId: "-5153278498" } },
    // Discord 编程频道 → Codex ACP
    {
      type: "acp",
      agentId: "codex",
      match: { channel: "discord", peer: { kind: "channel", id: "222222222222222222" } },
    },
  ],
  acp: {
    enabled: true,
    backend: "acpx",
    defaultAgent: "codex",
  },
}
```

### 9.2 Subagent 调度示例

```javascript
// 在 main Agent 中
const result = await sessions_spawn({
  task: `
    请分析以下用户数据：
    分数: 580
    位次: 12000
    意向: 计算机/人工智能
    输出: 可报考院校列表
  `,
  runtime: "subagent",
  agentId: "gaokao-service",  // 调度高考Agent作为子任务
  mode: "run",
  runTimeoutSeconds: 300,
})

// 返回: { status: "accepted", runId: "...", childSessionKey: "..." }
```

### 9.3 ACP Thread 绑定示例

```javascript
// 在 Telegram Topic 中创建持久 ACP Session
sessions_spawn({
  task: "开始代码审查项目",
  runtime: "acp",
  agentId: "claude",
  mode: "session",  // 持久会话
  thread: true,     // 绑定到当前 Topic
})
```

---

## 10. 常见问题

### Q: 什么时候用 Subagent vs ACP？

| 场景 | 推荐 |
|------|------|
| 简单任务（查询/分析） | Subagent |
| 复杂编程（需要文件操作/终端） | ACP |
| 需要特定模型（Claude/Codex） | ACP |
| 临时一次性任务 | Subagent |
| 持久对话/多轮交互 | ACP |

### Q: Subagent 可以嵌套吗？

**不能**。Subagent 不允许调用 `sessions_spawn`。

### Q: ACP 和 Sandbox 兼容吗？

**不兼容**。ACP 运行在宿主机，不支持沙箱隔离。

```javascript
// 沙箱 session 中调用 ACP → 报错
// Error: Sandboxed sessions cannot spawn ACP sessions
```

### Q: 如何限制 Agent 之间的调度？

```json5
{
  agents: {
    list: [
      {
        id: "shenghuo",
        subagents: {
          // 只允许被 main 调度
          allowAgents: ["main"],
        },
      },
    ],
  },
}
```

---

## 11. 总结

| 类型 | 创建方式 | 生命周期 | 用途 |
|------|---------|---------|------|
| **Persistent** | `openclaw agents add` | Gateway 级 | 业务服务 |
| **Subagent** | `sessions_spawn()` | 任务级 | 临时任务 |
| **ACP** | `sessions_spawn(runtime:"acp")` | 可配置 | 复杂编程 |

**最佳实践**：
- 业务服务 → Persistent Agent
- 临时任务 → Subagent
- 编程任务 → ACP Agent

---

*文档更新时间: 2026-03-27*
*来源：DM主控对话*
