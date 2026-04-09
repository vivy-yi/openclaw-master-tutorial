# Slack 渠道配置指南

本文档介绍 OpenClaw Slack 渠道的配置与问题排查。

## 配置

### 1. 创建 Slack App

1. 访问 https://api.slack.com/apps
2. 创建新 App
3. 启用 Bot 用户
4. 订阅事件: `message.channels`, `message.groups`

### 2. 配置 openclaw.json

```json
{
  "channels": {
    "slack": {
      "enabled": true,
      "botToken": "xoxb-xxx",
      "signingSecret": "xxx",
      "appToken": "xoxb-xxx"
    }
  }
}
```

### 3. 配置权限

OAuth Scopes:
- `chat:write`
- `channels:read`
- `groups:read`
- `im:read`
- `mpim:read`

## Block Kit 支持

### 发送 Block

```json
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Hello!"
      }
    }
  ]
}
```

### 流式回复保持在 thread

v2026.3.28+ 支持：

```json
{
  "channels": {
    "slack": {
      "keepInThread": true
    }
  }
}
```

## 每频道回复模式

```json
{
  "channels": {
    "slack": {
      "replyToMode": {
        "C123456": "thread",
        "D987654": "direct"
      }
    }
  }
}
```

## 常见问题

### Webhook 事件未触发

**修复**: v2026.3.28 已修复

### 消息丢失

检查日志：

```bash
openclaw logs --channel slack
```

## 测试

```bash
openclaw message send --channel slack --channel C123 --message "Test"
```

## 相关资源

- [Slack API 文档](https://api.slack.com/docs)
- [OpenClaw Slack 配置](https://docs.openclaw.ai/channels/slack)