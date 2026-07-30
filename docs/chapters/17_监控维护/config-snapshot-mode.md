# 配置快照模式使用说明

**来源**: PR #114759
**适用版本**: v2026.7.1-beta.1+
**更新时间**: 2026-07-28

---

## 问题描述

### 症状

在之前的版本中，如果配置文件包含以下模式的配置，会**永久破坏配置解析**：

```yaml
# 问题配置示例 1
compaction:
  enabled: true
  # 缺少 mode 字段

# 问题配置示例 2  
contextPruning:
  maxAge: 24h
  # 缺少 mode 字段
```

**错误表现**：
- 配置加载失败
- Gateway 无法启动
- 错误信息不明确，难以定位问题

### 根本原因

问题出在 `snapshot` 和 `load` 配置解析使用**不同的常量定义**：

```typescript
// snapshot 配置解析
const SNAPSHOT_MODES = ['full', 'incremental', 'disabled'];

// load 配置解析
const LOAD_MODES = ['sync', 'async', 'lazy'];

// 两者定义不一致，导致某些组合无法识别
```

---

## v2026.7.1-beta.1 修复

### 修复内容

使 `snapshot` 和 `load` 共享**统一的配置文件常量**：

```typescript
// 修复后：统一的配置模式
const CONFIG_MODES = {
  snapshot: ['full', 'incremental', 'disabled'],
  load: ['sync', 'async', 'lazy', 'auto']
};

// 配置解析现在可以正确处理所有组合
function parseConfig(config) {
  if (config.compaction?.mode === undefined) {
    // 使用默认值，而不是报错
    config.compaction.mode = 'auto';
  }
  if (config.contextPruning?.mode === undefined) {
    config.contextPruning.mode = 'auto';
  }
  return config;
}
```

### 修复效果

| 配置场景 | 修复前 | 修复后 |
|----------|--------|--------|
| 有 mode 字段 | ✅ 正常 | ✅ 正常 |
| 无 mode 字段（compaction） | ❌ 解析失败 | ✅ 使用默认值 |
| 无 mode 字段（contextPruning） | ❌ 解析失败 | ✅ 使用默认值 |

---

## 使用指南

### 基本配置

#### 方式一：完整模式配置

```yaml
# 完整配置示例
compaction:
  mode: full
  interval: 1h
  maxSize: 100MB

contextPruning:
  mode: lazy
  maxAge: 24h
  maxEntries: 1000
```

#### 方式二：简化配置（推荐）

v2026.7.1-beta.1 起，可以直接使用简化配置：

```yaml
# 简化配置 - 自动选择最佳模式
compaction:
  enabled: true
  # mode 字段可选，将自动选择

contextPruning:
  maxAge: 24h
  # mode 字段可选，将自动选择
```

### 快照模式详解

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `full` | 完整快照 | 需要完整历史记录 |
| `incremental` | 增量快照 | 频繁更新，节省空间 |
| `disabled` | 禁用快照 | 不需要历史 |
| `auto` | 自动选择 | 由系统根据负载选择 |

### 加载模式详解

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `sync` | 同步加载 | 小配置，快速启动 |
| `async` | 异步加载 | 大配置，不阻塞启动 |
| `lazy` | 延迟加载 | 按需加载 |
| `auto` | 自动选择 | 由系统优化 |

---

## 配置示例

### 场景一：开发环境

```yaml
# 开发环境 - 轻量配置
compaction:
  enabled: false

contextPruning:
  mode: lazy
  maxAge: 1h
```

### 场景二：生产环境

```yaml
# 生产环境 - 完整配置
compaction:
  mode: full
  interval: 30m
  maxSize: 500MB

contextPruning:
  mode: async
  maxAge: 7d
  maxEntries: 10000
  
snapshot:
  enabled: true
  path: /data/openclaw/snapshots
```

### 场景三：资源受限环境

```yaml
# 资源受限 - 最小化配置
compaction:
  enabled: false

contextPruning:
  mode: disabled

snapshot:
  enabled: false
```

---

## 故障排除

### 问题：配置仍然无法加载

**检查项**：
1. 确认 YAML 格式正确（缩进、冒号后空格）
2. 检查是否有不支持的字段
3. 查看详细错误日志

```bash
# 验证配置语法
openclaw config validate

# 详细错误信息
openclaw gateway start --debug
```

### 问题：配置变更不生效

**解决方案**：

```bash
# 1. 验证配置已更新
cat ~/.openclaw/openclaw.json | jq '.compaction'

# 2. 重启 Gateway
openclaw gateway restart

# 3. 清除配置缓存
rm -rf ~/.openclaw/cache/config/*
```

---

## 最佳实践

### 1. 使用简化配置

除非有特殊需求，建议使用简化配置让系统自动选择：

```yaml
# 推荐：简化配置
compaction:
  enabled: true

contextPruning:
  maxAge: 24h
```

### 2. 版本管理

配置变更前备份：

```bash
# 备份配置
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup.$(date +%Y%m%d)
```

### 3. 渐进式配置

从最小配置开始，逐步增加复杂度：

```yaml
# 第一步：最小配置
compaction:
  enabled: true

# 第二步：添加加载配置
compaction:
  enabled: true
contextPruning:
  maxAge: 12h

# 第三步：完整配置
compaction:
  mode: full
  interval: 1h
contextPruning:
  mode: async
  maxAge: 24h
```

---

## 相关配置

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `compaction.mode` | string | 快照压缩模式 |
| `compaction.interval` | duration | 压缩间隔 |
| `compaction.maxSize` | size | 最大快照大小 |
| `contextPruning.mode` | string | 上下文修剪模式 |
| `contextPruning.maxAge` | duration | 最大保留时间 |
| `contextPruning.maxEntries` | number | 最大条目数 |

---

## 参考链接

- [PR #114759 - 配置快照模式修复](https://github.com/openclaw/openclaw/pull/114759)
- [Gateway 配置参考](./Gateway运行运维手册.md)

---

*文档更新于 2026-07-28，基于官方 PR #114759*
