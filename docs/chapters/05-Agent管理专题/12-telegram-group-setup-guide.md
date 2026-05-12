# Telegram 群接入 OpenClaw 完整指南

本文档详细介绍如何将一个新的 Telegram 群连接到 OpenClaw 系统，包括完整的工作空间创建、子 Agent 配置和 Cron 任务设置。

---

## 目录

1. [Telegram 群创建与 ID 获取](#1-telegram-群创建与-id-获取)
2. [OpenClaw 配置](#2-openclaw-配置)
3. [创建 Workspace](#3-创建-workspace)
4. [添加子 Agent](#4-添加子-agent)
5. [添加 Cron 任务](#5-添加-cron-任务)
6. [验证清单](#6-验证清单)

---

## 1. Telegram 群创建与 ID 获取

### 1.1 创建 Telegram 群

1. 打开 Telegram 应用
2. 点击「新建群聊」
3. 输入群名称（如「测试服务群」）
4. 添加必要成员和机器人

### 1.2 获取群 ID

**方法一：使用机器人**
- @userinfobot
- @getidsbot
- 发送任意消息获取群 ID

**方法二：通过链接**
- 群链接格式：`https://t.me/c/群ID/消息ID`
- 数字部分就是群 ID（去掉前两位）

**群 ID 格式**
- 公开群：`@username`
- 私有群：`-100XXXXXXXXX` 或 `-XXXXXXXXX`

---

## 2. OpenClaw 配置

### 2.1 配置文件位置

```
~/.openclaw/openclaw.json
```

### 2.2 配置修改流程（重要！）

```
1. 编辑配置 → openclaw config edit
2. 验证配置 → openclaw config validate
3. 检查问题 → openclaw doctor
4. 重启网关 → openclaw gateway restart
```

⚠️ **禁止**：
- 不要修改 `chats` 键
- 不要添加未知键

### 2.3 添加群到 Telegram 配置

在 `channels.telegram` 下添加：

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-100XXXXXXX": {
          "requireMention": false,
          "allowFrom": ["6020964033"]
        }
      },
      "allowFrom": [
        "6020964033",
        "-100XXXXXXX"
      ]
    }
  }
}
```

### 2.4 添加 Agent 定义

在 `agents.list` 中添加：

```json
{
  "id": "新agent-id",
  "name": "新Agent名称",
  "workspace": "/Users/d/.openclaw/workspaces/新agent-id",
  "subagents": {
    "allowAgents": [
      "子Agent1",
      "子Agent2"
    ]
  }
}
```

### 2.5 添加 Binding（消息路由）

在 `bindings` 中添加：

```json
{
  "agentId": "新agent-id",
  "match": {
    "channel": "telegram",
    "peer": {
      "kind": "group",
      "id": "-100XXXXXXX"
    }
  }
}
```

### 2.6 验证并重启

```bash
# 验证配置
openclaw config validate

# 重启网关
openclaw gateway restart
```

---

## 3. 创建 Workspace

### 3.1 创建目录结构

```bash
mkdir -p /Users/d/.openclaw/workspaces/新agent-id
```

### 3.2 创建必要文件

| 文件 | 用途 | 必需 |
|------|------|------|
| SOUL.md | Agent 能力定义 | ✅ |
| USER.md | 用户信息 | ✅ |
| TOOLS.md | 工具配置 | 可选 |
| AGENTS.md | 子 Agent 列表 | 可选 |

### 3.3 SOUL.md 模板

```markdown
# SOUL.md - Agent名称

你是[角色描述]，专注于...

## 核心能力

1. 能力1 - 描述
2. 能力2 - 描述
3. 能力3 - 描述

## 可调度的子 Agent

| Agent | 职责 |
|-------|------|
| 子Agent1 | xxx |
| 子Agent2 | xxx |

## 任务处理流程

```
1. 接收任务
2. 分析需求
3. 选择合适的子Agent执行
4. 汇总结果
5. 返回答案
```

## 输出格式

根据任务类型自定义输出格式。
```

---

## 4. 添加子 Agent

### 4.1 创建子 Agent 目录

```bash
mkdir -p /Users/d/.openclaw/workspaces/新agent-id/agents/子Agent1
mkdir -p /Users/d/.openclaw/workspaces/新agent-id/agents/子Agent2
```

### 4.2 创建子 Agent SOUL.md

在每个子 Agent 目录中创建 `SOUL.md`，定义具体能力。

### 4.3 在主 Agent 中注册

在主 Agent 的 `subagents.allowAgents` 数组中添加子 Agent ID。

---

## 5. 添加 Cron 任务

### 5.1 使用命令添加

```bash
openclaw cron add \
  --name "任务名称" \
  --schedule "cron 0 9 * * *" \
  --agent 新agent-id \
  --session-target isolated \
  --payload '{"kind": "agentTurn", "message": "执行任务内容"}' \
  --delivery '{"mode": "announce", "channel": "telegram", "to": "-100XXXXXXX"}'
```

### 5.2 Schedule 格式

| 格式 | 示例 | 说明 |
|------|------|------|
| `cron m h d * *` | `cron 0 9 * * *` | 每天 9:00 |
| `cron m h d * *` | `cron 0 9 * * 1` | 每周一 9:00 |
| `every X` | `every 3600000` | 每小时 |

### 5.3 Delivery 模式

| 模式 | 说明 |
|------|------|
| `announce` | 发送到群 |
| `webhook` | HTTP POST |
| `none` | 不发送 |

---

## 6. 验证清单

| 步骤 | 检查项 | 命令/方法 |
|------|--------|-----------|
| 1 | Telegram 群创建 | 在 Telegram 中确认 |
| 2 | 群 ID 正确 | 使用机器人获取 |
| 3 | 配置添加成功 | `openclaw config validate` |
| 4 | Gateway 运行中 | `openclaw status` |
| 5 | Workspace 创建 | `ls workspaces/` |
| 6 | Agent 绑定正确 | 群里发送消息测试 |
| 7 | 子 Agent 可用 | 调用子 Agent 测试 |
| 8 | Cron 任务正常 | 查看任务状态 |

---

## 常见问题

### Q1: 群里发消息 Agent 不回复

**检查**：
1. 群是否添加到 `channels.telegram.groups`
2. 群是否添加到 `channels.telegram.allowFrom`
3. Binding 是否正确配置
4. Gateway 是否已重启

### Q2: 配置修改后 Gateway 无法启动

**解决**：
```bash
# 恢复备份
cp ~/.openclaw/openclaw.json.bak ~/.openclaw/openclaw.json

# 验证
openclaw config validate

# 检查问题
openclaw doctor
```

### Q3: 子 Agent 无法调用

**检查**：
1. 子 Agent 是否在主 Agent 的 `subagents.allowAgents` 中
2. 子 Agent 的 workspace 是否存在
3. 子 Agent 的 SOUL.md 是否正确定义

---

## 快速参考

### 常用命令

```bash
# 查看配置
openclaw config get

# 编辑配置
openclaw config edit

# 验证配置
openclaw config validate

# 重启网关
openclaw gateway restart

# 查看任务
openclaw cron list

# 添加任务
openclaw cron add --name "xxx" ...
```

### 配置路径

- 主配置：`~/.openclaw/openclaw.json`
- 工作空间：`~/.openclaw/workspaces/`
- Agent 配置：`~/.openclaw/agents/`
- 日志：`~/.openclaw/logs/gateway.log`

---

## 更新记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-03-21 | v1.0 | 初始版本 |
