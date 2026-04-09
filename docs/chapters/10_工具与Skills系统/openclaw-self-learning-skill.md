# OpenClaw self-learning 技能指南

本文档介绍 self-learning skill — 自主学习和经验提取系统。

## 概述

让 Agent 能够从对话中自动提取经验教训，避免重复犯错。

## 安装

```bash
openclaw skills install self-learning
```

## 配置

```yaml
selfLearning:
  enabled: true
  extraction:
    onError: true       # 错误后自动提取
    onCorrection: true  # 用户纠正后提取
    onSuccess: true     # 成功后提取
  feedback:
    collect: true
    storage: "~/.openclaw/memory/lessons/"
```

## 使用

### 手动触发

```bash
openclaw learning extract
openclaw learning review
```

### 自动学习

当发生以下情况时自动提取：
- Agent 执行出错
- 用户纠正 ("不是那个，是..." )
- 任务成功完成

### 查看学习记录

```
Agent: 我之前哪里做错了？
```

## 经验库

存储在 `~/.openclaw/memory/lessons/`

```json
[
  {
    "timestamp": "2026-04-01",
    "error": "路径错误",
    "lesson": "使用 ~/.openclaw 而非绝对路径",
    "accessCount": 5
  }
]
```

## 故障排除

### 经验未提取

- 检查 LLM 是否正常
- 查看日志

### 经验重复

- 配置相似度合并

## 相关资源

- [PR #59259](https://github.com/openclaw/openclaw/pull/59259)