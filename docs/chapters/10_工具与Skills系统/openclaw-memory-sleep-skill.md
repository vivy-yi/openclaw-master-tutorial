# OpenClaw memory-sleep 技能指南

本文档介绍 memory-sleep skill 受神经科学启发的记忆整合系统。

## 概述

模拟人类睡眠周期的 Agent 记忆管理系统，实现智能记忆整合与遗忘。

## 记忆层级

```
短期记忆 (Short-term)
   ↓ 压缩
中期记忆 (Medium-term)
   ↓ 强化/归档
长期记忆 (Long-term)
   ↓ 沉淀
核心记忆 (Core Memories)
```

## 安装

```bash
openclaw skills install memory-sleep
```

## 配置

```yaml
memory:
  consolidation:
    similarityThreshold: 0.85
    mergeStrategy: "llm"  # 或 "simple"
  forgetting:
    enabled: true
    decayThreshold: 0.7
    maxAgeDays: 180
    minAccessCount: 2
  archive:
    enabled: true
    path: "~/.openclaw/memory/archive/"
```

## 使用

### 手动触发

```bash
# 记忆提取
openclaw memory extract

# 记忆整合
openclaw memory consolidate

# 记忆修剪
openclaw memory prune
```

### 自动触发

配置 Cron:

```yaml
cron:
  - name: memory-consolidation
    schedule: "0 2 * * *"  # 每天凌晨2点
    command: openclaw memory consolidate
```

## 睡眠阶段

| 阶段 | 功能 |
|------|------|
| 浅睡眠 (N1/N2) | 安全扫描、npm audit、凭证检查 |
| 深睡眠 (N3) | 短期→中期记忆提升，中期→长期归档 |
| REM | 记忆碎片整合、修剪、形成新通路 |

## 故障排除

### 记忆未整合

- 检查 LLM 是否可用
- 验证 LanceDB 状态
- 查看日志 `openclaw logs --skill memory-sleep`

### 性能问题

- 减少 concurrent jobs
- 增加 timeout
- 使用 lighter model 做记忆决策

## 相关资源

- [PR #59262](https://github.com/openclaw/openclaw/pull/59262)
- [神经科学睡眠研究](https://arxiv.org/abs/xxx)