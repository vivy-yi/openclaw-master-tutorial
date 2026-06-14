# Getting Started - 快速入门

> 📅 更新时间: 2026-06-12  
> **更新说明**: 2026-06-12 新增官方安装脚本（curl 方式）+ 环境变量配置说明
> 📚 来源: [docs.openclaw.ai/start/getting-started](https://docs.openclaw.ai/start/getting-started)  
> ⭐ 质量评分: ⭐⭐⭐⭐⭐ (5/5)

---

## 前置要求

| 项目 | 要求 |
|------|------|
| Node.js | **Node 24** (推荐) 或 Node 22.16+ |
| 包管理器 | npm / pnpm / yarn |
| API Key | Anthropic / OpenAI / Google 等 |
| 操作系统 | macOS / Linux / Windows (WSL) |

---

## 安装步骤

OpenClaw 提供两种安装方式，推荐使用官方安装脚本（全平台通用）。

### 方式一：官方安装脚本（推荐，全平台）

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

> 此方式自动检测平台并安装对应版本，适合 macOS、Linux 和 WSL 环境。

### 方式二：npm 安装

```bash
npm install -g openclaw@latest
```

> 需要 Node.js 24+ 和 npm/pnpm/yarn 环境。

### 3. 运行引导安装

```bash
openclaw onboard --install-daemon
```

> 引导程序会自动完成以下操作：
> - 创建配置文件 `~/.openclaw/openclaw.json`
> - 注册 Gateway 服务
> - 配置默认 Pi agent（RPC 模式）

### 4. 验证安装

```bash
openclaw gateway status
```

正常输出示例：
```
Runtime: running
Gateway: connected
Pi agent: active
```

### 5. 启动仪表盘（可选）

```bash
openclaw dashboard
```

在浏览器打开 `http://localhost:3000` 查看可视化界面。

---

## 🐦 连接第一个渠道: Telegram

Telegram 是配置最简单、支持最完整的渠道，推荐作为第一个体验渠道。

### 步骤 1: 创建 Telegram Bot

1. 在 Telegram 中搜索 **@BotFather**
2. 发送 `/newbot`，按提示设置 bot 名称和用户名
3. 复制 BotFather 返回的 **HTTP API Token**

### 步骤 2: 配置 OpenClaw

```bash
openclaw channels add telegram
# 按提示粘贴 API Token
```

或在 `~/.openclaw/openclaw.json` 中直接编辑：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      " botToken": "YOUR_BOT_TOKEN"
    }
  }
}
```

### 步骤 3: 重启 Gateway

```bash
openclaw gateway restart
```

### 步骤 4: 开始对话

在 Telegram 中向你的 Bot 发送消息，应该能够收到回复。

---

## 📁 关键文件路径

| 文件 | 路径 | 环境变量覆盖 |
|------|------|---------------|
| 主配置文件 | `~/.openclaw/openclaw.json` | `OPENCLAW_CONFIG_PATH` |
| 状态目录 | `~/.openclaw/` | `OPENCLAW_STATE_DIR` |
| Workspace | `~/.openclaw/workspace/` | `OPENCLAW_HOME` |
| Agent 数据 | `~/.openclaw/agents/<agentId>/` | — |
| 会话存储 | `~/.openclaw/agents/<agentId>/sessions/` | — |

---

## 🔧 环境变量

OpenClaw 支持以下环境变量（可在 `~/.zshrc` / `~/.bashrc` 中配置）：

| 变量 | 说明 | 示例 |
|------|------|------|
| `OPENCLAW_HOME` | Workspace 根目录 | `~/openclaw-work` |
| `OPENCLAW_STATE_DIR` | 状态数据目录（默认 `~/.openclaw`） | `~/data/openclaw-state` |
| `OPENCLAW_CONFIG_PATH` | 配置文件路径 | `~/config/openclaw.json` |

> ⚠️ 环境变量需在启动 OpenClaw 前设置。部分变量更改后需重新运行 `openclaw onboard`。

---

## 🔧 快速命令参考

| 命令 | 说明 |
|------|------|
| `openclaw status` | 查看全局状态 |
| `openclaw gateway status` | 查看 Gateway 状态 |
| `openclaw logs --follow` | 实时查看日志 |
| `openclaw doctor` | 诊断配置问题 |
| `openclaw channels status --probe` | 检查渠道连接状态 |
| `openclaw dashboard` | 启动 Web 仪表盘 |
| `openclaw agents list --bindings` | 列出所有 Agent 与渠道绑定 |

---

## 下一步

- 📖 **[概念架构 (Overview)](../01_什么是OpenClaw/overview.md)** - 了解 OpenClaw 是什么
- 🔧 **[模型配置](../05_模型配置/)** - 配置你偏好的 AI 模型
- 💬 **[首次对话](../03_快速部署/2.4_first_run.md)** - 与你的 AI 助手开始对话
