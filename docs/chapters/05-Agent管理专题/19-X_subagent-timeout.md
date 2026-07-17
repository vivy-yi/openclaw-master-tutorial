# 19.X Subagent 超时机制最佳实践

> 掌控子 Agent 的生命周期，防止任务失控 · 自动恢复 · 稳定运行
>
> **适用版本**: v2026.3.x 及以上
> **前置要求**: 了解 Subagent 基本用法（第19.1节）

---

## 概述

Subagent 超时机制是生产环境中保障系统稳定性的关键配置。合理设置 `timeoutSeconds` 可以：

- **防止资源泄露**：失控的 Subagent 不会无限占用内存和 Token
- **自动恢复**：超时后自动终止并触发恢复流程
- **可预测性**：任务执行有明确的时间边界，便于监控和告警

> ⚠️ **已知问题**: v2026.3.24 及之前版本，`timeoutSeconds` 在某些场景下存在未生效的问题（见 [Issue #55380](https://github.com/openclaw/openclaw/issues/55380)）。本章提供完整的临时 workaround 方案。

---

## 19.X.1 `timeoutSeconds` 参数详解

### 参数说明

```json
{
  "task": "分析这个 GitHub 仓库的安全漏洞",
  "runtime": "subagent",
  "mode": "run",
  "timeoutSeconds": 300
}
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `timeoutSeconds` | number | `0`（无限制） | Subagent 最大运行时间（秒） |
| `mode` | string | — | `run`：一次性任务；`session`：持续会话 |
| `cleanup` | string | `"delete"` | `delete`：执行后删除；`keep`：保留 session |

### `timeoutSeconds` 取值建议

| 场景 | 建议值 | 说明 |
|------|--------|------|
| 快速查证（搜索、读文件） | 60-120 秒 | 一般在 2 分钟内完成 |
| 中等复杂度（代码分析、小型重构） | 180-300 秒 | 5 分钟左右 |
| 复杂任务（大型重构、多轮调试） | 600 秒 | 10 分钟，建议拆分为多个 Subagent |
| 批量处理（多文件转换、批量爬取） | 视任务量而定 | 每批次设置独立超时，详见 19.X.4 |
| 需无限制运行 | `0` | 仅用于长期监控、事件监听等特殊场景 |

### ⚠️ `mode: "session"` vs `mode: "run"` 的超时行为

| 模式 | `timeoutSeconds=0` | `timeoutSeconds>0` |
|------|-------------------|-------------------|
| `run` | 永不超时（风险高） | 到时强制终止 |
| `session` | 永不超时 | 到时终止 session |

> 💡 **优先使用 `mode: "run"` + 合理超时**，而不是 `mode: "session"` + 手动管理。

---

## 19.X.2 超时问题常见场景

### 场景一：Issue #55380 — `timeoutSeconds` 未生效

**问题描述**：

设置了 `timeoutSeconds`，但 Subagent 运行超过指定时间后仍未被终止，日志无任何超时相关记录。

**症状**：

- Subagent 持续运行超过 `timeoutSeconds` 设置值
- Gateway 日志无 `"timeout"`, `"killed"`, `"terminated"` 相关字样
- Subagent 的 session 仍然存在于 `/subagents list` 输出中

**根因分析**：

1. **Gateway 未正确传递 timeout 参数**：某些版本中 `sessions_spawn` 的 `timeoutSeconds` 参数未被正确解析
2. **Subagent 内部有阻塞 I/O**：如果 Subagent 在等待网络响应或文件 I/O，外部超时无法中断
3. **配置文件覆盖**：openclaw.json 中的全局超时设置与 Subagent 级设置冲突

**Workaround 方案**：

**方案 A：使用 Cron + 超时兜底**

```json
{
  "name": "超时保护 Cron",
  "schedule": { "kind": "cron", "expr": "*/5 * * * *", "tz": "UTC" },
  "payload": {
    "kind": "agentTurn",
    "message": "检查并终止所有运行超过10分钟的 Subagent：/subagents list 中 state=active 且 startTime 超过 600 秒的，执 行 /subagents kill <id>"
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "suppress" }
}
```

**方案 B：结合进程级超时（exec 工具兜底）**

如果 Subagent 的核心逻辑是执行 shell 命令，使用 `exec` 工具的 `timeout` 参数作为第二层保护：

```json
{
  "task": "执行耗时分析任务",
  "runtime": "subagent",
  "timeoutSeconds": 300,
  "execTimeoutSeconds": 300
}
```

**方案 C：检查 Gateway 版本并升级**

```bash
openclaw --version
# 如果是 v2026.3.24 或更早版本，升级到最新版本
openclaw upgrade
```

---

### 场景二：Subagent 超时后 session 未清理

**问题描述**：

Subagent 超时终止后，其 session 未被自动删除，持续占用资源。

**症状**：

- `/subagents list` 中存在大量 `state: timeout` 或 `state: dead` 的僵尸 session
- 内存占用持续增长

**Workaround**：

```bash
# 定期清理超时 session
# 在 Cron job 中配置
/subagents list | grep timeout | awk '{print $1}' | xargs -I {} /subagents kill {}

# 或重启 Gateway（最简单粗暴）
openclaw gateway restart
```

**自动化清理脚本**（保存为 `cleanup-subagents.sh`）：

```bash
#!/bin/bash
# 自动清理超时 Subagent
TIMEOUT_SECONDS=600
CURRENT_TIME=$(date +%s)

openclaw subagents list --json | jq -r '.[] | select(.state=="active") | @base64' | while read -r entry; do
  SUBAGENT_ID=$(echo "$entry" | base64 --decode | jq -r '.id')
  START_TIME=$(echo "$entry" | base64 --decode | jq -r '.startTime // 0')
  ELAPSED=$((CURRENT_TIME - START_TIME))
  if [ "$ELAPSED" -gt "$TIMEOUT_SECONDS" ]; then
    echo "Killing timeout Subagent: $SUBAGENT_ID (running ${ELAPSED}s)"
    openclaw subagents kill "$SUBAGENT_ID"
  fi
done
```

---

### 场景三：Telegram 群组中 Subagent 超时后无反馈

**问题描述**：

在 Telegram 群组触发 Subagent，超时终止后没有任何通知，用户不知道任务已经失败。

**症状**：

- Subagent 超时后群组里没有任何消息
- 用户不知道是超时了还是还在运行
- 容易引发重复触发

**Workaround**：

在任务开始时主动告知预期时间，并在超时后发送通知：

```
在 Subagent 任务开始时发送：
"🔄 开始处理，预计 3 分钟内完成。如超时未返回请 @我"

（超时后手动或通过 Cron 发送）：
"⚠️ 任务超过预期时间，已自动终止。如需继续请重新触发。"
```

**代码示例**（使用 `sessions_spawn` 时附带提示消息）：

```json
{
  "task": "任务描述",
  "runtime": "subagent",
  "mode": "run",
  "timeoutSeconds": 180,
  "announceOnStart": true,
  "announceOnTimeout": true,
  "announceOnComplete": true
}
```

---

### 场景四：长时间运行的 Subagent 占用 Token 配额

**问题描述**：

Subagent 运行时持续生成 token（思维过程、工具调用日志），耗尽配额后主 session 受到影响。

**症状**：

- Token 使用量异常增长
- 主 session 开始出现 `rate limit` 或 `quota exceeded` 错误

**Workaround**：

1. **限制 Subagent 思维深度**：在 Subagent 的 system prompt 中加入 `"thinking": "off"`

2. **使用独立 model**：为 Subagent 指定低配模型

```json
{
  "task": "简单数据整理任务",
  "runtime": "subagent",
  "model": "minimax-portal/MiniMax-M2",
  "timeoutSeconds": 120
}
```

3. **设置 Token 预算上限**：

```json
{
  "agents": {
    "defaults": {
      "maxTokens": 4096
    },
    "subagent": {
      "maxTokens": 2048
    }
  }
}
```

---

## 19.X.3 自动恢复机制设计

### 设计原则

```
┌─────────────────────────────────────────────────────────┐
│              Subagent 自动恢复机制设计原则                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. 防御性设计：假设任何 Subagent 都可能超时              │
│  2. 幂等性：重复执行不会产生副作用                        │
│  3. 可观测性：超时/失败必须有日志记录                    │
│  4. 分层保护：不要依赖单一超时机制                        │
│  5. 最小权限：Subagent 权限不应高于必要范围               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 模式一：超时 → 终止 → 重试（Retry Pattern）

适用于：**可拆分、独立执行的任务**

```json
{
  "name": "带重试的 Subagent 任务",
  "schedule": { "kind": "cron", "expr": "0 * * * *", "tz": "UTC" },
  "payload": {
    "kind": "agentTurn",
    "message": "执行任务并记录结果到 workspace/results/；若超时，保留已产生的部分结果"
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "suppress" },
  "maxRetries": 3,
  "retryDelaySeconds": 60
}
```

**retry 逻辑 Cron 脚本示例**：

```bash
#!/bin/bash
# retry-subagent.sh
TASK_ID=$1
MAX_RETRIES=3
RETRY_DELAY=60

for i in $(seq 1 $MAX_RETRIES); do
  echo "[Attempt $i/$MAX_RETRIES] Starting Subagent for task: $TASK_ID"
  
  # 启动 Subagent（timeout 5分钟）
  RESULT=$(openclaw sessions spawn \
    --task "处理任务 $TASK_ID" \
    --runtime subagent \
    --mode run \
    --timeout 300 \
    --json 2>/dev/null)
  
  if [ $? -eq 0 ]; then
    echo "Success on attempt $i"
    exit 0
  fi
  
  echo "Attempt $i failed, waiting ${RETRY_DELAY}s before retry..."
  sleep $RETRY_DELAY
done

echo "All $MAX_RETRIES attempts failed for task: $TASK_ID"
openclaw gateway logs --tail 50 | grep "$TASK_ID"
exit 1
```

### 模式二：检查点 + 恢复（Checkpoint Pattern）

适用于：**长时间、不可中断的任务**

```
任务流程：
Step 1 ──→ Step 2 ──→ Step 3 ──→ Step 4 ──→ 完成
   │          │          │          │
 checkpoint  checkpoint checkpoint checkpoint
（每步完成后写入状态文件）
```

```markdown
# checkpoint.json 示例
{
  "taskId": "report-20260330",
  "currentStep": 2,
  "completedSteps": [1, 2],
  "results": {
    "step1": { "status": "done", "output": "workspace/step1-out.json" },
    "step2": { "status": "done", "output": "workspace/step2-out.json" }
  },
  "lastUpdated": "2026-03-30T02:00:00Z"
}
```

**恢复流程 Cron**：

```json
{
  "name": "检查点恢复 Cron",
  "schedule": { "kind": "cron", "expr": "*/10 * * * *", "tz": "UTC" },
  "payload": {
    "kind": "agentTurn",
    "message": "检查 workspace/checkpoint.json，若 currentStep < 4 且 lastUpdated 超过 5 分钟未更新，则从 checkpoint 继续执行后续步骤"
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "suppress" }
}
```

### 模式三：主从监控（Master-Slave Pattern）

适用于：**需要精确控制的复杂任务**

```
┌─────────────────┐       启动 + 设置超时
│   Master Agent  │ ──────────────────────────→ Subagent
│  （监控者角色）   │                                │
└─────────────────┘                                │
     ↑                                             │
     │         定期心跳检查                         │
     └─────────────────────────────────────────────┘
                    (若超时未响应 → kill + 重试)
```

**Master Agent 配置**：

```json
{
  "name": "Master 监控者",
  "schedule": { "kind": "cron", "expr": "*/3 * * * *", "tz": "UTC" },
  "payload": {
    "kind": "agentTurn",
    "message": "读取 workspace/subagent-status.json，检查所有 active Subagent 的心跳时间；若任何 active Subagent 超过 180 秒未更新心跳，执行 /subagents kill <对应id> 并记录到 workspace/failed-subagents.json"
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "suppress" }
}
```

**Subagent 心跳写入**（在 Subagent 任务开始时写入）：

```bash
# Subagent 任务开始时
echo "{\"id\": \"$SUBAGENT_ID\", \"status\": \"active\", \"lastHeartbeat\": $(date +%s)}" > workspace/subagent-status.json

# Subagent 任务结束时
echo "{\"id\": \"$SUBAGENT_ID\", \"status\": \"done\", \"completedAt\": $(date +%s)}" >> workspace/subagent-status.json
```

---

## 19.X.4 最佳实践总结

### ✅ 推荐做法

```
1. 始终设置合理的 timeoutSeconds（不要使用 0，除非明确需要无限期运行）
2. 优先使用 mode: "run" 而非 mode: "session"
3. 设置 cleanup: "delete" 让 Subagent 完成后自动清理
4. 设计幂等的 Subagent 任务（超时重试不会破坏数据）
5. 在任务描述中告知用户预期完成时间
6. 为关键任务配置多层级超时保护（Subagent + exec + Cron 兜底）
7. 定期审计 /subagents list 输出，清理僵尸 session
8. 使用 isolated sessionTarget 隔离 Subagent，避免影响主会话
9. Subagent 任务结果写入文件而非依赖 announce（announce 存在已知问题）
10. 为每个 Subagent 配置独立的 maxTokens 限制，防止 Token 配额耗尽
```

### ❌ 避免做法

```
1. 不要设置 timeoutSeconds: 0（除非是长期监控任务）
2. 不要依赖 Subagent 的 announce 机制传递关键结果
3. 不要在 Telegram 群组中直接触发需要超时的 Subagent（改用 DM 中转）
4. 不要让 Subagent 执行需要交互式输入的操作（无法被安全终止）
5. 不要忽略 /subagents list 中的僵尸 session（定期清理）
6. 不要让 Subagent 的权限高于必要范围（安全风险）
```

---

## 19.X.5 完整配置示例

### 示例一：Web 搜索 + 分析任务

```json
{
  "task": "搜索 GitHub 上关于 openclaw timeout 的 issue，列出前 5 个，按 star 数量排序",
  "runtime": "subagent",
  "mode": "run",
  "timeoutSeconds": 120,
  "cleanup": "delete",
  "model": "minimax-portal/MiniMax-M2",
  "announceOnComplete": true
}
```

### 示例二：代码重构任务（多层级保护）

```json
{
  "name": "重构任务（安全版）",
  "task": "将 workspace/src 中的所有 JS 文件转换为 TypeScript，结果保存到 workspace/ts-out/",
  "runtime": "subagent",
  "mode": "run",
  "timeoutSeconds": 600,
  "cleanup": "keep",
  "model": "minimax-portal/MiniMax-M2",
  "maxTokens": 8192,
  "execTimeoutSeconds": 600
}
```

### 示例三：定期健康检查 Cron

```json
{
  "name": "Subagent 健康检查",
  "schedule": { "kind": "cron", "expr": "*/5 * * * *", "tz": "Asia/Shanghai" },
  "payload": {
    "kind": "agentTurn",
    "message": "执行 Subagent 健康检查：1. /subagents list 检查是否有 state=active 且运行时长超过 600 秒的 Subagent；2. 若有，执行 /subagents kill <id> 并记录到 workspace/health-log.md；3. 检查 workspace/health-log.md，如果过去 1 小时有超过 3 次超时记录，发送告警"
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "suppress" }
}
```

---

## 19.X.6 超时相关命令速查

```bash
# 查看所有 Subagent 状态
/subagents list

# 查看特定 Subagent 详情
/subagents list --json | jq '.[] | select(.id=="xxx")'

# 手动终止超时 Subagent
/subagents kill <subagent-id>

# 查看 Subagent 实时日志
openclaw gateway logs -f | grep <subagent-id>

# 终止所有 active Subagent（紧急清场）
/subagents list | grep active | awk '{print $1}' | xargs -I {} /subagents kill {}

# 检查 Gateway 版本（升级解决已知 timeout bug）
openclaw --version
```

---

## 相关参考

- [Issue #55380 — timeoutSeconds 未生效](https://github.com/openclaw/openclaw/issues/55380)
- [Issue #56044 — /stop 中断失效](https://github.com/openclaw/openclaw/issues/56044)
- [Issue #56032 — Telegram 群组公告失败](https://github.com/openclaw/openclaw/issues/56032)
- [第19.1节 Subagent 基础](../19_多Agent协作/README.md#_191-subagent-基础)
- [第19.5节 Heartbeat 风暴问题](../19_多Agent协作/README.md#_195-heartbeat-风暴问题)
- [OpenClaw 官方文档 — Subagent](https://docs.openclaw.ai)
