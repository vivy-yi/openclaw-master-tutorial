# Cloud Workers 远程会话执行指南

> **版本**: v2026.7.2-beta.3+  
> **功能标识**: Cloud Workers / Session Placement / Worker-Turn Routing  
> **相关 Issue**: #106332  
> **优先级**: P1  
> **最后更新**: 2026-07-29

---

## 一、概述

Cloud Workers 是 OpenClaw v2026.7.2 引入的**平台级新功能**，允许将会话执行从本地 Gateway 卸载到远程云工作站，实现：

- **计算密集型任务**卸载到高配云节点
- **GPU 加速**模型推理
- **多租户隔离**部署
- **跨区域低延迟**访问

```
┌─────────────────────────────────────────────────────────────────┐
│                   Cloud Workers 架构                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐      会话分发        ┌─────────────┐          │
│  │   Gateway   │ ──────────────────▶  │ Cloud Worker │          │
│  │  (主控)     │    placement         │  (云端)     │          │
│  └─────────────┘                      └─────────────┘          │
│        │                                    │                   │
│        │      turn routing                  │                   │
│        ◀────────────────────────────────────┘                   │
│                                                                  │
│  适用场景：                                                      │
│  ├── 计算密集型 agent 会话                                       │
│  ├── 需要 GPU 加速的模型推理                                     │
│  ├── 多租户隔离部署                                             │
│  └── 跨区域低延迟访问                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 二、核心概念

### 2.1 会话放置 (Session Placement)

Gateway 根据以下因素自动选择合适的 Worker：

| 因素 | 说明 |
|------|------|
| **负载均衡** | 选择当前负载最低的 Worker |
| **地理位置** | 优先选择延迟最低的节点 |
| **资源需求** | GPU 需求 → GPU Worker；内存密集 → 高内存 Worker |
| **手动指定** | 支持通过配置指定 Worker 池 |

### 2.2 调度 (Dispatch)

```
┌──────────────────────────────────────────────────────────────┐
│                     Worker 调度流程                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. 接收会话请求                                             │
│         │                                                    │
│         ▼                                                    │
│  2. 评估资源需求 ──▶ 匹配 Worker 池                          │
│         │                                                    │
│         ▼                                                    │
│  3. 优先级队列排序                                           │
│         │                                                    │
│         ▼                                                    │
│  4. 选择最优 Worker 并分配会话                                │
│         │                                                    │
│         ▼                                                    │
│  5. 健康检查 ──▶ 不合格则重新选择                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**调度策略**：

- `priority` — 优先级调度（高优先级优先）
- `round-robin` — 轮询调度
- `least-loaded` — 最小负载优先（默认）
- `local-first` — 本地优先，本地满载时回退到云端

### 2.3 工作轮路由 (Worker-Turn Routing)

输入/输出在 Gateway 和 Worker 之间路由：

```
用户输入 ──▶ Gateway ──▶ Worker ──▶ 模型推理
                                      │
用户输出 ◀── Gateway ◀── Worker ◀── 响应
              │
              ▼
        支持流式响应 (Streaming)
```

---

## 三、快速开始

### 3.1 环境要求

| 要求 | 说明 |
|------|------|
| **Gateway 版本** | v2026.7.2-beta.3+ |
| **网络** | Gateway 与 Worker 之间需网络互通 |
| **Worker 节点** | 需部署 OpenClaw Worker 服务 |

### 3.2 基础配置

**方式一：CLI 配置**

```bash
# 启用 Cloud Workers
openclaw config set cloudWorkers.enabled true

# 指定默认区域
openclaw config set cloudWorkers.defaultRegion us-west-2

# 设置调度策略
openclaw config set cloudWorkers.dispatchStrategy least-loaded
```

**方式二：配置文件**

```yaml
# gateway.yaml
cloudWorkers:
  enabled: true
  defaultRegion: us-west-2
  dispatchStrategy: least-loaded
  workerPool:
    - name: default
      endpoint: https://worker1.example.com:18792
      weight: 1
    - name: gpu-pool
      endpoint: https://worker-gpu.example.com:18792
      weight: 2
      capabilities:
        gpu: true
```

### 3.3 启动 Cloud Worker

```bash
# 在 Worker 节点上启动
openclaw worker start \
  --name worker-01 \
  --port 18792 \
  --gpu-enabled \
  --region us-west-2
```

验证连接：

```bash
openclaw workers list
# 预期输出：
# NAME      REGION    STATUS   CAPABILITIES
# worker-01 us-west-2 online   standard
# worker-gpu us-west-2 online  gpu
```

---

## 四、高级配置

### 4.1 GPU Worker 配置

```yaml
# gateway.yaml
cloudWorkers:
  workerPool:
    - name: gpu-pool
      endpoint: https://gpu-worker.example.com:18792
      capabilities:
        gpu: true
        gpuMemory: "16GB"
        gpuCount: 1
```

```bash
# 启动 GPU Worker
openclaw worker start \
  --name gpu-worker-01 \
  --port 18792 \
  --gpu-enabled \
  --gpu-memory 16GB \
  --gpu-count 1
```

### 4.2 手动会话放置

```bash
# 指定会话到特定 Worker
openclaw session start \
  --model anthropic/claude-4-sonnet \
  --worker gpu-pool \
  -- interactive
```

### 4.3 资源限制

```yaml
cloudWorkers:
  sessionLimits:
    maxConcurrentSessions: 10
    maxSessionDuration: "4h"
    maxMemoryPerSession: "4GB"
```

---

## 五、使用场景

### 场景 1: 云端开发环境

```
用户 A 在咖啡店使用轻薄本
  ↓
通过 Cloud Worker 运行完整开发环境
  ↓
代码保存在云端，跨设备同步
```

**配置示例**：

```yaml
cloudWorkers:
  enabled: true
  defaultRegion: us-east-1
  autoScale: true
  scaling:
    minWorkers: 1
    maxWorkers: 5
    scaleUpThreshold: 0.8
    scaleDownThreshold: 0.2
```

### 场景 2: 跨设备编码

```
用户在家用 Mac 开发 → 出差时用 Windows PC
  ↓
通过终端直接恢复原有 Codex / Claude Code 会话
  ↓
会话状态云端保持，设备切换无感知
```

**终端会话恢复**：

```bash
# 查看可用会话
openclaw sessions list --remote

# 恢复 Codex 会话
opencode resume <session-id>

# 恢复 Claude Code 会话
claude session resume <session-id>
```

### 场景 3: 资源密集任务

```
大型代码分析 / 长文本处理
  ↓
Cloud Worker 提供更强算力
  ↓
本地设备无感知，体验一致
```

---

## 六、监控与运维

### 6.1 查看 Worker 状态

```bash
# 列出所有 Worker
openclaw workers list

# 查看特定 Worker 详情
openclaw workers status worker-01

# 查看 Worker 负载
openclaw workers metrics worker-01
```

### 6.2 日志管理

```bash
# 查看 Worker 日志
openclaw worker logs worker-01 --tail 100

# 查看会话分发日志
openclaw logs --filter session.placement
```

### 6.3 健康检查

```bash
# 手动触发健康检查
openclaw workers health-check

# 自动健康检查（每 30 秒）
openclaw workers health-check --watch
```

---

## 七、故障排查

### 7.1 Worker 无法连接

| 检查项 | 命令 |
|--------|------|
| 网络连通性 | `ping worker.example.com` |
| 端口可达性 | `nc -zv worker.example.com 18792` |
| Worker 进程状态 | `openclaw worker status` |
| Gateway 配置 | `openclaw config get cloudWorkers` |

**常见原因**：

1. **端口未开放** — 检查防火墙规则
2. **证书问题** — Worker 使用自签证书时需配置 CA
3. **网络隔离** — 确保 Gateway 与 Worker 在同一网络域

### 7.2 会话分发失败

```bash
# 查看分发日志
openclaw logs --filter dispatch

# 重新尝试分发
openclaw session dispatch <session-id> --force
```

### 7.3 性能问题

| 问题 | 解决方案 |
|------|---------|
| 延迟高 | 选择地理位置更近的 Worker |
| 响应慢 | 检查 Worker 负载，考虑扩容 |
| 内存不足 | 配置更大内存的 Worker |

---

## 八、安全说明

### 8.1 传输加密

Cloud Workers 默认使用 TLS 加密通信：

```yaml
cloudWorkers:
  security:
    tls:
      enabled: true
      minVersion: "1.2"
      cert: /path/to/cert.pem
      key: /path/to/key.pem
```

### 8.2 访问控制

```yaml
cloudWorkers:
  security:
    accessControl:
      allowedGateways:
        - gateway-id-1
        - gateway-id-2
      apiKeyRequired: true
```

### 8.3 数据隔离

| 隔离级别 | 说明 |
|---------|------|
| **会话隔离** | 每个会话的数据完全隔离 |
| **Worker 隔离** | 不同租户的会话分配到不同 Worker |
| **网络隔离** | 使用 VPC 或私有网络 |

---

## 九、与现有功能对比

| 特性 | 本地执行 | Cloud Workers |
|------|---------|--------------|
| **延迟** | 最低 | 取决于网络 |
| **算力** | 受本地限制 | 可弹性扩展 |
| **成本** | 固定 | 按需计费 |
| **适用场景** | 轻量任务 | 重量级任务 |
| **离线可用** | ✅ | ❌ |

---

## 十、相关文档

- [远程编码会话架构](../architect-guide/remote-coding.md)
- [Gateway 部署指南](./gateway-deployment.md)
- [多租户架构](../architect-guide/multi-tenant-architecture.md)
- [监控与维护](../17_监控维护/README.md)
