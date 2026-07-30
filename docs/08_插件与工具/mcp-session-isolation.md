# MCP 会话隔离指南

> **版本**: v2026.7.2-beta.3+  
> **功能标识**: MCP Session Isolation  
> **相关 Issue**: #106359 (Thanks @obviyus)  
> **优先级**: P1  
> **最后更新**: 2026-07-29

---

## 一、概述

MCP (Model Context Protocol) 会话隔离是 OpenClaw v2026.7.2 引入的**安全增强功能**，确保每个会话的 MCP 服务器连接完全独立，避免状态污染风险。

```
修复前：                                          修复后：
┌──────────────┐                           ┌──────────────┐
│ MCP Server A │◀──全局共享──│ Session 1 │              │◀──每个会话独立──│ Session 1 │
└──────────────┘                           └──────────────┘
      │                                           │
      │                                           ▼
      │◀────Session 2  (可能冲突)           ┌──────────────┐
      │                                    │ MCP Server A │◀──每个会话独立──│ Session 2 │
      │                                    └──────────────┘
      │                                           │
      ▼                                           ▼
┌──────────────┐                           ┌──────────────┐
│ 状态污染风险  │                           │  完全隔离    │
└──────────────┘                           └──────────────┘
```

---

## 二、为什么需要会话隔离

### 2.1 问题背景

在 v2026.7.2 之前，MCP 服务器连接是**全局共享**的：

| 问题 | 影响 |
|------|------|
| **状态污染** | Session A 修改的 MCP 状态可能影响 Session B |
| **连接冲突** | 多个会话同时操作同一 MCP 资源导致冲突 |
| **调试困难** | 问题难以复现，因为取决于会话执行顺序 |
| **安全风险** | 一个会话可能读取其他会话的数据 |

### 2.2 隔离带来的好处

| 好处 | 说明 |
|------|------|
| **确定性行为** | 每个会话的 MCP 环境完全可预测 |
| **安全隔离** | 会话之间无法相互访问对方的 MCP 状态 |
| **简化调试** | 问题可轻松复现，环境一致 |
| **多租户支持** | 为 External Supervisor 等功能提供基础 |

---

## 三、快速开始

### 3.1 启用会话隔离

**方式一：CLI 配置**

```bash
# 启用 MCP 会话隔离（默认开启）
openclaw config set mcp.isolation session

# 验证配置
openclaw config get mcp.isolation
# 输出：session
```

**方式二：配置文件**

```yaml
# gateway.yaml
mcp:
  isolation: session
```

### 3.2 验证隔离效果

```bash
# 启动两个会话
openclaw session start --name session-A --interactive &
openclaw session start --name session-B --interactive &

# 在 session-A 中连接 MCP 服务器
openclaw mcp connect filesystem --session session-A

# 在 session-B 中检查 MCP 连接
openclaw mcp list --session session-B

# 预期结果：session-B 无法看到 session-A 的 MCP 连接
```

---

## 四、配置选项

### 4.1 隔离级别

```yaml
# gateway.yaml
mcp:
  isolation: session  # 可选：session | global | off
```

| 级别 | 说明 | 适用场景 |
|------|------|---------|
| `session` | 每个会话独立的 MCP 作用域（**默认**） | 生产环境 |
| `global` | 全局共享 MCP 连接（旧行为） | 特殊兼容需求 |
| `off` | 禁用 MCP 功能 | 不推荐 |

### 4.2 会话级 MCP 配置

```yaml
mcp:
  isolation: session
  servers:
    - name: filesystem
      command: npx -y @modelcontextprotocol/server-filesystem
      scope: session  # 明确指定 session 作用域
      args:
        - /path/to/allowed/dir
```

### 4.3 全局 MCP 配置（兼容模式）

```yaml
mcp:
  isolation: global  # 兼容旧行为
  servers:
    - name: shared-server
      command: npx -y @modelcontextprotocol/server-filesystem
      scope: global
```

---

## 五、使用场景

### 场景 1: 多租户 MCP 资源

```
租户 A 的会话 ──▶ MCP Server A ──▶ /data/tenant-a/
租户 B 的会话 ──▶ MCP Server B ──▶ /data/tenant-b/
```

**配置示例**：

```yaml
mcp:
  isolation: session
  
  # 租户 A 的 MCP 配置
  servers:
    - name: tenant-a-fs
      command: npx -y @modelcontextprotocol/server-filesystem
      scope: session
      env:
        ALLOWED_PATH: /data/tenant-a
      tags:
        tenant: a

    - name: tenant-b-fs
      command: npx -y @modelcontextprotocol/server-filesystem
      scope: session
      env:
        ALLOWED_PATH: /data/tenant-b
      tags:
        tenant: b
```

### 场景 2: 开发/测试隔离

```
开发会话 ──▶ 独立 MCP（允许所有操作）
测试会话 ──▶ 独立 MCP（只读限制）
生产会话 ──▶ 独立 MCP（严格权限）
```

### 场景 3: MCP 资源清理

```bash
# 结束会话时自动清理 MCP 连接
# 配置 lifecycle hook
mcp:
  isolation: session
  cleanupOnSessionEnd: true
  sessionTimeout: "30m"
```

---

## 六、监控与调试

### 6.1 查看 MCP 连接状态

```bash
# 列出所有 MCP 连接（按会话分组）
openclaw mcp list --group-by session

# 查看特定会话的 MCP 连接
openclaw mcp list --session my-session

# 查看 MCP 服务器状态
openclaw mcp servers status
```

### 6.2 会话 MCP 指标

```bash
# 查看每个会话的 MCP 使用统计
openclaw mcp stats --by-session

# 预期输出：
# SESSION        CONNECTIONS  UPTIME    LAST ACTIVITY
# session-A      3            2h 30m    2026-07-29 14:30
# session-B      2            1h 15m    2026-07-29 14:28
```

### 6.3 日志分析

```bash
# 查看 MCP 隔离相关日志
openclaw logs --filter mcp.isolation

# 查看会话级别的 MCP 日志
openclaw logs --filter "mcp.*session" --session my-session

# 示例日志
# [2026-07-29T14:30:01.123Z] MCP: Session session-A connected to filesystem
# [2026-07-29T14:30:02.456Z] MCP: Session session-B isolated - filesystem not visible
```

### 6.4 调试模式

```bash
# 启用 MCP 调试日志
openclaw config set mcp.debug true

# 查看详细的 MCP 消息
openclaw logs --filter mcp.rpc --verbose

# 禁用调试
openclaw config set mcp.debug false
```

---

## 七、故障排查

### 7.1 会话间 MCP 可见（隔离失效）

| 检查项 | 命令 |
|--------|------|
| 隔离模式配置 | `openclaw config get mcp.isolation` |
| MCP 服务器 scope | `openclaw mcp servers list` |
| Gateway 版本 | `openclaw version` |

**排查步骤**：

```bash
# 1. 确认配置
openclaw config get mcp.isolation
# 预期：session

# 2. 检查 MCP 服务器配置
openclaw mcp servers list --verbose

# 3. 重启 Gateway
openclaw gateway restart
```

### 7.2 MCP 连接数过多

```bash
# 查看每个会话的连接数
openclaw mcp stats --connections-by-session

# 查看总连接数
openclaw mcp stats --total

# 清理孤立连接
openclaw mcp cleanup --orphaned
```

### 7.3 会话隔离与全局 MCP 冲突

```yaml
# 错误配置：isolation: session + scope: global 冲突
mcp:
  isolation: session
  servers:
    - name: conflict-server
      scope: global  # ❌ 冲突！
```

**正确配置**：

```yaml
mcp:
  isolation: session
  servers:
    - name: session-server
      scope: session  # ✅ 正确
    - name: legacy-server
      scope: global  # ✅ 需要 isolation: global
```

---

## 八、性能考虑

### 8.1 资源使用

| 资源 | 会话隔离模式 | 全局模式 |
|------|-------------|---------|
| **内存** | 较高（每个会话独立） | 较低（共享） |
| **CPU** | 略高 | 较低 |
| **连接数** | 会话数 × MCP 数 | MCP 数 |

### 8.2 优化建议

```yaml
mcp:
  isolation: session
  pool:
    # MCP 连接池大小
    maxConnectionsPerServer: 10
    # 空闲连接超时
    idleTimeout: "5m"
    # 预热连接数
    warmConnections: 1
```

---

## 九、迁移指南

### 9.1 从旧版本升级

**自动迁移**：v2026.7.2+ 会自动启用会话隔离，无需手动配置。

**验证迁移**：

```bash
# 检查是否迁移成功
openclaw mcp list --group-by session

# 预期：新创建的会话应该有独立的 MCP 连接
```

### 9.2 回退到全局模式（不推荐）

```yaml
# 仅在特殊兼容需求时使用
mcp:
  isolation: global
```

> ⚠️ **警告**：回退到全局模式会重新引入状态污染风险，仅作为临时过渡方案。

### 9.3 混合模式

```yaml
# 部分 MCP 使用全局，部分使用会话隔离
mcp:
  isolation: session
  servers:
    # 全局 MCP（兼容旧行为）
    - name: legacy-db
      command: npx -y @modelcontextprotocol/server-postgres
      scope: global
      # 仅用于不需要隔离的场景
    
    # 会话隔离 MCP（新行为）
    - name: session-fs
      command: npx -y @modelcontextprotocol/server-filesystem
      scope: session
```

---

## 十、相关文档

- [MCP 协议集成指南](./8.x_mcp_integration.md)
- [架构文档：MCP 集成](../architect-guide/extension/mcp-integration.md)
- [安全配置](../16_安全配置/README.md)
- [监控与维护](../17_监控维护/README.md)
