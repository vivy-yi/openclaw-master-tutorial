# OpenClaw 记忆系统完全指南

本文档介绍 OpenClaw 的记忆系统，包括短期记忆、长期记忆和重要性评分。

## 记忆类型

| 类型 | 存储 | 用途 |
|------|------|------|
| 短期 | session | 当前对话 |
| 长期 | memory/ | 跨会话 |

## 配置

### 基础配置

```json
{
  "memory": {
    "type": "hybrid",
    "session": {
      "maxTurns": 50
    },
    "longTerm": {
      "enabled": true,
      "path": "~/.openclaw/memory"
    }
  }
}
```

### 重要性评分 (v2026.3.28+)

```json
{
  "memory": {
    "importanceScoring": true,
    "timeDecay": {
      "enabled": true,
      "halfLifeDays": 7
    }
  }
}
```

## 使用

### 手动存储记忆

```
Agent: 把这个记住
```
→ 自动存入长期记忆

### 搜索记忆

```
Agent: 之前提到的那个是什么？
```
→ 搜索相关记忆

### 记忆衰减

| 时间 | 保留概率 |
|------|---------|
| 1天 | 100% |
| 7天 | 50% |
| 30天 | 10% |

## 故障排除

### memorySearch.extraPaths 被忽略

**问题**: 配置的额外路径无效

**版本**: v2026.3.28

**状态**: 已修复 in v2026.3.29

## 相关资源

- [记忆系统文档](https://docs.openclaw.ai/memory)
- [配置参考](https://docs.openclaw.ai/config)