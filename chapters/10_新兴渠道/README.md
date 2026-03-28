# 第10章 新兴渠道

> **本章学习目标**: 掌握 WhatsApp、Signal、LINE、Microsoft Teams 配置
> **预计用时**: 45-60 分钟
> **前置要求**: 完成基础部署

---

## 10.2 Signal

### 端到端加密

Signal以安全性著称，支持端到端加密。

```json
{
  "channels": {
    "signal": {
      "enabled": true,
      "phoneNumber": "your-number",
      "signalingKey": "your-signaling-key"
    }
  }
}
```

---

## 10.3 LINE

### 日本/台湾主流

LINE在日本和台湾是主流通讯工具。

```json
{
  "channels": {
    "line": {
      "enabled": true,
      "channelId": "your-channel-id",
      "channelSecret": "your-channel-secret",
      "accessToken": "your-access-token"
    }
  }
}
```

---

## 10.4 Microsoft Teams

### v2026.3.24 重要更新：官方 Teams SDK 迁移

> ⚠️ **v2026.3.24 对 Teams 频道进行了重大重构**：从旧版自定义实现迁移至 Microsoft 官方 **Bot Framework SDK**，支持流式回复、欢迎卡片、反馈机制等新功能。

### 迁移亮点

| 功能 | 旧版 | v2026.3.24+ |
|------|------|-------------|
| 回复方式 | 非流式 | ✅ **流式回复**（Streaming） |
| 新用户体验 | 简陋 | ✅ **欢迎卡片**（Welcome Card） |
| 交互反馈 | 无 | ✅ **反馈机制** |
| SDK 来源 | 自定义 | ✅ **Microsoft 官方 Bot Framework** |

### 配置步骤

**前提条件**：

- Microsoft 365 租户
- Azure App Registration（在 [Azure Portal](https://portal.azure.com) 创建）
- Teams 应用包（.zip）

**第一步：创建 Azure Bot 资源**

```json
{
  "channels": {
    "msteams": {
      "enabled": true,
      "botId": "your-azure-app-client-id",
      "botPassword": "your-azure-app-client-secret",
      "tenantId": "your-microsoft-365-tenant-id",
      "mode": "streamed"    // v2026.3.24+ 流式模式
    }
  }
}
```

**第二步：安装 Teams 应用**

1. 将生成的 Teams 应用包（.zip）上传到 Azure Blob 存储
2. 在 Teams 管理后台提交应用审核
3. 或通过「侧载」方式直接安装到团队

**第三步：配置 WebSocket（可选）**

```json
{
  "channels": {
    "msteams": {
      "enabled": true,
      "botId": "your-client-id",
      "botPassword": "your-client-secret",
      "useStreaming": true,    // 启用流式响应
      "streamingEndpoint": "wss://your-gateway/ws/msteams"
    }
  }
}
```

### 流式回复说明

v2026.3.24+ 的 Teams 集成支持流式回复，用户可以在 Bot 正在生成响应时看到实时输出，而不必等待完整响应。

```
┌─────────────────────────────────────────────────────────────┐
│               Teams 流式回复 vs 非流式对比                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  非流式（旧版）：                                              │
│  用户发送消息 → Bot 完整处理 → 一次性返回完整回复                 │
│  用户等待时间：整个生成过程                                      │
│                                                              │
│  流式（v2026.3.24+）：                                        │
│  用户发送消息 → Bot 边生成边显示 → 逐段落更新回复卡片              │
│  用户等待时间：首 Token 时间（大幅减少）                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 欢迎卡片配置

```json
{
  "channels": {
    "msteams": {
      "welcomeCard": {
        "enabled": true,
        "title": "👋 OpenClaw 助手已就绪",
        "subtitle": "我可以帮你完成日程管理、代码开发、数据分析等任务",
        "actions": [
          { "type": "message", "title": "📅 查看日程", "value": "查看日程" },
          { "type": "message", "title": "💬 发送消息", "value": "发送消息" }
        ]
      }
    }
  }
}
```

### 已知问题（v2026.3.24）

| Issue | 说明 | 状态 | 临时方案 |
|-------|------|------|---------|
| [#55386](https://github.com/openclaw/openclaw/issues/55386) | `message send --media` 上传文件到用户失败 | 待修复 | 通过 OneDrive 中转分享链接 |
| [#55384](https://github.com/openclaw/openclaw/issues/55384) | `Action.Submit` 调用活动被静默丢弃 | 待修复 | 改用 `Activity.Update` 或独立消息 |
| [#55383](https://github.com/openclaw/openclaw/issues/55383) | 从 OneDrive/SharePoint 链接获取媒体失败 | 待修复 | 使用 Azure Blob Storage 直链 |

### 常见问题

**Q1: Teams 连接无响应**

```bash
# 检查 Bot 状态
openclaw gateway logs | grep msteams

# 验证 Azure App Registration
# 确保 "允许动态调用" 和 "支持即时消息" 已开启
```

**Q2: 流式回复不生效**

```bash
# 确认 useStreaming: true 已设置
openclaw config get channels.msteams

# 重启 Gateway
openclaw gateway restart
```

---

## 本章小结

1. **WhatsApp**：商业 API 集成
2. **Signal**：端到端加密
3. **LINE**：日本/台湾主流
4. **Microsoft Teams**：v2026.3.24 官方 Bot SDK 迁移，支持流式回复、欢迎卡片、反馈机制
