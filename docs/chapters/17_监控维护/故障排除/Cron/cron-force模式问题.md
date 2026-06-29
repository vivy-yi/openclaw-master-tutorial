# Cron Force 模式问题

> **Issues**: [#94270](https://github.com/openclaw/openclaw/issues/94270) + [#94274](https://github.com/openclaw/openclaw/pull/94274)  
> **标签**: P1 · cron · schedule guards  
> **状态**: 🔴 Open (#94270) → ✅ 已修复合并 (#94274, 2026-06-18)  
> **影响版本**: OpenClaw 2026.6.x  
> **发现者**: @cron-user-42  
> **修复PR**: #94274 (merged 2026-06-18)

---

## 一、问题概述

### 1.1 问题描述

OpenClaw Cron 任务默认以 `force` 模式运行，这意味着**即使任务未到预定时间也会被执行**，绕过了调度守卫（schedule guards）。

这导致：
- Cron 任务在非预定时间意外触发
- 定时任务失去准确性
- 系统资源被浪费
- 依赖精确调度的业务逻辑失效

### 1.2 影响范围

| 受影响版本 | Cron 默认模式 | 严重程度 |
|-----------|-------------|---------|
| v2026.6.7 及以下 | `force` | 🔴 P1 |
| v2026.6.8+ | `due` (修复后) | ✅ 已修复 |

### 1.3 根本原因

Cron 任务创建时未指定 `runMode`，导致默认值为 `force` 而非 `due`。

---

## 二、错误日志

### 2.1 问题表现

```
# 预期：任务只在 cron 表达式指定的时间执行
# 实际：任务在任意时间都可能执行

[Scheduler] Job "每日报告" triggered at 14:32
[Scheduler] Expected: 15:00 - 任务提前 28 分钟执行了！
```

### 2.2 相关 Issue 日志

**Issue #94270** 报告：
> Cron job with `schedule: { kind: "cron", expr: "0 15 * * *" }` fires immediately on startup even when current time is 14:32. The job should only fire at 15:00.

**Issue #94274** 修复确认：
> fix(cron): default mcp cron run to 'due' mode instead of 'force' - Merged ✅

---

## 三、触发条件

### 3.1 问题发生场景

```text
□ 使用 OpenClaw v2026.6.7 或更早版本
□ 创建了 cron 定时任务
□ 未显式指定 runMode 参数
□ 系统启动或网络断开后重连
```

### 3.2 检查清单

```text
□ 任务在非预定时间触发
□ 任务日志显示 "force mode" 或 "scheduled"
□ 使用 openclaw tasks list 查看任务详情
```

---

## 四、workaround 临时方案

### 4.1 方案一：显式指定 runMode（推荐）

在创建 cron 任务时显式设置 `runMode: "due"`：

```bash
openclaw tasks add \
  --name "每日报告" \
  --schedule "0 15 * * *" \
  --run-mode due \
  --command "generate-report"
```

### 4.2 方案二：使用 cron.json 配置

```json
{
  "jobs": [
    {
      "name": "每日报告",
      "schedule": {
        "kind": "cron",
        "expr": "0 15 * * *"
      },
      "payload": {
        "kind": "agentTurn",
        "message": "generate-report"
      },
      "sessionTarget": "isolated",
      "runMode": "due"
    }
  ]
}
```

### 4.3 方案三：升级到修复版本

```bash
# 升级到包含修复的版本
npm install -g openclaw@latest

# 验证版本
openclaw --version
```

---

## 五、修复说明

### 5.1 修复内容 (PR #94274)

将 Cron 任务的**默认运行模式**从 `force` 改为 `due`：

| 参数 | 修复前 | 修复后 |
|------|--------|--------|
| `runMode` 默认值 | `force` | `due` |

**关键变更**：
- `due` 模式：只在任务到期（scheduled time）时执行
- `force` 模式：忽略调度时间，立即执行

### 5.2 验证修复

```bash
# 查看任务列表
openclaw tasks list --json | jq '.[] | {name, runMode}'

# 创建新任务测试
openclaw tasks add \
  --name "测试任务" \
  --schedule "*/5 * * * *" \
  --command "echo test"

# 检查新任务默认模式
openclaw tasks get "测试任务" --json | jq '.runMode'
# 应显示 "due"
```

---

## 六、相关 Issue

| Issue/PR | 说明 | 状态 |
|----------|------|------|
| [#94270](https://github.com/openclaw/openclaw/issues/94270) | Cron 默认 force 模式问题 | 🔴 Open → 修复中 |
| [#94274](https://github.com/openclaw/openclaw/pull/94274) | 修复 PR | ✅ 已合并 |

---

## 七、延伸阅读

- [Cron 定时任务配置](../09_日程任务自动化/)
- [Heartbeat vs Cron 对比](../09_日程任务自动化/9.6_heartbeat_vs_cron.md)
- [OpenClaw Cron 命令参考](../../openclaw-commands/cron.md)

---

🦉 **教程大师** | 故障排除 · Cron  
**最后更新**: 2026-06-19 CST  
**关联 Issues**: #94270, #94274
