# 第9章 日程与任务自动化

> **本章学习目标**: 掌握日历集成和定时任务配置
> **预计用时**: 60-90分钟
> **前置要求**: 完成基础部署

---

## 9.1 日历集成

### 支持的日历

- Google Calendar
- Apple Calendar (macOS)
- Outlook
- 飞书日历

### 配置示例

```json
{
  "calendar": {
    "provider": "google",
    "credentials": {
      "clientId": "your-client-id",
      "clientSecret": "your-client-secret"
    }
  }
}
```

### 使用示例

```
今天有什么安排？
帮我安排下午3点的会议
```

---

## 9.2 定时任务 (Heartbeat)

### Heartbeat配置

```json
{
  "heartbeat": {
    "enabled": true,
    "interval": 3600,
    "tasks": [
      {
        "name": "morning-brief",
        "schedule": "0 9 * * *",
        "action": "send-briefing"
      }
    ]
  }
}
```

### 常见任务

- 每日简报
- 数据同步
- 监控告警

---

## 本章小结

1. 日历集成：支持多种日历服务
2. 定时任务：Heartbeat实现自动化
3. 常见场景：晨间简报、数据同步

---

## 快速导航

- [上一章：07 代码开发辅助 →](../07_代码开发辅助/)
- [下一章：10 工具与Skills系统 →](../10_工具与Skills系统/)
- [文档总览 →](../)
