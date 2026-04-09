# iMessage 渠道配置与问题解决

本文档介绍 OpenClaw iMessage 渠道的配置与常见问题排查。

## 支持版本

v2026.3.28+

## 前提条件

- macOS 12.0+ 或 iOS 15.0+
- Apple ID 已启用 iMessage

## 配置

### 1. 启用 iMessage 渠道

在 `openclaw.json` 中添加：

```json
{
  "channels": {
    "imessage": {
      "enabled": true,
      "mode": "cloud"  // cloud 或 local
    }
  }
}
```

### 2. Cloud 模式（推荐）

Cloud 模式使用 Apple CloudKit：

```json
{
  "channels": {
    "imessage": {
      "enabled": true,
      "mode": "cloud",
      "container": "iCloud.com.yourteam.openclaw"
    }
  }
}
```

### 3. Local 模式

Local 模式用于本地测试：

```json
{
  "channels": {
    "imessage": {
      "enabled": true,
      "mode": "local"
    }
  }
}
```

## 常见问题

### 🟥 URL-only 消息不送达

**问题**: 包含 URL 的纯消息被静默丢弃

**版本**: v2026.3.28

**状态**: 已修复 in v2026.3.29

**临时解决方案**: 在 URL 前后添加文字

```
# 原始
https://example.com

# 修改
请查看: https://example.com 谢谢
```

### 连接失败

```bash
# 检查状态
openclaw doctor --channel imessage
```

### 消息丢失

检查日志：

```bash
openclaw logs --channel imessage
```

## 测试

```bash
# 发送测试消息
openclaw message send --channel imessage --to test@example.com --message "Hello"
```

## 相关资源

- [Apple iMessage 文档](https://developer.apple.com/documentation/imessage)
- [OpenClaw 渠道配置](https://docs.openclaw.ai/channels)