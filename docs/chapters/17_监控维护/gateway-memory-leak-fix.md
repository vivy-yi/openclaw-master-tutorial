# Gateway 内存泄漏问题排查与解决

**来源**: PR #114767, #114765
**适用版本**: v2026.7.1-beta.1+
**更新时间**: 2026-07-28

---

## 问题描述

### 症状

长期运行的 OpenClaw Gateway 会出现内存持续增长，堆内存以约 **10 MB/h** 的速度泄漏。随着运行时间延长，内存占用可能达到数百 MB，导致：

- Gateway 响应变慢
- 内存不足时被系统 OOM Killer 终止
- 定期嵌入式工作产生的死运行图不断堆积

### 根本原因

问题出在 `reusableCatalogSnapshots` 这个 process-global 的 map：

1. 嵌入式运行时会在 `reusableCatalogSnapshots` map 中注册快照
2. 这些快照被注册但**从不清理**
3. 每次嵌入式工作执行都会添加新条目，永不释放
4. 长期运行导致内存持续增长

---

## 解决方案

### v2026.7.1-beta.1 修复

官方已通过以下方式修复此问题：

**修复策略**: 对 hook-bound (run-scoped) catalogs 跳过可重用快照路径

```typescript
// 修复前：所有 catalog 都尝试使用可重用快照
function getOrCreateCatalog(config) {
  const key = generateCacheKey(config);
  if (reusableCatalogSnapshots.has(key)) {
    return reusableCatalogSnapshots.get(key); // 问题：永不清理
  }
  // ...
}

// 修复后：run-scoped catalog 跳过可重用路径
function getOrCreateCatalog(config, isRunScoped = false) {
  if (isRunScoped) {
    // 为 run-scoped catalog 创建新实例，不缓存
    return createNewCatalog(config);
  }
  
  const key = generateCacheKey(config);
  if (reusableCatalogSnapshots.has(key)) {
    return reusableCatalogSnapshots.get(key);
  }
  // ...
}
```

---

## 诊断方法

### 1. 检查 Gateway 内存使用

```bash
# 查看 Gateway 进程内存
ps aux | grep openclaw-gateway

# 持续监控内存变化
watch -n 10 'ps aux | grep openclaw-gateway | grep -v grep'

# 使用 top/htop 查看
htop -p $(pgrep -f openclaw-gateway)
```

### 2. 检查堆内存泄漏

使用 Node.js 内置的 heap snapshot 功能：

```bash
# 生成堆快照（需要启用 --inspect）
curl http://localhost:9229/json/list  # 获取调试端口

# 使用 Chrome DevTools 连接分析
```

### 3. 日志分析

检查是否有以下日志模式：

```
[WARNING] Catalog snapshot registered but never cleaned up
[INFO] Reusable catalog count: <increasing_number>
```

---

## 预防措施

### 1. 定期重启 Gateway

对于需要长期运行的部署，建议设置定期重启：

```json
// openclaw.json
{
  "gateway": {
    "lifecycle": {
      "maxUptimeHours": 24,
      "restartOnOOM": true
    }
  }
}
```

### 2. 监控内存使用

配置监控告警：

```yaml
# prometheus.yml
- job_name: 'openclaw-gateway'
  static_configs:
    - targets: ['localhost:9229']
  metrics_path: '/metrics'
```

告警规则：
```yaml
- alert: GatewayMemoryHigh
  expr: process_resident_memory_bytes{job="openclaw-gateway"} > 500 * 1024 * 1024
  for: 10m
  labels:
    severity: warning
```

### 3. 避免 Run-Scoped 嵌入式工作长期运行

确保嵌入式任务配置了适当的超时：

```yaml
tasks:
  - name: periodic-embedding
    type: embedding
    timeout: 5m  # 5分钟超时
    schedule: "*/15 * * * *"  # 每15分钟执行
    runScope: hook  # 明确标记为 hook-bound
```

---

## 故障排除

### 问题：升级后仍有内存泄漏

**检查步骤**：
1. 确认已升级到 v2026.7.1-beta.1 或更高版本
2. 检查配置中是否有旧的 `reusableCatalogSnapshots` 残留
3. 完全重启 Gateway（不是 reload）

```bash
# 完整重启
openclaw gateway restart

# 清除残留状态
rm -rf ~/.openclaw/state/catalog-cache/*
```

### 问题：内存使用正常但性能下降

可能不是内存泄漏，检查：
- CPU 使用率
- 网络连接数
- 磁盘 I/O

---

## 相关配置参考

| 配置项 | 说明 | 推荐值 |
|--------|------|--------|
| `gateway.lifecycle.maxUptimeHours` | 最大运行时间 | 24-72 |
| `gateway.catalog.reusable.enabled` | 启用可重用目录 | true |
| `gateway.catalog.cleanupInterval` | 清理间隔 | 1h |

---

## 参考链接

- [PR #114767 - Gateway 内存泄漏修复](https://github.com/openclaw/openclaw/pull/114767)
- [PR #114765 - 嵌入式快照清理](https://github.com/openclaw/openclaw/pull/114765)
- [Gateway 运维手册](./Gateway运行运维手册.md)

---

*文档更新于 2026-07-28，基于官方 PR #114767, #114765*
