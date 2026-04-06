# ## Current Date & Time

> 源码位置：`buildTimeSection()`，`pi-embedded-bukGSgEe.js` 第 27715 行

---

## 注入条件

```
if (!params.userTimezone) return [];
```

仅当配置了 `userTimezone` 时才注入。

## 内容格式

```
## Current Date & Time
Time zone: <userTimezone>
```

## 示例

```
## Current Date & Time
Time zone: Asia/Shanghai
```

## userTime 和 userTimeFormat

系统还支持 `userTime`（当前时间戳）和 `userTimeFormat`（时间格式字符串）。

## 时区配置位置

在 `openclaw.json` 中：

```json
{
  "gateway": {
    "userTimezone": "Asia/Shanghai"
  }
}
```

## 对记忆召回的影响

记忆召回时，系统会根据当前时间判断记忆的有效性和相关性。
