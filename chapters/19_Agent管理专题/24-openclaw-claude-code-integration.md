# OpenClaw 与 Claude Code 协作指南

> 本章介绍如何让 OpenClaw 通过 ACP (Agent Client Protocol) 调用 Claude Code 执行任务

## 目录

1. [什么是 ACP](#1-什么是-acp)
2. [核心概念](#2-核心概念)
3. [系统架构](#3-系统架构)
4. [安装与配置](#4-安装与配置)
5. [工作原理](#5-工作原理)
6. [使用方式](#6-使用方式)
7. [权限配置](#7-权限配置)
8. [常见问题](#8-常见问题)

---

## 1. 什么是 ACP

**ACP (Agent Client Protocol)** 是一个结构化的 agent 间通信协议，让 AI agents 可以通过 JSON 消息而不是 PTY 终端 scraping 来控制其他 coding agents。

### 对比传统方式

| 方式 | 描述 | 问题 |
|------|------|------|
| **PTY Scraping** | 解析终端 ANSI 输出 | 不稳定，难解析二进制 |
| **ACP** | 结构化 JSON 消息 | 可靠，原生支持 |

---

## 2. 核心概念

### 2.1 关键组件

```
┌─────────────────────────────────────────────────────────┐
│                    OpenClaw Gateway                      │
│  sessions_spawn({ runtime: "acp", agentId: "claude" })  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   acpx Plugin                           │
│  - OpenClaw 的 ACP runtime backend                      │
│  - 通过 spawn 启动 Claude Code                          │
│  - 位置: openclaw/dist/extensions/acpx/                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              @zed-industries/claude-agent-acp            │
│  - Claude Code 的 ACP 适配器                            │
│  - 让 Claude Code 理解 ACP 协议                         │
│  - acpx 自动下载 (npx)                                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Claude Code                         │
│  - 本地安装的 Claude Code                               │
│  - 接收 JSON 消息，执行任务                              │
│  - 返回结构化结果                                        │
└─────────────────────────────────────────────────────────┘
```

### 2.2 支持的 Agent

| agentId | 说明 |
|---------|------|
| `claude` | Claude Code |
| `codex` | OpenAI Codex CLI |
| `pi` | Pi Coding Agent |
| `opencode` | 开源编程助手 |
| `gemini` | Google Gemini CLI |
| `kimi` | 月之暗面 Kimi |

---

## 3. 系统架构

### 3.1 完整消息流程

```
┌──────────────────────────────────────────────────────────────┐
│                     OpenClaw Session                         │
│                                                                   │
│  sessions_spawn({                                                │
│    task: "重构 auth 模块",                                       │
│    runtime: "acp",                                              │
│    agentId: "claude"                                            │
│  })                                                              │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      acpx Plugin                              │
│                                                                   │
│  1. 解析请求                                                   │
│  2. 构建 spawn 命令                                            │
│  3. spawn("npx -y @zed-industries/claude-agent-acp", ...)      │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                   Claude Code (本地)                           │
│                                                                   │
│  Claude Code 通过 @zed-industries/claude-agent-acp              │
│  接收 JSON 消息，执行任务，返回结构化结果                        │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                     结果返回 Session                            │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 acpx 的 spawn 命令

根据 acpx 源码，agent 到命令的映射：

```javascript
{
  claude: "npx -y @zed-industries/claude-agent-acp",
  codex: "npx @zed-industries/codex-acp",
  pi: "npx -y @zeed工程师/pi-acp",      // 假设
  // ...
}
```

---

## 4. 安装与配置

### 4.1 前置要求

- **OpenClaw 已安装** (本文档假设已安装)
- **Claude Code 已安装** (npm 安装)

### 4.2 检查 Claude Code

```bash
# 检查 Claude Code 是否安装
which claude
claude --version

# 典型输出：
# /opt/homebrew/bin/claude
# 2.1.81 (Claude Code)

# npm 全局包位置
npm list -g @anthropic/claude-code
```

### 4.3 安装 acpx 插件

```bash
# 安装 acpx 插件
openclaw plugins install acpx

# 验证插件状态
openclaw plugins list | grep acpx
```

**输出示例：**
```
│ ACPX Runtime │ acpx │ openclaw │ loaded │ ... │ 2026.3.22 │
```

### 4.4 配置 OpenClaw ACP

```bash
# 启用 ACP
openclaw config set acp.enabled true

# 配置允许的 agents
openclaw config set acp.allowedAgents '["pi", "claude", "codex", "opencode", "gemini", "kimi"]'

# 设置默认 agent
openclaw config set acp.defaultAgent codex

# 重启 Gateway 应用配置
openclaw gateway restart
```

### 4.5 完整配置示例

```json
{
  "acp": {
    "enabled": true,
    "defaultAgent": "codex",
    "allowedAgents": ["pi", "claude", "codex", "opencode", "gemini", "kimi"],
    "maxConcurrentSessions": 8,
    "stream": {
      "coalesceIdleMs": 300,
      "maxChunkChars": 1200
    },
    "runtime": {
      "ttlMinutes": 120
    }
  }
}
```

### 4.6 权限配置

ACP sessions 运行在非交互模式，需要配置权限：

```bash
# 方式 1: 允许所有操作 (最宽松)
openclaw config set plugins.entries.acpx.config.permissionMode approve-all

# 方式 2: 只允许读取 (默认)
openclaw config set plugins.entries.acpx.config.permissionMode approve-reads

# 方式 3: 禁止所有
openclaw config set plugins.entries.acpx.config.permissionMode deny-all

# 配置无交互时的行为
openclaw config set plugins.entries.acpx.config.nonInteractivePermissions fail
# 或 graceful degradation:
openclaw config set plugins.entries.acpx.config.nonInteractivePermissions deny

# 重启 Gateway
openclaw gateway restart
```

---

## 5. 工作原理

### 5.1 为什么是 JSON 而不是 PTY？

传统方式需要解析 Claude Code 的终端输出：

```
❌ 传统 PTY 方式：
┌─────────────────────────────────────────┐
│  Terminal Output:                        │
│  [thinking] 分析代码结构...              │
│  [tool] Edit src/auth.ts                │
│  ✓ 已完成重构                            │
└─────────────────────────────────────────┘
         │
         ▼
  需要解析 ANSI 颜色、文本格式
  脆弱、容易断
```

```
✅ ACP JSON 方式：
┌─────────────────────────────────────────┐
│  Structured Message:                     │
│  {                                       │
│    "type": "thinking",                   │
│    "content": "分析代码结构..."          │
│  }                                       │
│  {                                       │
│    "type": "tool_call",                  │
│    "name": "Edit",                       │
│    "args": { "file": "src/auth.ts" }     │
│  }                                       │
└─────────────────────────────────────────┘
         │
         ▼
  结构化、可靠、易处理
```

### 5.2 acpx 的角色

```
acpx = Agent Client Protocol 的 CLI 客户端
       (headless, for AI agents)
```

- **对于 OpenClaw**：acpx 是 ACP runtime backend
- **对于 Claude Code**：acpx 通过适配器发送 JSON 消息
- **会话管理**：持久化会话存储在 `~/.acpx/`

### 5.3 会话持久化

```
~/.acpx/
├── sessions/
│   ├── codex/
│   │   ├── default/
│   │   │   ├── session.json
│   │   │   └── history.jsonl
│   │   └── api/
│   │       └── session.json
│   └── claude/
│       └── default/
│           └── ...
└── config.json
```

---

## 6. 使用方式

### 6.1 自然语言命令

在 OpenClaw 对话中直接说：

```
"用 Claude Code 重构 auth 模块"
"启动 Claude Code 处理这个任务"
"让 Claude Code 帮我写单元测试"
```

### 6.2 Slash 命令

```
/acp spawn claude --mode persistent --thread auto
/acp spawn claude --mode oneshot
/acp status
/acp cancel
/acp close
```

### 6.3 参数说明

| 参数 | 说明 |
|------|------|
| `--mode persistent` | 持久会话，多轮对话 |
| `--mode oneshot` | 单次任务 |
| `--thread auto` | 自动绑定当前线程 |
| `--thread here` | 必须在线程中 |
| `--thread off` | 不绑定 |

### 6.4 代码调用

```javascript
// 方式 1: sessions_spawn (推荐)
sessions_spawn({
  task: "重构 auth 模块，遵循现有的代码风格",
  runtime: "acp",
  agentId: "claude",
  mode: "session"
})

// 方式 2: 一次性任务
sessions_spawn({
  task: "总结这个文件的代码结构",
  runtime: "acp",
  agentId: "claude",
  mode: "run"
})

// 方式 3: 恢复之前的会话
sessions_spawn({
  task: "继续上次的重构工作",
  runtime: "acp",
  agentId: "claude",
  resumeSessionId: "agent:claude:acp:<uuid>"
})
```

### 6.5 命令行直接使用 acpx

也可以脱离 OpenClaw 直接用 acpx：

```bash
# 安装 acpx
npm install -g acpx@latest

# 创建新会话
acpx claude sessions new

# 发送任务
acpx claude "重构 auth 模块"

# 命名会话
acpx claude sessions new --name backend
acpx claude -s backend "实现支付功能"

# 查看状态
acpx claude status

# 取消当前任务
acpx claude cancel
```

---

## 7. 权限配置

### 7.1 权限模式

| 模式 | 说明 |
|------|------|
| `approve-all` | 自动批准所有文件写入和命令执行 |
| `approve-reads` | 只自动批准读取，写入和执行需要确认 |
| `deny-all` | 拒绝所有权限提示 |

### 7.2 非交互策略

| 策略 | 说明 |
|------|------|
| `fail` | 权限提示时直接失败 (默认) |
| `deny` | 静默拒绝，继续执行 |

### 7.3 生产环境建议

```json
{
  "plugins": {
    "entries": {
      "acpx": {
        "enabled": true,
        "config": {
          "permissionMode": "approve-all",
          "nonInteractivePermissions": "fail"
        }
      }
    }
  }
}
```

---

## 8. 常见问题

### Q1: ACP 和 Sub-agent 有什么区别？

| 方面 | ACP Session | Sub-agent |
|------|-------------|-----------|
| Runtime | ACP backend (acpx) | OpenClaw native |
| Session Key | `agent:<agentId>:acp:<uuid>` | `agent:<agentId>:subagent:<uuid>` |
| 适用场景 | 外部 coding agents | OpenClaw native agents |

### Q2: Claude Code 需要登录吗？

是的，首次使用可能需要：

```bash
# 登录 Claude Code
claude login

# 或使用 API key 环境变量
export ANTHROPIC_API_KEY="sk-..."
```

### Q3: 会话保存在哪里？

- **acpx**: `~/.acpx/sessions/`
- **OpenClaw**: Gateway session store

### Q4: 如何调试？

```bash
# 查看 ACP 状态
/acp doctor

# 查看所有会话
/acp sessions

# 查看详细日志
openclaw logs --tail 100
```

### Q5: 权限被拒绝怎么办？

```
错误: AcpRuntimeError: Permission prompt unavailable

解决: 设置 permissionMode = approve-all
```

```bash
openclaw config set plugins.entries.acpx.config.permissionMode approve-all
openclaw gateway restart
```

---

## 总结

```
OpenClaw ──→ acpx (spawn) ──→ Claude Code
           (ACP JSON Protocol)
```

- **acpx** 是 OpenClaw 的 ACP runtime backend
- **ACP** 用 JSON 消息替代 PTY scraping
- **结构稳定可靠**，适合 agent 间通信
- **开箱即用**，配置简单

---

**相关内容：**

- [OpenClaw Agent 架构](./16-openclaw-agent-architecture.md)
- [多 Agent 协作](./04-multi-agent.md)
- [Sub-agents 使用指南](./19-openclaw-modes-guide.md)
