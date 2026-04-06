# Heartbeat 状态追踪

> 源码位置：Compaction Logic，`pi-embedded-bukGSgEe.js` 第 28123 行

---

## Heartbeat 巡逻状态机

```
状态: IDLE
  ↓ 收到 heartbeat poll
状态: CHECKING
  ↓
[检查项目]
  ↓
状态: CLEAN → 回复 HEARTBEAT_OK
状态: ALERT → 回复具体内容
```

## Compaction 中的 Heartbeat 处理

### 正常情况（无异常）

```
If you receive a heartbeat poll (a user message matching the heartbeat prompt above),
and there is nothing that needs attention, reply exactly:
HEARTBEAT_OK
```

### Compaction 期间

```
If there is nothing to note, reply exactly: NO_REPLY
(do not include HEARTBEAT_OK in compaction output)
```

**原因**：`HEARTBEAT_OK` 会被 OpenClaw 丢弃，不需要写入 session 历史。

## 状态追踪流程

### 每次 Heartbeat 巡逻

```
1. Agent 收到匹配 heartbeat prompt 的消息
2. 检查 HEARTBEAT.md 中的任务列表
3. 发现问题 → 回复 alert 内容，不含 HEARTBEAT_OK
4. 无问题 → 回复 HEARTBEAT_OK
5. OpenClaw 处理 HEARTBEAT_OK（可能丢弃）
```

### Compaction 触发时

```
1. Session 超过 token 限制
2. Compaction 开始压缩历史
3. 检查是否有 pending heartbeat state
4. 如果是 HEARTBEAT_OK → 不写入 flush
5. 如果是 alert → 写入 flush（重要信息）
```

## HEARTBEAT.md 格式

```markdown
# Heartbeat 巡逻任务

## 定期检查项
- Cron 任务执行状态
- 错误日志出现频率
- 磁盘使用率

## 触发条件
当消息内容匹配: "HEARTBEAT"

## 状态记录
（由 Agent 在巡逻后更新）
```

## 巡逻频率

由 `gateway.heartbeatInterval` 配置，默认 1 小时一次。

## OpenClaw 处理流程

```
Gateway → 发送 heartbeat poll → Agent 处理 → 回复
                                       ↓
                              HEARTBEAT_OK → 可能被丢弃
                              HEARTBEAT_OK → 正常写入 session 历史
```
