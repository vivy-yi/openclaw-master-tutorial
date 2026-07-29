# External Gateway Supervisor 模式指南

> **版本**: v2026.7.2-beta.3+  
> **功能标识**: `OPENCLAW_SUPERVISOR_MODE=external`  
> **相关 Issue**: PR 由 @shakkernerd 贡献  
> **优先级**: P1  
> **最后更新**: 2026-07-29

---

## 一、概述

External Gateway Supervisor 模式是 OpenClaw 为**多租户运维**和**企业安全要求**设计的生命周期管理增强。通过 `OPENCLAW_SUPERVISOR_MODE=external` 环境变量启用，为外部生命周期管理者（如 OCM — OpenClaw Cluster Manager）提供受控的监管能力。

```
┌─────────────────────────────────────────────────────────────┐
│           External Gateway Supervisor 架构                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────┐         ┌─────────────────┐         │
│   │   OCM / 外部    │ ──────▶ │    Gateway      │         │
│   │   监管者         │  handoff │   (external)   │         │
│   └─────────────────┘  协议    └─────────────────┘         │
│           │                       │                        │
│           │                       ├── 验证的 restart        │
│           │                       ├── deferral 行为         │
│           │                       ├── 版本化 atomic handoff │
│           │                       └── ❌ 不暴露 native      │
│           │                           service authority     │
│           │                                               │
│           ▼                                               │
│   ┌─────────────────┐                                    │
│   │  Native Service │                                    │
│   │  (受保护)       │                                    │
│   └─────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、核心能力

| 能力 | External Supervisor | 标准模式 |
|------|---------------------|---------|
| **已验证的重启** | ✅ | ✅ |
| **延迟行为** | ✅ | ✅ |
| **版本化原子 restart-handoff | ✅ | ❌ |
| **原生服务变更** | ❌ 阻止 | ✅ 允许 |
| **自我更新** | ❌ 阻止 | ✅ 允许 |
| **生命周期状态查询** | ✅ | ✅ |
| **会话管理** | ✅ | ✅ |

---

## 三、适用场景

| 场景 | 说明 | 典型用户 |
|------|------|---------|
| **OCM 托管环境** | Operations Center Manager 统一管理多个 Gateway 实例 | 企业 IT |
| **多租户运维** | 外部系统统一控制和监控多个租户的 OpenClaw 实例 | SaaS 提供商 |
| **安全强化** | 需要严格限制 Gateway 自我修改能力 | 金融/医疗 |
| **合规要求** | 满足审计要求，禁止服务自主更新 | 政府/国企 |

---

## 四、快速开始

### 4.1 环境变量配置

```bash
# 启用 External Supervisor 模式
export OPENCLAW_SUPERVISOR_MODE=external

# 推荐同时配置安全相关变量
export OPENCLAW_GATEWAY_AUTH_TOKEN=your-secure-token

# 启动 Gateway
openclaw gateway start
```

### 4.2 配置文件配置

```yaml
# gateway.yaml
supervisor:
  mode: external
  restartPolicy:
    enabled: true
    verificationRequired: true
  security:
    blockNativeMutation: true
    blockSelfUpdate: true
  handoff:
    protocolVersion: "1.0"
    atomic: true
```

### 4.3 验证配置

```bash
# 检查监督模式状态
openclaw gateway status

# 预期输出应包含
# Supervisor Mode: external (verified restart enabled)
```

---

## 五、安全模型详解

### 5.1 受保护的操作

External Supervisor 模式下，**以下操作被阻止**：

| 操作 | 说明 | 被阻止原因 |
|------|------|-----------|
| **原生服务变更** | 修改 Gateway 原生服务配置 | 防止意外破坏 |
| **自我更新** | Gateway 自动升级到新版本 | 保持版本稳定性 |
| **任意重启** | 未经验证的进程重启 | 确保运维合规 |

### 5.2 允许的操作

| 操作 | 说明 | 条件 |
|------|------|------|
| **验证的重启** | 经外部监督者确认的 restart | 必须提供有效的 handoff 令牌 |
| **延迟执行** | 推迟维护操作 | 需配置延迟策略 |
| **状态查询** | 读取 Gateway 生命周期状态 | 无 |
| **会话管理** | 创建/销毁/切换会话 | 无 |

### 5.3 原子重启交接合同

```
┌──────────────────────────────────────────┐
│         Atomic Restart Handoff            │
├──────────────────────────────────────────┤
│  Version: 1.0                           │
│  Atomic: Yes                            │
│  Verified: Yes                           │
│  Contract: restart-handoff               │
└──────────────────────────────────────────┘
```

**交接流程**：

```
阶段 1: 准备
  Gateway 生成原子交接令牌
         │
         ▼
阶段 2: 验证
  外部监督者验证令牌有效性
         │
         ▼
阶段 3: 执行
  执行进程重启
         │
         ▼
阶段 4: 确认
  新进程确认接收，交接完成
```

### 5.4 设备身份策略

External Supervisor 对设备身份有严格要求：

```bash
# 设备身份策略关闭条件（所有条件必须同时满足）：
# 1. 新 Gateway 锁文件存在
# 2. 监听进程 PID 与锁文件一致
# 3. 交接令牌通过验证
```

---

## 六、与 OCM 集成

### 6.1 OCM 配置示例

OCM (OpenClaw Cluster Manager) 是 External Supervisor 的典型使用者：

```yaml
# ocm.yaml - Operations Center Manager 配置
clusters:
  - name: openclaw-prod
    gateway:
      supervisorMode: external
      endpoint: https://gateway.example.com:18789
      authToken: ${GATEWAY_TOKEN}
    restartPolicy:
      maxRetries: 3
      backoffSeconds: 5
      verifyHandoff: true
    security:
      blockNativeMutation: true
      blockSelfUpdate: true
  
  - name: openclaw-staging
    gateway:
      supervisorMode: external
      endpoint: https://staging.example.com:18789
```

### 6.2 OCM 生命周期管理

```bash
# 通过 OCM 触发受控重启
openclaw gateway restart \
  --supervisor=external \
  --handoff-token=<token> \
  --reason="scheduled-maintenance"

# 查看重启历史
openclaw gateway restart-history --limit=10

# 查看当前生命周期状态
openclaw gateway lifecycle status
```

### 6.3 健康检查

```bash
# 外部监督模式下的健康检查
curl -H "Authorization: Bearer $GATEWAY_TOKEN" \
  https://gateway.example.com:18789/health

# 预期响应
{
  "status": "healthy",
  "supervisorMode": "external",
  "restartHandoff": "ready",
  "version": "v2026.7.2-beta.3",
  "uptime": "24h30m"
}
```

### 6.4 详细的健康检查

```bash
# 获取完整的生命周期状态
curl -H "Authorization: Bearer $GATEWAY_TOKEN" \
  https://gateway.example.com:18789/lifecycle

# 预期响应
{
  "mode": "external",
  "state": "running",
  "supervisor": {
    "connected": true,
    "lastHeartbeat": "2026-07-29T14:30:00Z",
    "handoffState": "ready"
  },
  "security": {
    "blockNativeMutation": true,
    "blockSelfUpdate": true
  }
}
```

---

## 七、运维操作

### 7.1 重启管理

```bash
# 正常的受控重启（需要外部监督者授权）
openclaw gateway restart --supervisor=external --force

# 查看重启历史
openclaw gateway restart-history --limit=20

# 重启状态
openclaw gateway restart-status
```

### 7.2 版本管理

```bash
# 查看当前版本
openclaw version
# 输出：v2026.7.2-beta.3

# 检查更新（External Supervisor 模式下会阻止自动更新）
openclaw update check
# 输出：Update available but blocked by supervisor mode

# 手动更新（需要 supervisor 授权）
openclaw update apply --supervisor-authorized
```

### 7.3 日志管理

```bash
# 查看监督模式相关日志
tail -f ~/.openclaw/logs/gateway.log | grep -i supervisor

# 跟踪 restart-handoff 事件
openclaw logs --filter "supervisor.*handoff"

# 跟踪安全事件
openclaw logs --filter "security.*blocked"
```

---

## 八、故障排查

### 8.1 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| **重启超时** | 交接令牌验证失败 | 检查 Gateway 锁文件权限 |
| **监督者无法连接** | 认证令牌错误 | 验证 `GATEWAY_AUTH_TOKEN` |
| **设备身份策略拒绝** | PID 不一致 | 重启 Gateway 服务 |
| **原子交接失败** | 版本不匹配 | 升级 OCM 和 Gateway |
| **自我更新被阻止** | Supervisor 模式正常行为 | 确认是否为预期 |

### 8.2 日志分析

```bash
# 排查 supervisor 连接问题
openclaw logs --filter supervisor | grep -i "connect\|error\|fail"

# 排查 handoff 问题
openclaw logs --filter "handoff" | tail -50

# 查看安全阻止事件
openclaw logs --filter "security.*blocked" | tail -20
```

### 8.3 调试命令

```bash
# 启用 supervisor 调试模式
openclaw config set supervisor.debug true

# 跟踪 handoff 事件
openclaw gateway trace --handoff=latest

# 查看详细的 supervisor 状态
openclaw gateway status --verbose | grep -A 10 supervisor

# 禁用调试模式
openclaw config set supervisor.debug false
```

### 8.4 诊断检查清单

```bash
# 1. 检查 supervisor 模式是否启用
openclaw config get supervisor.mode
# 预期：external

# 2. 检查锁文件
ls -la ~/.openclaw/gateway.lock

# 3. 检查进程 PID
cat ~/.openclaw/gateway.lock
# 预期：当前 Gateway 进程的 PID

# 4. 检查 OCM 连接
curl -H "Authorization: Bearer $GATEWAY_TOKEN" \
  https://localhost:18789/lifecycle/supervisor
```

---

## 九、安全配置

### 9.1 完整的 Gateway 配置示例

```yaml
# gateway.yaml - External Supervisor 完整配置
gateway:
  name: my-gateway
  port: 18789

supervisor:
  mode: external
  restartPolicy:
    enabled: true
    verificationRequired: true
    maxRetries: 3
    backoffSeconds: 5
  security:
    blockNativeMutation: true
    blockSelfUpdate: true
    allowedNativeChanges: []  # 空数组 = 完全阻止
  handoff:
    protocolVersion: "1.0"
    atomic: true
    timeout: "30s"
  healthCheck:
    interval: "30s"
    endpoint: /health

security:
  gatewayAuthToken: ${GATEWAY_AUTH_TOKEN}
  tls:
    enabled: true
    cert: /path/to/cert.pem
    key: /path/to/key.pem
```

### 9.2 与防火墙配合

```bash
# External Supervisor 端口访问控制
# 仅允许 OCM 服务器访问 supervisor API
iptables -A INPUT -p tcp -s <ocm-ip>/32 --dport 18789 -j ACCEPT
iptables -A INPUT -p tcp --dport 18789 -j DROP
```

---

## 十、迁移指南

### 10.1 从标准模式升级

**自动迁移**：v2026.7.2+ 默认支持 External Supervisor 模式。

**步骤**：

```bash
# 1. 备份现有配置
cp gateway.yaml gateway.yaml.backup

# 2. 更新配置
echo 'supervisor:
  mode: external' >> gateway.yaml

# 3. 重启 Gateway
openclaw gateway restart

# 4. 验证模式
openclaw gateway status | grep Supervisor
```

### 10.2 从 External 模式回退

**不推荐**，但如果需要：

```bash
# 临时禁用 External Supervisor
export OPENCLAW_SUPERVISOR_MODE=off
openclaw gateway restart

# 永久回退（编辑配置）
# 将 gateway.yaml 中的 supervisor.mode 改为 standard
```

### 10.3 OCM 迁移

```yaml
# 旧版 OCM 配置（标准模式）
clusters:
  - name: old-cluster
    gateway:
      supervisorMode: standard

# 新版 OCM 配置（External Supervisor）
clusters:
  - name: new-cluster
    gateway:
      supervisorMode: external
      restartPolicy:
        verificationRequired: true
```

---

## 十一、相关文档

- [Gateway 部署指南](../02_快速部署/gateway-deployment.md)
- [监控与维护](../17_监控维护/README.md)
- [架构文档：运维扩展](../architect-guide/operation/supervisor-mode.md)
- [多租户架构](../architect-guide/multi-tenant-architecture.md)
- [安全配置](../16_安全配置/README.md)
