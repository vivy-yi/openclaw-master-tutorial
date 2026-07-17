# HEARTBEAT.md — 心跳巡逻任务

> 源码：`docs/reference/templates/HEARTBEAT.md`

---

# HEARTBEAT.md Template

```markdown
# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.
```

---

## 使用说明

- 文件保留空（或只有注释）= 跳过心跳 API 调用
- 写入任务 = OpenClaw 会按配置的间隔轮询，Agent 检查任务
- 消息内容匹配 `HEARTBEAT` 触发巡逻

## 配置位置

`gateway.heartbeatInterval` 配置巡逻间隔，默认约 30 分钟一次。

## 示例

```markdown
# HEARTBEAT.md

## 每日检查（上午8点）
- 天气：如果可能下雨，发提醒
- 日历：2小时内有会议？发提醒

## 间隔检查
- Cron 任务执行状态
- 是否有错误日志
```
