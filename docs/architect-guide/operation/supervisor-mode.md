# 外部监督模式 (External Supervisor Mode)

> **版本**: v2026.7.2-beta.3+  
> **功能标识**: `OPENCLAW_SUPERVISOR_MODE=external`  
> **相关 Issue**: #107670 (贡献者: @shakkernerd)  
> **原文出处**: [GitHub PR](https://github.com/openclaw/openclaw)

---

## 一、概述

外部监督模式是 OpenClaw Gateway 生命周期管理的重要增强，专为 OCM (Operations Center Manager) 等外部生命周期所有者设计。

### 1.1 核心能力

```
┌─────────────────────────────────────────────────────────────┐
│                    External Supervisor Mode                │
├─────────────────────────────────────────────────────────────┤
│  ✅ 保留已验证的重启和延迟行为                                │
│  ✅ 不暴露原生服务权限 (Native Service Authority)             │
│  ✅ 阻止原生服务变更和自我更新                                │
│  ✅ 提供版本化的原子重启交接合同                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 适用场景

| 场景 | 说明 |
|------|------|
| **OCM 托管环境** | Operations Center Manager 统一管理多个 Gateway 实例 |
| **多租户运维** | 外部系统统一控制和监控多个租户的 OpenClaw 实例 |
| **安全强化** | 需要严格限制 Gateway 自我修改能力的企业环境 |
| **合规要求** | 满足审计要求，禁止服务自主更新的合规场景 |

---

## 二、配置方法

### 2.1 环境变量配置

```bash
# 启用外部监督模式
OPENCLAW_SUPERVISOR_MODE=external

# 建议同时配置以下安全相关变量
OPENCLAW_SUPERVISOR_MODE=external
OPENCLAW_GATEWAY_AUTH_TOKEN=your-secure-token  # Gateway 认证令牌
```

### 2.2 Gateway 配置文件

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
```

### 2.3 验证配置

```bash
# 检查监督模式状态
openclaw gateway status

# 预期输出应包含
# Supervisor Mode: external (verified restart enabled)
```

---

## 三、安全模型

### 3.1 权限边界

| 能力 | 外部监督模式 | 标准模式 |
|------|-------------|----------|
| 原生服务变更 | ❌ 阻止 | ✅ 允许 |
| 自我更新 | ❌ 阻止 | ✅ 允许 |
| 进程重启 | ✅ 经验证后允许 | ✅ 允许 |
| 配置热重载 | ✅ 经授权允许 | ✅ 允许 |
| 外部 API 调用 | ✅ 允许 | ✅ 允许 |

### 3.2 原子重启交接合同

外部监督模式提供版本化的原子重启交接保证：

```
┌──────────────────────────────────────────┐
│         Atomic Restart Handoff           │
├──────────────────────────────────────────┤
│  Version: 1.0                            │
│  Atomic: Yes                             │
│  Verified: Yes                           │
│  Contract: restart-handoff               │
└──────────────────────────────────────────┘
```

**交接流程**：
1. **准备阶段**: Gateway 准备重启状态，生成原子交接令牌
2. **验证阶段**: 外部监督者验证交接令牌的有效性
3. **执行阶段**: 执行进程重启
4. **确认阶段**: 新进程确认接收，交接完成

### 3.3 设备身份策略

```bash
# 设备身份策略关闭条件
# 仅在以下条件全部满足时接受：
# 1. 新 Gateway 锁文件存在
# 2. 监听进程 PID 与锁文件一致
# 3. 交接令牌通过验证
```

---

## 四、与 OCM 集成

### 4.1 OCM 配置示例

```yaml
# ocm.yaml - Operations Center Manager 配置
clusters:
  - name: openclaw-prod
    gateway:
      supervisorMode: external
      endpoint: https://gateway.example.com:18789
    restartPolicy:
      maxRetries: 3
      backoffSeconds: 5
```

### 4.2 健康检查

```bash
# 外部监督模式下的健康检查
curl -H "Authorization: Bearer $GATEWAY_TOKEN" \
  https://gateway.example.com:18789/health

# 预期响应
{
  "status": "healthy",
  "supervisorMode": "external",
  "restartHandoff": "ready"
}
```

### 4.3 重启管理

```bash
# 通过 OCM 触发重启（外部监督模式）
openclaw gateway restart --supervisor=external --force

# 查看重启历史
openclaw gateway restart-history --limit=10
```

---

## 五、故障排查

### 5.1 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 重启超时 | 交接令牌验证失败 | 检查 Gateway 锁文件权限 |
| 监督者无法连接 | 认证令牌错误 | 验证 `GATEWAY_AUTH_TOKEN` |
| 设备身份策略拒绝 | PID 不一致 | 重启 Gateway 服务 |
| 原子交接失败 | 版本不匹配 | 升级 OCM 和 Gateway |

### 5.2 日志分析

```bash
# 查看监督模式相关日志
tail -f ~/.openclaw/logs/gateway.log | grep -i supervisor

# 关键日志关键词
# - "supervisor: external mode enabled"
# - "restart-handoff: atomic contract v1.0"
# - "device-identity: policy accepted"
# - "restart-health: verified"
```

### 5.3 调试模式

```bash
# 启用监督模式调试日志
OPENCLAW_DEBUG=supervisor openclaw gateway start

# 查看详细交接过程
openclaw gateway trace --handoff=latest
```

---

## 六、版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v2026.7.2-beta.3 | 2026-07-18 | 初始发布外部监督模式 |
| - | - | 支持 OCM 生命周期管理 |
| - | - | 原子重启交接合同 |

---

## 七、相关文档

| 文档 | 说明 |
|------|------|
| [架构总览](../core/architecture-overview.md) | OpenClaw 核心架构 |
| [高可用部署](./high-availability.md) | HA 配置最佳实践 |
| [安全加固](./security-hardening.md) | 安全配置指南 |
| [Gateway 文档](../../17_监控维护/) | Gateway 运维手册 |

---

*本文档由 墨客-生成审核发布 自动生成*  
*数据来源: v2026.7.2-beta.3 Release Notes*  
*生成时间: 2026-07-24*
