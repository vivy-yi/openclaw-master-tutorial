# Gateway 运行运维手册

> **编写日期**: 2026-06-17
> **适用版本**: OpenClaw Gateway 全版本
> **维护者**: 运维团队

---

## 一、Gateway 概述

OpenClaw Gateway 是 OpenClaw 的核心进程，负责：

- 管理 Agent 生命周期
- 处理渠道连接（Telegram、WhatsApp、Discord 等）
- 执行命令审批（approvals）
- Session 管理和历史记录
- 与 OpenClaw Cloud 同步

```
┌─────────────────────────────────────────────────────────┐
│                    OpenClaw Gateway                      │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Agents    │  │  Channels   │  │  Approvals  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Sessions   │  │   Tools     │  │   Memory     │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 二、日常运维命令

### 2.1 服务管理

```bash
# 启动 Gateway
openclaw gateway start

# 停止 Gateway
openclaw gateway stop

# 重启 Gateway
openclaw gateway restart

# 查看运行状态
openclaw gateway status
```

### 2.2 日志查看

```bash
# 实时查看日志
openclaw logs -f

# 查看最近 100 行
openclaw logs --lines 100

# 按渠道过滤日志
openclaw logs --channel telegram

# 按级别过滤（error/warn/info/debug）
openclaw logs --level error

# 导出指定时间范围的日志
openclaw logs --from "2026-06-17 00:00" --to "2026-06-17 12:00"
```

### 2.3 进程健康检查

```bash
# 检查 Gateway 进程是否存活
ps aux | grep openclaw-gateway

# 检查端口监听（默认 18789）
lsof -i :18789

# 检查 Gateway 健康端点
curl http://localhost:18789/health
```

---

## 三、性能调优

### 3.1 Oversized Transcript 处理

> **来源**: GitHub Issue [#83043](https://github.com/openclaw/openclaw/issues/83043)

**问题背景**：

Gateway 在处理超长会话记录（oversized transcript records）时，会调用 `buildOversizedTranscriptRecord`。该函数内部使用正则表达式解析会话数据。

**原始问题**：每次调用都重新编译正则表达式，在高频调用场景下造成性能瓶颈。

**修复方案**：引入 module-level regex 缓存：

```typescript
// src/gateway/session-utils.fs.ts

// 修复后：module-level Map 缓存
const TRANSCRIPT_FIELD_REGEX_CACHE = new Map<string, { stringRe: RegExp; nullRe: RegExp }>();

function getTranscriptFieldRegexes(field: string): { stringRe: RegExp; nullRe: RegExp } {
  let cached = TRANSCRIPT_FIELD_REGEX_CACHE.get(field);
  if (!cached) {
    const escapedField = escapeRegExp(field);
    cached = {
      stringRe: new RegExp(`"${escapedField}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`),
      nullRe:   new RegExp(`"${escapedField}"\\s*:\\s*null`),
    };
    TRANSCRIPT_FIELD_REGEX_CACHE.set(field, cached);
  }
  return cached;
}
```

**影响范围**：

| 调用路径 | 是否受影响 |
|---------|-----------|
| `buildOversizedTranscriptRecord` | ✅ 受影响（已修复） |
| 普通 `session-history` | ❌ 不受影响（走 `JSON.parse` 路径） |

**运维观察指标**：

```bash
# 检查是否有大量 oversized transcript 请求
openclaw logs | grep "oversized" | wc -l

# 检查 session-utils 的处理延迟
openclaw logs | grep "session-utils" | tail -20
```

### 3.2 内存管理

```bash
# 查看 Gateway 内存使用
openclaw gateway status | grep memory

# 清理 session 历史（谨慎操作）
openclaw sessions purge --older-than 30d

# 查看当前 session 数量
openclaw sessions list | wc -l
```

### 3.3 并发连接数

```bash
# 查看当前渠道连接数
openclaw channels status

# 检查文件描述符限制（Linux）
cat /proc/$(pgrep openclaw-gateway)/limits | grep "Max open files"
```

---

## 四、故障排除

### 4.1 Gateway 无法启动

**排查步骤**：

```bash
# 1. 检查端口是否被占用
lsof -i :18789

# 2. 检查配置文件语法
openclaw gateway validate

# 3. 检查磁盘空间
df -h

# 4. 查看详细错误日志
openclaw gateway start --verbose 2>&1 | tee gateway-debug.log
```

**常见原因**：

| 症状 | 原因 | 解决 |
|------|------|------|
| 端口被占用 | 已有 Gateway 进程 | `pkill openclaw-gateway` 后重试 |
| 配置文件报错 | YAML 语法错误 | 使用 `openclaw gateway validate` 检查 |
| 权限不足 | 数据目录无写权限 | `chown -R $(whoami) ~/.openclaw` |

### 4.2 Gateway 频繁重启

**排查步骤**：

```bash
# 1. 检查 systemd 日志（Linux）
journalctl -u openclaw-gateway.service -n 100 --no-pager

# 2. 检查 OOM killer
dmesg | grep -i "out of memory" | tail -5

# 3. 查看 restart 原因
openclaw gateway status | grep "last restart"
```

**排查工具**：

```bash
# 查看 Gateway 内存/CPU 趋势（需要 Prometheus 等监控）
# 或使用 top 监控
top -p $(pgrep openclaw-gateway)
```

### 4.3 Session 响应缓慢

**排查方向**：

1. **检查 agent 是否卡住**：
   ```bash
   openclaw sessions list --state running
   openclaw sessions show <session-id>
   ```

2. **检查 approval 积压**：
   ```bash
   openclaw approvals list --status pending
   ```

3. **检查网络延迟**：
   ```bash
   # 测试到 OpenClaw Cloud 的延迟
   curl -w "%{time_total}\n" -o /dev/null https://api.openclaw.ai/ping
   ```

---

## 五、安全运维

### 5.1 Approvals 审批配置

详见 `approvals.exec` 配置文档。以下是关键安全检查项：

```bash
# 检查当前 approval 配置
openclaw gateway config get approvals

# 查看最近 100 条 approval 记录
openclaw approvals history --limit 100

# 检查是否有异常 approval 模式
openclaw approvals list --since "24h" | grep -c "denied"
```

### 5.2 密钥管理

```bash
# 检查环境变量中的密钥
env | grep -i "openclaw\|api_key\|secret" | sed 's/=.*/=***/'

# 轮换密钥（参考官方文档）
openclaw credentials rotate --type api-key
```

### 5.3 审计日志

```bash
# 导出 exec 操作审计日志
openclaw audit exec --from 2026-06-01 --to 2026-06-30 --format csv

# 检查失败的登录尝试
openclaw audit auth --filter failed
```

---

## 六、备份与恢复

### 6.1 关键数据目录

| 目录 | 内容 | 备份频率 |
|------|------|---------|
| `~/.openclaw/sessions/` | Session 历史 | 每日 |
| `~/.openclaw/memory/` | Memory 数据 | 每日 |
| `~/.openclaw/config/` | 配置文件 | 每次修改后 |
| `~/.openclaw/channels/` | 渠道认证信息 | 每周 + 每次修改 |

### 6.2 备份命令

```bash
# 创建完整备份
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz \
  ~/.openclaw/sessions/ \
  ~/.openclaw/memory/ \
  ~/.openclaw/config/

# 备份到云存储
rclone copy openclaw-backup-20260617.tar.gz gcs:my-bucket/openclaw/
```

### 6.3 恢复步骤

```bash
# 1. 停止 Gateway
openclaw gateway stop

# 2. 恢复数据
tar -xzf openclaw-backup-20260617.tar.gz -C ~/

# 3. 重启 Gateway
openclaw gateway start

# 4. 验证恢复
openclaw gateway status
```

---

## 七、升级维护

### 7.1 升级前检查

```bash
# 查看当前版本
openclaw --version

# 检查最新版本
openclaw upgrade check

# 查看版本变更说明
openclaw release-notes
```

### 7.2 升级流程

```bash
# 1. 停止 Gateway
openclaw gateway stop

# 2. 备份当前配置和数据
./backup-openclaw.sh

# 3. 执行升级
openclaw upgrade

# 4. 启动 Gateway
openclaw gateway start

# 5. 验证版本
openclaw --version
```

### 7.3 回滚流程

```bash
# 1. 停止 Gateway
openclaw gateway stop

# 2. 回滚到上一版本
openclaw upgrade rollback

# 3. 恢复备份数据
tar -xzf openclaw-backup-pre-upgrade.tar.gz -C ~/

# 4. 重启
openclaw gateway start
```

---

## 八、监控指标

### 8.1 关键监控指标

| 指标 | 正常范围 | 告警阈值 |
|------|---------|---------|
| Gateway 进程存活 | 1 | 0 |
| 内存使用率 | < 70% | > 85% |
| CPU 使用率 | < 50% | > 80% |
| Session 数量 | - | > 1000（需关注） |
| Approval 积压 | 0–5 | > 20 |
| 错误率 | < 1% | > 5% |
| 平均响应时间 | < 500ms | > 2000ms |

### 8.2 Prometheus 指标端点

```bash
# 启用 Prometheus 指标（需配置）
openclaw gateway start --metrics

# 查看指标
curl http://localhost:18789/metrics
```

**关键指标**：

```
# HELP openclaw_gateway_sessions_active Active session count
# TYPE openclaw_gateway_sessions_active gauge
openclaw_gateway_sessions_active 42

# HELP openclaw_gateway_approvals_pending Pending approval count
# TYPE openclaw_gateway_approvals_pending gauge
openclaw_gateway_approvals_pending 3

# HELP openclaw_gateway_restarts_total Gateway restart count
# TYPE openclaw_gateway_restarts_total counter
openclaw_gateway_restarts_total 2
```

---

*🦉 Gateway 运行运维手册 | 2026-06-17*
