# Codex Agent 故障排除实战指南

> **更新时间**: 2026-05-26
> **适用版本**: v2026.5.x
> **数据来源**: GitHub Issues #86758, #86741 + PR #86765

---

## 一、Codex dynamic-tool RPC 超时问题

### 1.1 问题描述

| 项目 | 说明 |
|------|------|
| Issue | [#86758](https://github.com/openclaw/openclaw/issues/86758) |
| 严重程度 | 🟠 **P1** |
| 标签 | `impact:session-state` `impact:auth-provider` |

### 1.2 故障现象

```
Codex dynamic-tool RPC timeout (30s hardcoded) breaks session_status 
and other enumeration-heavy MCP tools
```

Codex 的 dynamic-tool RPC 超时设置为硬编码的 30 秒，导致 session_status 等枚举密集型 MCP 工具无法正常工作。

### 1.3 问题根因

```typescript
// 问题代码示例
const RPC_TIMEOUT = 30000; // 硬编码 30 秒

// 枚举密集型工具需要更长时间
// session_status
// tool list
// resource templates
```

### 1.4 影响范围

| 工具 | 操作类型 | 超时风险 |
|------|----------|----------|
| session_status | 枚举会话 | 🟠 中 |
| tool list | 枚举工具 | 🟠 中 |
| resource templates | 枚举资源 | 🟠 中 |
| dynamic-tool call | 动态调用 | 🟠 中 |

### 1.5 临时解决方案

```bash
# 方案1：增加 RPC 超时配置
# 在 openclaw.yaml 中添加
codex:
  rpcTimeout: 60000  # 60 秒

# 方案2：禁用 dynamic-tool 缓存
# 在 openclaw.yaml 中添加
codex:
  dynamicToolCache: false

# 方案3：降级到静态工具模式
# 在 openclaw.yaml 中添加
codex:
  mode: static
  dynamicTools: false
```

### 1.6 检查命令

```bash
# 检查 Codex 状态
openclaw codex status

# 检查 RPC 连接
openclaw codex probe

# 查看超时日志
openclaw logs | grep -i "timeout\|codex\|rpc" | tail -50
```

---

## 二、Codex app-server 线程抖动问题

### 2.1 问题描述

| 项目 | 说明 |
|------|------|
| Issue | [#86741](https://github.com/openclaw/openclaw/issues/86741) |
| 严重程度 | 🟠 **P1** |
| 标签 | `impact:session-state` `impact:security` |

### 2.2 故障现象

```
Codex app-server churns native threads when owner-only tool availability flips
```

当 owner-only 工具可用性切换时，Codex app-server 会产生原生线程抖动，导致：
- 线程资源消耗增加
- Session 状态不稳定
- 可能的安全问题

### 2.3 问题机制

```
工具可用性变更
    ↓
owner-only 标志检查
    ↓
线程池重新配置
    ↓
原生线程创建/销毁
    ↓
线程抖动
```

### 2.4 临时解决方案

```bash
# 方案1：锁定工具可用性
# 在 openclaw.yaml 中添加
codex:
  toolLock:
    enabled: true
    lockMode: read-only

# 方案2：限制线程池大小
# 在 openclaw.yaml 中添加
codex:
  threadPool:
    minThreads: 4
    maxThreads: 16
    idleTimeout: 300

# 方案3：禁用 owner-only 工具切换
# 在 openclaw.yaml 中添加
codex:
  ownerOnlyTools: false
```

### 2.5 监控配置

```bash
# 监控线程使用
openclaw codex monitor --threads

# 检查线程池状态
openclaw codex status --detail | grep -i thread

# 查看线程抖动日志
openclaw logs | grep -i "thread\|churn\|native" | tail -100
```

---

## 三、memory close sync race（已修复）

### 3.1 问题描述

| 项目 | 说明 |
|------|------|
| PR | [#86765](https://github.com/openclaw/openclaw/pull/86765) |
| 作者 | spacegeologist (Zee Zheng) |
| 状态 | 🟡 更新中 |

### 3.2 修复内容

PR #86765 修复了 memory close 同步竞争条件问题：

```typescript
// 修复前：可能导致竞争条件
await memory.close();
await session.close();

// 修复后：确保正确的关闭顺序
await memory.close();
await session.close();
// 确保所有写操作完成
await syncComplete();
```

---

## 四、Codex 故障排查流程

### 4.1 快速诊断

```bash
# 1. 检查 Codex 基础状态
openclaw codex status

# 2. 检查 RPC 连接
openclaw codex probe

# 3. 查看线程状态
openclaw codex status --detail | grep -E "thread|RPC|dynamic"

# 4. 检查 session 状态
openclaw session status
```

### 4.2 高级诊断

```bash
# 1. 启用 debug 日志
openclaw logs --level debug | grep -i "codex\|thread\|rpc"

# 2. 跟踪线程创建
openclaw debug trace --type thread

# 3. 检查 dynamic-tool 调用
openclaw debug trace --type dynamic-tool

# 4. 查看资源枚举
openclaw debug trace --type enumeration
```

### 4.3 故障排查决策树

```
Codex 问题?
│
├─► RPC 超时?
│   │
│   ├─► 枚举密集型操作 → 增加 rpcTimeout 配置
│   ├─► Dynamic-tool 调用 → 禁用缓存或增加超时
│   └─► Session status → 使用静态工具模式
│
├─► 线程抖动?
│   │
│   ├─► owner-only 工具切换 → 锁定工具可用性
│   ├─► 线程池配置 → 限制 min/max threads
│   └─► 安全标签 → 关注 Issue 进展
│
└─► Memory sync race?
    │
    ├─► 等待 PR #86765 合入
    └─► 使用手动关闭流程
```

---

## 五、配置参考

### 5.1 基础配置

```yaml
# openclaw.yaml - Codex 基础配置
codex:
  # RPC 配置
  rpcTimeout: 30000      # 默认 30 秒
  rpcRetry: 3           # 重试次数
  rpcRetryDelay: 1000   # 重试延迟 ms
  
  # 线程池配置
  threadPool:
    minThreads: 4
    maxThreads: 32
    idleTimeout: 300
    
  # Dynamic-tool 配置
  dynamicTools:
    enabled: true
    cache: true
    cacheTTL: 3600
```

### 5.2 生产环境配置

```yaml
# openclaw.yaml - Codex 生产配置
codex:
  # 线程池优化
  threadPool:
    minThreads: 8
    maxThreads: 64
    idleTimeout: 600
    
  # RPC 超时增加
  rpcTimeout: 60000
  
  # 禁用可能导致抖动的高级功能
  ownerOnlyTools: false
  toolLock:
    enabled: true
    lockMode: read-only
```

---

## 六、版本推荐

| 版本 | Codex 支持 | 说明 |
|------|-----------|------|
| **v2026.5.22** | ⚠️ 有已知问题 | 当前 stable，P1 问题待修复 |
| v2026.5.24-beta.2 | 🔧 可能有改善 | 最新 beta |
| v2026.5.20 | ✅ 稳定 | 可用于生产 |

**建议**: 生产环境如遇 Codex RPC 超时问题，可暂时降级到 v2026.5.20。

---

## 七、相关 Issue/PR 追踪

| # | 标题 | 状态 | 优先级 |
|---|------|------|--------|
| [#86758](https://github.com/openclaw/openclaw/issues/86758) | Codex dynamic-tool RPC timeout (30s hardcoded) | 🟠 P1 | P1 |
| [#86741](https://github.com/openclaw/openclaw/issues/86741) | Codex thread churn on tool availability | 🟠 P1 | P1 |
| [#86765](https://github.com/openclaw/openclaw/pull/86765) | Fix memory close sync race | 🟡 更新中 | - |

---

🦉 **Codex Agent 故障排除实战指南** | 2026-05-26
---

## 八、Codex WebChat delivery hints 污染问题 (PR #87003)

> **新增时间**: 2026-05-27
> **PR**: [#87003](https://github.com/openclaw/openclaw/pull/87003)
> **严重程度**: 🔴 **P1**
> **标签**: `bug` `affects:user-prompt`

### 8.1 问题描述

| 项目 | 说明 |
|------|------|
| PR | [#87003](https://github.com/openclaw/openclaw/pull/87003) |
| 状态 | ⏳ reviewing |
| 严重程度 | 🔴 P1 |
| 影响 | WebChat delivery hints 污染用户请求 |

### 8.2 故障现象

```
WebChat delivery hints 会被注入到用户请求中
导致用户输入被意外修改或干扰
```

### 8.3 问题根因

WebChat 的 delivery hints 在处理用户消息时未正确隔离，导致内部元数据泄露到用户输入流中。

### 8.4 影响范围

| 场景 | 影响 |
|------|------|
| WebChat 用户输入 | 🟠 中 - 用户体验下降 |
| 多渠道集成 | 🟠 中 - 消息格式异常 |
| API 调用 | 🟡 低 - 需过滤 hints |

### 8.5 修复状态

| 状态 | 说明 |
|------|------|
| ⏳ reviewing | PR 已提交，等待 maintainer 审核 |
| 建议 | 关注合入进度，生产环境暂用 v2026.5.20 |

### 8.6 相关 Issue

| # | 标题 | 状态 |
|---|------|------|
| [#87003](https://github.com/openclaw/openclaw/pull/87003) | Codex WebChat delivery hints fix | ⏳ reviewing |


---

## 九、版本更新追踪 (v2026.5.24 ~ v2026.5.26)

> **更新时间**: 2026-05-27
> **数据来源**: GitHub Releases

### 9.1 最新版本发布

| 版本 | 类型 | 发布日期 | 状态 | Codex 相关 |
|------|------|----------|------|-----------|
| v2026.5.26-beta.1 | beta | 2026-05-26 | 🟡 测试中 | 待验证 |
| v2026.5.25-beta.1 | beta | 2026-05-25 | 🟡 测试中 | 待验证 |
| v2026.5.24-beta.2 | beta | 2026-05-24 | 🟡 测试中 | 待验证 |
| v2026.5.22 | **stable (Latest)** | 2026-05-24 | ✅ 稳定 | ⚠️ 有已知问题 |

### 9.2 快速迭代说明

**一周内5个版本** (v2026.5.22 ~ v2026.5.26-beta.1)，开发非常活跃。

| 迭代节奏 | 说明 |
|----------|------|
| 2天内3个版本 | 2 beta + 1 stable |
| beta 测试期 | 建议非生产环境验证 |
| stable 晋升 | 等待 beta 测试通过 |

### 9.3 版本推荐

| 场景 | 推荐版本 | 说明 |
|------|----------|------|
| **生产环境** | v2026.5.20 | 最稳定，无 P1 Bug |
| 体验最新功能 | v2026.5.22 | 当前 stable，有已知问题 |
| 尝鲜/测试 | v2026.5.26-beta.1 | 最新 beta |

### 9.4 升级建议

```bash
# 检查当前版本
openclaw --version

# 升级到最新 stable
openclaw upgrade

# 升级到指定版本
openclaw upgrade --version v2026.5.22

# 降级到稳定版本（如遇问题）
openclaw upgrade --version v2026.5.20
```

