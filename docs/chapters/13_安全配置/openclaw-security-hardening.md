# OpenClaw 安全加固指南

本文档介绍 OpenClaw 的安全加固配置，防范攻击和错误决策。

## 核心安全缺陷

以下 5 个缺陷需要立即修复：

### 1. 上下文窗口压缩问题

**问题**: 长任务执行时上下文逐渐耗尽，后期 Agent "失忆"

**解决方案**: 配置上下文截断

```json
{
  "chat": {
    "history": {
      "maxTurns": 50,
      "strategy": "compress"  // compress | truncate | summarize
    }
  }
}
```

### 2. 文件任务输出验证

**问题**: exec 默认不验证输出，攻击者可伪造

**解决方案**: 启用输出验证

```yaml
exec:
  outputValidation:
    enabled: true
    hash_match: true
    content_check: true
```

### 3. 凭证安全

**检查泄露**:

```bash
openclaw doctor --security
```

**配置告警**:

```json
{
  "security": {
    "credentialAlert": true,
    "scanOnStart": true
  }
}
```

### 4. 注入防护

```json
{
  "security": {
    "inputSanitization": {
      "enabled": true,
      "blockPatterns": ["```", "eval(", "exec("]
    }
  }
}
```

### 5. 日志脱敏

```json
{
  "security": {
    "logRedaction": {
      "enabled": true,
      "patterns": ["apiKey", "password", "token"]
    }
  }
}
```

## 快速加固

```bash
openclaw configure --security-level high
```

## 安全检查

```bash
# 全面检查
openclaw doctor --security

# 凭证扫描
openclaw security scan

# 日志审计
openclaw logs --security
```

## 相关资源

- [Medium: What OpenClaw Gets Wrong](https://medium.com/@neonmaxima/what-openclaw-gets-wrong-out-of-the-box)