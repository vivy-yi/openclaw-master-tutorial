# OpenClaw Webhooks 指令详解

## 指令配置

### 基本语法
```bash
openclaw webhooks list                  # 列出webhooks
openclaw webhooks add                   # 添加webhook
openclaw webhooks remove <id>          # 移除webhook
openclaw webhooks test <id>            # 测试webhook
```

---

## 文件配置

### Webhook配置
```json
{
  "hooks": {
    "enabled": true,
    "path": "~/.openclaw/hooks",
    "transformsDir": "~/.openclaw/hooks/transforms",
    "mappings": [
      {
        "id": "webhook-1",
        "match": {
          "source": "github",
          "path": "/webhook"
        },
        "action": "agent",
        "agentId": "mocai",
        "messageTemplate": "收到GitHub事件: {{event}}"
      }
    ]
  }
}
```

### Webhook类型

| 类型 | 说明 |
|------|------|
| github | GitHub事件 |
| gitlab | GitLab事件 |
| cron | 定时任务 |
| custom | 自定义 |

---

## 场景示例

### 场景1: 配置GitHub Webhook
```bash
# 添加映射
openclaw config set hooks.mappings.[0].id "github-push"
openclaw config set hooks.mappings.[0].match.source "github"
openclaw config set hooks.mappings.[0].match.path "/webhook/github"
openclaw config set hooks.mappings.[0].action "agent"
openclaw config set hooks.mappings.[0].agentId "moguan"
openclaw config set hooks.mappings.[0].messageTemplate "收到GitHub推送"
```

### 场景2: 配置Telegram Webhook
```bash
# Telegram Bot API
openclaw config set channels.telegram.webhookUrl "https://your-domain.com/webhook/telegram"
openclaw config set channels.telegram.webhookSecret "your-secret"
```

### 场景3: 测试Webhook
```bash
# 手动触发
curl -X POST https://your-domain.com/webhook/github \
  -H "Content-Type: application/json" \
  -d '{"event": "push", "repository": "test"}'
```

### 场景4: 故障排除
```bash
# 查看Webhook日志
openclaw logs --follow | grep webhook
```
