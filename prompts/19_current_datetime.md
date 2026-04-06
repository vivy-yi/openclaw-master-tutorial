# ## Current Date & Time

> 源码：`src/agents/system-prompt.ts` — `buildTimeSection()`，约 line 646

---

## 注入条件

```typescript
userTimezone
  ? "If you need the current date, time, or day of week, run session_status (📊 session_status)."
  : "",
```

---

## 注入内容

```
If you need the current date, time, or day of week, run session_status (📊 session_status).
```

---

## userTimezone 和 userTime

| 字段 | 说明 |
|------|------|
| `userTimezone` | 用户时区（用于日期时间显示） |
| `userTime` | 当前时间戳（可选） |
| `userTimeFormat` | 时间格式字符串（可选） |

---

## 配置位置

在 `openclaw.json` 中：

```json
{
  "gateway": {
    "userTimezone": "Asia/Shanghai"
  }
}
```

---

## session_status 命令

当 Agent 需要当前日期时间时，应调用：

```
session_status
```

会返回类似：
```
📊 Session Status
model: minimax-portal/MiniMax-M2.7
current_time: 2026-04-06T09:00:00+08:00
timezone: Asia/Shanghai
```

---

## 对记忆召回的影响

记忆召回时，系统根据当前时间判断记忆的有效性和相关性。
