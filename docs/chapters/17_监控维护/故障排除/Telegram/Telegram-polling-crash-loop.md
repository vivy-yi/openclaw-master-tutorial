# Telegram Polling Silent Crash Loop — #93375

> **Issue**: [#93375](https://github.com/openclaw/openclaw/issues/93375)  
> **优先级**: 🔴 P1  
> **状态**: Open（clawsweeper:no-new-fix-pr + needs-maintainer-review）  
> **影响版本**: v2026.6.1（测试环境：Raspberry Pi 4B arm64）  
> **数据来源**: GitHub Issue + 墨客-深度调研报告  
> 🦉 教程大师出品

---

## 一、问题概述

### 1.1 核心问题

Telegram polling 在遭遇瞬态网络超时后，会进入**静默崩溃循环**（silent crash loop）。Polling worker 以 exit code 1 静默退出（无错误日志），健康监控检测到"stopped"状态后每 10-15 分钟重启一次，但每次新进程启动后立即退出，循环往复。

**唯一恢复手段**：`systemctl restart openclaw-gateway.service`

### 1.2 问题定位矩阵

| 维度 | 对比项 |
|------|--------|
| 与 #86762（ENETDOWN 修复）| **完全不同机制** — #86762 是瞬态错误自动恢复；#93375 是恢复机制本身失效 |
| 退出日志 | #86762 有 ENETDOWN 错误输出；#93375 **无日志**（silent exit code 1）|
| 恢复能力 | #86762 Health monitor 可自动恢复；#93375 Health monitor restart 无效 |

### 1.3 影响标签

- `impact:session-state` — Session 状态中断
- `impact:message-loss` — 消息丢失
- `impact:crash-loop` — 崩溃循环
- `issue-rating: 🐚 platinum hermit`（高质量复现）

---

## 二、故障机制详解

### 2.1 三阶段故障时序

```
Phase 1 — 初始网络超时（可恢复）
  [19:51:37] Telegram transport UND_ERR_CONNECT_TIMEOUT
  [19:52:07] Polling worker exits with code 1
  [19:52:07] Health monitor 开始每10-15分钟重启

Phase 2 — Crash Loop（无法自动恢复）
  [19:57:03] health-monitor restart (reason: disconnected)
  [19:57:08] polling lease released
  [19:57:56] isolated polling ingress started (spool=...)
  [20:12:03] health-monitor restart (reason: stopped)
  [20:22:03] health-monitor restart (reason: stopped)
  [20:37:03] health-monitor restart (reason: stopped)
  ... 每10-15分钟循环，持续至午夜

Phase 3 — 唯一恢复手段
  systemctl restart openclaw-gateway.service
```

### 2.2 根因分析

**初始触发**：
- 首次 `UND_ERR_CONNECT_TIMEOUT` 后 polling worker 正常退出（符合预期）

**循环机制推测**：
1. Health monitor 的重启逻辑启动了"隔离的 polling ingress"
2. 新进程启动后立即以 exit code 1 静默退出（无错误日志）
3. 每次 health monitor restart 又触发相同路径
4. 网络本身正常（`curl api.telegram.org` 返回 200）

**关键疑问**：
- 隔离的 polling ingress 为何立即退出？
- Exit code 1 但无日志输出 — 是否为权限或 token 问题？
- Lease 管理是否在 crash 后未正确清理？

---

## 三、识别信号

### 3.1 典型日志特征

```
# 识别关键词（按时间顺序）
[health-monitor] [telegram:default] health-monitor: restarting (reason: disconnected)
[telegram] [default] released stopped Telegram polling lease
[telegram] [diag] isolated polling ingress started spool=...
[health-monitor] [telegram:default] health-monitor: restarting (reason: stopped)
# 重复出现，间隔 10-15 分钟
```

### 3.2 与正常重启的区别

| 特征 | 正常重启 | Crash Loop |
|------|---------|-----------|
| 重启原因 | `disconnected` 后恢复 | `stopped`（反复） |
| 间隔 | 一次性 | 每 10-15 分钟 |
| 新进程 | 正常运行 | 立即退出 |
| 恢复方式 | 自动 | 需手动 restart |

---

## 四、临时解决方案

### 4.1 立即恢复（推荐）

```bash
# 完整重启 Gateway 服务
systemctl restart openclaw-gateway.service

# 验证恢复
openclaw gateway status
openclaw doctor
```

### 4.2 自动化检测脚本

```bash
#!/bin/bash
# check_telegram_health.sh — 检测 Telegram crash loop
LOG_FILE="/var/log/openclaw/gateway.log"
RESTART_COUNT=$(grep -c "health-monitor.*restarting (reason: stopped)" "$LOG_FILE" 2>/dev/null || echo 0)
TIME_WINDOW=$(date -v-1H -j -f "%Y-%m-%d %H:%M:%S" "$(date -v-1H '+%Y-%m-%d %H:%M:%S')" '+%s')

if [ "$RESTART_COUNT" -gt 3 ]; then
  echo "⚠️ 检测到 Telegram crash loop，建议执行: systemctl restart openclaw-gateway.service"
fi
```

### 4.3 预防性配置

```bash
# 定期健康检查 cron
# 每 5 分钟检查一次 Telegram 状态
*/5 * * * * openclaw doctor --channel telegram || systemctl restart openclaw-gateway.service
```

---

## 五、长期解决方案

### 5.1 预期修复路径

Issue #93375 处于 `clawsweeper:no-new-fix-pr + needs-maintainer-review` 状态，等待维护者介入。

可能的修复方向：
1. **Lease 清理修复** — 在 polling worker 退出时强制清理 lease，避免 zombie ingress
2. **Health monitor 增强** — 检测 crash loop 模式后触发完全重启而非重复 restart
3. **Exit code 日志** — 记录 silent exit code 1 的原因，辅助诊断

### 5.2 监控告警建议

```yaml
# Prometheus alerting rules
- alert: TelegramPollingCrashLoop
  expr: |
    rate(openclaw_telegram_restart_total{reason="stopped"}[5m]) > 0
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "Telegram polling crash loop detected"
    description: "Telegram polling has restarted {{ $value }} times in 5 minutes. Run: systemctl restart openclaw-gateway.service"
```

---

## 六、相关文档

- **[Telegram 问题排查](./15.2_telegram_troubleshooting.md)** — ENETDOWN 修复及更多
- **[Gateway 监控](./14.5_monitoring.md)** — 监控配置
- **[已知问题](./known-issues.md)** — 问题追踪

---

🦉 教程大师 | 墨客内容生成 | 2026-06-16  
**数据完整性**: ⭐⭐⭐⭐⭐ — 完整日志链 + 铂金海贝评级
