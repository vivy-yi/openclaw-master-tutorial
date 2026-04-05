# OpenClaw 远程访问与核心功能指南

> 本章介绍 OpenClaw 支持的各种功能，包括远程访问、消息渠道、MCP 协议、Skills 扩展、定时任务等。

---

## 1. 远程访问配置

OpenClaw 支持多种远程访问方式，让你可以从任何地方连接到你的 AI 助手。

### 1.1 Gateway Bind 模式

通过 `gateway.bind` 配置控制网络绑定：

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `"loopback"` | 仅本地 (127.0.0.1) | 默认，最安全 |
| `"tailnet"` | Tailscale 网络 | 长期使用，推荐 |
| `"lan"` | 局域网所有接口 | 同一网络内 |
| `"all"` | 所有网络接口 | 不推荐 |
| `"auto"` | 自动选择 | 开发测试 |

### 1.2 Tailscale（推荐 - 长期使用）

**优点**：一次配置，永久使用，加密传输

```bash
# 1. 安装并启动 Tailscale
brew install tailscale
tailscale up

# 2. 获取你的 Tailscale IP
tailscale status
# 输出示例：100.100.173.73  ddemac-mini-222

# 3. 配置 OpenClaw
openclaw config set gateway.bind tailnet

# 4. 重启 Gateway
openclaw gateway restart
```

**访问地址**：
```
ws://<你的Tailscale IP>:18789
# 例如：ws://100.100.173.73:18789
```

### 1.3 ngrok（即开即用 - 临时访问）

**优点**：无需账号，即开即用

```bash
# 1. 安装 ngrok
brew install ngrok

# 2. 启动隧道
ngrok http 18789

# 3. 获得公网地址
# Forwarding: https://xxxx.ngrok.io -> http://localhost:18789
```

### 1.4 Cloudflare Tunnel（最专业 - 有域名）

**优点**：最稳定，支持自定义域名

```bash
# 1. 安装 cloudflared
brew install cloudflare/cloudflare/cloudflared

# 2. 登录 Cloudflare
cloudflared tunnel login

# 3. 创建隧道
cloudflared tunnel create openclaw

# 4. 配置隧道
cloudflared tunnel run --name openclaw
```

---

## 2. 消息渠道集成

OpenClaw 支持多种消息渠道，让你可以通过不同平台与 AI 助手交互。

### 2.1 支持的渠道

| 渠道 | 状态 | 说明 |
|------|------|------|
| **Telegram** | ✅ 已配置 | 最常用，支持 Bot |
| **WhatsApp** | 🔜 | 即将支持 |
| **Discord** | 🔜 | 开发中 |
| **飞书** | ✅ 已集成 | 国内推荐 |
| **钉钉** | ✅ 已集成 | 企业用户 |
| **企业微信** | 🔜 | 规划中 |

### 2.2 Telegram 配置示例

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "allowlist",
      "allowFrom": ["6020964033"],
      "groupPolicy": "allowlist",
      "streaming": "partial"
    }
  }
}
```

---

## 3. MCP (Model Context Protocol)

MCP 是一种开放协议，让 AI 助手可以连接各种数据源和工具。

### 3.1 已集成的 MCP 服务器

| 服务器 | 功能 | 用途 |
|--------|------|------|
| `chrome-devtools` | Chrome DevTools | 网页调试、截图 |
| `mcporter` | MCP 管理 | 管理 MCP 连接 |
| `filesystem` | 文件系统 | 文件读写操作 |

### 3.2 MCP 工具示例

```bash
# 使用 mcporter 管理 MCP 服务器
mcporter list

# 使用 chrome-devtools 进行网页截图
mcporter call chrome-devtools.take_screenshot
```

### 3.3 可用的 Chrome DevTools MCP 工具

| 工具 | 说明 |
|------|------|
| `navigate_page` | 打开/导航网页 |
| `take_screenshot` | 截图 |
| `take_snapshot` | 获取页面快照 |
| `list_console_messages` | 查看控制台日志 |
| `new_page` | 新建页面 |
| `evaluate_js` | 执行 JavaScript |

---

## 4. Skills 扩展系统

Skills 是 OpenClaw 的扩展模块，可以为 AI 助手添加各种能力。

### 4.1 内置 Skills

| Skill | 功能 |
|-------|------|
| `weather` | 天气预报 |
| `github` | GitHub 操作 |
| `stock-analysis` | 股票分析 |
| `finance-news` | 金融新闻 |
| `blogwatcher` | 博客订阅 |
| `things-mac` | Things 3 集成 |

### 4.2 自定义 Skills

创建自定义 Skill：

```
~/.openclaw/skills/my-skill/
├── SKILL.md          # Skill 定义
├── scripts/          # 脚本目录
└── references/      # 参考文档
```

### 4.3 安装 Skills

```bash
# 使用 ClawHub 安装
openclaw skills install <skill-name>

# 或手动安装到 ~/.openclaw/skills/
```

---

## 5. Cron 定时任务

OpenClaw 内置强大的定时任务系统，支持复杂的调度配置。

### 5.1 任务类型

| 类型 | 说明 |
|------|------|
| **Cron 表达式** | 标准 cron 语法 |
| **间隔执行** | every N minutes/hours |
| **一次性** | at specific time |

### 5.2 Cron 表达式示例

```bash
# 每天 22:00 执行
cron: "0 22 * * *"

# 每周一 9:00 执行
cron: "0 9 * * 1"

# 每 6 小时执行
every: "6h"
```

### 5.3 任务管理命令

```bash
# 查看所有任务
openclaw cron list

# 查看任务状态
openclaw cron status <job-id>

# 立即执行任务
openclaw cron run <job-id>

# 删除任务
openclaw cron remove <job-id>
```

---

## 6. 多 Agent 协作系统

OpenClaw 支持多个 AI Agent 协同工作，形成团队。

### 6.1 Agent 类型

| 类型 | 说明 |
|------|------|
| **main** | 主控 Agent，协调所有工作 |
| **subagent** | 子 Agent，执行具体任务 |
| **coordinator** | 协调者，分配任务 |
| **worker** | 执行者，完成具体工作 |

### 6.2 团队结构示例

```
main (主控)
├── mo-finance (金融团队)
│   ├── mo-gushen (股神)
│   ├── mo-hongguan (宏观)
│   └── mo-fengkong (风控)
├── mo-yunying (运营团队)
│   ├── mo-ke (墨客)
│   ├── mo-tui (墨推)
│   └── mo-bo (墨播)
└── meta-team (元团队)
    ├── mo-jian (监控)
    └── mo-jing (警戒)
```

### 6.3 Agent 通信模式

| 模式 | 说明 |
|------|------|
| **main** | 主 session，所有对话 |
| **per-peer** | 每人独立 session |
| **per-channel-peer** | 每渠道每人独立 |

---

## 7. 安全认证

OpenClaw 提供多层安全认证机制。

### 7.1 认证模式

| 模式 | 说明 |
|------|------|
| **token** | Token 认证（默认） |
| **none** | 无认证（不推荐） |
| **oauth** | OAuth 第三方登录 |

### 7.2 安全建议

```json
{
  "gateway": {
    "auth": {
      "mode": "token",
      "token": "your-long-random-token"
    }
  }
}
```

### 7.3 安全检查

```bash
# 运行安全审计
openclaw security audit

# 检查配置问题
openclaw doctor
```

---

## 8. 工作区 (Workspace)

每个 Agent 都有自己的工作区，用于文件管理和任务隔离。

### 8.1 工作区结构

```
~/.openclaw/workspace/
├── SOUL.md          # Agent 灵魂定义
├── AGENTS.md        # Agent 说明
├── MEMORY.md        # 长期记忆
├── memory/          # 每日记忆
│   └── YYYY-MM-DD.md
└── [项目文件]        # 各项目文件
```

### 8.2 配置工作区

```json
{
  "agents": {
    "defaults": {
      "workspace": "/Users/d/.openclaw/workspace"
    }
  }
}
```

---

## 9. 配置管理

OpenClaw 使用 JSON 格式配置文件，支持多种配置方式。

### 9.1 配置文件位置

| 位置 | 说明 |
|------|------|
| `~/.openclaw/openclaw.json` | 主配置 |
| `~/.openclaw/env` | 环境变量 |
| `~/.openclaw/workspace/AGENTS.md` | Agent 定义 |

### 9.2 配置命令

```bash
# 查看配置
openclaw config get <path>

# 设置配置
openclaw config set <path> <value>

# 修改配置（补丁）
openclaw config patch <json>

# 验证配置
openclaw config validate
```

---

## 10. 常用命令速查

| 命令 | 说明 |
|------|------|
| `openclaw status` | 查看状态 |
| `openclaw gateway restart` | 重启 Gateway |
| `openclaw gateway logs -f` | 查看日志 |
| `openclaw cron list` | 列出定时任务 |
| `openclaw config get` | 获取配置 |
| `openclaw config set` | 设置配置 |
| `openclaw security audit` | 安全审计 |
| `openclaw doctor` | 诊断问题 |
| `openclaw update` | 更新 OpenClaw |

---

## 11. API 接口

OpenClaw Gateway 提供 RESTful API。

### 11.1 常用 API

| 端点 | 说明 |
|------|------|
| `GET /api/status` | 系统状态 |
| `GET /api/agents` | Agent 列表 |
| `GET /api/cron` | Cron 任务 |
| `POST /api/cron/run` | 触发任务 |

### 11.2 API 认证

```bash
# 使用 Token 认证
curl -H "Authorization: Bearer <token>" \
     http://localhost:18789/api/status
```

---

_本章整理了 OpenClaw 的核心功能和支持的能力，帮助你更好地理解和使用这个强大的 AI 助手框架。_
