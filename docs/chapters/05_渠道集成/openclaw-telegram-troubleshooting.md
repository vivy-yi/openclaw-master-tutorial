# Telegram 渠道问题与解决方案

本文档介绍 Telegram 渠道的常见问题及解决方案。

## 常见问题

### 🟥 OAuth refresh token 旋转失效

**版本**: v2026.3.27

**问题**: OAuth token 刷新失败

**解决方案**:

```yaml
channels:
  telegram:
    auth:
      refreshMode: "manual"  # 手动刷新
```

### 🟥 启动 404 (deleteWebhook)

**版本**: v2026.3.27

**问题**: 启动时 webhook 相关 API 404

**解决方案**:

```yaml
channels:
  telegram:
    skipWebhookDelete: true
```

或升级到 v2026.3.28+

### 消息丢失

检查日志:

```bash
openclaw logs --channel telegram
```

### 媒体处理

v2026.3.28+ 修复了媒体在回复中被跳过的问题。

## 配置

```yaml
channels:
  telegram:
    botToken: "xxx"
    parseMode: "Markdown"
    replyMode: "thread"
```

## 测试

```bash
openclaw message send --channel telegram --to @username --message "Test"
```

## 相关资源

- [Issue #55389](https://github.com/openclaw/openclaw/issues/55389)
- [Issue #55387](https://github.com/openclaw/openclaw/issues/55387)