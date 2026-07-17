# Channel System - 渠道系统

> 📅 更新时间: 2026-05-11  
> 📚 来源: [docs.openclaw.ai/channels](https://docs.openclaw.ai/channels)  
> ⭐ 质量评分: ⭐⭐⭐⭐ (4/5)

---

## 概述

OpenClaw 的 Channel 系统让你可以同时连接多个聊天平台，通过统一的 Gateway 路由消息到 Agent。

---

## 支持的渠道

### 内置渠道 (Built-in)

开箱即用，无需额外安装：

| 渠道 | 说明 | 配置难度 |
|------|------|----------|
| **Telegram** | 最简单，推荐入门 | ⭐ |
| **Discord** | 功能全面 | ⭐⭐⭐ |
| **iMessage** | macOS 专属 | ⭐⭐ |
| **Signal** | 隐私导向 | ⭐⭐⭐ |
| **Slack** | 企业协作 | ⭐⭐⭐ |
| **WhatsApp** | 广泛使用 | ⭐⭐ |

### 插件渠道 (Bundled Plugins)

需要通过 npm 安装插件包：

| 渠道 | 插件包 |
|------|--------|
| Matrix | `@openclaw/plugin-matrix` |
| Nostr | `@openclaw/plugin-nostr` |
| Twitch | `@openclaw/plugin-twitch` |
| Zalo | `@openclaw/plugin-zalo` |

```bash
npm install -g @openclaw/plugin-matrix
openclaw channels add matrix
```

### 外部插件 (External Plugins)

社区维护的插件：

| 渠道 | 插件 |
|------|------|
| **飞书 (Feishu)** | `@openclaw/plugin-feishu` |
| Microsoft Teams | `@openclaw/plugin-teams` |
| Google Chat | `@openclaw/plugin-google-chat` |
| LINE | `@openclaw/plugin-line` |

---

## 添加渠道

### 通用步骤

```bash
# 1. 安装插件（如需要）
npm install -g @openclaw/plugin-<channel>

# 2. 添加渠道
openclaw channels add <channel>

# 3. 配置凭据（按提示输入）

# 4. 重启 Gateway
openclaw gateway restart
```

### Telegram 示例

```bash
openclaw channels add telegram
# 按提示输入 Bot Token
```

### Discord 示例

```bash
openclaw channels add discord
# 按提示输入:
# - Bot Token
# - App ID
# - Guild ID
```

---

## 渠道配置

在 `~/.openclaw/openclaw.json` 中配置：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_BOT_TOKEN"
    },
    "discord": {
      "enabled": true,
      "botToken": "YOUR_DISCORD_BOT_TOKEN",
      "guildId": "YOUR_GUILD_ID"
    }
  }
}
```

---

## 渠道状态检查

```bash
# 查看所有渠道状态
openclaw channels status

# 探测特定渠道连接
openclaw channels status --probe --channel telegram

# 查看配对列表
openclaw pairing list --channel telegram
```

---

## 渠道与 Agent 绑定

每个渠道可以绑定到不同的 Agent：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_BOT_TOKEN",
      "agents": {
        "defaultAgentId": "main"
      }
    }
  }
}
```

---

## 常见问题

### Q: 渠道在线但无回复？

```bash
# 检查渠道状态
openclaw channels status --probe

# 检查 pairing
openclaw pairing list --channel <channel>

# 查看日志
openclaw logs --follow
```

常见原因：
- DM 需要 pairing 审批
- 群组需要 mention gating
- Channel allowlist 不匹配

### Q: 如何限制谁可以使用？

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_BOT_TOKEN",
      "allowedPeers": ["111222333", "444555666"]
    }
  }
}
```

---

## 下一步

- 🔧 **[官方渠道](./06_官方渠道/)** - 详细配置内置渠道
- 🌐 **[第三方渠道](./07_第三方渠道/)** - 配置社区插件
- 🔐 **[认证与安全](./08_认证与安全/)** - 渠道安全配置
