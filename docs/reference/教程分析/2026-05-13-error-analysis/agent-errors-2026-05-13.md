# Agent 模块错误分析

**分析日期**：2026-05-13
**对比来源**：官方文档 `/opt/homebrew/lib/node_modules/openclaw/docs/concepts/`
**被分析教程**：`/Volumes/waku/github-维护/openclaw-master-tutorial/docs/chapters/05-Agent*`

---

## 一、错误总览

| 严重度 | 文件 | 错误数量 | 主要问题 |
|--------|------|----------|----------|
| 🔴 高 | 05-Agent运行循环/3.3_workspace.md | 5 | JSON配置结构完全虚构 |
| 🔴 高 | 05-Agent管理专题/28.2_agent_teams.md | 6 | teams配置架构虚构 |
| 🔴 高 | 05-Agent管理专题/28.1_multi_agent_overview.md | 4 | 架构组件虚构 |
| 🟠 中 | 05-Agent运行循环/3.1_agent_loop.md | 3 | Hook名称错误 |
| 🟠 中 | 05-Agent管理专题/28.9_multi_agent_collaboration.md | 3 | broadcast配置虚构 |
| 🟠 中 | 05-Agent管理专题/07-lifecycle.md | 2 | 术语不一致 |
| 🟠 中 | 05-Agent管理专题/05-workspace.md | 2 | 路径结构错误 |
| 🟡 低 | 05-Agent管理专题/28.6_acp_agents.md | 2 | 命令虚构 |

---

## 二、详细错误列表

### 🔴 错误 1：3.3_workspace.md — JSON配置结构完全虚构

**文件**：`05-Agent运行循环/3.3_workspace.md`

**错误位置**：配置流程图中的 JSON 配置示例

**错误内容**：
```json
{
  "workspace": {
    "root": "~/.openclaw/workspace",
    "autoCreate": true,
    "files": {
      "agents": "AGENTS.md",
      "soul": "SOUL.md",
      ...
    },
    "memory": { ... }
  }
}
```

**官方正确结构**（来自 `agent.md` / `agent-workspace.md`）：
```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",  // 正确路径
    }
  }
}
```

**问题**：OpenClaw 配置中不存在顶层 `workspace` key，也不存在 `autoCreate`、`files`、`memory` 等子键。

---

### 🔴 错误 2：3.3_workspace.md — 记忆目录结构错误

**文件**：`05-Agent运行循环/3.3_workspace.md`

**错误内容**：
```
daily/                       # 每日记忆
│   ├── 2024-01-15.md
│   └── 2024-01-16.md
```

**官方正确结构**（来自 `agent-workspace.md`）：
```
memory/                     # 记忆文件夹（官方命名）
├── YYYY-MM-DD.md          # 每日记忆
└── MEMORY.md              # 长期记忆
```

**问题**：教程使用 `daily/` 目录名，但官方使用 `memory/` 目录。官方明确说明使用 `memory/YYYY-MM-DD.md` 格式。

---

### 🔴 错误 3：28.2_agent_teams.md — teams 配置架构完全虚构

**文件**：`05-Agent管理专题/28.2_agent_teams.md`

**错误内容**：文档描述了一个不存在的配置结构：
```json
{
  "teams": {
    "dev_team": {
      "name": "开发团队",
      "agents": ["architect", "developer", ...],
      "coordinator": "architect"
    }
  }
}
```

以及：
```json
{
  "agents": {
    "architect": {
      "name": "架构师",
      "model": "gpt-4o",
      "persona": "architect",
      "tools": [...],
      "capabilities": [...]
    }
  }
}
```

**官方正确结构**（来自 `multi-agent.md`）：
```json5
{
  agents: {
    list: [
      {
        id: "architect",           // 正确字段是 id，不是 key 名
        workspace: "~/agents/architect",
        model: "anthropic/claude-sonnet-4-6",
        // 没有 persona、capabilities 等字段
      }
    ]
  }
}
```

**问题**：OpenClaw 没有 `teams` 配置层级，没有 `coordinator` 概念，没有 `persona`/`capabilities` 等 Agent 属性。

---

### 🔴 错误 4：28.1_multi_agent_overview.md — 多 Agent 架构组件虚构

**文件**：`05-Agent管理专题/28.1_multi_agent_overview.md`

**错误内容**：
```
┌─────────────────────────────────────────────┐
│           多 Agent 系统架构                   │
├─────────────────────────────────────────────┤
│              用户请求                         │
│                 │                            │
│                 ▼                            │
│  ┌───────────────────────────────────────┐  │
│  │         Agent Dispatcher              │  │  ← 不存在此组件
│  │         任务分发器                     │  │
│  └───────────────────┬───────────────────┘  │
│                      │                       │
│          ┌──────────┼──────────┐            │
│          ▼          ▼          ▼            │
│     ┌────────┐ ┌────────┐ ┌────────┐       │
│     │Agent A │ │Agent B │ │Agent C │       │
│     └────┬───┘ └────┬───┘ └────┬───┘       │
│          │          │          │            │
│          └──────────┼──────────┘            │
│                     │                       │
│                     ▼                       │
│  ┌───────────────────────────────────────┐  │
│  │         Result Aggregator             │  │  ← 不存在此组件
│  │         结果聚合器                     │  │
│  └───────────────────┬───────────────────┘  │
```

**官方正确架构**（来自 `multi-agent.md`）：OpenClaw 使用 **Binding** 机制路由消息到 Agent，没有 "Agent Dispatcher" 或 "Result Aggregator" 这两个独立组件。

---

### 🔴 错误 5：28.1_multi_agent_overview.md — Agent 类型分类虚构

**文件**：`05-Agent管理专题/28.1_multi_agent_overview.md`

**错误内容**：
```
Agent 角色类型：

1. 协调者 (Coordinator)
2. 执行者 (Executor)
3. 审查者 (Reviewer)
4. 规划者 (Planner)
```

以及按模型分类：
```
1. 强模型 Agent (GPT-4o / Claude 3.5)
2. 平衡模型 Agent (GPT-4o-mini / Claude 3 Haiku)
3. 轻量模型 Agent (DeepSeek / GLM-4)
```

**官方正确描述**（来自 `multi-agent.md`）：OpenClaw 的 Agent 是按 `agentId` 隔离的独立实体，每个 Agent 有自己的 workspace、auth profiles、session store。官方没有定义 "协调者/执行者/审查者/规划者" 这类角色分类，也没有按模型强度分类 Agent。

---

### 🟠 错误 6：3.1_agent_loop.md — Hook 名称错误

**文件**：`05-Agent运行循环/3.1_agent_loop.md`

**错误内容**（在 Hook 机制部分）：
```
│  消息阶段：                                  │
│  ├── message_received                      │
│  ├── message_sending                       │  ← 错误
│  └── message_sent                          │
│                                             │
│  会话阶段：                                  │
│  ├── session:compact:before                │  ← 错误
│  └── session:compact:after                 │
```

**官方正确 Hook 名称**（来自 `agent-loop.md`）：
```
message_received      ✓
message_sending       ✓（不是 message_sending）
message_sent          ✓

before_compaction     ✓（不是 session:compact:before）
after_compaction      ✓（不是 session:compact:after）
```

**问题**：官方 Hook 名使用 snake_case 而不是 colon-prefixed 格式。

---

### 🟠 错误 7：28.9_multi_agent_collaboration.md — broadcast 配置虚构

**文件**：`05-Agent管理专题/28.9_multi_agent_collaboration.md`

**错误内容**：
```json5
{
  broadcast: {
    strategy: "parallel",  // 虚构选项
    "120363403215116621@g.us": ["code-reviewer", "security", "docs"]
  }
}
```

以及：
```json5
{
  broadcast: {
    strategy: "sequential",
    "+15551234567": ["researcher", "summarizer", "responder"]
  }
}
```

**官方正确描述**（来自 `multi-agent.md`）：OpenClaw 的多 Agent 通信使用 `sessions_send` 和 `sessions_spawn` 工具，通过 `agentToAgent` 配置启用。没有 `broadcast.strategy` 配置。广播组功能是 Channel 级别的配置，不是 Agent 配置的一部分。

---

### 🟠 错误 8：28.9_multi_agent_collaboration.md — 会话工具参数错误

**文件**：`05-Agent管理专题/28.9_multi_agent_collaboration.md`

**错误内容**：
```json5
{
  // sessions_list 参数
  kinds: ["main", "group", "cron"],  // 官方不支持 kinds 参数
  limit: 50,
  activeMinutes: 60,
  messageLimit: 3
}
```

**官方正确参数**（来自 `session-tool.md`）：sessions_list 的实际参数包括 `limit`、`activeMinutes`、`kinds`（作为字符串而非数组）等，但 `messageLimit` 不在官方参数列表中。

---

### 🟠 错误 9：07-lifecycle.md / 05-workspace.md — 路径结构错误

**文件**：`05-Agent管理专题/07-lifecycle.md`、`05-Agent管理专题/05-workspace.md`

**错误内容**：
```
~/.openclaw/workspaces/<agent_id>/     ← 错误路径
```

**官方正确路径**（来自 `multi-agent.md`）：
```
~/.openclaw/workspace                   # 默认 agent
~/.openclaw/workspace-<agentId>          # 多 agent 时的命名
~/.openclaw/agents/<agentId>/sessions/  # session 存储
```

**问题**：官方不使用 `workspaces/` 复数目录。workspace 是 workspace，agent 状态是 `agents/<agentId>/`。

---

### 🟠 错误 10：07-lifecycle.md — 术语不一致

**文件**：`05-Agent管理专题/07-lifecycle.md`

**错误内容**：
```
│  状态目录 (agentDir)                              │
│  • 认证配置文件 (auth-profiles.json)              │
```

**官方正确术语**（来自 `multi-agent.md`）：官方使用 "agentDir" 来指代 `~/.openclaw/agents/<agentId>/agent` 路径，但文档将其描述为"状态目录"，术语本身可以接受，但应更精确地说明。

---

### 🟡 错误 11：28.6_acp_agents.md — ACP 命令虚构

**文件**：`05-Agent管理专题/28.6_acp_agents.md`

**错误内容**：
```bash
/acp spawn codex --mode persistent --thread auto
/acp status
/acp model provider/model
/acp permissions <profile>
/acp timeout <seconds>
/acp steer tighten logging and continue
/acp cancel
/acp close
```

**官方正确描述**（来自 `multi-agent.md` 的 Related 链接）：ACP agents 通过 `tools/subagents` 和 `tools/acp-agents` 实现，而非 `/acp` 命令行界面。官方文档中提到的 ACP 工具是 `sessions_spawn` 和 `sessions_send`，不是这些 `/acp` 命令。

---

### 🟡 错误 12：16-openclaw-agent-architecture.md — Delegate 模式描述不准确

**文件**：`05-Agent管理专题/16-openclaw-agent-architecture.md`

**错误内容**：
```
### 12.3 Delegate 模式

企业级应用：Agent 拥有自己身份，代表组织行动：

| Tier | 能力 |
|------|------|
| Tier 1 | 只读 + 草稿 |
| Tier 2 | 代发消息 |
| Tier 3 | 自主行动 |
```

**官方相关概念**（来自 `multi-agent.md`）：官方描述的是"Delegate 架构"在 `delegate-architecture.md` 中，但那是关于外部代理的，不是这种 Tier 分类。OpenClaw 官方没有这种 "Delegate Mode" 的 Tier 体系。

---

## 三、正确架构（官方来源）

### 1. Agent 运行时架构

**官方来源**：`agent.md`

```
OpenClaw runs a single embedded agent runtime
—one agent process per Gateway, with its own
workspace, bootstrap files, and session store.
```

**核心组件**：
- Workspace（`agents.defaults.workspace`）
- Bootstrap Files（AGENTS.md / SOUL.md / TOOLS.md / IDENTITY.md / USER.md / BOOTSTRAP.md）
- Session Store（`~/.openclaw/agents/<agentId>/sessions/`）
- agentDir（`~/.openclaw/agents/<agentId>/agent`）

### 2. Agent Loop 生命周期

**官方来源**：`agent-loop.md`

```
Entry points:
- Gateway RPC: agent and agent.wait
- CLI: agent command

Flow:
1. agent RPC validates params, resolves session
2. agentCommand runs the agent (resolves model, loads skills)
3. runEmbeddedPiAgent serializes runs via per-session + global queues
4. subscribeEmbeddedPiSession bridges pi-agent-core events to OpenClaw stream
5. agent.wait uses waitForAgentRun for lifecycle end/error
```

### 3. 多 Agent 架构

**官方来源**：`multi-agent.md`

**核心概念**：
- `agentId`：一个独立的大脑（workspace + auth + session store）
- `accountId`：一个渠道账户实例
- `binding`：将渠道账户路由到 `agentId`

**路径映射**：
| 类型 | 路径 |
|-----|------|
| Workspace | `~/.openclaw/workspace` 或 `~/.openclaw/workspace-<agentId>` |
| agentDir | `~/.openclaw/agents/<agentId>/agent` |
| Sessions | `~/.openclaw/agents/<agentId>/sessions` |

**协作工具**：
- `sessions_list` — 列出会话
- `sessions_history` — 获取历史
- `sessions_send` — 同步发送消息
- `sessions_spawn` — 异步生成子 Agent

### 4. Workspace 文件结构

**官方来源**：`agent-workspace.md`

```
AGENTS.md      — operating instructions
SOUL.md        — persona and tone
USER.md        — who the user is
IDENTITY.md    — name, vibe, emoji
TOOLS.md       — local tool conventions
HEARTBEAT.md   — heartbeat checklist (optional)
BOOT.md        — startup checklist (optional)
BOOTSTRAP.md   — first-run ritual (brand new workspace only)
memory/
  YYYY-MM-DD.md — daily memory log
  MEMORY.md     — curated long-term memory (optional, main session only)
skills/         — workspace skills (optional)
canvas/         — Canvas UI files (optional)
```

### 5. 正确的 Hook 名称

**官方来源**：`agent-loop.md`

```
Plugin hooks (agent + gateway lifecycle):
- before_model_resolve
- before_prompt_build
- before_agent_start
- before_agent_reply
- agent_end
- before_compaction / after_compaction
- before_tool_call / after_tool_call
- before_install
- tool_result_persist
- message_received / message_sending / message_sent
- session_start / session_end
- gateway_start / gateway_stop
```

---

## 四、建议修复优先级

### P0（必须修复）
1. **3.3_workspace.md** — 删除虚构的 JSON 配置结构，用官方 `agents.defaults.workspace` 格式替换
2. **3.3_workspace.md** — 将 `daily/` 改为 `memory/`
3. **28.2_agent_teams.md** — 删除虚构的 `teams` 配置架构，用官方 `agents.list` 格式替换
4. **28.1_multi_agent_overview.md** — 删除虚构的 "Agent Dispatcher" / "Result Aggregator" 架构图
5. **28.9_multi_agent_collaboration.md** — 删除虚构的 `broadcast.strategy` 配置

### P1（应该修复）
6. **3.1_agent_loop.md** — 修正 Hook 名称格式（colon-prefixed → snake_case）
7. **07-lifecycle.md / 05-workspace.md** — 修正 workspace 路径结构
8. **28.6_acp_agents.md** — 修正 ACP 命令描述，与 `acp-agents.md` 工具对齐

### P2（可以优化）
9. **16-openclaw-agent-architecture.md** — 删除不准确的 "Delegate Mode Tier" 描述
10. **28.1_multi_agent_overview.md** — 删除虚构的 Agent 角色分类

---

## 五、相关官方文件路径

```
/opt/homebrew/lib/node_modules/openclaw/docs/concepts/
├── agent.md              ← Agent 运行时核心定义
├── agent-loop.md         ← Loop 生命周期 + Hook 完整列表
├── agent-workspace.md    ← Workspace 文件结构 + 路径
├── multi-agent.md        ← 多 Agent 架构 + 协作工具
├── session-tool.md      ← sessions_* 工具参数
├── delegate-architecture.md ← Delegate 架构
└── sandboxing.md        ← 沙箱配置
```