# OpenClaw 概念架构概览

> 📅 更新时间: 2026-05-11  
> 📚 来源: [docs.openclaw.ai](https://docs.openclaw.ai)  
> ⭐ 质量评分: ⭐⭐⭐⭐⭐ (5/5)

---

## OpenClaw 是什么？

**OpenClaw** 是一个自托管（Self-hosted）的 Gateway，连接聊天应用到 AI coding agents。

它的核心定位是：**为开发者 / 高级用户打造的个人 AI 助手框架**。

---

## 核心特性

| 特性 | 说明 |
|------|------|
| 🏠 **Self-hosted** | 完全自托管，数据留在本地 |
| 📡 **Multi-channel** | 同时连接多个聊天平台 |
| 🤖 **Agent-native** | 原生支持多 Agent 架构 |
| 🔓 **Open source** | MIT 许可，完全开源 |

---

## 系统架构

```
┌─────────────────────────────────────────────────┐
│              Chat Apps + Plugins                │
│   (Telegram / Discord / iMessage / Slack...)   │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                  OpenClaw Gateway               │
│              (openclaw gateway run)             │
└─────────────────────┬───────────────────────────┘
                      │
              ┌───────┴────────┐
              ▼                ▼
      ┌──────────────┐  ┌─────────────┐
      │  Pi Agent    │  │  CLI / Web  │
      │ (内置默认)   │  │   UI       │
      └──────────────┘  └─────────────┘
```

### 架构组件说明

| 组件 | 作用 |
|------|------|
| **Chat Apps** | 用户日常使用的聊天应用（Telegram、Discord 等） |
| **Plugins** | 渠道插件，扩展支持的平台 |
| **Gateway** | 核心枢纽，处理路由、认证、消息转发 |
| **Pi Agent** | 内置默认 Agent，开箱即用 |
| **CLI / Web UI / Mobile Nodes** | 管理与交互入口 |

---

## 核心概念

### 1. Gateway（网关）

Gateway 是 OpenClaw 的核心进程，负责：
- 接收来自各渠道的消息
- 将消息路由到对应的 Agent
- 管理 Agent 的生命周期
- 提供 Web UI 和 API

启动方式：
```bash
openclaw gateway run
```

### 2. Agent（智能体）

Agent 是完整的人脑作用域，包含：
- **Workspace** - 工作目录，存放文件、项目
- **Auth Profiles** - 认证配置，存储 API keys
- **Session Store** - 会话历史，保持对话上下文

### 3. Channel（渠道）

Channel 是 OpenClaw 连接的消息通道，支持：
- **内置渠道**: Telegram, Discord, iMessage, Signal, Slack, WhatsApp
- **插件渠道**: Matrix, Nostr, Twitch, Zalo
- **外部插件**: Feishu, Microsoft Teams, Google Chat

### 4. Binding（绑定）

Binding 将 Channel account 映射到 Agent，实现：
- 一个 Bot 可以服务多个用户
- 不同用户 / 群组自动路由到不同 Agent
- 基于角色、关键词、ID 等规则的智能路由

---

## 配置文件

主配置文件位于: `~/.openclaw/openclaw.json`

```json
{
  "gateway": {
    "port": 3000,
    "auth": "local"
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_TOKEN"
    }
  },
  "agents": {
    "main": {
      "model": "claude-sonnet-4-20250514",
      "workspace": "~/.openclaw/workspace"
    }
  }
}
```

---

## 下一步

- 🚀 **[快速部署](./03_快速部署/getting-started.md)** - 立即开始安装
- 🔧 **[模型配置](./05_模型配置/)** - 配置你的 AI 模型
- 🤖 **[Agent 机制](./11_Agent机制/)** - 深入了解多 Agent 架构
