# OpenClaw Message 指令详解

## 指令配置

### 发送消息
```bash
openclaw message send --target <id> --message "内容"
openclaw message send --channel <channel> --target <id> --message "内容"
openclaw message send --target <id> --message "内容" --media <file>
```

### 广播
```bash
openclaw message broadcast --targets <id1,id2> --message "内容"
```

### 消息操作
```bash
openclaw message delete --channel <channel> --message-id <id>
openclaw message edit --channel <channel> --message-id <id> --new-text <text>
```

### 互动操作
```bash
openclaw message react --channel <channel> --target <id> --message-id <mid> --emoji "✅"
openclaw message poll --channel <channel> --target <id> --poll-question "问题" --poll-option A --poll-option B
```

### 高级操作
```bash
openclaw message pin --channel <channel> --target <id> --message-id <mid>
openclaw message unpin --channel <channel> --target <id> --message-id <mid>
openclaw message read --channel <channel> --target <id>
openclaw message search --channel <channel> --query "关键词"
```

### 成员管理
```bash
openclaw message ban --channel <channel> --user-id <id>
openclaw message kick --channel <channel> --user-id <id>
openclaw message timeout --channel <channel> --user-id <id> --duration 300
```

---

## 文件配置

### 消息配置 (openclaw.json)
```json
{
  "messages": {
    "ackReaction": "👍",
    "ackReactionScope": "all",
    "queue": {
      "mode": "steer"
    },
    "tts": {
      "auto": "off",
      "enabled": false
    }
  }
}
```

### 频道消息配置
```json
{
  "channels": {
    "telegram": {
      "streamMode": "partial",
      "replyToMode": "first",
      "textChunkLimit": 4096,
      "markdown": {
        "tables": "bullets"
      }
    }
  }
}
```

### 消息队列配置
```json
{
  "messages": {
    "queue": {
      "mode": "steer",          // steer/followup/collect/steer-backlog/queue/interrupt
      "debounceMs": 300,
      "cap": 10,
      "drop": "old"
    }
  }
}
```

---

## 场景示例

### 场景1: 发送基础消息
```bash
# 发送到Telegram用户
openclaw message send --channel telegram --target 6020964033 --message "你好"

# 发送到Telegram群组
openclaw message send --channel telegram --target "-1003743972184" --message "大家好"

# 发送到WhatsApp
openclaw message send --channel whatsapp --target +15551234567 --message "Hello"
```

### 场景2: 发送媒体消息
```bash
# 发送图片
openclaw message send --channel telegram --target 6020964033 --media photo.jpg

# 发送文件
openclaw message send --channel telegram --target 6020964033 --media document.pdf

# 发送语音
openclaw message send --channel telegram --target 6020964033 --media voice.ogg
```

### 场景3: 发送带回复的消息
```bash
openclaw message send --channel telegram --target 6020964033 --message "这是回复" --reply-to <message-id>
```

### 场景4: 添加表情反应
```bash
openclaw message react --channel telegram --target 6020964033 --message-id 123 --emoji "👍"

# 移除反应
openclaw message react --channel telegram --target 6020964033 --message-id 123 --emoji "👍" --remove
```

### 场景5: 发送投票
```bash
# Telegram投票
openclaw message poll \
  --channel telegram \
  --target "-1003743972184" \
  --poll-question "今天吃什么?" \
  --poll-option "火锅" \
  --poll-option "烧烤" \
  --poll-option "日料"

# Discord投票
openclaw message poll \
  --channel discord \
  --target "123456789" \
  --poll-question "最喜欢的语言?" \
  --poll-option "JavaScript" \
  --poll-option "Python"
```

### 场景6: 广播消息
```bash
openclaw message broadcast \
  --targets "6020964033,-1003743972184" \
  --message "系统维护通知"
```

### 场景7: 消息引用/回复
```bash
openclaw message send \
  --channel telegram \
  --target 6020964033 \
  --message "同意你的观点" \
  --quote-text "<message-id>"
```

### 场景8: 置顶消息
```bash
# 置顶
openclaw message pin --channel telegram --target "-1003743972184" --message-id 123

# 取消置顶
openclaw message unpin --channel telegram --target "-1003743972184" --message-id 123
```

### 场景9: 禁言/踢出成员
```bash
# 禁言5分钟
openclaw message timeout --channel discord --target "guild-id" --user-id "user-id" --duration 300

# 踢出
openclaw message kick --channel discord --target "guild-id" --user-id "user-id"

# 封禁
openclaw message ban --channel discord --target "guild-id" --user-id "user-id"
```

### 场景10: 读取历史消息
```bash
# 读取最近消息
openclaw message read --channel telegram --target 6020964033 --limit 10

# 搜索消息
openclaw message search --channel telegram --query "关键词" --limit 20
```

### 场景11: 编辑/删除消息
```bash
# 编辑消息
openclaw message edit --channel telegram --message-id 123 --new-text "新内容"

# 删除消息
openclaw message delete --channel telegram --message-id 123
```

### 场景12: 群组话题操作
```bash
# 创建话题
openclaw message thread --channel telegram --target "-1003743972184" --name "讨论话题" --message "第一条消息"

# 发送消息到话题
openclaw message send --channel telegram --target "-1003743972184" --thread-id <thread-id> --message "话题内消息"
```
