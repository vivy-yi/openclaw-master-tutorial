# 第19章 多 Agent 协作

> **本章学习目标**: 掌握 Subagent 生命周期管理、消息队列模式配置，以及常见 Bug 的 Workaround
> **预计用时**: 45-60 分钟
> **前置要求**: 完成基础部署，了解 Agent 基本概念

---

## 19.1 Subagent 基础

### 什么是 Subagent

Subagent（子 Agent）是由主 Agent 派生的独立工作单元。OpenClaw 支持通过 `sessions_spawn` 工具在后台启动 Subagent，用于：

- **并行处理**：将独立任务分发给多个 Subagent 同时执行
- **专业分工**：不同 Subagent 处理不同领域的任务
- **长时间任务**：将耗时操作放在后台，不阻塞主会话

### 启动 Subagent

```json
{
  "task": "分析 GitHub issue #55380 的根因并给出修复建议",
  "runtime": "subagent",
  "mode": "run",
  "runTimeoutSeconds": 300
}
```

参数说明：

| 参数 | 说明 | 必填 |
|------|------|------|
| `task` | 给 Subagent 的任务描述 | ✅ |
| `runtime` | 固定为 `subagent` | ✅ |
| `mode` | `run` 一次性执行，`session` 持续会话 | ✅ |
| `runTimeoutSeconds` | 超时时间（秒），0 表示无限制 | ❌ |
| `model` | 指定模型，不填则用默认 | ❌ |
| `cleanup` | `delete` 执行后删除，`keep` 保留 | ❌ |

### 查看 Subagent 状态

```
/subagents list
```

---

## 19.2 消息队列模式（重要！）

### 两种模式对比

OpenClaw 的消息队列支持两种模式，通过 `openclaw.json` 配置：

```json
{
  "messages": {
    "queue": {
      "mode": "steer"
    }
  }
}
```

| 模式 | 值 | 行为特点 | 适用场景 |
|------|-----|---------|---------|
| **Collect**（默认） | `"collect"` | 消息批量收集后一起处理，`/stop` 无法中断正在执行的任务 | 高吞吐量批量处理 |
| **Steer**（推荐） | `"steer"` | 用户可随时介入，`/stop` 和 `/queue interrupt` 立即生效 | 日常交互、调试 |

### ⚠️ v2026.3.24 Bug Workaround

**问题**：v2026.3.24 版本更新后，即使发送 `/stop` 或 `/queue interrupt`，运行中的 Agent 也无法被中断，用户消息被静默排队。

**根因**：该版本将 `messages.queue.mode` 默认值改为 `collect`，导致中断信号被批量队列吞掉。

**解决方案**：手动将配置改为 `steer` 模式。

**操作步骤**：

1. 找到 `openclaw.json` 文件（通常在 `~/.openclaw/` 下）
2. 添加或修改 `messages.queue.mode` 字段：

```json
{
  "messages": {
    "queue": {
      "mode": "steer"
    }
  }
}
```

3. 重启 Gateway 使配置生效：

```bash
openclaw gateway restart
```

**验证**：

```bash
openclaw config get messages.queue.mode
# 应输出: steer
```

---

## 19.3 Subagent 完成公告配置

### Announce 机制

Subagent 执行完成后，默认会向当前 session 发送公告（announce），告知任务结果。

### Telegram 群组中的公告失败问题

**问题**：在 Telegram 群组触发 Subagent，任务完成后主 Agent 的公告被静默丢弃。Gateway 日志出现：

```
Outbound not configured for channel: telegram
```

**根因**：Subagent 的 completion announce 路径没有配置 outbound 发送通道。

**状态**：暂无有效的配置 workaround（截至 v2026.3.24）。

**临时解决方案**：

1. **使用 DM 替代群组触发**：改为在私人对话中启动 Subagent
2. **监听 Gateway 日志**：通过 `openclaw gateway logs | grep subagent` 监控任务状态
3. **等待官方修复**：关注 [Issue #56032](https://github.com/openclaw/openclaw/issues/56032)

---

## 19.4 Cron 任务与 Subagent

### Cron 删除后持续投递

**问题**：删除一个 Cron job 后，该 job 的输出仍然持续投递到 session。

**根因**：删除操作未完全清理 job 的运行时状态。

**Workaround**：

```bash
# 删除 job 后手动重启 Gateway
openclaw gateway restart
```

**正确删除流程**：

1. 先禁用 job：`cron remove <jobId>`
2. 确认投递停止
3. 再执行一次 `cron remove <jobId>` 彻底删除
4. 重启 Gateway

### Cron + Subagent 最佳实践

推荐使用 `sessionTarget: "isolated"` 让 Subagent 在独立 session 中运行：

```json
{
  "name": "每日报告生成",
  "schedule": { "kind": "cron", "expr": "0 9 * * *", "tz": "Asia/Shanghai" },
  "payload": {
    "kind": "agentTurn",
    "message": "生成今日运营报告并保存到 workspace/reports/"
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "announce" }
}
```

---

## 19.5 Heartbeat 风暴问题

### 问题描述

当主 session 有未读的 heartbeat prompt 时，Subagent 的自动公告会插入消息队列，每次插入重新触发 heartbeat handler，导致心跳以约 18 秒间隔持续狂触发。

**症状**：日志中大量重复的 `HEARTBEAT_OK`，Token 消耗异常增加。

**状态**：活跃 Bug，暂无有效 workaround（截至 v2026.3.24）。

**临时应对**：

1. **监控日志**：发现大量 `HEARTBEAT_OK` 时重启 Gateway
2. **避免在 heartbeat 期间触发 Subagent**：将 Subagent 任务安排在心跳间隔稳定的时间段
3. **关注官方修复**：跟踪 [Issue #56049](https://github.com/openclaw/openclaw/issues/56049)

---

## 19.6 常用运维命令

### Subagent 管理

```bash
# 查看当前 session 的 Subagent 列表
/subagents list

# 终止某个 Subagent
/subagents kill <subagent-id>

# 给 Subagent 发送新指令
/subagents steer <subagent-id> <message>
```

### Session 管理

```bash
# 查看所有活跃 session
/sessions list

# 查看特定 session 历史
/sessions history <session-key>

# 向指定 session 发送消息
/sessions send <session-key> <message>
```

### Gateway 重启（重要）

```bash
# 重启 Gateway
openclaw gateway restart

# 查看 Gateway 状态
openclaw gateway status

# 查看实时日志
openclaw gateway logs -f
```

---

## 19.7 常见问题速查

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `/stop` 无法中断任务 | `messages.queue.mode` 为 `collect` | 改为 `steer` 后重启 |
| Subagent 公告发送到 Telegram 群失败 | outbound 未配置 | 改用 DM 触发，等待修复 |
| Cron 删除后仍然投递 | job 状态未清理 | 删除后重启 Gateway |
| Heartbeat 大量重复触发 | #56049 活跃 Bug | 监控日志，必要时重启 |
| Subagent 超时卡住 | `timeoutSeconds` 未生效 | 重启 Gateway 或手动 kill |

---

## 19.8 最佳实践总结

1. **始终使用 `messages.queue.mode: "steer"`** — 保持对运行任务的控制能力
2. **Subagent 任务用 `run` 模式** — 一次性任务用完即弃，减少资源占用
3. **设置合理的 `runTimeoutSeconds`** — 防止失控 Subagent 无限占用资源
4. **Cron + Subagent 用 `isolated` session** — 隔离环境避免干扰主会话
5. **删除 Cron job 后务必重启 Gateway** — 确保运行时状态被完全清理
6. **Telegram 群组场景用 DM 中转** — 绕过公告投递的限制问题

---

## 相关参考

- [Issue #56044 — /stop 中断失效](https://github.com/openclaw/openclaw/issues/56044)
- [Issue #56032 — Telegram 群组公告失败](https://github.com/openclaw/openclaw/issues/56032)
- [Issue #56045 — Cron 删除后持续投递](https://github.com/openclaw/openclaw/issues/56045)
- [Issue #56049 — Heartbeat 风暴](https://github.com/openclaw/openclaw/issues/56049)
- [Issue #55380 — timeoutSeconds 未生效](https://github.com/openclaw/openclaw/issues/55380)
- [Issue #55385 — memory_search 被禁用](https://github.com/openclaw/openclaw/issues/55385)
- [OpenClaw 官方文档](https://docs.openclaw.ai)
