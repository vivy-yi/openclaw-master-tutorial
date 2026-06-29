# Memory 系统数据丢失故障排除

> **来源**: OpenClaw GitHub Issue #95606
> **更新日期**: 2026-06-22
> **严重程度**: P2
> **影响版本**: v2026.6.5 及以上

---

## 概述

Memory 系统无法正确删除过期记忆，导致冲突条目持续存在。这会影响 Agent 的长期记忆功能和上下文管理。

---

## 问题描述

### 症状

1. **过期记忆未删除**: 即使超过 TTL 的记忆仍然存在于系统中
2. **冲突条目**: 同一实体的多个版本同时存在
3. **存储膨胀**: Memory 数据库体积异常增长

### 影响

- Agent 可能使用过期的记忆信息
- 上下文窗口占用增加
- 存储空间浪费

---

## 相关 Issue

| Issue | 描述 | 状态 |
|-------|------|------|
| #95606 | Memory system: Cannot delete stale memories | 🟡 OPEN |
| #95599 | fix(memory): backfill provider.model in createWithAdapter | ⚠️ needs proof |
| #95598 | fix(memory): skip placeholder short-term promotions | ⚠️ needs proof |

---

## 排查步骤

### Step 1: 检查 Memory 数据库

```bash
# 查看 Memory 相关日志
tail -f ~/.openclaw/logs/gateway.log | grep -i memory

# 检查数据库状态
openclaw memory --stats
```

### Step 2: 列出当前记忆

```bash
openclaw memory list --all
```

### Step 3: 手动清理（临时方案）

```bash
# 删除特定记忆
openclaw memory delete <memory-id>

# 清理过期记忆（如果命令可用）
openclaw memory purge --stale
```

### Step 4: 检查关联配置

```yaml
memory:
  retention:
    ttl: 7d  # 确认 TTL 配置
  cleanup:
    enabled: true
    interval: 1h
```

---

## 根因分析

根据 Issue #95606，问题是 Memory 系统中的**清理机制失效**：

1. **删除标记问题**: 过期记忆被标记但未真正删除
2. **Promotions 冲突**: short-term 到 long-term 的升级逻辑有问题
3. **Provider Model 缺失**: 创建记忆时 provider.model 字段未正确填充

---

## 修复进度

| PR | 描述 | 状态 |
|-----|------|------|
| #95599 | backfill provider.model | ⚠️ needs proof |
| #95598 | skip placeholder short-term promotions | ⚠️ needs proof |

---

## 临时解决方案

### 方案 1: 手动清理

定期手动执行清理命令：
```bash
# 停止 Gateway
openclaw gateway stop

# 备份数据库
cp ~/.openclaw/data/memory.db ~/.openclaw/data/memory.db.bak

# 使用 SQLite 手动清理
sqlite3 ~/.openclaw/data/memory.db "DELETE FROM memories WHERE expires_at < datetime('now');"

# 重启 Gateway
openclaw gateway start
```

### 方案 2: 禁用自动清理，手动管理

```yaml
memory:
  cleanup:
    enabled: false  # 临时禁用自动清理
```

---

## 预防措施

1. **定期备份**: 清理前务必备份数据库
2. **监控存储**: 关注 Memory 数据库体积变化
3. **版本升级**: 关注 v2026.6.10+ 的修复版本

---

## 相关文档

- [上下文与记忆](../../chapters/06_上下文与记忆/README.md)
- [Agent 架构指南](../architect-guide/agent-session-memory-architecture.md)

---

## 更新日志

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-06-22 | 1.0 | 初始版本，基于 #95606 |

---

🦉 **教程大师** | 持续更新中
