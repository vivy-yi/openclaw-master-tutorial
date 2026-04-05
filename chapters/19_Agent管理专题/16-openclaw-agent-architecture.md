# OpenClaw Agent 运行流程与架构

## 1. 整体架构

```
用户消息 (Telegram/WhatsApp/...)
         ↓
    Gateway (Daemon)
         ↓
   消息路由 (Binding)
         ↓
    Agent 调度
    ├─ main (主控)
    │    ├─ subagents (子Agent)
    │    └─ sessions_spawn (隔离会话)
    └─ 其他Agent (群绑定)
```

---

## 2. 核心组件

| 组件 | 职责 |
|------|------|
| **Gateway** | 消息入口，维护所有provider连接 (Telegram/WhatsApp/Discord...) |
| **Agent Runtime** | 嵌入式运行器，调用 LLM + Tools |
| **Workspace** | Agent 的工作目录，存放 SOUL.md/AGENTS.md/TOOLS.md |
| **Session** | 每次对话的上下文，JSONL 存储 |
| **Skills** | 技能扩展（搜索、记忆、编码等） |

---

## 3. 消息流程

```
1. 消息到达 Gateway (Telegram Bot API / WhatsApp Baileys / ...)
2. Gateway 根据 Binding 路由到对应 Agent
3. Agent 加载 Workspace 文件 (SOUL.md, AGENTS.md, USER.md)
4. Agent 处理消息，调用 LLM + Tools
5. Tools 执行 (exec/read/message/cron/...)
6. 响应通过 Gateway 发回原通道
```

### 详细步骤

| 步骤 | 说明 |
|------|------|
| 1 | 消息通过 Telegram Bot/WhatsApp Baileys 等 provider 到达 Gateway |
| 2 | Gateway 根据 `bindings` 配置决定路由到哪个 Agent |
| 3 | Agent 加载 Workspace 文件注入到 Context |
| 4 | Agent 调用 LLM 处理消息 |
| 5 | LLM 决定调用哪些 Tools |
| 6 | Tools 执行后结果返回 LLM |
| 7 | LLM 生成最终响应 |
| 8 | Gateway 将响应发回原通道 |

---

## 4. Agent 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| **main** | 主控Agent，DM入口，可调度所有Agent | 6020964033 DM |
| **业务Agent** | 绑定特定群，提供领域能力 | 高考/生活/金融 |
| **平台Agent** | 不绑定群，服务其他Agent | meta-team |
| **subagent** | 临时创建，处理单次任务 | 代码调试 |

---

## 5. Workspace 文件加载顺序

```
新会话启动
    ↓
SOUL.md → USER.md → AGENTS.md → BOOTSTRAP.md(首次)
    ↓
加载到 Agent Context
    ↓
Skills 扫描 (按需读取 SKILL.md)
```

### 文件说明

| 文件 | 作用 |
|------|------|
| `SOUL.md` | Agent 人格、语气、边界 |
| `USER.md` | 用户信息、偏好、背景 |
| `AGENTS.md` | 行为规则、记忆指导 |
| `BOOTSTRAP.md` | 首次运行引导（仅一次） |
| `IDENTITY.md` | Agent 名称、emoji |
| `TOOLS.md` | 本地工具备注 |

---

## 6. 多Agent协作模式

### 6.1 Sequential (串行)

```
A完成 → B基于A结果 → 返回
适用于：B依赖A的输出
```

### 6.2 Parallel (并行)

```
同时调用 A、B、C → 汇总各自结果
适用于：任务相互独立
```

### 6.3 Hierarchical (层级)

```
main 调度 subagent → 子结果汇总 → 最终响应
适用于：复杂任务分解
```

---

## 7. 你的系统架构图

```
hj d (DM)
    ↓
main (总控)
    ├── shenghuo → 生活助手群
    ├── mo-finance → 金融助手群
    ├── mo-yunying → 内容运营群
    ├── mo-richang → 日常开发群
    ├── paper-assistant → 论文助手群
    ├── game-director → 游戏产业群
    ├── openclaw-assistant → OpenClaw助手群
    ├── gaokao-service → 高考服务群
    └── meta-team → 平台能力
         ├── 墨监 (监控+预警)
         ├── 墨历 (日志审计)
         ├── 墨联 (统一搜索)
         ├── 墨邮 (消息路由)
         ├── 墨析 (用户画像)
         └── 墨创 (Agent工厂)
```

---

## 8. 关键配置文件

| 文件 | 位置 | 作用 |
|------|------|------|
| `openclaw.json` | `~/.openclaw/` | 主配置 |
| `agents/<id>/sessions/` | `~/.openclaw/agents/` | 会话存储 JSONL |
| `workspace/SOUL.md` | 工作区 | 人格定义 |
| `workspace/AGENTS.md` | 工作区 | 行为规则 |
| `skills/` | 工作区/`~/.openclaw/skills/` | 技能扩展 |

---

## 9. Session 管理

### 9.1 Session 存储

每个 Session 的对话历史存储为 JSONL 文件：

```
~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl
```

### 9.2 Session 生命周期

| 阶段 | 说明 |
|------|------|
| 创建 | 首次消息触发 |
| 活跃 | 持续对话，更新 JSONL |
| 压缩 | 上下文过长时压缩 |
| 结束 | 超过 retention 策略 |

### 9.3 上下文长度管理

- 初始：完整加载 SOUL.md + USER.md + AGENTS.md
- 运行时：保留最近 N 条消息
- 压缩：旧消息被总结后保留关键信息

---

## 10. Tool 调用流程

```
LLM 决定调用 Tool
         ↓
   Tool 执行 (exec/read/message/cron/...)
         ↓
   结果返回 LLM
         ↓
   LLM 生成响应或继续调用
```

### 内置 Tools

| Tool | 能力 |
|------|------|
| `read` | 读取文件 |
| `write` | 写入文件 |
| `edit` | 编辑文件 |
| `exec` | 执行 shell 命令 |
| `message` | 发送消息 |
| `cron` | 定时任务 |
| `sessions_*` | 会话管理 |
| `browser` | 浏览器控制 |
| `memory_*` | 记忆管理 |

---

## 11. Binding 路由配置

```json5
{
  bindings: [
    // DM 入口 → main
    { agentId: "main", match: { channel: "telegram", chatType: "direct" } },
    
    // 特定群 → 业务Agent
    { agentId: "shenghuo", match: { channel: "telegram", chatId: "-5153278498" } },
    { agentId: "mo-finance", match: { channel: "telegram", chatId: "-1003633299525" } },
    
    // 其他 → main (默认)
    { agentId: "main", match: { channel: "telegram" } },
  ]
}
```

---

## 12. 进阶主题

### 12.1 subagent 调度

使用 `sessions_spawn` 创建临时 subagent：

```json
{
  "task": "分析这段代码...",
  "runtime": "subagent",
  "mode": "run",
  "runTimeoutSeconds": 300
}
```

### 12.2 技能 (Skills)

技能提供专业化能力，按需加载：

```
当需要搜索时 → 加载 agent-reach skill
当需要编码时 → 加载 coding-agent skill
```

### 12.3 Delegate 模式

企业级应用：Agent 拥有自己身份，代表组织行动：

| Tier | 能力 |
|------|------|
| Tier 1 | 只读 + 草稿 |
| Tier 2 | 代发消息 |
| Tier 3 | 自主行动 |

---

*文档更新时间: 2026-03-27*
