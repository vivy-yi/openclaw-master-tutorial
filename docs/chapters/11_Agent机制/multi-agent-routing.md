# Multi-agent Routing - 多 Agent 路由

> 📅 更新时间: 2026-05-11  
> 📚 来源: [docs.openclaw.ai/concepts/multi-agent](https://docs.openclaw.ai/concepts/multi-agent)  
> ⭐ 质量评分: ⭐⭐⭐⭐⭐ (5/5)

---

## 核心概念

### Agent

Agent 是 OpenClaw 中完整的人脑作用域，每一个 Agent 都是独立的 AI 实例，包含：

| 组成部分 | 说明 |
|----------|------|
| **Workspace** | 工作目录，存放文件、项目代码 |
| **Auth Profiles** | 认证配置，存储 API keys、模型凭证 |
| **Session Store** | 会话历史，保持对话上下文 |

Agent 目录结构：
```
~/.openclaw/
├── agents/
│   └── <agentId>/
│       ├── agent/          # Agent 配置
│       ├── sessions/       # 会话存储
│       └── workspace/      # 工作目录
```

### Binding（绑定）

Binding 将 **Channel account** 映射到 **Agent**，实现消息路由。

### 关键标识符

| 标识符 | 说明 |
|--------|------|
| **agentId** | 唯一标识一个 Agent |
| **accountId** | 标识一个 Channel 账户实例 |

---

## 路由优先级

OpenClaw 按以下优先级顺序匹配 Agent：

| 优先级 | 规则 | 说明 |
|--------|------|------|
| 1 | peer match | 精确匹配 DM / 群组 / 频道 ID |
| 2 | parentPeer match | 线程继承 |
| 3 | guildId + roles | Discord 角色路由 |
| 4 | guildId | Discord 服务器匹配 |
| 5 | teamId | Slack Team 匹配 |
| 6 | accountId | 每账户回退 |
| 7 | Channel-level | `accountId: "*"` 匹配所有账户 |
| 8 | Default agent | 回退到 `main` Agent |

---

## 添加新 Agent

### 命令行添加

```bash
# 添加新 Agent
openclaw agents add work

# 列出所有 Agent 及绑定
openclaw agents list --bindings
```

### 配置文件添加

在 `~/.openclaw/openclaw.json` 中：

```json
{
  "agents": {
    "main": {
      "model": "claude-sonnet-4-20250514",
      "workspace": "~/.openclaw/workspace"
    },
    "work": {
      "model": "claude-sonnet-4-20250514",
      "workspace": "~/.openclaw/workspaces/work"
    }
  }
}
```

---

## 路由配置示例

### Discord 角色路由

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "YOUR_DISCORD_BOT_TOKEN",
      "agents": {
        "rules": [
          {
            "guildId": "123456789",
            "roles": {
              "admin": "main",
              "developer": "work"
            }
          }
        ]
      }
    }
  }
}
```

### Telegram 按 Chat ID 路由

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_TELEGRAM_BOT_TOKEN",
      "agents": {
        "rules": [
          {
            "peer": "111222333",  // 特定用户
            "agentId": "main"
          },
          {
            "peer": "-100123456", // 群组
            "agentId": "work"
          }
        ]
      }
    }
  }
}
```

### 默认回退

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_TELEGRAM_BOT_TOKEN",
      "agents": {
        "defaultAgentId": "main"
      }
    }
  }
}
```

---

## Workspace 隔离

每个 Agent 的 Workspace 完全隔离：

| Agent | Workspace 路径 |
|-------|---------------|
| main | `~/.openclaw/workspace/` |
| work | `~/.openclaw/workspace-work/` |
| custom | `~/.openclaw/workspace-<agentId>/` |

---

## 常见问题

### Q: 如何查看当前 Agent 绑定？

```bash
openclaw agents list --bindings
```

### Q: 如何切换 Agent？

在支持的渠道中发送 `/agent switch <agentId>` 或在配置文件中修改 binding。

### Q: Agent 之间可以共享 Workspace 吗？

可以，通过配置 `symlinks` 或在 `extraDirs` 中添加共享目录。

---

## 下一步

- 📖 **[Agent 运行循环](./11_Agent机制/3.1_agent_loop.md)** - 理解 Agent 如何处理请求
- 🤝 **[多 Agent 协作](./11_Agent机制/3.8_group_multi_agent.md)** - 多 Agent 协作模式
- 💾 **[会话管理](./11_Agent机制/3.9_session.md)** - 会话持久化与上下文管理
