# OpenClaw Channels 指令详解

## 指令配置

### 基本语法
```bash
openclaw channels list                    # 列出配置的频道
openclaw channels add                     # 添加频道账户
openclaw channels login                   # 登录频道
openclaw channels logout                  # 登出频道
openclaw channels status                  # 频道状态
openclaw channels remove                  # 移除频道
openclaw channels capabilities            # 显示频道能力
openclaw channels resolve <name>          # 解析用户名到ID
```

### 频道特定命令
```bash
# Telegram
openclaw channels add telegram --bot-token <token>

# WhatsApp
openclaw channels add whatsapp

# Discord
openclaw channels add discord --token <bot-token>

# Slack
openclaw channels add slack --token <bot-token>
```

---

## 文件配置

### 频道配置 (openclaw.json)
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "8499914881:AAF45qC1YbgmyUy9OeZXwCIcGas1d3zp2Gk",
      "dmPolicy": "allowlist",
      "allowFrom": ["6020964033"],
      "groupPolicy": "allowlist",
      "groups": {
        "-1003743972184": {
          "requireMention": false
        }
      },
      "streamMode": "partial"
    },
    "whatsapp": {
      "enabled": false,
      "dmPolicy": "pairing"
    },
    "discord": {
      "enabled": false,
      "dmPolicy": "pairing"
    }
  }
}
```

### 支持的频道类型

| 频道 | 配置项 | 说明 |
|------|--------|------|
| Telegram | botToken | Bot API Token |
| WhatsApp | dmPolicy | 配对/白名单/开放 |
| Discord | token | Bot Token |
| Slack | botToken | Bot Token |
| Signal | account | 账户配置 |
| iMessage | cliPath | CLI路径 |
| Feishu | appId, appSecret | 企业微信配置 |

### 频道能力 (capabilities)
```json
{
  "telegram": {
    "inlineButtons": true,
    "poll": true,
    "sticker": true,
    "video": true
  },
  "discord": {
    "threads": true,
    "voice": true,
    "embed": true
  }
}
```

---

## 场景示例

### 场景1: 添加Telegram Bot
```bash
# 方式1: 通过命令
openclaw channels add telegram --bot-token "8499914881:AAFxxx"

# 方式2: 通过配置
openclaw config set channels.telegram.enabled true
openclaw config set channels.telegram.botToken "xxx"
openclaw gateway restart
```

### 场景2: 登录WhatsApp
```bash
# 启动WhatsApp登录
openclaw channels login whatsapp

# 会显示QR码，扫码后自动保存
# 登录信息保存在 ~/.openclaw/telegram/
```

### 场景3: 配置群组白名单
```bash
# 添加允许的群组
openclaw config set channels.telegram.groupPolicy "allowlist"
openclaw config set channels.telegram.allowFrom "6020964033"

# 开启指定群组
openclaw config set channels.telegram.groups."-1003743972184".requireMention false
```

### 场景4: 设置DM策略
```bash
# 配对模式(默认)
openclaw config set channels.telegram.dmPolicy "pairing"

# 白名单模式
openclaw config set channels.telegram.dmPolicy "allowlist"

# 开放模式(任何人都可以发DM)
openclaw config set channels.telegram.dmPolicy "open"
```

### 场景5: 查看频道状态
```bash
# 基础状态
openclaw channels status

# 深度检查
openclaw status --deep
```

### 场景6: 解析用户名
```bash
# Telegram用户名转ID
openclaw channels resolve @username

# 返回用户ID
```

### 场景7: 查看频道能力
```bash
openclaw channels capabilities
# 输出各频道支持的功能
```

### 场景8: 登出频道
```bash
# 登出WhatsApp
openclaw channels logout whatsapp

# 登出所有
openclaw channels logout --all
```

### 场景9: 移除频道
```bash
# 禁用Telegram
openclaw channels remove telegram

# 或通过配置
openclaw config set channels.telegram.enabled false
```

### 场景10: 配置消息流模式
```bash
# 关闭流式输出
openclaw config set channels.telegram.streamMode "off"

# 部分流式(默认)
openclaw config set channels.telegram.streamMode "partial"

# 阻塞模式
openclaw config set channels.telegram.streamMode "block"
```

### 场景11: 群组特定配置
```bash
# 设置某群组需要@mention
openclaw config set channels.telegram.groups."-1003743972184".requireMention true

# 设置群组工具权限
openclaw config set channels.telegram.groups."-1003743972184".tools.allow "['read','browser']"
```
