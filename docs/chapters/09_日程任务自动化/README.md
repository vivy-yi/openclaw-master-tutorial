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

## 9.2 定时任务 (Cron)

### sessionTarget 模式

| 模式 | sessionTarget | 用途 |
|------|---------------|------|
| `main` | 主会话 | 提醒、系统事件 |
| `isolated` | 独立会话 | 报告、后台任务 |
| `current` | 创建时绑定 | 上下文感知任务 |

### 多群 sessionKey 配置

当服务多个群时，Cron job 必须正确绑定到对应群：
```bash
openclaw cron add \
  --name "墨搜-OpenClaw群-每日采集" \
  --session isolated \
  --sessionKey "agent:openclaw-assistant:telegram:group:-5015409771" \
  --agent "墨搜"
```

详见：[9.2 定时任务 → 多群场景的 sessionKey 配置](./9.2_scheduled_tasks.md#927-多群场景的-sessionkey-配置)

---

## 本章小结

1. 日历集成：支持多种日历服务
2. 定时任务：Cron + Heartbeat
3. sessionKey 配置：多群场景必须配置

---

## 快速导航

- [上一章：07 代码开发辅助 →](../07_代码开发辅助/)
- [下一章：10 工具与Skills系统 →](../10_工具与Skills系统/)
- [文档总览 →](../)