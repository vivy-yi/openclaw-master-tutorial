# 第9章 国际渠道集成

> **本章学习目标**: 掌握Telegram、Discord配置
> **预计用时**: 45-60分钟
> **前置要求**: 完成基础部署

---

## 9.1 Telegram Bot

### 创建Bot

1. @BotFather
2. /newbot
3. 获取Token

### 配置

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "your-bot-token"
    }
  }
}
```

---

## 9.2 Discord Bot

### 创建应用

1. [Discord Developer Portal](https://discord.com/developers/applications)
2. 创建Application
3. 添加Bot用户

### 配置

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "your-bot-token",
      "channelIds": ["your-channel-id"]
    }
  }
}
```

---

## 本章小结

1. Telegram：BotFather创建
2. Discord：Developer Portal配置
3. 两者都支持群聊和私聊
