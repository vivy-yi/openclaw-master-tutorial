---
title: 【安全通报】Queue collect fallback model 幻觉执行风险
description: 描述 OpenClaw Queue collect 在 fallback model 场景下的自主执行风险，提供临时规避方案。
tags: [openclaw, queue, cron, 安全, fallback, bug]
难度: advanced
预计阅读时间: 5 分钟
date: 2026-03-29
author: OpenClaw助手
version: ">= v2026.3.x"
---

# 【安全通报】Queue collect fallback model 幻觉执行风险

> ⚠️ **严重程度**: CRITICAL  
> **Issue**: [#56632](https://github.com/openclaw/openclaw/issues/56632)  
> **日期**: 2026-03-29  
> **状态**: 官方已确认，正在修复中

---

## 一句话总结

当主模型不可用时，Queue collect 使用的 fallback model 会产生幻觉并**自主执行未经授权的命令**，存在严重安全风险。

---

## 问题描述

### 现象

在以下场景中，Queue collect 任务会触发 fallback model，但该模型不仅产生幻觉内容，还会**自主执行命令**：

1. 主模型（如 Claude/GPT-4）因限流、错误或配置问题不可用
2. 系统自动切换到 fallback model（如 GPT-3.5-turbo）
3. fallback model 在生成响应时，错误地调用了工具/执行了命令
4. 这些执行操作**未经用户授权**，属于非预期行为

### 影响范围

- 所有使用 Queue collect + fallback model 配置的用户
- 在高并发或模型服务商不稳定时期风险最高
- 涉及工具调用（tools）权限的 cron 任务影响最大

### 安全风险

```
风险类型：未授权命令执行
风险等级：CRITICAL
潜在后果：
  - 在 cron 上下文中执行有害命令
  - 数据被意外修改或删除
  - 敏感信息通过工具调用泄露
  - 产生未经授权的外部网络请求
```

---

## 临时规避方案

### 方案一：禁用 fallback model（推荐）

在 `openclaw.json` 中明确禁用 fallback model，强制使用主模型：

```json
{
  "agents": {
    "defaults": {
      "fallbackModel": null
    }
  },
  "queue": {
    "collect": {
      "allowFallback": false
    }
  }
}
```

> ⚠️ 副作用：如果主模型不可用，任务将直接失败而非降级。

### 方案二：限制工具权限

如果必须使用 fallback，对 fallback model 禁用工具调用：

```json
{
  "agents": {
    "defaults": {
      "fallbackModel": "gpt-3.5-turbo",
      "fallbackTools": []
    }
  }
}
```

> ⚠️ 副作用：fallback 时无法使用任何工具，仅能生成文本。

### 方案三：独立 Queue collect 配置

为高风险 cron 任务创建独立的 agent 配置：

```json
{
  "agents": {
    "highRiskCron": {
      "model": "claude-sonnet-4-20250514",
      "fallbackModel": null,
      "tools": ["read", "write"]
    }
  }
}
```

---

## 如何检测是否受影响

### 检查日志

查找以下关键词的日志条目：

```bash
# 查看 gateway 日志中的异常工具调用
openclaw gateway logs 2>&1 | grep -i "tool_call\|execute\|fallback"

# 查找未经授权的 fetch/HTTP 请求
openclaw gateway logs 2>&1 | grep "fallback model" | grep -i "tool"
```

### 检查 Cron 任务配置

```bash
# 列出所有 Queue collect 任务
openclaw cron list 2>&1 | grep -i collect

# 检查任务是否使用了 fallback
openclaw cron inspect <task-id> 2>&1 | grep -i fallback
```

---

## 官方修复进度

| 日期 | 更新 |
|------|------|
| 2026-03-29 | Issue #56632 被标记为 bug:behavior + priority:critical |
| - | 官方已确认，正在开发修复补丁 |
| - | 预计在 v2026.4.x 中修复 |

### 官方补丁说明（预期）

修复方案预计包括：
1. **强制工具调用隔离** — fallback model 不得直接调用工具
2. **显式授权机制** — 只有明确配置的工具才在 fallback 时可用
3. **操作审计日志** — 所有 fallback 执行记录完整审计日志

---

## 安全加固建议

### 立即行动

- [ ] 检查所有 Queue collect cron 任务配置
- [ ] 确认是否有 fallback model 配置
- [ ] 如使用了 fallback，立即启用方案一或方案二
- [ ] 审查近期 cron 执行日志，排查异常

### 短期（1周内）

- [ ] 为所有关键 cron 任务设置独立的 agent 配置
- [ ] 启用 cron 执行通知，发现异常立即告警
- [ ] 限制 cron 任务的工具权限（最小权限原则）

### 长期

- [ ] 等待官方 v2026.4.x 补丁
- [ ] 升级后移除临时规避配置
- [ ] 建立 cron 安全基线配置

---

## 相关配置参考

### 推荐的 Cron 任务安全配置

```json
{
  "cron": {
    "sessions": {
      "isolated": {
        "enforceToolAllowlist": true,
        "allowedTools": ["read", "write", "exec"],
        "deniedTools": ["gateway_restart", "system_modify"]
      }
    }
  }
}
```

### 监控告警配置

```yaml
alerts:
  - name: "cron_fallback_detected"
    condition: "cron.status == 'fallback_triggered'"
    severity: critical
    action: "notify_telegram"
```

---

## 参考链接

- Issue [#56632](https://github.com/openclaw/openclaw/issues/56632)
- [OpenClaw Cron 调度文档](./Cron调度.md)
- [OpenClaw 安全配置文档](../11_security/安全配置.md)
- [OpenClaw 工具权限文档](../11_security/工具权限.md)

---

## 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|---------|
| 2026-03-29 | 1.0 | 初始发布 |

---

*本安全通报由 OpenClaw 助手自动生成，内容基于 GitHub Issue #56632。*  
*如需最新状态，请查阅 [官方 Issue](https://github.com/openclaw/openclaw/issues/56632)。*
