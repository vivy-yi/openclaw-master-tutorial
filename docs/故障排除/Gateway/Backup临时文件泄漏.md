# Backup 临时文件泄漏故障排除

> **来源**: OpenClaw GitHub Issue #95582, PR #95600
> **更新日期**: 2026-06-22
> **严重程度**: P2
> **影响版本**: v2026.6.5 及以上

---

## 概述

`backup create` 命令在执行过程中会在系统临时目录（tmpdir）中遗留大量中间临时文件和 staging 目录，可能导致多 GB 级别的磁盘空间泄漏。

---

## 问题描述

### 症状

1. **磁盘空间异常减少**: 系统临时目录占用持续增长
2. **大量临时文件**: `/tmp/openclaw-backup-*` 或类似路径下的残留文件
3. **staging 目录未清理**: 备份过程中的中间目录未删除

### 影响

- 磁盘空间浪费（可能达到数 GB）
- 长期运行后系统性能下降
- 备份操作本身可能因空间不足而失败

---

## 相关 Issue

| Issue/PR | 描述 | 状态 |
|-----------|------|------|
| #95582 | backup leaves multi-GB temp orphaned | 🟡 OPEN |
| #95600 | fix(backup): sweep stale temp artifacts | ✅ ready for maintainer |

---

## 排查步骤

### Step 1: 检查临时目录占用

```bash
# Linux/macOS
du -sh /tmp/*openclaw* 2>/dev/null

# 使用 find 查找残留文件
find /tmp -name "openclaw-backup*" -type d -mtime +1
```

### Step 2: 检查备份日志

```bash
openclaw backup create --dry-run  # 查看操作步骤
tail -f ~/.openclaw/logs/gateway.log | grep -i backup
```

### Step 3: 清理残留文件（临时方案）

```bash
# 停止 Gateway
openclaw gateway stop

# 清理临时文件（谨慎操作）
rm -rf /tmp/openclaw-backup-*
rm -rf /tmp/ocliw-*

# 重启 Gateway
openclaw gateway start
```

---

## 根因分析

**文件**: `backup-tool.ts` 或相关备份模块

**问题**: 备份流程中的临时文件和 staging 目录在以下情况下未被清理：

1. 备份过程中断（信号、OOM、磁盘空间不足）
2. 异常退出路径未正确清理
3. 缺少定时清理机制

---

## 修复进度

| PR | 描述 | 状态 |
|-----|------|------|
| #95600 | fix(backup): sweep stale temp artifacts | ✅ ready for maintainer |

**预计版本**: v2026.6.10+ 可能包含此修复

---

## 临时解决方案

### 方案 1: 定期清理脚本

创建 cron job 定期清理：
```bash
# 添加到 crontab
crontab -e

# 每天凌晨 3 点清理残留
0 3 * * * find /tmp -name "openclaw-backup-*" -type d -mtime +1 -exec rm -rf {} \;
```

### 方案 2: 使用 --cleanup-on-failure

如果命令支持，添加清理标志：
```bash
openclaw backup create --cleanup-on-failure
```

### 方案 3: 手动分区/专用目录

配置专用临时目录：
```bash
export TMPDIR=/path/to/dedicated/tmp
openclaw backup create
```

---

## 预防措施

1. **监控磁盘空间**: 关注 `/tmp` 目录大小变化
2. **定期检查**: 执行 `df -h` 监控可用空间
3. **版本升级**: 关注 v2026.6.10+ 的修复版本

---

## 相关文档

- [监控与维护](../../chapters/17_监控维护/README.md)
- [Gateway 配置](../reference/gateway-config.md)

---

## 更新日志

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-06-22 | 1.0 | 初始版本，基于 #95582 |

---

🦉 **教程大师** | 持续更新中
