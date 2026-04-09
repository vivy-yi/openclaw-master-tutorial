# 跨 Agent 会话管理指南

本文档介绍如何管理多个 Agent 之间的协作。

## subagent 配置

```json
{
  "subagents": {
    "enabled": true,
    "allowlist": ["mo-game", "moxue", "mo-searcher"]
  }
}
```

## sessions_spawn

### 基本用法

```python
# spawn 子 Agent
result = await sessions_spawn(
    agentId="mo-game",
    task="生成图片描述"
)
```

### 参数

| 参数 | 说明 |
|------|------|
| agentId | 子 Agent ID |
| task | 任务描述 |
| model | 可选的模型覆盖 |
| timeoutSeconds | 超时设置 |

### 超时问题

**问题**: timeoutSeconds 未强制执行，session  lock 无限占用

**解决**: v2026.3.28+ 已修复

```yaml
subagents:
  defaultTimeout: 300  # 5 分钟
  maxRetries: 2
```

### 会话清理

```python
cleanup = "delete"  # 完成后删除
# 或
cleanup = "keep"    # 保留
```

## Announce 问题

### Slack 报 "Outbound not configured"

**版本**: v2026.3.27

**解决**: v2026.3.28+ 已修复

### 配置

```yaml
channels:
  announce:
    enabled: true
    channels: ["telegram", "slack"]
```

## 多 Agent 协作

### 工作流

```yaml
workflows:
  multi:
    steps:
      - agent: mo-searcher
        task: 收集信息
      - agent: mo-game
        task: 生成内容
      - agent: mo-yunying
        task: 发布
```

## 相关资源

- [Issue #55382](https://github.com/openclaw/openclaw/issues/55382)
- [Issue #55380](https://github.com/openclaw/openclaw/issues/55380)