# OpenClaw 成本追踪指南 (burn0)

本文档介绍如何使用 burn0 实现实时费用追踪。

## 安装

```bash
npm install @burn0/burn0
```

## 配置

```json
{
  "costTracking": {
    "enabled": true,
    "providers": ["anthropic", "openai", "google"]
  }
}
```

## 使用

```
burn0 > anthropic/claude-sonnet  ->  $0.023  (in: 1847 / out: 312)
burn0 > openai/gpt-4o-mini       ->  $0.0004 (in: 156 / out: 44)

burn0 > $0.024 today (4 calls)
```

## 显示费用

```bash
openclaw cost show
openclaw cost history
```

## 配置告警

```json
{
  "costTracking": {
    "dailyLimit": 10,
    "warningThreshold": 0.8,
    "alertChannel": "telegram"
  }
}
```

## 支持的模型

| Provider | 模型 |
|----------|------|
| Anthropic | claude-* |
| OpenAI | gpt-* |
| Google | gemini-* |
| 本地 | ollama ($0) |

## 相关资源

- [burn0 GitHub](https://github.com/burn0-dev/burn0)
- [Issue #55379](https://github.com/openclaw/openclaw/issues/55379)