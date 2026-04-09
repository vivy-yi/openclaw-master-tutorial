# OpenClaw 故障率 Top3 速查表

本文档列出最高频的故障及快速解决方案。

## 故障统计

| 故障类型 | 占比 | 解决方案 |
|---------|------|----------|
| Gateway 问题 | 40% | 重启 + 日志分析 |
| 认证问题 | 25% | token 刷新 / 重建 |
| 模型限制 | 25% | 配置 rate limit |

## Top 1: Gateway 问题 (40%)

### 症状
- 无响应
- 消息卡住
- 连接失败

### 快速解决

```bash
# 重启
openclaw gateway restart

# 检查状态
openclaw status

# 查看日志
openclaw logs
```

### 深入排查

```bash
openclaw doctor
```

## Top 2: 认证问题 (25%)

### 症状
- 401 错误
- OAuth 失败
- Token 过期

### 快速解决

```bash
# 刷新凭证
openclaw configure --auth

# 重建认证
openclaw auth reauth
```

## Top 3: 模型限制 (25%)

### 症状
- 429 rate limit
-配额用尽
- 模型不可用

### 快速解决

```json
{
  "models": {
    "fallback": ["gpt-4o", "claude-sonnet"]
  },
  "rateLimit": {
    "enabled": true,
    "retryAfter": 60
  }
}
```

## 其他故障

### 命令行问题

```bash
# 端口冲突
openclaw config set gateway.port 18790

# 配置损坏
python3 -m json.tool ~/.openclaw/openclaw.json
```

### Cron 不工作

```bash
openclaw cron status
openclaw cron run <job-id>
```

## 相关资源

- [OpenClaw 诊断](https://docs.openclaw.ai/diagnostics)